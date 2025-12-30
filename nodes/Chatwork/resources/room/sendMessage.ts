import { Resource, RoomOperations } from '../../shared/enums';
import { messageProperty, roomIdProperty  } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const sendMessageProperties = withDisplayOptions(
  [
    roomIdProperty,
    messageProperty,
    {
      displayName: 'Mark as Unread',
      name: 'selfUnread',
      type: 'boolean',
      default: false,
      routing: {
        send: {
          type: 'body',
          property: 'self_unread',
          value: '={{$parameter.selfUnread ? 1 : 0}}',
        },
      },
    }
  ],
  {
    show: {
      resource: [Resource.ROOM],
      operation: [RoomOperations.SEND_MESSAGE],
    },
  },
);
