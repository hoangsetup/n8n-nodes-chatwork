import { INodeProperties } from 'n8n-workflow';
import { Resource } from '../../shared/enums';

export const myProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    required: true,
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          Resource.MY,
        ],
      },
    },
    options: [
      {
        name: 'Get Status',
        value: 'status',
        description: 'Get unread messages, unread To messages, and unfinished tasks count',
        routing: {
          request: {
            method: 'GET',
            url: '/my/status',
          },
        },
								action: 'Get unread messages unread to messages and unfinished tasks count',
      },
      {
        name: 'Get Tasks',
        value: 'tasks',
        description: 'Get the list of all unfinished tasks',
        routing: {
          request: {
            method: 'GET',
            url: '/my/tasks',
          },
        },
								action: 'Get the list of all unfinished tasks',
      },
    ],
    default: 'status',
  },
];
