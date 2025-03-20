import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MembersMemberIdsProperty: INodeProperties = {
  displayName: 'Group Chat Members',
  name: 'membersMemberIds',
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
  placeholder: '21,344',
  description: 'List of user IDs who will be given member permission for the group chat',
};
