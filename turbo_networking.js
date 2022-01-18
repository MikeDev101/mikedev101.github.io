class Networking {
    constructor (runtime, extensionId) {
		this.cl_icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4yLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA0NSA0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUgNDU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMwRkJEOEM7fQ0KCS5zdDF7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS13aWR0aDo0O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9DQo8L3N0eWxlPg0KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNy41MDAxNCwtMTU3LjUwMDEzKSI+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMTcuNSwxODBjMC0xMi40LDEwLjEtMjIuNSwyMi41LTIyLjVzMjIuNSwxMC4xLDIyLjUsMjIuNXMtMTAuMSwyMi41LTIyLjUsMjIuNVMyMTcuNSwxOTIuNCwyMTcuNSwxODANCgkJCUwyMTcuNSwxODB6Ii8+DQoJCTxnPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIzMC4zLDE4MC4xYzUuNy00LjcsMTMuOS00LjcsMTkuNiwwIi8+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjI1LjMsMTc1LjFjOC40LTcuNCwyMS03LjQsMjkuNCwwIi8+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjM1LjIsMTg1YzIuOS0yLjEsNi44LTIuMSw5LjcsMCIvPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI0MCwxOTAuNEwyNDAsMTkwLjQiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
		this.cl_block = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4yLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA0NSA0NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUgNDU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCjwvc3R5bGU+DQo8Zz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuOCwyMi42YzUuNy00LjcsMTMuOS00LjcsMTkuNiwwIi8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuOCwxNy42YzguNC03LjQsMjEtNy40LDI5LjQsMCIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNy43LDI3LjVjMi45LTIuMSw2LjgtMi4xLDkuNywwIi8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIyLjUsMzIuOUwyMi41LDMyLjkiLz4NCjwvZz4NCjwvc3ZnPg0K';
        this.isRunning = false;
        this.socketData = "";
        this.runtime = runtime;
		this.connect_hat = 0;
		this.packet_hat = 0;
		this.close_hat = 0;
		this.packet_queue = {};
		this.link_status = 0;
		this.responded_packet = {};
		this.got_response = 0;
		this.listening_for_packet = false;
		this.listening_packet_cmd = "";
		this.packet_response_queue_number = 0;
    }

    getInfo () {
        return {
            "id": 'networking',
            "name": 'CloudLink TURBO',
			"blockIconURI": this.cl_block,
			"menuIconURI": this.cl_icon,
            "blocks": [
				{
                	"opcode": 'linkState',
                    "blockType": "reporter",
                    "text": 'Link Status'
                },
                {
                	"opcode": 'getSocketData',
                    "blockType": "reporter",
                    "text": 'Socket Data'
                },
				{
                	"opcode": 'getQueueSize',
                    "blockType": "reporter",
                    "text": 'Packet Queue Size'
                },
				{
                	"opcode": 'rawPacketQueue',
                    "blockType": "reporter",
                    "text": 'Packet Queue'
                },
				{
                	"opcode": 'getQueueItem',
                    "blockType": "reporter",
                    "text": 'Item [item] of Packet Queue',
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
					"blockAllThreads": "true",
					"text": 'Fetch data from URL [url]',
					"arguments": {
						"url": {
							"type": "string",
							"defaultValue": 'https://mikedev101.github.io/cloudlink/fetch_test',
						},
					}
				},
				{
                	"opcode": 'makeJSON',
                    "blockType": "reporter",
                    "text": 'Convert [toBeJSONified] to JSON',
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
                	"opcode": 'isValidJSON',
                    "blockType": "Boolean",
                    "text": 'Is [JSON_STRING] valid JSON?',
					"arguments": {
						"JSON_STRING": {
							"type": "string",
							"defaultValue": '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
						},
					},
                },
                {
                	"opcode": 'getSocketState',
                    "blockType": "Boolean",
                    "text": 'Connected?',
                },
				{
                	"opcode": 'onConnect',
                    "blockType": "hat",
                    "text": 'On Connect',
                },
				{
                	"opcode": 'onPacket',
                    "blockType": "hat",
                    "text": 'On New Data',
                },
				{
                	"opcode": 'onClose',
                    "blockType": "hat",
                    "text": 'On Disconnect',
                },
				{
                	"opcode": 'sendData',
                    "blockType": "command",
                    "text": 'Send [DATA]',
					"blockAllThreads": "true",
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
                    "text": 'Connect to [ADDRESS]',
					"blockAllThreads": "true",
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
					"blockAllThreads": "true",
                    "text": 'Disconnect',
                },
				{
                	"opcode": 'clearPacketQueue',
                    "blockType": "command",
					"blockAllThreads": "true",
                    "text": 'Clear Packet Queue',
                },
				{
                	"opcode": 'waitForResponse',
                    "blockType": "Boolean",
					"text": 'Listen for packet with cmd: [CMD]',
					"arguments": {
						"CMD": {
							"type": "string",
							"defaultValue": 'status',
						},
					},
                },
				{
                	"opcode": 'checkJSONforValue',
                    "blockType": "Boolean",
					"text": 'Does JSON [JSON_STRING] contains [VALUE]?',
					"arguments": {
						"JSON_STRING": {
							"type": "string",
							"defaultValue": '{"foo": "bar"}',
						},
						"VALUE": {
							"type": "string",
							"defaultValue": 'bar',
						},
					},
                },
				{
                	"opcode": 'getPacketResponse',
                    "blockType": "reporter",
                    "text": 'Packet Response'
                },
				{
                	"opcode": 'getPacketResponseQueueNumb',
                    "blockType": "reporter",
                    "text": 'Packet Response Queue Number'
                },
			]
        };
    };
	
	checkJSONforValue({JSON_STRING, VALUE}) {
		try {
			return Object.values(JSON.parse(JSON_STRING)).includes(VALUE);
		} catch(err) {
			return false;
		};
	}
	
	waitForResponse({CMD}) {
		if (this.isRunning) {
			if (this.got_response == 1) {
				this.got_response = 0;
				return true;
			}
			if (!this.listening_for_packet) {
				this.listening_for_packet = true;
				this.listening_packet_cmd = String(CMD);
				console.log("Registering new listener: ", String(CMD));
			};
			return false;
		} else {
			return false;
		};
	};
	
	getPacketResponse() {
		try {
			return JSON.stringify(this.responded_packet);
		} catch(err) {
			console.log(err);
			return "";
		};
	};
	
	getPacketResponseQueueNumb() {
		return this.packet_response_queue_number;
	}
	
	linkState() {
		return Number(this.link_status);
	}
	
	getQueueItem(args) {
		try {
			return JSON.stringify(this.packet_queue[args.item]);
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
	
	isValidJSON({JSON_STRING}) {
		try {
			JSON.parse(JSON_STRING);
			return true;
		} catch(err) {
			return false;
		}
	};
	
	makeJSON({
		toBeJSONified
	}) {
		console.log(typeof(toBeJSONified));
		if (typeof(toBeJSONified) == "string") {
			try {
				JSON.parse(toBeJSONified);
				return String(toBeJSONified);
			} catch(err) {
				return "Not JSON!";
			}
		} else if (typeof(toBeJSONified) == "object") {
			return JSON.stringify(toBeJSONified);
		} else {
			return "Not JSON!";
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
	
    openSocket({
		ADDRESS
	}) {
    	if (this.isRunning == false) {
    		console.log("Starting socket.");
			const self = this; // the functions below are out of the scope
			self.link_status = 1;
    		this.mWS = new WebSocket(String(ADDRESS));
    		
    		//check if connnecting to the server fails
    		this.mWS.onerror = function(){
    			self.isRunning = false;
    			console.log("failed to connect to the server.");
				self.link_status = 3;
    		};
    		this.mWS.onopen = function(){
    			self.isRunning = true;
				self.packet_queue = {};
				self.link_status = 2;
    			console.log("successfully connected to the server.");
    		};
			this.mWS.onmessage = function(event){
   				self.socketData = JSON.parse(event.data);
				self.packet_hat = 0;
				
				if (self.listening_for_packet) {
					if (String(self.listening_packet_cmd) == String(self.socketData["cmd"])) {
						self.got_response = 1;
						self.responded_packet = self.socketData;
						console.log("GOT RESPONSE FOR CMD", String(self.listening_packet_cmd), ": ", self.socketData);
						self.listening_for_packet = false;
						self.listening_packet_cmd = "";
						self.packet_response_queue_number = (Number(Object.keys(self.packet_queue).length) + 1);
					};
				};
				self.packet_queue[String(Number(Object.keys(self.packet_queue).length) + 1)] = self.socketData;
				console.log(self.packet_queue);
   				console.log("RECEIVED:", self.socketData);
   			};
			this.mWS.onclose = function() {
				this.isRunning = false;
				this.connect_hat = 0;
				this.packet_hat = 0;
				this.close_hat = 0;
				this.link_status = 3;
				this.packet_queue = {};
				this.responded_packet = {};
				this.got_response = 0;
				this.listening_for_packet = false;
				this.listening_packet_cmd = "";
				this.packet_response_queue_number = 0;
				console.log("Server has disconnected.");
			};
    	} else {
    		console.log("Socket is already open.");
    	};
    }

    closeSocket() {
        if (this.isRunning == true) {
    		console.log("Closing socket.");
    		this.mWS.close(1000,'script closure');
			this.connect_hat = 0;
			this.packet_hat = 0;
			this.close_hat = 0;
    		this.isRunning = false;
			this.link_status = 3;
			this.packet_queue = {};
			this.responded_packet = {};
			this.got_response = 0;
			this.listening_for_packet = false;
			this.listening_packet_cmd = "";
			this.packet_response_queue_number = 0;
    	} else {
    		console.log("Socket is not open.");
    	};
    }

   	getSocketState() {
   		//Check is the server is still running
   		if (this.isRunning){
   			var response = this.mWS.readyState;
   			if (response == 2 || response == 3) {
   				this.isRunning = false;
				this.connect_hat = 0;
				this.packet_hat = 0;
				this.close_hat = 0;
				this.link_status = 3;
				this.packet_queue = {};
				this.responded_packet = {};
				this.got_response = 0;
				this.listening_for_packet = false;
				this.listening_packet_cmd = "";
				this.packet_response_queue_number = 0;
   				console.log("Server has disconnected.")
   			};
   		};
   		return this.isRunning;
   	}

   	sendData(args) {
   		if (this.isRunning == true) {
   			this.mWS.send(args.DATA);
   			console.log("SENT:", args.DATA);
   		};
   	};

   	getSocketData() {
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
