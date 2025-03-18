import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const RoomIdProperty: INodeProperties = {
  displayName: 'Chatroom ID',
  name: 'roomId',
  type: 'number',
  required: true,
  default: 0,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.GET_DETAIL,
        RoomOptionsValue.SEND_MESSAGE,
        RoomOptionsValue.GET_MEMBERS,
        RoomOptionsValue.GET_MESSAGES,
        RoomOptionsValue.UPDATE_INFO,
        RoomOptionsValue.GET_MESSAGE_DETAIL,
        RoomOptionsValue.DELETE_MESSAGE,
        RoomOptionsValue.GET_TASKS,
        RoomOptionsValue.GET_TASK_DETAIL,
        RoomOptionsValue.CREATE_TASK,
        RoomOptionsValue.GET_FILES,
      ],
    },
  },
  placeholder: '92107487',
  description: 'Chatroom ID',
};
