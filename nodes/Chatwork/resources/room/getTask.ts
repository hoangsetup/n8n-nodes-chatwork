import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, taskIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomGetTaskProperties: INodeProperties[] = withDisplayOptions(
	[
		roomIdProperty,
		taskIdProperty,
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.GET_TASK],
		},
	},
);
