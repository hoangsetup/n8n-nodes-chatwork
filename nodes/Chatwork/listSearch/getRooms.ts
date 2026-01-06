import { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { chatworkApiRequest } from '../shared/transport';

type RoomResponse = {
  room_id: number;
  name: string;
};

export async function getRooms(
  this: ILoadOptionsFunctions,
  query?: string,
): Promise<INodeListSearchResult> {
  const rooms = await chatworkApiRequest.call(
    this,
    'GET',
    '/rooms',
  ) as RoomResponse[];

  const normalizedQuery = query?.toLowerCase();

  return {
    results: rooms
      .filter((room) => {
        if (!normalizedQuery) return true;

        return (
          room.name?.toLowerCase().includes(normalizedQuery)
          || String(room.room_id).includes(normalizedQuery)
        );
      })
      .map((room) => ({
        name: `${room.name || '(No name)'} [${room.room_id}]`,
        value: room.room_id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}
