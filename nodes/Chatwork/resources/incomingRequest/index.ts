import { INodeProperties } from 'n8n-workflow';
import { Resource } from '../../shared/enums';

export const incomingRequestProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		required: true,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [Resource.INCOMING_REQUEST],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the list of contact requests the user has received',
				routing: {
					request: {
						method: 'GET',
						url: '/incoming_requests',
					},
				},
				action: 'Get all incoming requests',
			},
			{
				name: 'Approve',
				value: 'approve',
				description: 'Approve a contact request the user has received',
				routing: {
					request: {
						method: 'PUT',
						url: '=/incoming_requests/{{$parameter["requestId"]}}',
					},
				},
				action: 'Approve an incoming request',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Decline a contact request the user has received',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/incoming_requests/{{$parameter["requestId"]}}',
					},
				},
				action: 'Delete an incoming request',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [Resource.INCOMING_REQUEST],
				operation: ['approve', 'delete'],
			},
		},
		description: 'The ID of the contact request to approve or delete',
	},
];
