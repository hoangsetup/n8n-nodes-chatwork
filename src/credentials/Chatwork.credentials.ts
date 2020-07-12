import {
  ICredentialType,
  NodePropertyTypes,
} from 'n8n-workflow';
import { CREDENTIAL } from '../shared/Constants';


export class Chatwork implements ICredentialType {
  displayName = 'Chatwork API';
  name = CREDENTIAL.TYPE;
  properties = [
    // The credentials to get from user and save encrypted.
    // Properties can be defined exactly in the same way
    // as node properties.
    {
      displayName: 'Api token',
      name: CREDENTIAL.PROPERTY_NAME,
      type: 'string' as NodePropertyTypes,
      default: '',
    },
  ];
}
