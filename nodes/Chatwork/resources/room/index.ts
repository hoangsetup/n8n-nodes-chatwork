import { INodeProperties } from 'n8n-workflow';
import { Resource, RoomOperations } from '../../shared/enums';
import { roomCreateProperties } from './create';
import { sendMessageProperties } from './sendMessage';
import { roomUpdateProperties } from './update';
import { roomGetProperties } from './get';
import { roomLeaveOrDeleteProperties } from './leaveOrDelete';
import { roomGetMembersProperties } from './getMembers';
import { roomChangeMembersProperties } from './changeMembers';
import { roomGetMessagesProperties } from './getMessages';
import { roomGetMessageProperties } from './getMessage';
import { roomGetTasksProperties } from './getTasks';
import { roomCreateTaskProperties } from './createTask';
import { roomGetTaskProperties } from './getTask';
import { roomGetFilesProperties } from './getFiles';
import { roomGetFileProperties } from './getFile';
import { roomUpdateMessageProperties } from './upddateMessage';
import { roomDeleteMessageProperties } from './deleteMessage';

export const roomProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    required: true,
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          Resource.ROOM,
        ],
      },
    },
    options: [
      {
        name: 'Get All Rooms',
        value: RoomOperations.GET_ALL,
        description: 'Retrieve all rooms the user belongs to',
        routing: {
          request: {
            method: 'GET',
            url: '/rooms',
          },
        },
      },
      {
        name: 'Create Room',
        value: RoomOperations.CREATE,
        description: 'Create a new chat room',
        routing: {
          request: {
            method: 'POST',
            url: '/rooms',
          },
        },
      },
      {
        name: 'Get Room Detail',
        value: RoomOperations.GET_DETAIL,
        description: 'Retrieve detailed information about a specific room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}',
          },
        },
      },
      {
        name: 'Update Room',
        value: RoomOperations.UPDATE_INFO,
        description: 'Update room name, description, or icon',
        routing: {
          request: {
            method: 'PUT',
            url: '=/rooms/{{$parameter["roomId"]}}',
          },
        },
      },
      {
        name: 'Leave or Delete Room',
        value: RoomOperations.LEAVE_OR_DELETE,
        description: 'Leave the room or delete it (admin only)',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/rooms/{{$parameter["roomId"]}}',
          },
        },
      },
      {
        name: 'Get Members',
        value: RoomOperations.GET_MEMBERS,
        description: 'Get all members of the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/members',
          },
        },
      },
      {
        name: 'Change Members',
        value: RoomOperations.CHANGE_MEMBERS,
        description: 'Change room members and roles',
        routing: {
          request: {
            method: 'PUT',
            url: '=/rooms/{{$parameter["roomId"]}}/members',
          },
        },
      },
      {
        name: 'Get Messages',
        value: RoomOperations.GET_MESSAGES,
        description: 'Get messages from the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/messages',
            qs: {
              force: 1,
            },
          },
        },
      },
      {
        name: 'Send Message',
        value: RoomOperations.SEND_MESSAGE,
        description: 'Send a message to the specified room',
        routing: {
          request: {
            method: 'POST',
            url: '=/rooms/{{$parameter["roomId"]}}/messages',
          },
        },
      },
      {
        name: 'Get Message',
        value: RoomOperations.GET_MESSAGE,
        description: 'Get a specific message by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/messages/{{$parameter["messageId"]}}',
          },
        },
      },
      {
        name: 'Update Message',
        value: RoomOperations.UPDATE_MESSAGE,
        description: 'Update a message in the room',
        routing: {
          request: {
            method: 'PUT',
            url: '=/rooms/{{$parameter["roomId"]}}/messages/{{$parameter["messageId"]}}',
          },
        },
      },
      {
        name: 'Delete Message',
        value: RoomOperations.DELETE_MESSAGE,
        description: 'Delete a message in the room',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/rooms/{{$parameter["roomId"]}}/messages/{{$parameter["messageId"]}}',
          },
        },
      },
      {
        name: 'Get Tasks',
        value: RoomOperations.GET_TASKS,
        description: 'Get tasks in the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/tasks',
          },
        },
      },
      {
        name: 'Create Task',
        value: RoomOperations.CREATE_TASK,
        description: 'Create a task in the room',
        routing: {
          request: {
            method: 'POST',
            url: '=/rooms/{{$parameter["roomId"]}}/tasks',
          },
        },
      },
      {
        name: 'Get Task Detail',
        value: RoomOperations.GET_TASK,
        description: 'Get details of a specific task in the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/tasks/{{$parameter["taskId"]}}',
          },
        },
      },
      {
        name: 'Get Files',
        value: RoomOperations.GET_FILES,
        description: 'Get the list of files in the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/files',
          },
        },
      },
      {
        name: 'Get File Detail',
        value: RoomOperations.GET_FILE,
        description: 'Get details of a file in the room',
        routing: {
          request: {
            method: 'GET',
            url: '=/rooms/{{$parameter["roomId"]}}/files/{{$parameter["fileId"]}}',
          },
        },
      },
    ],
  },
  ...roomCreateProperties,
  ...roomGetProperties,
  ...sendMessageProperties,
  ...roomUpdateProperties,
  ...roomLeaveOrDeleteProperties,
  ...roomGetMembersProperties,
  ...roomChangeMembersProperties,
  ...roomGetMessagesProperties,
  ...roomGetMessageProperties,
  ...roomUpdateMessageProperties,
  ...roomDeleteMessageProperties,
  ...roomGetTasksProperties,
  ...roomCreateTaskProperties,
  ...roomGetTaskProperties,
  ...roomGetFilesProperties,
  ...roomGetFileProperties,
];
