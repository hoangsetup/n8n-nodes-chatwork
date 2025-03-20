import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MessageIdProperty: INodeProperties = {
  displayName: 'Message ID',
  name: 'messageId',
  type: 'number',
  default: 0,
  required: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.GET_MESSAGE_DETAIL,
        RoomOptionsValue.UPDATE_MESSAGE,
        RoomOptionsValue.DELETE_MESSAGE,
      ],
    },
  },
  placeholder: 'Message id',
  description: 'Id of the special message',
};
