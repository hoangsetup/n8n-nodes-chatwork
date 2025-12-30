import { INodeProperties } from 'n8n-workflow';
import { Resource } from '../shared/enums';
import { contactProperties } from './contact';
import { meProperties } from './me';
import { myProperties } from './my';
import { roomProperties } from './room';

export const resourceProperties: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    default: '',
    required: true,
    noDataExpression: true,
    options: [
      {
        name: 'Me',
        value: Resource.ME,
        description: 'Used to access your account information',
      },
      {
        name: 'My',
        value: Resource.MY,
        description: 'Used to access your data on the account',
      },
      {
        name: 'Contact',
        value: Resource.CONTACT,
        description: 'Used to access the list of your contacts',
      },
      {
        name: 'Room',
        value: Resource.ROOM,
        description: 'Used to access information such as messages, members, files, and tasks associated to a specific conversation. The conversation can be Group chat, Direct chat, or My chat.',
      },
    ],
  },
  ...contactProperties,
  ...meProperties,
  ...myProperties,
  ...roomProperties,
];
