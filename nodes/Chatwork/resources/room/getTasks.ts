import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, accountIdProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetTasksProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      ...accountIdProperty,
      description: 'Filter tasks assigned to this account',
    },
    {
      displayName: 'Assigned By (Account ID)',
      name: 'assignedByAccountId',
      type: 'number',
      default: undefined,
      description: 'Filter tasks assigned by this account',
      routing: {
        send: {
          type: 'query',
          property: 'assigned_by_account_id',
          value: '={{$parameter.assignedByAccountId ?? undefined}}',
        },
      },
    },
    {
      displayName: 'Status',
      name: 'status',
      type: 'options',
      default: 'open',
      description: 'Filter tasks by status',
      options: [
        {
          name: 'Open',
          value: 'open',
        },
        {
          name: 'Done',
          value: 'done',
        },
      ],
      routing: {
        send: {
          type: 'query',
          property: 'status',
        },
      },
    },
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_TASKS],
    },
  },
);
