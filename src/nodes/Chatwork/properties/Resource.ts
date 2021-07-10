import { INodeProperties } from 'n8n-workflow';

export enum ResourceOptionsValue {
  ME = 'me',
  MY = 'my',
  CONTACTS = 'contacts',
  ROOMS = 'rooms',
}

export const ResourceProperty: INodeProperties = {
  displayName: 'Resource',
  description: 'The main resource to operate on.',
  name: 'resource',
  type: 'options',
  required: true,
  noDataExpression: true,
  options: [
    {
      name: 'Me',
      value: ResourceOptionsValue.ME,
      description: 'Used to access your account information.',
    },
    {
      name: 'My',
      value: ResourceOptionsValue.MY,
      description: 'Used to access your data on the account.',
    },
    {
      name: 'Contacts',
      value: ResourceOptionsValue.CONTACTS,
      description: 'Used to access the list of your contacts',
    },
    {
      name: 'Rooms',
      value: ResourceOptionsValue.ROOMS,
      description: `Used to access information such as messages, members, files, and tasks associated to a specific conversation. The
conversation can be Group chat, Direct chat, or My chat`,
    },
  ],
  default: ResourceOptionsValue.ME,
};
