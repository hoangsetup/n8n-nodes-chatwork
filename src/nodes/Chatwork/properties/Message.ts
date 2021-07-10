import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MessageProperty: INodeProperties = {
  displayName: 'Message body',
  name: 'message',
  type: 'string',
  default: '',
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.SEND_MESSAGE,
      ],
    },
  },
  placeholder: 'New message',
  description: 'Message body',
};
