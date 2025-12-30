import { INodeProperties } from 'n8n-workflow';
import { Resource } from '../../shared/enums';

export const contactProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    required: true,
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          Resource.CONTACT,
        ],
      },
    },
    options: [
      {
        name: 'Get Contacts',
        value: 'get',
        description: 'Get the contact list',
        routing: {
          request: {
            method: 'GET',
            url: '/contacts',
          },
        },
								action: 'Get the contact list',
      },
    ],
    default: 'get',
  },
];
