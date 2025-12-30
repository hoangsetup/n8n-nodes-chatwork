import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, descriptionProperty, iconPresetProperty, roomNameProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomUpdateProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    roomNameProperty,
    descriptionProperty,
    iconPresetProperty,
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.UPDATE_INFO],
    },
  },
);
