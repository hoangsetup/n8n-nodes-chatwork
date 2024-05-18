import { IDataObject, IExecuteFunctions, IHookFunctions, IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';
import { BASE_URL, CREDENTIAL } from './Constants';

export async function chatworkApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object | null = null,
): Promise<IDataObject> {
  const options: IRequestOptions = {
    method,
    headers: {
      'User-Agent': 'n8n',
    },
    uri: '',
    json: true,
  };

  try {
    const credentials = await this.getCredentials(CREDENTIAL.TYPE);

    options.uri = `${BASE_URL}${endpoint}`;
    options.headers!['X-ChatWorkToken'] = credentials[CREDENTIAL.PROPERTY_NAME];

    if (body) {
      options.form = body;
    }
    return await this.helpers.request(options);
  } catch (error: any) {
    if (error.statusCode === 401) {
      // Return a clear error
      throw new Error('The Chatwork credentials are not valid!');
    }

    if (error.response && error.response.body && error.response.body.message) {
      // Try to return the error prettier
      throw new Error(`Chatwork error response [${error.statusCode}]: ${error.response.body.message}`);
    }

    // If that data does not exist for some reason return the actual error
    throw error;
  }

}
