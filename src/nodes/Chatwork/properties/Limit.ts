import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const LimitProperty: INodeProperties = {
  displayName: 'Deadline',
  name: 'limit',
  type: 'dateTime',
  required: false,
  default: new Date().toISOString(),
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.CREATE_TASK,
      ],
    },
  },
  placeholder: 'Deadline',
  description: 'When the task is due (Use Unix time as input)',
};
