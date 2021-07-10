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
  ResourceOptionsValue,
  ResourceProperty,
  RoomIdProperty,
  RoomOptionsValue,
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

      if (resource === ResourceOptionsValue.ROOMS) {
        if (operation !== RoomOptionsValue.GET) {
          const defaultRoomId = this.getNodeParameter(RoomIdProperty.name, 0) as string
          const roomId = this.getNodeParameter(RoomIdProperty.name, itemIndex) as string || defaultRoomId;
          if (typeof roomId === 'number' && roomId !== 0) {
            endpoint += `/${roomId}`;

            switch (operation) {
              case RoomOptionsValue.SEND_MESSAGE:
                method = 'POST';
                endpoint += '/messages';
                const message = this.getNodeParameter(MessageProperty.name, itemIndex) as string;
                body = { body: message };
                break;
              case RoomOptionsValue.GET_MEMBERS:
                endpoint += '/members';
                break;
              case RoomOptionsValue.GET_MESSAGES:
                endpoint += '/messages?force=1';
                break;
              case RoomOptionsValue.GET_DETAIL:
                break;
              case RoomOptionsValue.UPDATE_INFO:
                method = 'PUT';
                const description = this.getNodeParameter(DescriptionProperty.name, itemIndex) as string;
                const name = this.getNodeParameter(NameProperty.name, itemIndex) as string;
                const iconPreset = this.getNodeParameter(IconPresetProperty.name, itemIndex) as string;
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
              case RoomOptionsValue.GET_MESSAGE_DETAIL:
                messageId = this.getNodeParameter(MessageIdProperty.name, itemIndex) as string;
                endpoint += `/messages/${messageId}`;
                break;
              case RoomOptionsValue.DELETE_MESSAGE:
                messageId = this.getNodeParameter(MessageIdProperty.name, itemIndex) as string;
                method = 'DELETE';
                endpoint += `/messages/${messageId}`;
                break;
              case RoomOptionsValue.GET_ROOM_TASKS:
                endpoint += '/tasks';
                break;
              case RoomOptionsValue.GET_ROOM_TASK_DETAIL:
                const taskId = this.getNodeParameter(TaskIdProperty.name, itemIndex);
                endpoint += `/tasks/${taskId}`;
                break;
              case RoomOptionsValue.CREATE_ROOM_TASK:
                const taskDes = this.getNodeParameter(BodyProperty.name, itemIndex);
                const limit = Math.round(
                  (new Date(this.getNodeParameter(LimitProperty.name, itemIndex) as string)).valueOf() / 1000,
                );
                const toIds = this.getNodeParameter(ToIdsProperty.name, itemIndex);
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
