import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const ActionTypeProperty: INodeProperties = {
  displayName: 'Action type',
  name: 'actionType',
  type: 'options',
  default: 'leave',
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.LEAVE_OR_DELETE,
      ],
    },
  },
  options: [
    {
      name: 'Leave',
      value: 'leave',
    },
    {
      name: 'Delete',
      value: 'delete',
    },
  ],
  description: 'Type of action',
};
