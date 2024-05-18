import { ICredentialDataDecryptedObject, IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';
import { BASE_URL, CREDENTIAL } from './Constants';
import { chatworkApiRequest } from './GenericFunctions';
import mocked = jest.mocked;

describe('GenericFunction', () => {
  describe('chatworkApiRequest', () => {
    const apiKey = 'chatwork-api-key';
    const credentials: ICredentialDataDecryptedObject = {
      [CREDENTIAL.PROPERTY_NAME]: apiKey,
    };

    let context: IExecuteFunctions;

    beforeEach(() => {
      context = {
        getCredentials: jest.fn() as unknown,
        helpers: {
          request: jest.fn(),
        } as unknown,
      } as IExecuteFunctions;

      mocked(context.getCredentials).mockResolvedValue(credentials);
    });

    it.each([
      {
        method: 'GET' as IHttpRequestMethods,
        endpoint: '/rooms',
        body: undefined,
        expectation: {
          method: 'GET',
          uri: `${BASE_URL}/rooms`,
        },
      },
      {
        method: 'POST' as IHttpRequestMethods,
        endpoint: '/rooms',
        body: { name: 'test' },
        expectation: {
          method: 'POST',
          uri: `${BASE_URL}/rooms`,
          form: { name: 'test' },
        },
      },
    ])('should call request with expectation options %o', async ({ method, endpoint, body, expectation }) => {
      await chatworkApiRequest.call(context, method, endpoint, body);

      expect(context.getCredentials).toHaveBeenCalledWith(CREDENTIAL.TYPE);
      expect(context.helpers.request).toHaveBeenCalledWith({
        ...expectation,
        headers: {
          'User-Agent': 'n8n',
          'X-ChatWorkToken': apiKey,
        },
        json: true,
      });
    });

    it('should throw error when chatwork credential is valid', async () => {
      mocked(context.helpers.request).mockRejectedValue({ statusCode: 401 });

      const promise = chatworkApiRequest.call(context, 'GET', '');

      await expect(promise).rejects.toThrow(new Error('The Chatwork credentials are not valid!'));
    });

    it('should throw error when chatwork api return error', async () => {
      mocked(context.getCredentials).mockResolvedValue({});
      mocked(context.helpers.request).mockRejectedValue({
        statusCode: 400,
        response: {
          body: {
            message: 'error',
          },
        },
      });

      const promise = chatworkApiRequest.call(context, 'GET', '');

      await expect(promise).rejects.toThrow(new Error('Chatwork error response [400]: error'));
    });

    it('should throw error when get internal error', async () => {
      const error = new Error('Network error!');
      mocked(context.helpers.request).mockRejectedValue(error);

      const promise = chatworkApiRequest.call(context, 'GET', '');

      await expect(promise).rejects.toThrow(error);
    });
  })
});
