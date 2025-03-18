import { INodeProperties } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';

export enum RoomOptionsValue {
  GET_ALL = 'getRooms',
  GET_DETAIL = 'getDetail',
  UPDATE_INFO = 'updateInfo',
  GET_MEMBERS = 'getMembers',
  GET_MESSAGES = 'getMessages',
  SEND_MESSAGE = 'sendMessage',
  GET_MESSAGE_DETAIL = 'getMessageDetail',
  DELETE_MESSAGE = 'deleteMessage',
  GET_TASKS = 'getTasks',
  GET_TASK_DETAIL = 'getTaskDetail',
  CREATE_TASK = 'createTask',
  GET_FILES = 'getFiles',
  GET_FILE_DETAIL = 'getFileDetail',
}

export const RoomProperty: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  required: true,
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
    },
  },
  options: [
    {
      name: 'Get rooms',
      value: RoomOptionsValue.GET_ALL,
      description: 'Get the list of all chats on your account',
    },
    {
      name: 'Get detail',
      value: RoomOptionsValue.GET_DETAIL,
      description: 'Get chat name, icon, and Type (my, direct, or group)',
    },
    {
      name: 'Update info',
      value: RoomOptionsValue.UPDATE_INFO,
      description: 'Change the title and icon type of the specified chat',
    },
    {
      name: 'Get members',
      value: RoomOptionsValue.GET_MEMBERS,
      description: 'Get the list of all chat members associated with the specified chat ',
    },
    {
      name: 'Get messages',
      value: RoomOptionsValue.GET_MESSAGES,
      description: 'Get all messages associated with the specified chat (returns up to 100 entries). ',
    },
    {
      name: 'Send message',
      value: RoomOptionsValue.SEND_MESSAGE,
      description: 'Add new message to the chat',
    },
    {
      name: 'Get message detail',
      value: RoomOptionsValue.GET_MESSAGE_DETAIL,
      description: 'Get information about the specified message',
    },
    {
      name: 'Delete message',
      value: RoomOptionsValue.DELETE_MESSAGE,
      description: 'Delete the specified message',
    },
    {
      name: 'Get tasks',
      value: RoomOptionsValue.GET_TASKS,
      description: 'Get the list of tasks associated with the specified chat',
    },
    {
      name: 'Get task detail',
      value: RoomOptionsValue.GET_TASK_DETAIL,
      description: 'Get information about the specified task',
    },
    {
      name: 'Add a new task to the chat',
      value: RoomOptionsValue.CREATE_TASK,
      description: 'Add a new task to the chat',
    },
    {
      name: 'Get the list of files',
      value: RoomOptionsValue.GET_FILES,
      description: 'Get the list of files associated with the specified chat',
    },
    {
      name: 'Get information about the specified file',
      value: RoomOptionsValue.GET_FILE_DETAIL,
      description: 'Get information about the specified file',
    },
  ],
  default: RoomOptionsValue.GET_ALL,
};
