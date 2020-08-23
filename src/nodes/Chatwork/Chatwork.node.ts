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
        noDataExpression: true,
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
            name: 'Contacts',
            value: 'contacts',
            description: 'Used to access the list of your contacts',
          },
          {
            name: 'Rooms',
            value: 'rooms',
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
        noDataExpression: true,
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
        noDataExpression: true,
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
      // Contact operations
      // --------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'contacts',
            ],
          },
        },
        options: [
          {
            name: 'Get',
            value: 'get',
            description: 'Get the list of your contacts',
          },
        ],
        default: 'get',
      },

      // --------------------
      // Room operations
      // --------------------
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'rooms',
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
            name: 'Get detail',
            value: 'getDetail',
            description: 'Get chat name, icon, and Type (my, direct, or group)',
          },
          {
            name: 'Update info',
            value: 'updateInfo',
            description: 'Change the title and icon type of the specified chat',
          },
          {
            name: 'Get members',
            value: 'getMembers',
            description: 'Get the list of all chat members associated with the specified chat ',
          },
          {
            name: 'Get messages',
            value: 'getMessages',
            description: 'Get all messages associated with the specified chat (returns up to 100 entries). ',
          },
          {
            name: 'Send message',
            value: 'sendMessage',
            description: 'Add new message to the chat',
          },
          {
            name: 'Get message detail',
            value: 'getMessageDetail',
            description: 'Get information about the specified message',
          },
          {
            name: 'Delete message',
            value: 'deleteMessage',
            description: 'Delete the specified message',
          },
          {
            name: 'Get tasks',
            value: 'getRoomTasks',
            description: 'Get the list of tasks associated with the specified chat',
          },
        ],
        default: 'get',
      },
      {
        displayName: 'Chatroom ID',
        name: 'roomId',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: {
          show: {
            resource: ['rooms'],
            operation: [
              'getDetail',
              'sendMessage',
              'getMembers',
              'getMessages',
              'updateInfo',
              'getMessageDetail',
              'deleteMessage',
              'getRoomTasks',
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
            resource: ['rooms'],
            operation: [
              'sendMessage',
            ],
          },
        },
        placeholder: 'New message',
        description: 'Message body',
      },
      {
        displayName: 'Chat description',
        name: 'description',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['rooms'],
            operation: [
              'updateInfo',
            ],
          },
        },
        placeholder: 'group chat description',
        description: 'Description of the group chat',
      },
      {
        displayName: 'Group chat name',
        name: 'name',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['rooms'],
            operation: [
              'updateInfo',
            ],
          },
        },
        placeholder: 'Website renewal project',
        description: 'Title of the group chat',
      },
      {
        displayName: 'Icon type',
        name: 'iconPreset',
        type: 'options',
        default: 'group',
        displayOptions: {
          show: {
            resource: ['rooms'],
            operation: [
              'updateInfo',
            ],
          },
        },
        options: [
          { 'name': 'Group', 'value': 'group' },
          { 'name': 'Check', 'value': 'check' },
          { 'name': 'Document', 'value': 'document' },
          { 'name': 'Meeting', 'value': 'meeting' },
          { 'name': 'Event', 'value': 'event' },
          { 'name': 'Project', 'value': 'project' },
          { 'name': 'Business', 'value': 'business' },
          { 'name': 'Study', 'value': 'study' },
          { 'name': 'Security', 'value': 'security' },
          { 'name': 'Star', 'value': 'star' },
          { 'name': 'Idea', 'value': 'idea' },
          { 'name': 'Heart', 'value': 'heart' },
          { 'name': 'Magcup', 'value': 'magcup' },
          { 'name': 'Beer', 'value': 'beer' },
          { 'name': 'Music', 'value': 'music' },
          { 'name': 'Sports', 'value': 'sports' },
          { 'name': 'Travel', 'value': 'travel' },
        ],
        placeholder: '',
        description: 'Type of the group chat icon',
      },
      {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'number',
        default: 0,
        displayOptions: {
          show: {
            resource: ['rooms'],
            operation: [
              'getMessageDetail',
              'deleteMessage',
            ],
          },
        },
        placeholder: 'Message id',
        description: 'Id of the special message',
      },
    ],
  };


  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    const returnItems: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    // tslint:disable-next-line: prefer-for-of
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      let endpoint = `/${resource}`;
      let method = 'GET';
      let body = null;

      let messageId: string;

      if (resource === 'my') {
        endpoint += `/${operation}`;
      }

      if (resource === 'rooms') {
        if (operation !== 'get') {
          const defaultRoomId = this.getNodeParameter('roomId', 0) as string
          const roomId = this.getNodeParameter('roomId', itemIndex) as string || defaultRoomId;
          if (typeof roomId === 'number' && roomId !== 0) {
            endpoint += `/${roomId}`;

            switch (operation) {
              case 'sendMessage':
                method = 'POST';
                endpoint += '/messages';
                const message = this.getNodeParameter('message', itemIndex) as string;
                body = { body: message };
                break;
              case 'getMembers':
                endpoint += '/members';
                break;
              case 'getMessages':
                endpoint += '/messages?force=1';
                break;
              case 'getDetail':
                break;
              case 'updateInfo':
                method = 'PUT';
                const description = this.getNodeParameter('description', itemIndex) as string;
                const name = this.getNodeParameter('name', itemIndex) as string;
                const iconPreset = this.getNodeParameter('iconPreset', itemIndex) as string;
                body = {
                  icon_preset: iconPreset,
                } as unknown as { name?: string, description?: string, icon_preset: string };
                if (description) {
                  body.description = description;
                }
                if (name) {
                  body.name = name;
                }
                break;
              case 'getMessageDetail':
                messageId = this.getNodeParameter('messageId', itemIndex) as string;
                endpoint += `/messages/${messageId}`;
                break;
              case 'deleteMessage':
                messageId = this.getNodeParameter('messageId', itemIndex) as string;
                method = 'DELETE';
                endpoint += `/messages/${messageId}`;
                break;
              case 'getRoomTasks':
                endpoint += '/tasks';
                break;
              default:
                throw new Error(`${operation} is not supported.`)
            }
          }
        }
      }

      const response = await chatworkApiRequest.call(this, method, endpoint, body);
      if (Array.isArray(response)) {
        // flatten response
        returnItems.push(...response);
      } else {
        returnItems.push({ json: response });
      }
    }

    if (returnItems.some((i) => i.json !== undefined)) {
      return [returnItems];
    } else {
      return [this.helpers.returnJsonArray(returnItems)];
    }
  }
}
