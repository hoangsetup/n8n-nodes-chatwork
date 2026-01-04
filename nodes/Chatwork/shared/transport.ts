import { IHttpRequestMethods, ILoadOptionsFunctions } from 'n8n-workflow';

export function chatworkApiRequest(
  this: ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  path: `/${string}`,
) {
  return this.helpers.httpRequestWithAuthentication.call(
    this,
    'chatworkApi',
    {
      method,
      url: `https://api.chatwork.com/v2${path}`,
    },
  );
}
