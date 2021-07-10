import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { chatworkApiRequest } from '../../shared/GenericFunctions';
import {
  BodyProperty,
  ContactProperty,
  DescriptionProperty,
  IconPresetProperty,
  LimitProperty,
  MeProperty,
  MessageIdProperty,
  MessageProperty,
  MyProperty,
  NameProperty,
  ResourceProperty,
  RoomIdProperty,
  RoomProperty,
  TaskIdProperty,
  ToIdsProperty,
} from './properties';

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
      // Node properties which the user gets displayed and can change on the node
      ResourceProperty,
      MeProperty,
      MyProperty,
      ContactProperty,
      RoomProperty,
      RoomIdProperty,
      MessageProperty,
      DescriptionProperty,
      NameProperty,
      IconPresetProperty,
      MessageIdProperty,
      TaskIdProperty,
      BodyProperty,
      LimitProperty,
      ToIdsProperty,
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
              case 'getRoomTaskDetail':
                const taskId = this.getNodeParameter('taskId', itemIndex);
                endpoint += `/tasks/${taskId}`;
                break;
              case 'createRoomTask':
                const taskDes = this.getNodeParameter('body', itemIndex);
                const limit = Math.round((new Date(this.getNodeParameter('limit', itemIndex) as string)).valueOf() / 1000);
                const toIds = this.getNodeParameter('toIds', itemIndex);
                body = {
                  body: taskDes,
                  limit,
                  to_ids: toIds,
                }
                method = 'POST';
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
