import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const DescriptionProperty: INodeProperties = {
  displayName: 'Chat description',
  name: 'description',
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
  placeholder: 'group chat description',
  description: 'Description of the group chat',
};
