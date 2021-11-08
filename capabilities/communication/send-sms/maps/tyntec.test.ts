import { SuperfaceTest } from '@superfaceai/testing-lib';

describe('communication/send-sms/tyntect', () => {
  let superface: SuperfaceTest;

  beforeEach(() => {
    superface = new SuperfaceTest({
      profile: 'communication/send-sms',
      provider: 'tyntec',
    });
  });

  describe('SendMessage', () => {
    it('should perform successfully', async () => {
      await expect(
        superface.run({
          useCase: 'SendMessage',
          input: {
            to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
            from: 'Tyntec APIs',
            text: 'Hello World!',
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });

  describe('RetrieveMessageStatus', () => {
    it('should return error saying it is not supported', async () => {
      const result = await superface.run({
        useCase: 'SendMessage',
        input: {
          to: '+4915207930698', // https://receive-smss.com/sms/4915207930698/
          from: '+13369019173', // Twilio trial number
          text: 'Hello World 2! ',
        },
      });

      const messageId = (result.unwrap() as any).messageId;

      await expect(
        superface.run({
          useCase: 'RetrieveMessageStatus',
          input: {
            messageId,
          },
        })
      ).resolves.toMatchSnapshot();
    });
  });
});
