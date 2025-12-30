import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomLeaveOrDeleteProperties: INodeProperties[] = withDisplayOptions(
  [
    roomIdProperty,
    {
      displayName: 'Action Type',
      name: 'actionType',
      type: 'options',
      default: 'leave',
      options: [
        {
          name: 'Leave Room',
          value: 'leave',
          description: 'Leave the room',
        },
        {
          name: 'Delete Room (Admin Only)',
          value: 'delete',
          description: 'Delete the room (requires admin privileges)',
        },
      ],
      description: 'Type of action',
      routing: {
        send: {
          type: 'body',
          property: 'action_type',
        }
      }
    },
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.LEAVE_OR_DELETE],
    },
  },
);
