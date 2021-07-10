import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';

export const MeProperty: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  required: true,
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ME,
      ],
    },
  },
  options: [
    {
      name: 'Get account information',
      value: 'get',
      description: 'Get your account information',
    },
  ],
  default: 'get',
};
