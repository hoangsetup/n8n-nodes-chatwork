import { Resource, RoomOperations } from '../../shared/enums';
import { messageIdProperty, roomIdProperty } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const roomMarkAsReadProperties = withDisplayOptions(
	[
		roomIdProperty,
		{
			...messageIdProperty,
			required: false,
			description:
				'The ID of the message to mark as read. All messages up to this ID will be marked as read. If not specified, all messages in the room will be marked as read.',
			routing: {
				send: {
					type: 'body',
					property: 'message_id',
					value: '={{$parameter.messageId || undefined}}',
				},
			},
		},
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.MARK_AS_READ],
		},
	},
);
