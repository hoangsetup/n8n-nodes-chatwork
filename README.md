![CI](https://github.com/hoangsetup/n8n-nodes-chatwork/workflows/CI/badge.svg)

# n8n-nodes-chatwork

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is a n8n community node. It lets you use ChatWork in your n8n workflows.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations/Apis

- `/me` - Used to access your account information
  - [x] `GET /me` - Get your account information
- `/my` - Used to access your data on the account.
  - [x] `GET /my/status` - Get the number of: unread messages, unread To messages, and unfinished tasks.
  - [x] `GET /my/task` - Get the list of all unfinished tasks.
- `/contacts` - Used to access the list of your contacts
  - [x] `GET /contacts` - Get the list of your contacts
- `/rooms` - Used to access information such as messages, members, files, and tasks associated to a specific conversation.
  - [x] `GET /rooms` - Get the list of all chats on your account
  - [x] `POST /rooms` - Create a new group chat
  - [x] `GET /rooms/{room_id}` - Get chat name, icon, and Type (my, direct, or group)
  - [x] `PUT /rooms/{room_id}` - Change the title and icon type of the specified chat
  - [x] `DELETE /rooms/{room_id}` - Leave/Delete a group chat
  - [x] `GET /rooms/{room_id}/members` - Get the list of all chat members associated with the specified chat
  - [x] `PUT /rooms/{room_id}/members` - Change associated members of group chat at once
  - [x] `GET /rooms/{room_id}/messages` - Get all messages associated with the specified chat
  - [x] `POST /rooms/{room_id}/messages` - Add new message to the chat
  - [x] `GET /rooms/{room_id}/messages/{message_id}` - Get information about the specified message
  - [x] `PUT /rooms/{room_id}/messages/{message_id}` - Update the specified message
  - [x] `DELETE /rooms/{room_id}/messages/{message_id}` - Delete the specified message
  - [x] `GET /rooms/{room_id}/tasks` - Get the list of tasks associated with the specified chat
  - [x] `POST /rooms/{room_id}/tasks` - Add a new task to the chat
  - [x] `GET /rooms/{room_id}/tasks/{task_id}` - Get information about the specified task
  - [x] `GET /rooms/{room_id}/files` - Get the list of files associated with the specified chat
  - [x] `GET /rooms/{room_id}/files/{file_id}` - Get information about the specified file

## Credentials

- [ChatWork Api Key](https://help.chatwork.com/hc/ja/articles/115000172402-API%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B)
