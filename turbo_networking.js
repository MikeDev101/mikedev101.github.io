class Networking {
    constructor (runtime, extensionId) {
        this.isRunning = false;
        this.socketData = "";
        this.runtime = runtime;
		this.connect_hat = 0;
		this.packet_hat = 0;
		this.close_hat = 0;
		this.packet_queue = {};
    }

    getInfo () {
        return {
            "id": 'networking',
            "name": 'Networking',
            "blocks": [
                {
                	"opcode": 'getSocketData',
                    "blockType": "reporter",
                    "text": 'latest socket data'
                },
				{
                	"opcode": 'getQueueSize',
                    "blockType": "reporter",
                    "text": 'size of packet queue'
                },
				{
                	"opcode": 'rawPacketQueue',
                    "blockType": "reporter",
                    "text": 'packet queue'
                },
				{
                	"opcode": 'getQueueItem',
                    "blockType": "reporter",
                    "text": 'get [item] of packet queue',
					"arguments": {
						"item": {
							"type": "number",
							"defaultValue": 1,
						},
					}
                },
				{
					"opcode": 'fetchURL', 
					"blockType": "reporter",
					"text": 'Fetch data from URL [url]',
					"arguments": {
						"url": {
							"type": "string",
							"defaultValue": 'https://mikedev101.github.io/cloudlink/fetch_test',
						},
					}
				},
				{
                	"opcode": 'makeRealJSON',
                    "blockType": "reporter",
                    "text": 'make real json [toBeJSONified]',
					"arguments": {
						"toBeJSONified": {
							"type": "string",
							"defaultValue": '{"test": true}',
						},
					}
                },
				{
                	"opcode": 'makeStrJSON',
                    "blockType": "reporter",
                    "text": 'make str json [toBeJSONified]',
					"arguments": {
						"toBeJSONified": {
							"type": "string",
							"defaultValue": '{"test": true}',
						},
					}
                },
				{
					"opcode": 'parseJSON',
					"blockType": "reporter",
					"text": '[PATH] of [JSON_STRING]',
					"arguments": {
						"PATH": {
							"type": "string",
							"defaultValue": 'fruit/apples',
						},
						"JSON_STRING": {
							"type": "string",
							"defaultValue": '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
						},
					},
				},
                {
                	"opcode": 'getSocketState',
                    "blockType": "Boolean",
                    "text": 'active',
                },
				{
                	"opcode": 'onConnect',
                    "blockType": "hat",
                    "text": 'on connect',
                },
				{
                	"opcode": 'onPacket',
                    "blockType": "hat",
                    "text": 'on new packet',
                },
				{
                	"opcode": 'onClose',
                    "blockType": "hat",
                    "text": 'on close',
                },
				{
                	"opcode": 'sendData',
                    "blockType": "command",
                    "text": 'send on socket [DATA]',
                    "arguments": {
                        "DATA": {
                            "type": "string",
                            "defaultValue": '{"foo": "bar"}'
                        }
                    }
                },
				{
                    "opcode": 'openSocket',
                    "blockType": "command",
                    "text": 'open socket to [ADDRESS]',
					"arguments": {
						"ADDRESS": {
							"type": "string",
							"defaultValue": 'ws://127.0.0.1:3000/',
						},
					},
                },
                {
                	"opcode": 'closeSocket',
                    "blockType": "command",
                    "text": 'close socket',
                },
				{
                	"opcode": 'clearPacketQueue',
                    "blockType": "command",
                    "text": 'clear packet queue',
                },
			]
        };
    };
	
	getQueueItem(args) {
		try {
			return JSON.stringify(this.packet_queue[Number(args.item)]);
		} catch(err) {
			console.log(err);
			return "";
		};
	};
	
	rawPacketQueue() {
		return JSON.stringify(this.packet_queue);
	}
	
	getQueueSize() {
		return Number(Object.keys(this.packet_queue).length);
	};
	
	clearPacketQueue() {
		this.packet_queue = {};
	};
	
	makeStrJSON({
		toBeJSONified
	}) {
		try {
			return JSON.stringify(toBeJSONified);
		} catch(err) {
			return "";
		};
	};
	
	makeRealJSON({
		toBeJSONified
	}) {
		try {
			return JSON.parse(toBeJSONified);
		} catch(err) {
			return "";
		};
	};
	
	onClose() {
		if (this.close_hat == 0 && !this.isRunning) {
			this.close_hat = 1;
			return true;
		} else {
			return false;
		};
	};
	
	onPacket() {
		if (this.packet_hat == 0 && this.isRunning) {
			this.packet_hat = 1;
			return true;
		} else {
			return false;
		};
	};
	
	onConnect() {
		if (this.connect_hat == 0 && this.isRunning) {
			this.connect_hat = 1;
			return true;
		} else {
			return false;
		};
	};
	
	fetchURL(args) {
		return fetch(args.url).then(response => response.text());
	};
	
	parseJSON({
		PATH,
		JSON_STRING
	}) {
		try {
			const path = PATH.toString().split('/').map(prop => decodeURIComponent(prop));
			if (path[0] === '') path.splice(0, 1);
			if (path[path.length - 1] === '') path.splice(-1, 1);
			let json;
			try {
				json = JSON.parse(' ' + JSON_STRING);
			} catch (e) {
				return e.message;
			};
			path.forEach(prop => json = json[prop]);
			if (json === null) return 'null';
			else if (json === undefined) return '';
			else if (typeof json === 'object') return JSON.stringify(json);
			else return json.toString();
		} catch (err) {
			return '';
		};
	};
	
    openSocket ({
		ADDRESS
	}) {
    	if (this.isRunning == false) {
    		console.log("Starting socket.");
    		this.mWS = new WebSocket(String(ADDRESS));

    		const self = this; // the functions below are out of the scope
    		//check if connnecting to the server fails
    		this.mWS.onerror = function(){
    			self.isRunning = false;
    			console.log("failed to connect to the server.");
    		};
    		this.mWS.onopen = function(){
    			self.isRunning = true;
				self.packet_queue = {};
    			console.log("successfully connected to the server.");
    		};
			this.mWS.onmessage = function(event){
   				self.socketData = JSON.parse(event.data);
				self.packet_hat = 0;
				self.packet_queue[Number(Object.keys(self.packet_queue).length) + 1] = self.socketData;
				console.log(self.packet_queue);
   				console.log("RECEIVED:", self.socketData);
   			};
			this.mWS.onclose = function() {
				this.isRunning = false;
				this.connect_hat = 0;
				this.packet_hat = 0;
				this.close_hat = 0;
				console.log("Server has disconnected.");
			};
    	} else {
    		console.log("Socket is already open.");
    	};
    }

    closeSocket () {
        if (this.isRunning == true) {
    		console.log("Closing socket.");
    		this.mWS.close(1000,'script closure');
			this.connect_hat = 0;
			this.packet_hat = 0;
			this.close_hat = 0;
    		this.isRunning = false;
    	} else {
    		console.log("Socket is not open.");
    	};
    }

   	getSocketState () {
   		//Check is the server is still running
   		if (this.isRunning){
   			var response = this.mWS.readyState;
   			if (response == 2 || response == 3) {
   				this.isRunning = false;
				this.connect_hat = 0;
				this.packet_hat = 0;
				this.close_hat = 0;
   				console.log("Server has disconnected.")
   			};
   		};
   		return this.isRunning;
   	}

   	sendData (args) {
   		if (this.isRunning == true) {
   			this.mWS.send(args.DATA);
   			console.log("SENT:", args.DATA);
   		};
   	};

   	getSocketData () {
   		//Check is the server is still running
   		return JSON.stringify(this.socketData);
   	};
};

(function() {
    var extensionClass = Networking;
    if (typeof window === "undefined" || !window.vm) {
        Scratch.extensions.register(new extensionClass());
    } else {
        var extensionInstance = new extensionClass(window.vm.extensionManager.runtime);
        var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance);
        window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName);
    };
})()