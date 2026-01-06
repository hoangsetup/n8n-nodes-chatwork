import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { chatworkApiRequest } from '../shared/transport';

type ContactResponse = {
  account_id: number;
  name: string;
};

export async function getContacts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const contacts = await chatworkApiRequest.call(
    this,
    'GET',
    '/contacts',
  ) as ContactResponse[];
  const me = await chatworkApiRequest.call(
    this,
    'GET',
    '/me',
  ) as ContactResponse;


  return [
    { ...me, name: 'Me' },
    ...contacts,
  ]
    .map((contact) => ({
      name: `${contact.name || '(No name)'} [${contact.account_id}]`,
      value: contact.account_id,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
