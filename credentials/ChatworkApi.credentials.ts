import { IAuthenticateGeneric, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ChatworkApi implements ICredentialType {
  name = 'chatworkApi';
  displayName = 'Chatwork API';
  icon: Icon = 'file:../icons/Chatwork.svg';
  documentationUrl =
    'https://help.chatwork.com/hc/ja/articles/115000172402-API%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B';
  properties: INodeProperties[] = [
    {
      displayName: 'Api Token',
      name: 'apiToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        ['X-ChatWorkToken']: '={{$credentials?.apiToken}}',
      },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.chatwork.com/v2',
      url: '/me',
      method: 'GET',
    },
  };
}
