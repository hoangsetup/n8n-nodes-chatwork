import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import {
  descriptionProperty,
  iconPresetProperty,
  membersAdminIdsProperty,
  membersMemberIdsProperty,
  membersReadonlyIdsProperty,
  roomNameProperty,
} from '../../shared/properties';

export const roomCreateProperties: INodeProperties[] = [
  {
    ...roomNameProperty,
    required: true,
  },
  membersAdminIdsProperty,
  descriptionProperty,
  iconPresetProperty,
  membersMemberIdsProperty,
  membersReadonlyIdsProperty,
].map<INodeProperties>((property) => ({
  ...property,
  displayOptions: {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.CREATE],
    },
  },
}));
