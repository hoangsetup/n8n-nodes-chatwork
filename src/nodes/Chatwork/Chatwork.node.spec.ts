import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { chatworkApiRequest, IChangeAssociatedMembersPayload, ICreateRoomPayload } from '../../shared/GenericFunctions';
import { Chatwork } from './Chatwork.node';
import {
  AccountIdProperty,
  ActionTypeProperty,
  BodyProperty,
  DescriptionProperty,
  FileCreateDownloadUrl,
  FileIdProperty,
  IconPresetProperty,
  LimitProperty,
  MembersAdminIdsProperty,
  MembersMemberIdsProperty,
  MembersReadonlyIdsProperty,
  MessageIdProperty,
  MessageProperty,
  MyOptionsValue,
  NameProperty,
  NameRequiredProperty,
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

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/my/${operation}`, undefined);
        expect(result).toEqual([[{ json: {} }]]);
      });
    });

    describe('/me', () => {
      it('/ (GET)', async () => {
        context.getNodeParameter.mockReturnValueOnce(ResourceOptionsValue.ME);

        const result = await chatworkNode.execute.call(context);

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/me`, undefined);
        expect(result).toEqual([[{ json: {} }]]);
      });
    });

    describe('/contacts', () => {
      it('/ (GET)', async () => {
        context.getNodeParameter.mockReturnValueOnce(ResourceOptionsValue.CONTACTS);

        const result = await chatworkNode.execute.call(context);

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/contacts`, undefined);
        expect(result).toEqual([[{ json: {} }]]);
      });
    });

    describe('/rooms', () => {
      beforeEach(() => {
        context.getNodeParameter.mockReturnValueOnce(ResourceOptionsValue.ROOMS);
      });

      it('/ (GET)', async () => {
        context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_ALL);

        const result = await chatworkNode.execute.call(context);

        expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms`, undefined);
        expect(result).toEqual([[{ json: {} }]]);
      });

      (
        [
          [undefined, undefined, undefined, {}],
          ['description', undefined, undefined, { description: 'description' }],
          [
            'description', 'membersMemberIds', undefined,
            {
              description: 'description',
              members_member_ids: 'membersMemberIds',
            },
          ],
          [
            'description', 'membersMemberIds', 'membersReadonlyIds',
            {
              description: 'description',
              members_member_ids: 'membersMemberIds',
              members_readonly_ids: 'membersReadonlyIds',
            },
          ],
        ] as Array<[string | undefined, string | undefined, string | undefined, Omit<ICreateRoomPayload, 'name' | 'members_admin_ids' | 'icon_preset'>]>
      ).forEach(([description, membersMemberIds, membersReadonlyIds, expectedBody], index) => {
        it(`/ (POST). Case ${index}`, async () => {
          const name = 'group name';
          const membersAdminIds = 'members-admins-ids';
          const iconPreset = 'icon-preset';
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.CREATE);
          context.getNodeParameter
            .mockReturnValueOnce(name)
            .mockReturnValueOnce(membersAdminIds)
            .mockReturnValueOnce(description)
            .mockReturnValueOnce(iconPreset)
            .mockReturnValueOnce(membersMemberIds)
            .mockReturnValueOnce(membersReadonlyIds);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(NameRequiredProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(MembersAdminIdsProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(DescriptionProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(IconPresetProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(MembersMemberIdsProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(MembersReadonlyIdsProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith(
            'POST',
            '/rooms',
            {
              name,
              members_admin_ids: membersAdminIds,
              icon_preset: iconPreset,
              ...expectedBody,
            },
          );
          expect(result).toEqual([[{ json: {} }]]);
        });
      });

      describe('/:roomId', () => {
        const roomId = 1;

        it('/ (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_DETAIL);
          context.getNodeParameter.mockReturnValueOnce(roomId);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/ (PUT)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.UPDATE_INFO);
          context.getNodeParameter.mockReturnValueOnce(roomId);
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

        it('/ (DELETE)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.LEAVE_OR_DELETE);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const actionType = 'action-type';
          context.getNodeParameter.mockReturnValueOnce(actionType);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(ActionTypeProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith(
            'DELETE',
            `/rooms/${roomId}`,
            { action_type: actionType },
          );
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MESSAGES);
          context.getNodeParameter.mockReturnValueOnce(roomId);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/messages?force=1`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages (POST)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.SEND_MESSAGE);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const message = 'Hello World!';
          context.getNodeParameter.mockReturnValueOnce(message);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('POST', `/rooms/${roomId}/messages`, { body: message });
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages/:messageId (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MESSAGE_DETAIL);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const messageId = 'message-id';
          context.getNodeParameter.mockReturnValueOnce(messageId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/messages/${messageId}`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages/:messageId (PUT)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.UPDATE_MESSAGE);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const messageId = 'message-id';
          const body = 'body';
          context.getNodeParameter
            .mockReturnValueOnce(messageId)
            .mockReturnValueOnce(body);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageIdProperty.name, 0);
          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('PUT', `/rooms/${roomId}/messages/${messageId}`, { body});
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/messages/:messageId (DELETE)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.DELETE_MESSAGE);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const messageId = 'message-id';
          context.getNodeParameter.mockReturnValueOnce(messageId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(MessageIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('DELETE', `/rooms/${roomId}/messages/${messageId}`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/members (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_MEMBERS);
          context.getNodeParameter.mockReturnValueOnce(roomId);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/members`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        (
          [
            [undefined, undefined, {}],
            [
              'membersMemberIds', undefined,
              {
                members_member_ids: 'membersMemberIds',
              },
            ],
            [
              'membersMemberIds', 'membersReadonlyIds',
              {
                members_member_ids: 'membersMemberIds',
                members_readonly_ids: 'membersReadonlyIds',
              },
            ],
          ] as Array<[string | undefined, string | undefined, Omit<IChangeAssociatedMembersPayload, 'members_admin_ids'>]>
        ).forEach(([membersMemberIds, membersReadonlyIds, expectedBody], index) => {
          it(`/members (PUT). Case ${index}`, async () => {
            const membersAdminIds = 'members-admins-ids';
            context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.CHANGE_ASSOCIATED_MEMBERS);
            context.getNodeParameter.mockReturnValueOnce(roomId);
            context.getNodeParameter
              .mockReturnValueOnce(membersAdminIds)
              .mockReturnValueOnce(membersMemberIds)
              .mockReturnValueOnce(membersReadonlyIds);

            const result = await chatworkNode.execute.call(context);

            expect(context.getNodeParameter).toHaveBeenCalledWith(MembersAdminIdsProperty.name, 0);
            expect(context.getNodeParameter).toHaveBeenCalledWith(MembersMemberIdsProperty.name, 0);
            expect(context.getNodeParameter).toHaveBeenCalledWith(MembersReadonlyIdsProperty.name, 0);
            expect(mockChatworkApiRequest).toHaveBeenCalledWith(
              'PUT',
              `/rooms/${roomId}/members`,
              {
                members_admin_ids: membersAdminIds,
                ...expectedBody,
              },
            );
            expect(result).toEqual([[{ json: {} }]]);
          });
        });

        it('/tasks (GET)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_TASKS);
          context.getNodeParameter.mockReturnValueOnce(roomId);

          const result = await chatworkNode.execute.call(context);

          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        it('/tasks (POST)', async () => {
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.CREATE_TASK);
          context.getNodeParameter.mockReturnValueOnce(roomId);
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
          context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_TASK_DETAIL);
          context.getNodeParameter.mockReturnValueOnce(roomId);
          const taskId = 'task-id';
          context.getNodeParameter.mockReturnValueOnce(taskId);

          const result = await chatworkNode.execute.call(context);

          expect(context.getNodeParameter).toHaveBeenCalledWith(TaskIdProperty.name, 0);
          expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/tasks/${taskId}`, undefined);
          expect(result).toEqual([[{ json: {} }]]);
        });

        (
          [
            [123, '?account_id=123'],
            [undefined, ''],
          ] as Array<[number | undefined, string]>
        ).forEach(([accountId, expectedQueryParam], index) => {
          it(`/files (GET). Case ${index}`, async () => {
            context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_FILES);
            context.getNodeParameter.mockReturnValueOnce(roomId);
            context.getNodeParameter.mockReturnValueOnce(accountId);

            const result = await chatworkNode.execute.call(context);

            expect(context.getNodeParameter).toHaveBeenCalledWith(AccountIdProperty.name, 0);
            expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/files${expectedQueryParam}`, undefined);
            expect(result).toEqual([[{ json: {} }]]);
          });
        });

        (
          [
            [true, '?create_download_url=1'],
            [false, ''],
          ] as Array<[boolean, string]>
        ).forEach(([createDownloadUrl, expectedQueryParam], index) => {
          it(`/files/:fileId (GET). Case ${index}`, async () => {
            context.getNodeParameter.mockReturnValueOnce(RoomOptionsValue.GET_FILE_DETAIL);
            context.getNodeParameter.mockReturnValueOnce(roomId);
            const fileId = 'file-id';
            context.getNodeParameter.mockReturnValueOnce(fileId);
            context.getNodeParameter.mockReturnValueOnce(createDownloadUrl);

            const result = await chatworkNode.execute.call(context);

            expect(context.getNodeParameter).toHaveBeenCalledWith(FileIdProperty.name, 0);
            expect(context.getNodeParameter).toHaveBeenCalledWith(FileCreateDownloadUrl.name, 0);
            expect(mockChatworkApiRequest).toHaveBeenCalledWith('GET', `/rooms/${roomId}/files/${fileId}${expectedQueryParam}`, undefined);
            expect(result).toEqual([[{ json: {} }]]);
          });
        });

        it('/un-supported', async () => {
          context.getNodeParameter.mockReturnValueOnce('un-supported');

          await expect(chatworkNode.execute.call(context)).rejects.toThrow(new Error('un-supported operation is not supported.'));

          expect(mockChatworkApiRequest).not.toHaveBeenCalled();
        });
      });
    });

    describe('/un-supported', () => {
      it('/un-supported', async () => {
        context.getNodeParameter.mockReturnValueOnce('un-supported');

        await expect(chatworkNode.execute.call(context)).rejects.toThrow(new Error('un-supported resource is not supported.'));

        expect(mockChatworkApiRequest).not.toHaveBeenCalled();
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
      expect(mockChatworkApiRequest).toHaveBeenNthCalledWith(1, 'GET', `/my/${MyOptionsValue.STATUS}`, undefined);
      expect(mockChatworkApiRequest).toHaveBeenNthCalledWith(2, 'GET', `/my/${MyOptionsValue.STATUS}`, undefined);
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
