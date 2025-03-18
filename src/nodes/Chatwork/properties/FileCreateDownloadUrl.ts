import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const FileCreateDownloadUrl: INodeProperties = {
  name: 'createDownloadUrl',
  displayName: 'Create download url',
  description: 'Whether or not to create a download link. If set to true, download like will be created for 30 seconds.',
  required: false,
  default: false,
  type: 'boolean',
  displayOptions: {
    show: {
      resource: [ResourceOptionsValue.ROOMS],
      operation: [RoomOptionsValue.GET_FILE_DETAIL],
    },
  },
};
