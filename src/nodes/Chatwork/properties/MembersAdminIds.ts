import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const MembersAdminIdsProperty: INodeProperties = {
  displayName: 'Group Chat Administrators',
  name: 'membersAdminIds',
  type: 'string',
  default: '',
  required: true,
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
  placeholder: '123,542,1001',
  description: 'List of user IDs who will be given administrator permission for the group chat. At least one user must be specified as an administrator',
};
