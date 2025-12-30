import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, messageIdProperty, messageProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomUpdateMessageProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    messageIdProperty,
    messageProperty,
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.UPDATE_MESSAGE],
    },
  },
);
