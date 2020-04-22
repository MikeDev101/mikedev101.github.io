const icon = null;
class mdCloudLink {
  constructor() {}
  getInfo() {
    return {
      id: 'mdCloudLink',
      name: 'CloudLink API',
      color1: '#00daee',
      color2: '#00daee',
      color3: '#00daee',
      menuIconURI: icon,
      blocks: [
        {
          opcode: 'hi',
          blockType: Scratch.BlockType.REPORTER,
          arguments: [
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultvalue: 'OwO'
            }
          ],
          text: 'Hi! [A]'
        },
        {
          opcode: 'testhat',
          blockType: Scratch.BlockType.HAT,
          text: 'Test!'
        }
      ]
    }
  }
  hi({text}) {
    return text;
  }
  testhat(){
    return this.write(`M0 \n`);
  }
}

Scratch.extensions.register(new mdCloudLink());
