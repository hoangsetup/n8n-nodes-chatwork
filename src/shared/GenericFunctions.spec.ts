import { IExecuteFunctions } from 'n8n-workflow'
import Mock = jest.Mock;
import { chatworkApiRequest } from './GenericFunctions';

jest.mock('./Constants', () => ({
  BASE_URL: '/base-url',
  CREDENTIAL: {
    TYPE: 'credential-type',
    PROPERTY_NAME: 'credential-property-name',
  },
}));

describe('GenericFunction', () => {
  describe('chatworkApiRequest', () => {
    let context: Partial<IExecuteFunctions>;
    const apiKey = 'chatwork-api-key';

    let requestMock: Mock;
    let getCredentialsMock: Mock;
    beforeEach(() => {
      requestMock = jest.fn();
      getCredentialsMock = jest.fn();

      context = {
        getCredentials: getCredentialsMock,
        helpers: {
          request: requestMock,
        },
      };
    });
    test.each([
      {
        method: 'GET',
        endpoint: '/rooms',
        body: undefined,
        expectation: {
          method: 'GET',
          uri: `/base-url/rooms`,
        },
      },
      {
        method: 'POST',
        endpoint: '/rooms',
        body: { name: 'test' },
        expectation: {
          method: 'POST',
          uri: `/base-url/rooms`,
          form: { name: 'test' },
        },
      },
    ])('should call request with expectation options %o', async ({ method, endpoint, body, expectation }) => {
      getCredentialsMock.mockReturnValue({ 'credential-property-name': apiKey });

      const expectationOptions = {
        ...expectation,
        headers: {
          'User-Agent': 'n8n',
          'X-ChatWorkToken': apiKey,
        },
        json: true,
      };

      await chatworkApiRequest.call(context as any, method, endpoint, body);

      expect(getCredentialsMock).toBeCalledWith('credential-type');
      expect(requestMock).toBeCalledWith(expectationOptions);
    });

    test('should throw error when chatwork credential is not set', async () => {
      getCredentialsMock.mockReturnValue(undefined);
      await expect(chatworkApiRequest.bind(context as any, '', ''))
        .rejects
        .toThrow(new Error('No credentials got returned!'));
    });

    test('should throw error when chatwork credential is valid', async () => {
      getCredentialsMock.mockReturnValue({});
      requestMock.mockRejectedValue({ statusCode: 401 });
      await expect(chatworkApiRequest.bind(context as any, '', ''))
        .rejects
        .toThrow(new Error('The Chatwork credentials are not valid!'));
    });

    test('should throw error when chatwork api return error', async () => {
      getCredentialsMock.mockReturnValue({});
      requestMock.mockRejectedValue({
        statusCode: 400,
        response: {
          body: {
            message: 'error',
          },
        },
      });
      await expect(chatworkApiRequest.bind(context as any, '', ''))
        .rejects
        .toThrow(new Error('Chatwork error response [400]: error'));
    });

    test('should throw error when get internal error', async () => {
      getCredentialsMock.mockReturnValue({});
      requestMock.mockRejectedValue(new Error('Network error!'));
      await expect(chatworkApiRequest.bind(context as any, '', ''))
        .rejects
        .toThrow(new Error('Network error!'));
    });
  })
})
