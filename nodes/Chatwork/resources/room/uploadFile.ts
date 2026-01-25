import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import { roomIdProperty } from '../../shared/properties';
import { withDisplayOptions } from '../../shared/utils';

export const roomUploadFileProperties: INodeProperties[] = withDisplayOptions(
	[
		roomIdProperty,
		{
			displayName: 'Input Data Field Name',
			name: 'binaryPropertyName',
			type: 'string',
			default: 'data',
			required: true,
			description: 'The name of the incoming field containing the binary file data to be uploaded',
		},
		{
			displayName: 'Message Body',
			name: 'message',
			type: 'string',
			default: '',
			placeholder: 'New file message',
			description: 'Message body to send with the file',
		},
	],
	{
		show: {
			resource: [Resource.ROOM],
			operation: [RoomOperations.UPLOAD_FILE],
		},
	},
);
