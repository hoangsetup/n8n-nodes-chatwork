import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetMessagesProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,

  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_MESSAGES],
    },
  },
);
