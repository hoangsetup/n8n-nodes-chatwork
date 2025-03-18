import { ICredentialDataDecryptedObject, IExecuteFunctions, IHttpRequestMethods } from 'n8n-workflow';
import { BASE_URL, CREDENTIAL } from './Constants';
import { chatworkApiRequest } from './GenericFunctions';

describe('GenericFunction', () => {
  describe('chatworkApiRequest', () => {
    const apiKey = 'chatwork-api-key';
    const credentials: ICredentialDataDecryptedObject = {
      [CREDENTIAL.PROPERTY_NAME]: apiKey,
    };

    let context: jest.MockedObjectDeep<IExecuteFunctions>;

    beforeEach(() => {
      context = {
        getCredentials: jest.fn(),
        helpers: {
          request: jest.fn(),
        },
      } as jest.MockedObjectDeep<IExecuteFunctions>;

      context.getCredentials.mockResolvedValue(credentials);
    });

    it.each<{
      method: IHttpRequestMethods
      endpoint: string;
      body: Parameters<typeof chatworkApiRequest>[2],
      expectation: {
        method: IHttpRequestMethods;
        uri: string;
        form?: unknown;
      };
    }>([
      {
        method: 'GET',
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
        body: { body: 'Hello World!' },
        expectation: {
          method: 'POST',
          uri: `${BASE_URL}/rooms`,
          form: { body: 'Hello World!' },
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
      context.helpers.request.mockRejectedValue({ statusCode: 401 });

      const promise = chatworkApiRequest.call(context, 'GET', '');

      await expect(promise).rejects.toThrow(new Error('The Chatwork credentials are not valid!'));
    });

    it('should throw error when chatwork api return error', async () => {
      context.getCredentials.mockResolvedValue({});
      context.helpers.request.mockRejectedValue({
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
      context.helpers.request.mockRejectedValue(error);

      const promise = chatworkApiRequest.call(context, 'GET', '');

      await expect(promise).rejects.toThrow(error);
    });
  });
});
