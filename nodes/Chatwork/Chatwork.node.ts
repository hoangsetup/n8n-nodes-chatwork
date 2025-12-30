import {
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';
import { resourceProperties } from './resources';

export class Chatwork implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chatwork',
    name: 'chatwork',
    subtitle: '={{$parameter["resource"].toUpperCase() + ": " + $parameter["operation"].toTitleCase()}}',
    icon: 'file:../../icons/Chatwork.svg',
    group: ['input'],
    version: 1,
    description: 'Retrieve data from Chatwork API.',
    defaults: {
      name: 'Chatwork',
    },
    usableAsTool: true,
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'chatworkApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.chatwork.com/v2',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
    properties: [
      ...resourceProperties,
    ],
  };
}
