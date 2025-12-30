import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, messageProperty  } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomCreateTaskProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      ...messageProperty,
      placeholder: 'Follow up with client',
      description: 'Description of the task',
    },
    {
      displayName: 'Assignees (Account IDs)',
      name: 'toIds',
      type: 'string',
      required: true,
      default: '',
      placeholder: '123,456',
      description: 'Comma-separated account IDs',
      displayOptions: {
        show: {
          resource: [Resource.ROOM],
          operation: [RoomOperations.CREATE_TASK],
        },
      },
      routing: {
        send: {
          type: 'body',
          property: 'to_ids',
        },
      },
    },
    {
      displayName: 'Due Date',
      name: 'limit',
      type: 'dateTime',
      default: null,
      description: 'Task due date',
      routing: {
        send: {
          type: 'body',
          property: 'limit',
          value: '={{ Math.floor(new Date($parameter.limit).getTime() / 1000) }}',
        },
      },
    },
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.CREATE_TASK],
    },
  },
);
