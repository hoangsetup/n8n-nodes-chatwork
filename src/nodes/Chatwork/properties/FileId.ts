import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const FileIdProperty: INodeProperties = {
  name: 'fileId',
  displayName: 'File Id',
  required: false,
  default: '',
  type: 'number',
  placeholder: '101',
  displayOptions: {
    show: {
      resource: [ResourceOptionsValue.ROOMS],
      operation: [RoomOptionsValue.GET_FILE_DETAIL],
    },
  },
};
