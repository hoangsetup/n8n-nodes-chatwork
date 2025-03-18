import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const BodyProperty: INodeProperties = {
  displayName: 'Task description',
  name: 'body',
  type: 'string',
  default: '',
  required: true,
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
  placeholder: 'Task description',
  description: 'Task description',
};
