import { Resource, RoomOperations } from '../../shared/enums';
import { messageIdProperty, roomIdProperty } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const roomMarkAsUnreadProperties = withDisplayOptions(
	[
		roomIdProperty,
		{
			...messageIdProperty,
			required: true,
			description:
				'The ID of the message to mark as unread. All messages from this ID onwards will be marked as unread.',
			routing: {
				send: {
					type: 'body',
					property: 'message_id',
				},
			},
		},
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.MARK_AS_UNREAD],
		},
	},
);
