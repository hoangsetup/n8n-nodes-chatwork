import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { chatworkApiRequest } from '../../shared/GenericFunctions';
import { Chatwork } from './Chatwork.node';
import {
  BodyProperty,
  DescriptionProperty,
  IconPresetProperty,
  LimitProperty,
  MessageIdProperty,
  MessageProperty,
  MyOptionsValue,
  NameProperty,
  ResourceOptionsValue,
  RoomOptionsValue,
  TaskIdProperty,
  ToIdsProperty,
} from './properties';

jest.mock('../../shared/GenericFunctions');

describe('Chatwork', () => {
  let chatworkNode: Chatwork;
  let context: jest.MockedObjectDeep<IExecuteFunctions>;
  let mockChatworkApiRequest: jest.MockedFunction<typeof chatworkApiRequest>;

  beforeEach(() => {
    chatworkNode = new Chatwork();
    mockChatworkApiRequest = jest.mocked(chatworkApiRequest).mockReset();
    context = {
      getInputData: jest.fn(),
      getNodeParameter: jest.fn(),
      helpers: {
        returnJsonArray: jest.fn(),
      },
    } as jest.MockedObjectDeep<IExecuteFunctions>;
  });

  describe('execute', () => {
    beforeEach(() => {
      context.getInputData.mockReturnValue([{ json: {} }] as INodeExecutionData[]);
      mockChatworkApiRequest.mockResolvedValue({});
    });

    describe('/my', () => {
      it('/ (GET)', async () => {
        const operation = 'any';
        context.getNodeParameter.mockReturnValueOnce(ResourceOptionsValue.MY)
          .mockReturnValueOnce(operation);

        const result = await chatworkNode.execute.call(context);

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/my/${operation}`, null);
        expect(result).toEqual([[{ json: {} }]]);
      });
    });

    describe('/rooms', () => {
      beforeEach(() => {
        context.getNodeParameter.mockReturnValueOnce(ResourceOptionsValue.ROOMS);
      });

      it('/ (GET)', async () => {
        context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET);

        const result = await chatworkNode.execute.call(context);

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms`, null);
        expect(result).toEqual([[{ json: {} }]]);
      });

      describe('/:roomId', () => {
        const defaultRoomId = 1;
        const roomId = 2;

        beforeEach(() => {
          context.getNodeParameter
            .mockReturnValueOnce(defaultRoomId)
            .mockReturnValueOnce(roomId);
        });

        it('/ (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_DETAIL);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/ (PUT)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.UPDATE_INFO);
          const description = 'description';
          const name = 'name';
          const iconPreset = 'iconPreset';
          context.getNodeParameter.mockReturnValueOnce(description)
            .mockReturnValueOnce(name)
            .mockReturnValueOnce(iconPreset);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(DescriptionProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(NameProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(IconPresetProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith(
            'PUT',
            `/rooms/${roomId}`,
            { description, name, icon_preset: iconPreset },
          );
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MESSAGES);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/messages?force=1`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages (POST)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.SEND_MESSAGE);
          const message = 'Hello World!';
          context.getNodeParameter.mockReturnValueOnce(message);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('POST', `/rooms/${roomId}/messages`, { body: message });
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages/:messageId (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MESSAGE_DETAIL);
          const messageId = 'message-id';
          context.getNodeParameter.mockReturnValueOnce(messageId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/messages/${messageId}`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages/:messageId (DELETE)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.DELETE_MESSAGE);
          const messageId = 'message-id';
          context.getNodeParameter.mockReturnValueOnce(messageId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('DELETE', `/rooms/${roomId}/messages/${messageId}`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/members (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MEMBERS);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/members`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/tasks (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_ROOM_TASKS);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/tasks (POST)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.CREATE_ROOM_TASK);
          const taskDesciption = 'task-description';
          const limit = '2025-03-16';
          const toIds = '1,2,3';
          context.getNodeParameter.mockReturnValueOnce(taskDesciption)
            .mockReturnValueOnce(limit)
            .mockReturnValueOnce(toIds);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(BodyProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(LimitProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(ToIdsProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith(
            'POST',
            `/rooms/${roomId}/tasks`,
            {
              body: taskDesciption,
              limit: 1742083200,
              to_ids: toIds,
            },
          );
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/tasks/:taskId (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_ROOM_TASK_DETAIL);
          const taskId = 'task-id';
          context.getNodeParameter.mockReturnValueOnce(taskId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(TaskIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks/${taskId}`, null);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/un-supported', async () => {
          context.getNodeParameter.mockReturnValueOnce('un-supported');

          await expect(chatworkNode.execute.call(context)).rejects.toThrow(new Error('un-supported is not supported.'));

          expect(mockChatworkApiRequest).not.toHaveBeenCalled();
        });
      });
    });

    it('should handle multiple input data', async () => {
      context.getInputData.mockReturnValue([{}, {}] as INodeExecutionData[]);
      context.getNodeParameter
        .mockReturnValueOnce(ResourceOptionsValue.MY)
        .mockReturnValueOnce(MyOptionsValue.STATUS)
        .mockReturnValueOnce(ResourceOptionsValue.MY)
        .mockReturnValueOnce(MyOptionsValue.STATUS);

      mockChatworkApiRequest.mockResolvedValue({});

      const result = await chatworkNode.execute.call(context);

      expect(context.getNodeParameter).toHaveBeenCalledTimes(4);
      expect(context.getNodeParameter).toHaveBeenNthCalledWith(1, 'resource', 0);
      expect(context.getNodeParameter).toHaveBeenNthCalledWith(2, 'operation', 0);
      expect(context.getNodeParameter).toHaveBeenNthCalledWith(3, 'resource', 1);
      expect(context.getNodeParameter).toHaveBeenNthCalledWith(4, 'operation', 1);
      expect(mockChatworkApiRequest).toHaveBeenCalledTimes(2);
      expect(mockChatworkApiRequest).toHaveBeenNthCalledWith(1, 'GET', `/my/${MyOptionsValue.STATUS}`, null);
      expect(mockChatworkApiRequest).toHaveBeenNthCalledWith(2, 'GET', `/my/${MyOptionsValue.STATUS}`, null);
      expect(result).toEqual([[{ json: {} }, { json: {} }]]);
    });

    it('should return flatten array when api returns array', async () => {
      context.getNodeParameter
        .mockReturnValueOnce(ResourceOptionsValue.MY)
        .mockReturnValueOnce(MyOptionsValue.STATUS);
      const response1: IDataObject = { key1: 'value1' };
      const response2: IDataObject = { key2: 'value2' };
      mockChatworkApiRequest.mockResolvedValue([response1, response2]);
      const jsonArray: INodeExecutionData[] = [{ json: { key: 'value' } }];
      context.helpers.returnJsonArray.mockReturnValueOnce(jsonArray);

      const result = await chatworkNode.execute.call(context);

      expect(context.helpers.returnJsonArray).toHaveBeenCalledWith([response1, response2]);
      expect(result).toEqual([jsonArray]);
    });
  });
});
