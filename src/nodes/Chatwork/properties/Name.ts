import { INodeProperties } from 'n8n-workflow';
import { IDisplayOptions } from 'n8n-workflow/dist/Interfaces';
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

export const NameRequiredProperty: INodeProperties = {
  ...NameProperty,
  required: true,
  displayOptions: {
    show: {
      ...(NameProperty.displayOptions as IDisplayOptions).show,
      operation: [
        RoomOptionsValue.CREATE,
      ],
    },
  },
};
