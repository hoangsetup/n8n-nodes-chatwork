import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, messageIdProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetMessageProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    messageIdProperty
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_MESSAGE],
    },
  },
);
