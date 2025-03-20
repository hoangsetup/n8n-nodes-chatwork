import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MembersReadonlyIdsProperty: INodeProperties = {
  displayName: 'Group Chat Read-only Users',
  name: 'membersReadonlyIds',
  type: 'string',
  default: '',
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.CREATE,
        RoomOptionsValue.CHANGE_ASSOCIATED_MEMBERS,
      ],
    },
  },
  placeholder: '15,103',
  description: 'List of user IDs who will be given read-only permission for the group chat',
};
