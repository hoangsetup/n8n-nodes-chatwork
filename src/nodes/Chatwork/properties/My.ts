import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';

export enum MyOptionsValue {
  STATUS = 'status',
  TASKS = 'tasks',
}

export const MyProperty: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  required: true,
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.MY,
      ],
    },
  },
  options: [
    {
      name: 'Get status',
      value: MyOptionsValue.STATUS,
      description: 'Get the number of: unread messages, unread To messages, and unfinished tasks',
    },
    {
      name: 'Get tasks',
      value: MyOptionsValue.TASKS,
      description: 'Get the list of all unfinished tasks',
    },
  ],
  default: MyOptionsValue.STATUS,
};
