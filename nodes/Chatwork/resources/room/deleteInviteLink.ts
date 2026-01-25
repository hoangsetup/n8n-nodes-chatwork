import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import { roomIdProperty } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const roomDeleteInviteLinkProperties: INodeProperties[] = withDisplayOptions(
	[roomIdProperty],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.DELETE_LINK],
		},
	},
);
