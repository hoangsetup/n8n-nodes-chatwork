import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';

export enum ContactOptionsValue {
  GET_ALL = 'getContacts',
}

export const ContactProperty: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  required: true,
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.CONTACTS,
      ],
    },
  },
  options: [
    {
      name: 'Get contacts',
      value: ContactOptionsValue.GET_ALL,
      description: 'Get the list of your contacts',
    },
  ],
  default: ContactOptionsValue.GET_ALL,
};
