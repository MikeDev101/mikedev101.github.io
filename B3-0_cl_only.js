const vers = 'B3.0'; // Suite version number
const defIP = "ws://127.0.0.1:3000/"; // Default IP address
const testIP = "wss://ef4e5a473455.ngrok.io/"; // Public test server IP.
const enableSpecialHandshake = true; // Experimental direct-linking mode support. 

// CloudLink icon
const cl_icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0NC45OTk3NSIgaGVpZ2h0PSI0NC45OTk3NiIgdmlld0JveD0iMCwwLDQ0Ljk5OTc1LDQ0Ljk5OTc2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3LjUwMDE0LC0xNTcuNTAwMTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjE3LjUwMDE0LDE4MC4wMDAwMWMwLC0xMi40MjYzNCAxMC4wNzM1MywtMjIuNDk5ODggMjIuNDk5ODgsLTIyLjQ5OTg4YzEyLjQyNjM0LDAgMjIuNDk5ODcsMTAuMDczNTMgMjIuNDk5ODcsMjIuNDk5ODhjMCwxMi40MjYzNCAtMTAuMDczNTMsMjIuNDk5ODggLTIyLjQ5OTg3LDIyLjQ5OTg4Yy0xMi40MjYzNCwwIC0yMi40OTk4OCwtMTAuMDczNTMgLTIyLjQ5OTg4LC0yMi40OTk4OHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O29yaWdQb3MmcXVvdDs6bnVsbH0iIGZpbGw9IiMwZTlhNmMiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtvcmlnUG9zJnF1b3Q7Om51bGx9IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIzMC4yNzUyMSwxODAuMDY3NjNjNS42NjYyMSwtNC43MTk1NCAxMy44OTQ1MywtNC43MTk1NCAxOS41NjA3NCwwIi8+PHBhdGggZD0iTTIyNS4zMDE2NywxNzUuMTM1NzdjOC40MDAxMSwtNy40MDQ0NiAyMC45OTY1NiwtNy40MDQ0NiAyOS4zOTY2OCwwIi8+PHBhdGggZD0iTTIzNS4xNzkyOSwxODUuMDEzMzljMi44OTA4MSwtMi4wNTM3OCA2Ljc2NDUzLC0yLjA1Mzc4IDkuNjU1MzQsMCIvPjxwYXRoIGQ9Ik0yNDAuMDEzOSwxOTAuNDE3NmgtMC4wMTM4OSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==';

// Booleans for signifying an update to the global or private data streams, as well as the disk and coin data.
var gotNewGlobalData = false; 
var gotNewPrivateData = false;

// Variables storing global and private stream data transmitted from the server.
var sGData = "";
var sPData = "";

// System variables needed for basic functionality
var sys_status = 0; // System status reporter, 0 = Ready, 1 = Connecting, 2 = Connected, 3 = Disconnected OK, 4 = Disconnected ERR
var userNames = ""; // Usernames list
var uList = "";
var myName = ""; // Username reporter
var servIP = defIP; // Default server IP
var isRunning = false; // Boolean for determining if the connection is alive and well
var wss = null; // Websocket object that enables communications

// Special Features that work when enableSpecialHandshake is set to true (If false, it enables backward-compatibility mode for older application servers)
var serverVersion = ''; // Diagnostics, gets the server's value for 'vers'.
var globalVars = {}; // Custom globally-readable variables.
var privateVars = {}; // Custom private variables.
var gotNewGlobalVarData = {}; // Booleans for checking if a new value has been written to a global var.
var gotNewPrivateVarData = {}; // Booleans for checking if a new value has been written to a private var.

// CloudLink class for the primary extension.
class cloudlink {
	constructor(runtime, extensionId) {
		this.runtime = runtime;
	}
	static get STATE_KEY() {
		return 'Scratch.websockets';
	}
	getInfo() {
		return {
			id: 'cloudlink',
			name: 'CloudLink',
			color1: '#0E9A6C',
			color2: '#0E9A6C',
			color3: '#0E9A6C',
			blockIconURI: cl_icon,
			menuIconURI: cl_icon,
			blocks: [
			{
				opcode: 'returnGlobalData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Global data',
			}, 	{
				opcode: 'returnPrivateData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Private data',
			}, 	{
				opcode: 'returnLinkData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Link Status',
			}, 	{
				opcode: 'returnUserListData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Usernames',
			}, 	{
				opcode: 'returnUsernameData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'My Username',
			}, 	{
				opcode: 'returnVersionData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Extension Version',
			}, 	{
				opcode: 'returnServerVersion',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Server Version',
			}, {
				opcode: 'returnTestIPData',
				blockType: Scratch.BlockType.REPORTER,
				text: 'Test IP',
			}, 	{
				opcode: 'returnVarData',
				blockType: Scratch.BlockType.REPORTER,
				text: '[TYPE] var [VAR] data',
				arguments: {
					VAR: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
					TYPE: {
						type: Scratch.ArgumentType.STRING,
						menu: 'varmenu',
						defaultValue: 'Global',
					},
				},
			},	{
				opcode: 'parseJSON',
				blockType: Scratch.BlockType.REPORTER,
				text: '[PATH] of [JSON_STRING]',
				arguments: {
					PATH: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'fruit/apples',
					},
					JSON_STRING: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
					},
				},
			}, 	{
				opcode: 'getComState',
				blockType: Scratch.BlockType.BOOLEAN,
				text: 'Connected?',
			}, 	{
				opcode: 'getUsernameState',
				blockType: Scratch.BlockType.BOOLEAN,
				text: 'Username synced?',
			}, 	{
				opcode: 'returnIsNewData',
				blockType: Scratch.BlockType.BOOLEAN,
				text: 'Got New [TYPE] Data?',
				arguments: {
					TYPE: {
						type: Scratch.ArgumentType.STRING,
						menu: 'datamenu',
						defaultValue: 'Global',
					},
				},
			}, 	{
				opcode: 'returnIsNewVarData',
				blockType: Scratch.BlockType.BOOLEAN,
				text: 'Got New [TYPE] Var [VAR] Data?',
				arguments: {
					VAR: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
					TYPE: {
						type: Scratch.ArgumentType.STRING,
						menu: 'varmenu',
						defaultValue: 'Global',
					},
				},
			}, {
				opcode: 'checkForID',
				blockType: Scratch.BlockType.BOOLEAN,
				text: 'ID [ID] Connected?',
				arguments: {
					ID: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Another name',
					},
				},
			}, {
				opcode: 'openSocket',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Connect to [IP]',
				arguments: {
					IP: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: defIP,
					},
				},
			}, 	{
				opcode: 'closeSocket',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Disconnect',
			}, 	{
				opcode: 'setMyName',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Set [NAME] as username',
				arguments: {
					NAME: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'A name',
					},
				},
			},	{
				opcode: 'sendGData',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Send [DATA]',
				arguments: {
					DATA: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
				},
			}, 	{
				opcode: 'sendPData',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Send [DATA] to [ID]',
				arguments: {
					DATA: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
					ID: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'A name',
					},
				},
			},  {
				opcode: 'sendGDataAsVar',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Send Var [VAR] with Data [DATA]',
				arguments: {
					DATA: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Banana',
					},
					VAR: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
				},
			},	{
				opcode: 'sendPDataAsVar',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Send Var [VAR] to [ID] with Data [DATA]',
				arguments: {
					DATA: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Banana',
					},
					ID: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'A name',
					},
					VAR: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
				},
			},	{
				opcode: 'refreshUserList',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Refresh User List',
			},	{
				opcode: 'resetNewData',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Reset Got New [TYPE] Data',
				arguments: {
					TYPE: {
						type: Scratch.ArgumentType.STRING,
						menu: 'datamenu',
						defaultValue: 'Global',
					},
				},
			},	{
				opcode: 'resetNewVarData',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Reset Got New [TYPE] Var [VAR] Data',
				arguments: {
					TYPE: {
						type: Scratch.ArgumentType.STRING,
						menu: 'varmenu',
						defaultValue: 'Global',
					},
					VAR: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Apple',
					},
				},
			},	{
				opcode: 'runCMD',
				blockType: Scratch.BlockType.COMMAND,
				text: 'Send CMD [CMD] to ID [ID] with data [DATA]',
				arguments: {
					CMD: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'PING',
					},
					ID: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: '%MS%',
					},
					DATA: {
						type: Scratch.ArgumentType.STRING,
						defaultValue: 'Banana',
					},
				},
			}, 
			],
			menus: {
				coms: {
					items: ["Connected", "Username Synced"]
				},
				datamenu: {
					items: ['Global', 'Private', 'Global (Linked)', 'Private (Linked)'],
				},
				varmenu: {
					items: ['Global', 'Private'],
				},
			}
		};
	}; 
	openSocket(args) {
		servIP = args.IP; // Begin the main updater scripts
		if (!isRunning) {
			sys_status = 1;
			console.log("[CloudLink] Establishing connection...");
			try {
				wss = new WebSocket(servIP);
				wss.onopen = function(e) {
					isRunning = true;
					sys_status = 2; // Connected OK value
					console.log("[CloudLink] Connected.");
				};
				wss.onmessage = function(event) {
					var rawpacket = String(event.data);
					console.log("Got packet:"+rawpacket);
					var obj = JSON.parse(rawpacket);
					console.log("CMD: "+String(obj["cmd"]))
					console.log("VAL: "+String(obj["val"]))
					if (obj["cmd"] == "gmsg") {
						sGData = String(obj["val"]);
						gotNewGlobalData = true;
					} else if (obj["cmd"] == "pmsg") {
						sPData = String(obj["val"]);
						gotNewPrivateData = true;
					} else if (obj["cmd"] == "direct") {
						var ddata = obj['data'];
						if (ddata['cmd'] == "vers") {
							serverVersion = ddata["data"];
							console.log("[CloudLink] Server version: " + String(serverVersion));
						};
					} else {
						console.log("[CloudLink] Error! Unknown packet data: " + String(rawpacket));
					};
				};
				wss.onclose = function(event) {
					isRunning = false;
					myName = "";
					gotNewGlobalData = false;
					gotNewPrivateData = false;
					userNames = "";
					sGData = "";
					sPData = "";
					sys_status = 3; // Disconnected OK value
					serverVersion = '';
					globalVars = {};
					privateVars = {};
					gotNewGlobalVarData = {};
					gotNewPrivateVarData = {};
					uList = "";
					wss = null;
					sys_status = 3;
					console.log("[CloudLink] Disconnected.");
					};
			} catch(err) {
				throw(err)
			};
		} else {
			return "Connection already established.";
		};
	}; // end the updater scripts
	closeSocket() {
		if (isRunning) {
			wss.close(1000);
			isRunning = false;
			myName = "";
			gotNewGlobalData = false;
			gotNewPrivateData = false;
			userNames = "";
			sGData = "";
			sPData = "";
			sys_status = 3; // Disconnected OK value
			serverVersion = '';
			globalVars = {};
			privateVars = {};
			gotNewGlobalVarData = {};
			gotNewPrivateVarData = {};
			uList = "";
			wss = null;
			return ("Connection closed.");
		} else {
			return ("Connection already closed.");
		};
	};
	getComState() {
		return isRunning;
	};
	checkForID(args) {
		if (isRunning) {
			return (userNames.indexOf(String(args.ID)) >= 0);
		} else {
			return false;
		};
	};
	getUsernameState() {
		if (isRunning) {
			if (myName != '') {
				return (userNames.indexOf(String(myName)) >= 0);
			} else {
				return false;
			}
		} else {
			return false;
		};
	};
	sendGData(args) {
		if (isRunning) {
			console.log("Transmitting packet: "+String('{"cmd":"gmsg", "val":'+ args.DATA +'}'));
			wss.send('{"cmd":"gmsg", "val":"'+ String(args.DATA) +'"}');
			return "Sent data successfully.";
		} else {
			return "Connection closed, no action taken.";
		}
	};
	sendPData(args) {
		if (isRunning) {
			if (myName != "") {
				if (args.ID != myName) {
					wss.send("<%ps>\n" + myName + "\n" + args.ID + "\n" + args.DATA);
					return "Sent data successfully.";
				} else {
					return "Can't send data to yourself!";
				};
			} else {
				return "Username not set, no action taken.";
			}
		} else {
			return "Connection closed, no action taken.";
		};
	}; 
	sendGDataAsVar(args) {
		if (isRunning) {
			
			return "Sent data successfully.";
		} else {
			return "Connection closed, no action taken.";
		}
	};
	sendPDataAsVar(args) {
		if (isRunning) {
			if (myName != "") {
				if (args.ID != myName) {
					
					return "Sent data successfully.";
				} else {
					return "Can't send data to yourself!";
				}
			} else {
				return "Username not set, no action taken.";
			}
		} else {
			return "Connection closed, no action taken.";
		};
	};
	runCMD(args) {
		if (isRunning) {
			if (myName != "") {
				if (args.ID != myName) {
					wss.send("<%ps>\n" + myName + "\n" + args.ID + '\n{"cmd":"' + args.CMD + '","id":"' + myName + '","data":"' + args.DATA + '"}');
					return "Sent data successfully.";
				} else {
					return "Can't send data to yourself!";
				};
			} else {
				return "Username not set, no action taken.";
			}
		} else {
			return "Connection closed, no action taken.";
		};
	};
	returnGlobalData() {
		return sGData;
	};
	returnPrivateData() {
		return sPData;
	};
	returnGlobalLinkedData() {
		return sGLinkedData;
	};
	returnPrivateLinkedData() {
		return sPLinkedData;
	};
	returnVarData(args) {
		if (args.TYPE == "Global") {
			if (args.VAR in globalVars) {
				return globalVars[args.VAR];
			} else {
				return "";
			}
		} else if (args.TYPE == "Private") {
			if (args.VAR in privateVars) {
				return privateVars[args.VAR];
			} else {
				return "";
			}
		}
	};
	returnIsNewVarData(args) {
		if (args.TYPE == "Global") {
			if (args.VAR in globalVars) {
				return gotNewGlobalVarData[args.VAR];
			} else {
				return false;
			}
		} else if (args.TYPE == "Private") {
			if (args.VAR in privateVars) {
				return gotNewPrivateVarData[args.VAR];
			} else {
				return false;
			}
		};
	};
	returnLinkData() {
		return sys_status;
	}; 
	returnUserListData() {
		return uList;
	}; 
	returnUsernameData() {
		return myName;
	}; 
	returnVersionData() {
		return vers;
	}; 
	returnTestIPData() {
		return testIP;
	};
	returnServerVersion() {
		return serverVersion;
	};
	returnIsNewData(args) {
		if (args.TYPE == "Global") {
			return gotNewGlobalData;
		};
		if (args.TYPE == "Private") {
			return gotNewPrivateData;
		};
		if (args.TYPE == "Global (Linked)") {
			return gotNewGlobalLinkedData;
		};
		if (args.TYPE == "Private (Linked)") {
			return gotNewPrivateLinkedData;
		};
	}
	setMyName(args) {
		if (myName == "") {
			if (isRunning) {
				if (args.NAME != "") {
					if (!(userNames.indexOf(args.NAME) >= 0)) {
						if (args.NAME.length > 20) {
							return "Your username must be 20 characters or less!"
						} else {
							if (args.NAME.length != 0) {
								if (args.NAME == "%CA%" || args.NAME == "%CC%" || args.NAME == "%CD%" || args.NAME == "%MS%"){
								return "That ID is reserved.";
								} else {
									wss.send('{"cmd":"setid", "val":"'+ args.NAME +'"}'); // begin packet data with setname command in the header
									myName = args.NAME;
									return "Set username on server successfully.";
								}
							} else {
								return "You can't have a blank username!";
							}
						}
					} else {
						return "You can't have the same name as someone else!";
					}
				} else {
					return "You cannot have a blank username!";
				}
			} else {
				return "Connection closed, no action taken.";
			}
		} else {
			return "Username already set!";
		};
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
			}
			path.forEach(prop => json = json[prop]);
			if (json === null) return 'null';
			else if (json === undefined) return '';
			else if (typeof json === 'object') return JSON.stringify(json);
			else return json.toString();
		} catch (err) {
			return '';
		}
	};
	refreshUserList() {
		if (isRunning == true) {
			wss.send("<%rf>\n"); // begin packet data with global stream idenifier in the header
			return "Sent request successfully.";
		} else {
			return "Connection closed, no action taken.";
		}
	};
	resetNewData(args) {
		if (args.TYPE == "Global") {
			if (gotNewGlobalData == true) {
				gotNewGlobalData = false;
			};
		};
		if (args.TYPE == "Private") {
			if (gotNewPrivateData == true) {
				gotNewPrivateData = false;
			};
		};
		if (args.TYPE == "Global (Linked)") {
			if (gotNewGlobalLinkedData == true) {
				gotNewGlobalLinkedData = false;
			};
		};
		if (args.TYPE == "Private (Linked)") {
			if (gotNewPrivateLinkedData == true) {
				gotNewPrivateLinkedData = false;
			};
		};
	};
	resetNewVarData(args) {
		if (args.TYPE == "Global") {
			if (args.VAR in globalVars) {
				gotNewGlobalVarData[args.VAR] = false;
			}
		} else if (args.TYPE == "Private") {
			if (args.VAR in privateVars) {
				gotNewPrivateVarData[args.VAR] = false;
			}
		}
	};
};


Scratch.extensions.register(new cloudlink());