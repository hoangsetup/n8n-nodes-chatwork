import { INodeProperties } from 'n8n-workflow';
import { Resource } from '../../shared/enums';

export const meProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    required: true,
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          Resource.ME,
        ],
      },
    },
    options: [
      {
        name: 'Get Account Information',
        value: 'get',
        description: 'Get your account information',
        routing: {
          request: {
            method: 'GET',
            url: '/me',
          },
        },
								action: 'Get your account information',
      },
    ],
    default: 'get',
  },
];
