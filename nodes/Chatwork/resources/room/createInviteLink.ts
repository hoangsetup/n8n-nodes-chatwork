import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import { roomIdProperty } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const roomCreateInviteLinkProperties: INodeProperties[] = withDisplayOptions(
	[
		roomIdProperty,
		{
			displayName: 'Code',
			name: 'code',
			type: 'string',
			default: '',
			description: 'Code for the invite link. If omitted, a random string will be used.',
			routing: {
				send: {
					type: 'body',
					property: 'code',
					value: '={{$parameter.code || undefined}}',
				},
			},
		},
		{
			displayName: 'Need Acceptance',
			name: 'need_acceptance',
			type: 'boolean',
			default: true,
			description: 'Whether the administrator needs to approve the participation',
			routing: {
				send: {
					type: 'body',
					property: 'need_acceptance',
					value: '={{$value ? 1 : 0}}',
				},
			},
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			default: '',
			description: 'Description of the invite link',
			routing: {
				send: {
					type: 'body',
					property: 'description',
					value: '={{$parameter.description || undefined}}',
				},
			},
		},
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.CREATE_LINK],
		},
	},
);
