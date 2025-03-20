import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MessageProperty: INodeProperties = {
  displayName: 'Message body',
  name: 'message',
  type: 'string',
  default: '',
  required: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.SEND_MESSAGE,
        RoomOptionsValue.UPDATE_MESSAGE,
      ],
    },
  },
  placeholder: 'New message',
  description: 'Message body',
};
