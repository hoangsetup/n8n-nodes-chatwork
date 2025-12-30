import { INodeProperties } from 'n8n-workflow';

export function withDisplayOptions(properties: INodeProperties[], displayOptions: INodeProperties['displayOptions']): INodeProperties[] {
  return properties.map((p) => ({
    ...p,
    displayOptions,
  }));
}