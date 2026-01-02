import { INodeProperties } from 'n8n-workflow';
import * as crypto from 'crypto';

export function withDisplayOptions(properties: INodeProperties[], displayOptions: INodeProperties['displayOptions']): INodeProperties[] {
  return properties.map((p) => ({
    ...p,
    displayOptions,
  }));
}

export function verifyChatworkSignature(
  rawBody: Buffer,
  signature: string,
  tokens: string[],
): boolean {
  for (const token of tokens) {
    if (!token) continue;

    try {
      const secretKey = Buffer.from(token.trim(), 'base64');

      const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(rawBody)
        .digest('base64');

      if (
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature),
          Buffer.from(signature),
        )
      ) {
        return true;
      }
    } catch {
      // Ignore malformed tokens and continue
    }
  }

  return false;
}
