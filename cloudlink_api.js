
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class mdCloudLink{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('mdCloudLink', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'mdCloudLink',
      name: 'CloudLink API',
      color1: '#00daee',
      color2: '#00daee',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'ping',
          blockType: BlockType.BOOLEAN,
          arguments: {
            IP: {
              type: ArgumentType.STRING
            },
            TIME: {
              type: ArgumentType.STRING
            }
          },
          text: 'Ping IP [IP] and wait up to [TIME] seconds'
        },
        {
          opcode: 'gotPing',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          text: 'When I receive a ping from anyone'
        },
        {
          opcode: 'getPingSpecific',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          arguments: {
            IP: {
              type: ArgumentType.STRING
            }
          },
          text: 'When I receive a ping from IP [IP]'
        }
      ]
    }
  }

ping (args, util){
  const IP = args.IP;
  const TIME = args.TIME;

  return this.write(`M0 \n`);
}

gotPing (args, util){

  return this.write(`M0 \n`);
}

getPingSpecific (args, util){
  const IP = args.IP;

  return this.write(`M0 \n`);
}

}

module.exports = mdCloudLink;
