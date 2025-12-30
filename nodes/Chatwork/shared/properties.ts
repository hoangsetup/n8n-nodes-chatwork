import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const roomIdProperty: INodeProperties = {
  displayName: 'Room ID',
  name: 'roomId',
  type: 'number',
  required: true,
  description: 'ID of the room',
  default: null,
};

export const membersAdminIdsProperty: INodeProperties = {
  displayName: 'Group Chat Administrators',
  name: 'membersAdminIds',
  type: 'string',
  default: '',
  required: true,
  placeholder: '123,542,1001',
  description: 'Comma-separated account IDs of admins',
  routing: {
    send: {
      type: 'body',
      property: 'members_admin_ids',
    },
  },
};

export const roomNameProperty: INodeProperties = {
  displayName: 'Group Chat Name',
  name: 'name',
  type: 'string',
  default: '',
  placeholder: 'Website renewal project',
  description: 'Title of the group chat',
};

export const descriptionProperty: INodeProperties = {
  displayName: 'Chat Description',
  name: 'description',
  type: 'string',
  default: '',
  placeholder: 'group chat description',
  description: 'Description of the group chat',
};

export const iconPresetProperty: INodeProperties = {
  displayName: 'Icon Type',
  name: 'iconPreset',
  type: 'options',
  default: '',
  options: [
    'group', 'check', 'document', 'meeting', 'event',
    'project', 'business', 'study', 'security', 'star',
    'idea', 'heart', 'magcup', 'beer', 'music', 'sports', 'travel',
  ].map<INodePropertyOptions>((v) => ({ name: v, value: v })),
  description: 'Type of the group chat icon',
};

export const membersMemberIdsProperty: INodeProperties = {
  displayName: 'Group Chat Members',
  name: 'membersMemberIds',
  type: 'string',
  default: '',
  placeholder: '21,344',
  description: 'Comma-separated account IDs of members',
  routing: {
    send: {
      type: 'body',
      property: 'members_member_ids',
    },
  },
};

export const membersReadonlyIdsProperty: INodeProperties = {
  displayName: 'Group Chat Read-only Users',
  name: 'membersReadonlyIds',
  type: 'string',
  default: '',
  placeholder: '15,103',
  description: 'Comma-separated account IDs of readonly members',
  routing: {
    send: {
      type: 'body',
      property: 'members_readonly_ids',
    },
  },
};

export const messageProperty: INodeProperties = {
  displayName: 'Message Body',
  name: 'message',
  type: 'string',
  default: '',
  required: true,
  placeholder: 'New message',
  routing: {
    send: {
      type: 'body',
      property: 'body',
    },
  },
};

export const messageIdProperty: INodeProperties = {
  displayName: 'Message ID',
  name: 'messageId',
  type: 'string',
  required: true,
  description: 'ID of the message',
  placeholder: '12345',
  default: '',
};

export const accountIdProperty: INodeProperties = {
  displayName: 'Account ID',
  name: 'accountId',
  type: 'number',
  default: null,
  routing: {
    send: {
      type: 'query',
      property: 'account_id',
      value: '={{$parameter.accountId ?? undefined}}',
    },
  },
};
