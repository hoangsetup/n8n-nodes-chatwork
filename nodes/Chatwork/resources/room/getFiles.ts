import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';
import { accountIdProperty, roomIdProperty  } from '../../shared/properties';

export const roomGetFilesProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      ...accountIdProperty,
      description: 'Filter files by uploader account ID',
    }
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_FILES],
    },
  },
);
