import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IRequestOptions,
} from 'n8n-workflow';
import { BASE_URL, CREDENTIAL } from './Constants';

export interface ISendMessagePayload {
  body: string;
}

export interface IUpdateRoomPayload {
  icon_preset: string;
  name?: string;
  description?: string;
}

export interface ICreateRoomTaskPayload {
  body: string;
  limit: number;
  to_ids: string;
}

export interface ICreateRoomPayload {
  name: string;
  members_admin_ids: string;
  description?: string;
  icon_preset: string;
  members_member_ids?: string;
  members_readonly_ids?: string;
}

export interface ILeaveOrDeleteRoomPayload {
  action_type: string;
}

export interface IChangeAssociatedMembersPayload {
  members_admin_ids: string;
  members_member_ids?: string;
  members_readonly_ids?: string;
}

export async function chatworkApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?:
    ISendMessagePayload
    | IUpdateRoomPayload
    | ICreateRoomTaskPayload
    | ICreateRoomPayload
    | ILeaveOrDeleteRoomPayload
    | IChangeAssociatedMembersPayload,
): Promise<IDataObject | IDataObject[]> {
  const options: IRequestOptions = {
    method,
    headers: {
      'User-Agent': 'n8n',
    },
    uri: '',
    json: true,
  };

  try {
    const credentials = await this.getCredentials(CREDENTIAL.TYPE);

    options.uri = `${BASE_URL}${endpoint}`;
    options.headers!['X-ChatWorkToken'] = credentials[CREDENTIAL.PROPERTY_NAME];

    if (body) {
      options.form = body;
    }
    return await this.helpers.request(options);
  } catch (error) {
    const httpError = error as Partial<{ statusCode: number; response: { body: { message: string } } }>;
    if (httpError.statusCode === 401) {
      // Return a clear error
      throw new Error('The Chatwork credentials are not valid!');
    }

    if (httpError.response && httpError.response.body && httpError.response.body.message) {
      // Try to return the error prettier
      throw new Error(`Chatwork error response [${httpError.statusCode}]: ${httpError.response.body.message}`);
    }

    // If that data does not exist for some reason return the actual error
    throw error;
  }
}
