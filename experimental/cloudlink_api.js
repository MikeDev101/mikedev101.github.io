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
          opcode: 'testReporter',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello, World!'
            }
          },
          text: 'Test Reporter [A]'
        },
        {
          opcode: 'testHat',
          blockType: Scratch.BlockType.HAT,
          text: 'Test hat'
        },
        {
          opcode: 'testCommand',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Test Command [A]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'This is a test.'
            }
          }
        }
      ]
    }
  }
  testReporter({A}) {
    return A;
  }
  testHat(){
    return this.write(`M0 \n`);
  }
  testCommand({A}) {
    return this.write(`M0 \n`);
  }
}

Scratch.extensions.register(new mdCloudLink());
