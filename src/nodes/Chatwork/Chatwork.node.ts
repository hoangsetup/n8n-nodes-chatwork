import {
  IExecuteFunctions,
  IHttpRequestMethods,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';
import { chatworkApiRequest } from '../../shared/GenericFunctions';
import {
  AccountIdProperty,
  ActionTypeProperty,
  BodyProperty,
  ContactProperty,
  DescriptionProperty,
  FileCreateDownloadUrl,
  FileIdProperty,
  IconPresetProperty,
  LimitProperty,
  MembersAdminIdsProperty,
  MembersMemberIdsProperty,
  MembersReadonlyIdsProperty,
  MeProperty,
  MessageIdProperty,
  MessageProperty,
  MyProperty,
  NameProperty,
  NameRequiredProperty,
  ResourceOptionsValue,
  ResourceProperty,
  RoomIdProperty,
  RoomOptionsValue,
  RoomProperty,
  TaskIdProperty,
  ToIdsProperty,
} from './properties';

export class Chatwork implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chatwork',
    name: 'chatwork',
    subtitle: '={{$parameter["resource"].toTitleCase() + ": " + $parameter["operation"].toTitleCase()}}',
    icon: 'file:../../assets/chatwork.png',
    group: ['transform'],
    version: 1,
    description: 'Retrieve data from Chatwork API.',
    defaults: {
      name: 'Chatwork',
      color: '#EF3646',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'chatworkApi',
        required: true,
      },
    ],
    properties: [
      ResourceProperty,
      MeProperty,
      MyProperty,
      ContactProperty,
      RoomProperty,
      RoomIdProperty,
      MessageProperty,
      NameProperty,
      NameRequiredProperty,
      DescriptionProperty,
      IconPresetProperty,
      MessageIdProperty,
      TaskIdProperty,
      BodyProperty,
      LimitProperty,
      ToIdsProperty,
      AccountIdProperty,
      FileIdProperty,
      FileCreateDownloadUrl,
      MembersAdminIdsProperty,
      MembersMemberIdsProperty,
      MembersReadonlyIdsProperty,
      ActionTypeProperty,
    ],
  };


  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnItems: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      let method: IHttpRequestMethods = 'GET';
      let endpoint = '';
      let body: Parameters<typeof chatworkApiRequest>[2];
      const resource = this.getNodeParameter('resource', itemIndex) as ResourceOptionsValue;

      if (resource === ResourceOptionsValue.ME) {
        endpoint += '/me';
      } else if (resource === ResourceOptionsValue.CONTACTS) {
        endpoint += '/contacts';
      } else if (resource === ResourceOptionsValue.MY) {
        const operation = this.getNodeParameter('operation', itemIndex);
        endpoint += `/my/${operation}`;
      } else if (resource === ResourceOptionsValue.ROOMS) {
        endpoint += '/rooms';
        const operation = this.getNodeParameter('operation', itemIndex) as RoomOptionsValue;

        if (![RoomOptionsValue.GET_ALL, RoomOptionsValue.CREATE].includes(operation)) {
          const roomId = this.getNodeParameter(RoomIdProperty.name, itemIndex) as number;
          endpoint += `/${roomId}`;
        }

        switch (operation) {
          case RoomOptionsValue.GET_ALL:
            break;
          case RoomOptionsValue.GET_DETAIL:
            break;
          case RoomOptionsValue.CREATE: {
            method = 'POST';
            const name = this.getNodeParameter(NameRequiredProperty.name, itemIndex) as string;
            const membersAdminIds = this.getNodeParameter(MembersAdminIdsProperty.name, itemIndex) as string;
            const description = this.getNodeParameter(DescriptionProperty.name, itemIndex) as string;
            const iconPreset = this.getNodeParameter(IconPresetProperty.name, itemIndex) as string;
            const membersMemberIds = this.getNodeParameter(MembersMemberIdsProperty.name, itemIndex) as string;
            const membersReadonlyIds = this.getNodeParameter(MembersReadonlyIdsProperty.name, itemIndex) as string;

            body = {
              name,
              members_admin_ids: membersAdminIds,
              icon_preset: iconPreset,
            };
            if (description) {
              body.description = description;
            }
            if (membersMemberIds) {
              body.members_member_ids = membersMemberIds;
            }
            if (membersReadonlyIds) {
              body.members_readonly_ids = membersReadonlyIds;
            }
            break;
          }
          case RoomOptionsValue.UPDATE_INFO: {
            method = 'PUT';
            const description = this.getNodeParameter(DescriptionProperty.name, itemIndex) as string;
            const name = this.getNodeParameter(NameProperty.name, itemIndex) as string;
            const iconPreset = this.getNodeParameter(IconPresetProperty.name, itemIndex) as string;
            body = {
              icon_preset: iconPreset,
            } as unknown as { name?: string, description?: string, icon_preset: string };
            if (description) {
              body.description = description;
            }
            if (name) {
              body.name = name;
            }
            break;
          }
          case RoomOptionsValue.LEAVE_OR_DELETE: {
            method = 'DELETE';
            const actionType = this.getNodeParameter(ActionTypeProperty.name, itemIndex) as string;
            body = { action_type: actionType };
            break;
          }
          case RoomOptionsValue.GET_MESSAGES:
            endpoint += '/messages?force=1';
            break;
          case RoomOptionsValue.SEND_MESSAGE: {
            method = 'POST';
            endpoint += '/messages';
            const message = this.getNodeParameter(MessageProperty.name, itemIndex) as string;
            body = { body: message };
            break;
          }
          case RoomOptionsValue.GET_MESSAGE_DETAIL: {
            const messageId = this.getNodeParameter(MessageIdProperty.name, itemIndex) as string;
            endpoint += `/messages/${messageId}`;
            break;
          }
          case RoomOptionsValue.UPDATE_MESSAGE: {
            method = 'PUT';
            const messageId = this.getNodeParameter(MessageIdProperty.name, itemIndex) as string;
            const message = this.getNodeParameter(MessageProperty.name, itemIndex) as string;
            endpoint += `/messages/${messageId}`;
            body = { body: message }
            break;
          }
          case RoomOptionsValue.DELETE_MESSAGE: {
            const messageId = this.getNodeParameter(MessageIdProperty.name, itemIndex) as string;
            method = 'DELETE';
            endpoint += `/messages/${messageId}`;
            break;
          }
          case RoomOptionsValue.GET_MEMBERS:
            endpoint += '/members';
            break;
          case RoomOptionsValue.CHANGE_ASSOCIATED_MEMBERS: {
            method = 'PUT';
            endpoint += '/members';
            const membersAdminIds = this.getNodeParameter(MembersAdminIdsProperty.name, itemIndex) as string;
            const membersMemberIds = this.getNodeParameter(MembersMemberIdsProperty.name, itemIndex) as string;
            const membersReadonlyIds = this.getNodeParameter(MembersReadonlyIdsProperty.name, itemIndex) as string;

            body = {
              members_admin_ids: membersAdminIds,
            };
            if (membersMemberIds) {
              body.members_member_ids = membersMemberIds;
            }
            if (membersReadonlyIds) {
              body.members_readonly_ids = membersReadonlyIds;
            }
            break;
          }
          case RoomOptionsValue.GET_TASKS:
            endpoint += '/tasks';
            break;
          case RoomOptionsValue.CREATE_TASK:
            method = 'POST';
            endpoint += '/tasks';
            body = {
              body: this.getNodeParameter(BodyProperty.name, itemIndex) as string,
              limit: Math.round(
                (new Date(this.getNodeParameter(LimitProperty.name, itemIndex) as string)).valueOf() / 1000,
              ),
              to_ids: this.getNodeParameter(ToIdsProperty.name, itemIndex) as string,
            };
            break;
          case RoomOptionsValue.GET_TASK_DETAIL: {
            const taskId = this.getNodeParameter(TaskIdProperty.name, itemIndex);
            endpoint += `/tasks/${taskId}`;
            break;
          }
          case RoomOptionsValue.GET_FILES: {
            const accountId = this.getNodeParameter(AccountIdProperty.name, itemIndex);
            endpoint += `/files${accountId ? `?account_id=${accountId}`: ''}`;
            break;
          }
          case RoomOptionsValue.GET_FILE_DETAIL: {
            const fileId = this.getNodeParameter(FileIdProperty.name, itemIndex);
            const fileCreateDownloadUrl = this.getNodeParameter(FileCreateDownloadUrl.name, itemIndex);
            endpoint += `/files/${fileId}${fileCreateDownloadUrl ? '?create_download_url=1' : ''}`;
            break;
          }
          default:
            throw new Error(`${operation} operation is not supported.`);
        }
      } else {
        throw new Error(`${resource} resource is not supported.`);
      }

      const response = await chatworkApiRequest.call(this, method, endpoint, body);

      if (Array.isArray(response)) {
        returnItems.push(...response as INodeExecutionData[]);
      } else {
        returnItems.push({ json: response });
      }
    }

    if (returnItems.some((i) => i.json !== undefined)) {
      return [returnItems];
    } else {
      return [this.helpers.returnJsonArray(returnItems)];
    }
  }
}
