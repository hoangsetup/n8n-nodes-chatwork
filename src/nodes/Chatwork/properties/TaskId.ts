import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const TaskIdProperty: INodeProperties = {
  displayName: 'Task ID',
  name: 'taskId',
  type: 'number',
  default: 0,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.GET_TASK_DETAIL,
      ],
    },
  },
  placeholder: 'Task id',
  description: 'Id of the special task',
};
