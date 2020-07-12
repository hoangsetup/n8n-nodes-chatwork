import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { chatworkApiRequest } from '../../shared/GenericFunctions';


export class Chatwork implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chatwork',
    name: 'chatwork',
    icon: 'file:../../assets/chatwork.png',
    group: ['transform'],
    version: 1,
    description: 'Retrieve data from Chatwork API.',
    defaults: {
      name: 'Chatwork',
      color: '#EF3646',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'chatworkApi',
        required: true,
      },
    ],
    properties: [
      // Node properties which the user gets displayed and
      // can change on the node.
      // --------------------
      // Root resources
      // --------------------
      {
        displayName: 'Resource',
        description: 'The main resource to operate on.',
        name: 'resource',
        type: 'options',
        required: true,
        options: [
          {
            name: 'Me',
            value: 'me',
            description: 'Used to access your account information.',
          },
          {
            name: 'My',
            value: 'my',
            description: 'Used to access your data on the account.',
          },
          {
            name: 'Room',
            value: 'room',
            description: `Used to access information such as messages, members, files, and tasks associated to a specific conversation. The
            conversation can be Group chat, Direct chat, or My chat`,
          },
        ],
        default: 'me',
      },
      // {
      //   displayName: 'Room Id',
      //   name: 'roomId',
      //   type: 'number',
      //   default: '',
      //   displayOptions: {
      //     show: {
      //       resource: ['room'],
      //     },
      //   },
      //   placeholder: '92107487',
      //   description: 'Chatroom ID, where the message was sent.',
      // },
      // --------------------
      // resources
      // --------------------
      // {
      //   displayName: 'Resource',
      //   name: 'resource',
      //   type: 'options',
      //   options: [
      //     {
      //       name: 'Info',
      //       value: 'info',
      //     },
      //   ],
      //   displayOptions: {
      //     show: {
      //       resource: ['room', 'me'],
      //     },
      //   },
      //   default: 'info',
      //   description: 'The resource to operate on.',
      // },
      // {
      //   displayName: 'Resource',
      //   name: 'resource',
      //   type: 'options',
      //   options: [
      //     {
      //       name: 'Member',
      //       value: 'member',
      //     },
      //   ],
      //   displayOptions: {
      //     show: {
      //       resource: ['room'],
      //     },
      //   },
      //   default: 'member',
      //   description: 'The resource to operate on.',
      // },
      // --------------------
      // Me operations
      // --------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        displayOptions: {
          show: {
            resource: [
              'me',
            ],
          },
        },
        options: [
          {
            name: 'Get account information',
            value: 'get',
            description: 'Get your account information',
          },
        ],
        default: 'get',
      },

      // --------------------
      // My operations
      // --------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        displayOptions: {
          show: {
            resource: [
              'my',
            ],
          },
        },
        options: [
          {
            name: 'Get status',
            value: 'status',
            description: 'Get the number of: unread messages, unread To messages, and unfinished tasks',
          },
          {
            name: 'Get tasks',
            value: 'tasks',
            description: 'Get the list of all unfinished tasks',
          },
        ],
        default: 'status',
      },

      // --------------------
      // Room operations
      // --------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        displayOptions: {
          show: {
            resource: [
              'room',
            ],
          },
        },
        options: [
          {
            name: 'Get rooms',
            value: 'get',
            description: 'Get the list of all chats on your account',
          },
          {
            name: 'Get room detail',
            value: 'getDetail',
            description: 'Get chat name, icon, and Type (my, direct, or group)',
          },
          {
            name: 'Send message',
            value: 'sendMessage',
            description: 'Add new message to the chat',
          },
        ],
        default: 'get',
      },
      {
        displayName: 'Chatroom ID',
        name: 'roomId',
        type: 'number',
        default: 0,
        displayOptions: {
          show: {
            resource: ['room'],
            operation: [
              'getDetail',
              'sendMessage',
            ],
          },
        },
        placeholder: '92107487',
        description: 'Chatroom ID',
      },
      {
        displayName: 'Message body',
        name: 'message',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['room'],
            operation: [
              'sendMessage',
            ],
          },
        },
        placeholder: 'New message',
        description: 'Message body',
      },
    ],
  };


  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    const returnItems: INodeExecutionData[] = [];

    // tslint:disable-next-line: prefer-for-of
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

      let endpoint = '';
      let method = 'GET';
      let body = null;

      const resource = this.getNodeParameter('resource', 0) as string;
      const operation = this.getNodeParameter('operation', 0) as string;

      endpoint = '';

      if (resource === 'my') {
        endpoint += `/my/${operation}`;
      }

      if (resource === 'room') {
        endpoint += `/rooms`;

        const roomId = this.getNodeParameter('roomId', 0) as string;
        if (typeof roomId === 'number' && roomId !== 0) {
          endpoint += `/${roomId}`;

          switch (operation) {
            case 'sendMessage':
              method = 'POST';
              endpoint += '/messages';
              const message = this.getNodeParameter('message', 0) as string;
              body = { body: message };
              break;
            default:
              break
          }
        }
      }

      const response = await chatworkApiRequest.call(this, method, endpoint, body);
      returnItems.push({json: response});
    }
    return [returnItems];
  }
}
