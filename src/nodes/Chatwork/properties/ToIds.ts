import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const ToIdsProperty: INodeProperties = {
  displayName: 'To',
  name: 'toIds',
  type: 'string',
  required: true,
  default: '',
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
  placeholder: 'To',
  description: 'Account ID of the person/people responsible to complete the task. If multiple, IDs must be separated by comma',
};
