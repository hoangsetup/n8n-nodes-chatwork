import { INodeProperties } from 'n8n-workflow';
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
        RoomOptionsValue.UPDATE_INFO,
      ],
    },
  },
  options: [
    { 'name': 'Group', 'value': 'group' },
    { 'name': 'Check', 'value': 'check' },
    { 'name': 'Document', 'value': 'document' },
    { 'name': 'Meeting', 'value': 'meeting' },
    { 'name': 'Event', 'value': 'event' },
    { 'name': 'Project', 'value': 'project' },
    { 'name': 'Business', 'value': 'business' },
    { 'name': 'Study', 'value': 'study' },
    { 'name': 'Security', 'value': 'security' },
    { 'name': 'Star', 'value': 'star' },
    { 'name': 'Idea', 'value': 'idea' },
    { 'name': 'Heart', 'value': 'heart' },
    { 'name': 'Magcup', 'value': 'magcup' },
    { 'name': 'Beer', 'value': 'beer' },
    { 'name': 'Music', 'value': 'music' },
    { 'name': 'Sports', 'value': 'sports' },
    { 'name': 'Travel', 'value': 'travel' },
  ],
  placeholder: '',
  description: 'Type of the group chat icon',
};
