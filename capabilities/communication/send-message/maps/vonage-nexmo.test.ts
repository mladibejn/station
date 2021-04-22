import { SuperfaceClient } from '@superfaceai/sdk';

const recipient = process.env.COMMUNICATION_SENDMESSAGE_TO
let profile: any;
let provider: any;

describe('communication/send-message/vonage-nexmo', () => {
  beforeAll(async () => {
    const client = new SuperfaceClient;
    profile = await client.getProfile('communication/send-message');
    provider = await client.getProvider('vonage-nexmo');
  })

  it('sends a message', async () => {
    const useCase = profile.getUseCase('SendMessage');
    const result = await useCase.perform({ to: recipient, from: 'Vonage APIs', text: 'Hello World!', channel: 'sms' }, { provider });

    // if (result.isErr()) {
    //   console.log('ERR >', result.error);
    // }

    expect(result.isOk()).toBeTruthy();
    expect(typeof(result.unwrap() as any).messageId).toBe('string');

    // console.log('Result >', result.value)
  });
})
