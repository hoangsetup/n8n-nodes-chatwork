import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import Mock = jest.Mock;
import { chatworkApiRequest } from '../../shared/GenericFunctions';
import { Chatwork } from './Chatwork.node';

jest.mock('../../shared/GenericFunctions');

enum Resources {
  me = 'me',
  my = 'my',
  contacts = 'contacts',
  rooms = 'rooms',
}

enum Operations {
  get = 'get',
  getStatus = 'status',
  getTasks = 'tasks',
  sendMessage = 'sendMessage',
  getMembers = 'getMembers',
  getMessages = 'getMessages',
  getDetail = 'getDetail',
  updateInfo = 'updateInfo',
  getMessageDetail = 'getMessageDetail',
  deleteMessage = 'deleteMessage',
  getRoomTasks = 'getRoomTasks',
  getRoomTaskDetail = 'getRoomTaskDetail',
  createRoomTask = 'createRoomTask',
}

interface ITestCase01 {
  resource: Resources,
  operation: Operations,
  response: any;
  expectationRequest: any[],
  expectationResult: INodeExecutionData[][];
}

interface ITestCase02 extends ITestCase01 {
  roomId: number,
}


describe('Chatwork', () => {
  let chatworkNode: Chatwork;
  let context: Partial<IExecuteFunctions>;

  let getInputDataMock: Mock;
  let getNodeParameterMock: Mock;
  let returnJsonArrayMock: Mock;

  const chatworkApiRequestMock: Mock = chatworkApiRequest as any;
  beforeEach(() => {
    getInputDataMock = jest.fn();
    getNodeParameterMock = jest.fn();
    returnJsonArrayMock = jest.fn();

    chatworkApiRequestMock.mockReset();

    chatworkNode = new Chatwork();
    context = {
      getInputData: getInputDataMock,
      getNodeParameter: getNodeParameterMock,
      helpers: {
        returnJsonArray: returnJsonArrayMock,
      },
    };
  })

  describe('execute', () => {
    test.each([
      {
        resource: Resources.me,
        operation: Operations.get,
        response: { name: 'chatwork-name' },
        expectationRequest: ['GET', '/me', null],
        expectationResult: [[{ json: { name: 'chatwork-name' } }]],
      },
      {
        resource: Resources.my,
        operation: Operations.getStatus,
        response: { unread_room_num: 2 },
        expectationRequest: ['GET', '/my/status', null],
        expectationResult: [[{ json: { unread_room_num: 2 } }]],
      },
      {
        resource: Resources.my,
        operation: Operations.getTasks,
        response: [{ task_id: 3 }],
        expectationRequest: ['GET', '/my/tasks', null],
        expectationResult: [[{ json: { task_id: 3 } }]],
      },
      {
        resource: Resources.rooms,
        operation: Operations.get,
        response: [{ room_id: 123 }],
        expectationRequest: ['GET', '/rooms', null],
        expectationResult: [[{ json: { room_id: 123 } }]],
      },
      {
        resource: Resources.contacts,
        operation: Operations.get,
        response: [{ account_id: 123 }],
        expectationRequest: ['GET', '/contacts', null],
        expectationResult: [[{ json: { account_id: 123 } }]],
      },
    ] as ITestCase01[])('should call request with expectation options (simple get only). Case %# %o', async ({
      resource,
      operation,
      response,
      expectationRequest,
      expectationResult,
    }) => {
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(resource);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(operation);
      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(response);

      returnJsonArrayMock.mockImplementationOnce((items: any[]) => {
        return items.map((i) => ({ json: i }));
      });

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith(...expectationRequest);
      expect(result).toEqual(expectationResult);
    });

    test('should return json array when response is a array', async () => {
      getNodeParameterMock.mockReturnValueOnce('my');
      getNodeParameterMock.mockReturnValueOnce('tasks');
      getInputDataMock.mockReturnValue([{}]);

      const taskItem = { task_id: 3 };
      chatworkApiRequestMock.mockResolvedValueOnce([taskItem]);

      const expectationResult = [[{ json: taskItem }]]

      returnJsonArrayMock.mockReturnValueOnce([{ json: taskItem }]);

      const result = await chatworkNode.execute.call(context as any);

      expect(returnJsonArrayMock).toHaveBeenCalledWith([taskItem]);
      expect(result).toEqual(expectationResult);
    });

    test.each([
      {
        resource: Resources.rooms,
        operation: Operations.getMembers,
        roomId: 1,
        response: { account_id: '123' },
        expectationRequest: ['GET', '/rooms/1/members', null],
        expectationResult: [[{ json: { account_id: '123' } }]],
      },
      {
        resource: Resources.rooms,
        operation: Operations.getMessages,
        roomId: 1,
        response: { message_id: '5' },
        expectationRequest: ['GET', '/rooms/1/messages?force=1', null],
        expectationResult: [[{ json: { message_id: '5' } }]],
      },
      {
        resource: Resources.rooms,
        operation: Operations.getDetail,
        roomId: 1,
        response: { room_id: 123 },
        expectationRequest: ['GET', '/rooms/1', null],
        expectationResult: [[{ json: { room_id: 123 } }]],
      },
    ] as ITestCase02[])('should call request with expectation options (get room resource). Case %# %o', async ({
      resource,
      operation,
      roomId,
      response,
      expectationRequest,
      expectationResult,
    }) => {
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(resource);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(operation);

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(response);

      returnJsonArrayMock.mockImplementationOnce((items: any[]) => {
        return items.map((i) => ({ json: i }));
      });

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith(...expectationRequest);
      expect(result).toEqual(expectationResult);
    });

    test('should call send message api with body when operation = sendMessage', async () => {
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(Operations.sendMessage);

      const roomId = 1;
      const message = 'Hello!';
      const body = {
        body: message,
      };

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getMessageMock = getNodeParameterMock.mockReturnValueOnce(message);

      const apiResponse = { message_id: '1234' };

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getMessageMock).toHaveBeenCalledWith('message', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith('POST', '/rooms/1/messages', body);
      expect(result).toEqual([[{ json: apiResponse }]]);
    });

    test.each([
      {
        description: 'Description of the group chat',
        name: 'Title of the group chat',
        iconPreset: 'meeting',
        expectationBody: {
          description: 'Description of the group chat',
          name: 'Title of the group chat',
          icon_preset: 'meeting',
        },
      },
      {
        description: '',
        name: 'Title of the group chat',
        iconPreset: 'meeting',
        expectationBody: {
          name: 'Title of the group chat',
          icon_preset: 'meeting',
        },
      },
      {
        description: 'Description of the group chat',
        name: '',
        iconPreset: 'meeting',
        expectationBody: {
          description: 'Description of the group chat',
          icon_preset: 'meeting',
        },
      },
    ])('should call update room info api with body when operation = updateInfo, %o', async ({
      description,
      name,
      iconPreset,
      expectationBody,
    }) => {
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(Operations.updateInfo);

      const roomId = 1;

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);

      const getDescriptionMock = getNodeParameterMock.mockReturnValueOnce(description);
      const getNameMock = getNodeParameterMock.mockReturnValueOnce(name);
      const getIconMock = getNodeParameterMock.mockReturnValueOnce(iconPreset);

      const apiResponse = { room_id: 1234 };

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getDescriptionMock).toHaveBeenCalledWith('description', 0);
      expect(getNameMock).toHaveBeenCalledWith('name', 0);
      expect(getIconMock).toHaveBeenCalledWith('iconPreset', 0);


      expect(chatworkApiRequestMock).toHaveBeenCalledWith('PUT', '/rooms/1', expectationBody);
      expect(result).toEqual([[{ json: apiResponse }]]);
    });

    test.each([
      {
        operation: Operations.getMessageDetail,
        apiResponse: { message_id: '1234' },
        expectationMethod: 'GET',
        expectationBody: null,
      },
      {
        operation: Operations.deleteMessage,
        apiResponse: { message_id: '1234' },
        expectationMethod: 'DELETE',
        expectationBody: null,
      },
    ])('should call api for a special message %o', async ({
      operation,
      apiResponse,
      expectationBody,
      expectationMethod,
    }) => {
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(operation);

      const roomId = 1;
      const messageId = 1234;

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getMessageIdMock = getNodeParameterMock.mockReturnValueOnce(messageId);

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getMessageIdMock).toHaveBeenCalledWith('messageId', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith(expectationMethod, '/rooms/1/messages/1234', expectationBody);
      expect(result).toEqual([[{ json: apiResponse }]]);
    });

    test('should throw exception when operation is not supported', async () => {
      getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      getNodeParameterMock.mockReturnValueOnce('not-supported-op');

      const roomId = 1;

      getNodeParameterMock.mockReturnValue(roomId);
      getInputDataMock.mockReturnValue([{}]);

      await expect(chatworkNode.execute.call(context as any)).rejects.toThrow(new Error('not-supported-op is not supported.'));

      expect(chatworkApiRequestMock).not.toBeCalled();
    });

    test('should use default roomId when roomId not found in a loop', async () => {
      getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      getNodeParameterMock.mockReturnValueOnce(Operations.sendMessage);

      const roomId = 1;
      const message = 'Hello!';
      const body = {
        body: message,
      };

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce('');
      getNodeParameterMock.mockReturnValueOnce(message);

      getInputDataMock.mockReturnValue([{}, {}]);

      await chatworkNode.execute.call(context as any);

      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 1);

      expect(chatworkApiRequestMock).toBeCalledTimes(2);
      expect(chatworkApiRequestMock).toHaveBeenCalledWith('POST', '/rooms/1/messages', body);
    })

    test('should call get tasks api when operation = "getRoomTasks"', async () => {
      const apiResponse = [
        {
          'task_id': 3,
          'account': {
            'account_id': 101,
            'name': 'Bob',
            'avatar_image_url': 'https://example.com/abc.png',
          },
        },
      ];
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(Operations.getRoomTasks);

      const roomId = 1;

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);
      returnJsonArrayMock.mockImplementationOnce((items: any[]) => {
        return items.map((i) => ({ json: i }));
      });

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks`, null);
      expect([[{ json: apiResponse[0] }]]).toEqual(result);
    })
    test('should call get tasks api when operation = "getRoomTaskDetail"', async () => {
      const apiResponse = {
        'task_id': 3,
        'account': {
          'account_id': 123,
          'name': 'Bob',
          'avatar_image_url': 'https://example.com/abc.png',
        },
        'assigned_by_account': {
          'account_id': 456,
          'name': 'Anna',
          'avatar_image_url': 'https://example.com/def.png',
        },
        'message_id': '13',
        'body': 'buy milk',
        'limit_time': 1384354799,
        'status': 'open',
      };
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(Operations.getRoomTaskDetail);

      const roomId = 1;

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);

      const taskId = 1
      const getTaskIdMock = getNodeParameterMock.mockReturnValueOnce(taskId);

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getTaskIdMock).toHaveBeenCalledWith('taskId', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks/${taskId}`, null);
      expect(result).toEqual([[{ json: apiResponse }]]);
    })

    test('should call create task api when operation = "createRoomTask"', async () => {
      const apiResponse = {
        'task_ids': [123, 124],
      };
      const getResourceMock = getNodeParameterMock.mockReturnValueOnce(Resources.rooms);
      const getOperationMock = getNodeParameterMock.mockReturnValueOnce(Operations.createRoomTask);

      const roomId = 1;
      const taskDes = 'Buy milk'
      const limit = '2020-11-08T05:16:37.000Z';
      const toIds = '1,3,6';

      const getDefaultRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getRoomIdMock = getNodeParameterMock.mockReturnValueOnce(roomId);
      const getTaskDesMock = getNodeParameterMock.mockReturnValueOnce(taskDes);
      const getLimitMock = getNodeParameterMock.mockReturnValueOnce(limit);
      const getToIds = getNodeParameterMock.mockReturnValueOnce(toIds);

      getInputDataMock.mockReturnValue([{}]);
      chatworkApiRequestMock.mockResolvedValueOnce(apiResponse);

      const expectationBody = {
        body: taskDes,
        limit: new Date(limit).valueOf() / 1000,
        to_ids: toIds,
      };

      const result = await chatworkNode.execute.call(context as any);

      expect(getResourceMock).toHaveBeenCalledWith('resource', 0);
      expect(getOperationMock).toHaveBeenCalledWith('operation', 0);
      expect(getDefaultRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getRoomIdMock).toHaveBeenCalledWith('roomId', 0);
      expect(getTaskDesMock).toHaveBeenCalledWith('body', 0);
      expect(getLimitMock).toHaveBeenCalledWith('limit', 0);
      expect(getToIds).toHaveBeenCalledWith('toIds', 0);

      expect(chatworkApiRequestMock).toHaveBeenCalledWith('POST', `/rooms/${roomId}/tasks`, expectationBody);
      expect(result).toEqual([[{ json: apiResponse }]]);
    })
  })
});
