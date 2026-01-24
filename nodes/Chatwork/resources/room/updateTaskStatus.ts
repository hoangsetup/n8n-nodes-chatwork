import { INodeProperties } from 'n8n-workflow';
import { roomIdProperty, taskIdProperty } from '../../shared/properties';
import { Resource, RoomOperations } from '../../shared/enums';
import { withDisplayOptions } from '../../shared/utils';

export const roomUpdateTaskStatusProperties: INodeProperties[] = withDisplayOptions(
	[
		roomIdProperty,
		taskIdProperty,
		{
			displayName: 'Status',
			name: 'body',
			type: 'options',
			required: true,
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
			default: 'open',
			description: 'Task status',
			routing: {
				send: {
					type: 'body',
					property: 'body',
				},
			},
		},
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.UPDATE_TASK_STATUS],
		},
	},
);
