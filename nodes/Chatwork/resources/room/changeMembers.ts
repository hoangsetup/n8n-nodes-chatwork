import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, membersAdminIdsProperty, membersMemberIdsProperty, membersReadonlyIdsProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomChangeMembersProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    membersAdminIdsProperty,
    membersMemberIdsProperty,
    membersReadonlyIdsProperty,
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.CHANGE_MEMBERS],
    },
  },
);
