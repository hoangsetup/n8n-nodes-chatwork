import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const NameProperty: INodeProperties = {
  displayName: 'Group chat name',
  name: 'name',
  type: 'string',
  default: '',
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.UPDATE_INFO,
      ],
    },
  },
  placeholder: 'Website renewal project',
  description: 'Title of the group chat',
};
