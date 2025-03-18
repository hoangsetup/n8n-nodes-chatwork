import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const AccountIdProperty: INodeProperties = {
  name: 'accountId',
  displayName: 'Account Id',
  description: 'Account ID of the person who uploaded the file.',
  required: false,
  default: '',
  type: 'number',
  placeholder: '101',
  displayOptions: {
    show: {
      resource: [ResourceOptionsValue.ROOMS],
      operation: [RoomOptionsValue.GET_FILES],
    },
  },
};
