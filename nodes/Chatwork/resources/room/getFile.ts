import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetFileProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      displayName: 'File ID',
      name: 'fileId',
      type: 'number',
      required: true,
      default: null,
      description: 'ID of the file',
    },
    {
      displayName: 'Create Download URL',
      name: 'createDownloadUrl',
      type: 'boolean',
      default: false,
      description: 'Whether to create a temporary download URL',
      routing: {
        send: {
          type: 'query',
          property: 'create_download_url',
          value: '={{ $parameter.createDownloadUrl ? 1 : undefined }}',
        },
      },
    }
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_FILE],
    },
  },
);
