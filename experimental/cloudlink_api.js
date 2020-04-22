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
          text: 'Hi'
        },
        {
          opcode: 'testhat',
          blockType: Scratch.BlockType.HAT,
          arguments: [
            A: {
              type: ArgumentType.STRING
            }
          ],
          text: 'Test! [A]'
        }
      ]
    }
  }
  hi() {
    return 'Hello!';
  }
}

Scratch.extensions.register(new mdCloudLink());
