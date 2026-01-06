import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const roomIdProperty: INodeProperties = {
  displayName: 'Room ID',
  name: 'roomId',
  type: 'resourceLocator',
  required: true,
  description: 'Select a room or enter a Room ID manually',
  modes: [
    {
      displayName: 'By Name',
      type: 'list',
      name: 'list',
      placeholder: 'Select a room...',
      typeOptions: {
        searchListMethod: 'getRooms',
        searchable: true,
      },
    },
    {
      displayName: 'By ID',
      type: 'string',
      name: 'id',
      placeholder: 'e.g. 1234567890',
      validation: [
        {
          type: 'regex',
          properties: {
            regex: '^[0-9]+$',
            errorMessage: 'Room ID must be a number',
          },
        },
      ],
    },
  ],
  default: {
    mode: 'list',
    value: '',
  },
};

export const membersAdminIdsProperty: INodeProperties = {
  displayName: 'Group Chat Administrators',
  name: 'membersAdminIds',
  required: true,
  type: 'multiOptions',
  description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
  default: [],
  typeOptions: {
    loadOptionsMethod: 'getContacts',
  },
  routing: {
    send: {
      type: 'body',
      property: 'members_admin_ids',
      value: `={{$parameter.membersAdminIds.join(',')}}`,
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
  routing: {
    send: {
      type: 'body',
      property: 'name',
    },
  },
};

export const descriptionProperty: INodeProperties = {
  displayName: 'Chat Description',
  name: 'description',
  type: 'string',
  default: '',
  placeholder: 'group chat description',
  description: 'Description of the group chat',
  routing: {
    send: {
      type: 'body',
      property: 'description',
      value: '={{$parameter.description || undefined}}',
    },
  },
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
  routing: {
    send: {
      type: 'body',
      property: 'icon_preset',
    },
  },
};

export const membersMemberIdsProperty: INodeProperties = {
  displayName: 'Group Chat Members',
  name: 'membersMemberIds',
  type: 'multiOptions',
  description:
    'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
  default: [],
  typeOptions: {
    loadOptionsMethod: 'getContacts',
  },
  routing: {
    send: {
      type: 'body',
      property: 'members_member_ids',
      value: `={{$parameter.membersMemberIds.join(',')}}`,
    },
  },
};

export const membersReadonlyIdsProperty: INodeProperties = {
  displayName: 'Group Chat Read-only Users',
  name: 'membersReadonlyIds',
  type: 'multiOptions',
  description:
    'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
  default: [],
  typeOptions: {
    loadOptionsMethod: 'getContacts',
  },
  routing: {
    send: {
      type: 'body',
      property: 'members_readonly_ids',
      value: `={{$parameter.membersReadonlyIds.join(',')}}`,
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
