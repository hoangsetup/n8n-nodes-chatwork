import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';

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
      name: 'Get',
      value: 'get',
      description: 'Get the list of your contacts',
    },
  ],
  default: 'get',
};
