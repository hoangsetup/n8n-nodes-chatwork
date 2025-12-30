import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetTaskProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      displayName: 'Task ID',
      name: 'taskId',
      type: 'number',
      required: true,
      default: 0,
      description: 'ID of the task',
    }
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.GET_TASK],
    },
  },
);
