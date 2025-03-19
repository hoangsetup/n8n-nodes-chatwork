import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { ResourceOptionsValue } from './Resource';
import { RoomOptionsValue } from './Room';

export const IconPresetProperty: INodeProperties = {
  displayName: 'Icon type',
  name: 'iconPreset',
  type: 'options',
  default: 'group',
  displayOptions: {
    show: {
      resource: [
        ResourceOptionsValue.ROOMS,
      ],
      operation: [
        RoomOptionsValue.CREATE,
        RoomOptionsValue.UPDATE_INFO,
      ],
    },
  },
  options: [
    'group', 'check', 'document', 'meeting', 'event',
    'project', 'business', 'study', 'security', 'star',
    'idea', 'heart', 'magcup', 'beer', 'music', 'sports', 'travel'
  ].map<INodePropertyOptions>((v) => ({ name: v, value: v })),
  description: 'Type of the group chat icon',
};
