import {
  ApplicationError,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
  NodeConnectionType,
} from 'n8n-workflow';
import { INodeExecutionData } from 'n8n-workflow/dist/Interfaces';
import { verifyChatworkSignature } from './shared/utils';

export class ChatworkTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Chatwork Trigger',
    name: 'chatworkTrigger',
    icon: 'file:../../icons/Chatwork.svg',
    group: ['trigger'],
    version: 1,
    description: 'Receive events from Chatwork via webhook',
    defaults: {
      name: 'Chatwork Trigger',
    },
    inputs: [],
    outputs: [
      NodeConnectionType.Main,
      NodeConnectionType.Main,
      NodeConnectionType.Main,
    ],
    outputNames: [
      'Mention To Me',
      'Message Created',
      'Message Updated',
    ],
    usableAsTool: true,
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: '',
      },
    ],
    properties: [
      {
        displayName: 'Verify Webhook Signature',
        name: 'verifySignature',
        type: 'boolean',
        default: true,
        description: 'Whether to verify the Chatwork webhook signature',
      },
      {
        displayName: 'Webhook Tokens',
        name: 'webhookTokens',
        type: 'string',
        typeOptions: {
          password: true,
          multipleValues: true,
          multipleValueButtonText: 'Add Token',
        },
        default: [],
        displayOptions: {
          show: {
            verifySignature: [true],
          },
        },
        description:
          'Webhook token from Chatwork webhook settings (used for signature verification). One or more tokens. One token per line.',
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const verifySignature = this.getNodeParameter(
      'verifySignature',
      false,
    ) as boolean;
    if (verifySignature) {
      const req = this.getRequestObject();
      if (req.method !== 'POST') {
        throw new ApplicationError('Invalid HTTP method');
      }
      const signature = this.getHeaderData()['x-chatworkwebhooksignature'] as string | undefined;
      if (!signature) {
        throw new ApplicationError('Missing x-chatworkwebhooksignature header');
      }
      const rawBody = req.rawBody;
      if (!rawBody) {
        throw new ApplicationError('Missing raw request body');
      }
      const tokens = this.getNodeParameter('webhookTokens', []) as string[];
      if (tokens.length === 0) {
        throw new ApplicationError('No webhook tokens configured');
      }
      if (!verifyChatworkSignature(rawBody, signature, tokens)) {
        throw new ApplicationError('Invalid Chatwork webhook signature');
      }
    }

    const body = this.getBodyData() as { webhook_event_type: 'mention_to_me' | 'message_created' | 'message_updated' };

    const workflowData: INodeExecutionData[][] = [[], [], []];
    switch (body.webhook_event_type) {
      case 'mention_to_me':
        workflowData[0].push({ json: body });
        break;
      case 'message_created':
        workflowData[1].push({ json: body });
        break;
      case 'message_updated':
        workflowData[2].push({ json: body });
        break;
      default:
        return { noWebhookResponse: true };
    }

    return {
      workflowData,
    };
  }
}
