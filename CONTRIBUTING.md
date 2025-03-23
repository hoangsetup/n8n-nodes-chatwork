# Contributing to n8n-nodes-chatwork

Great that you are here and you want to contribute to n8n-nodes-chatwork

## Contents

- [Directory Structure](#directory-structure)
- [Development Setup](#development-setup)
- [Development Cycle](#development-cycle)
- [TODO list](#todo-list)

## Directory Structure

The most important files

- [src/](/src) - Root resource
  - [assets/](/src/assets/) - Assets folder
    - [chatwork.png](/src/assets/chatwork.png) - Logo file
  - [credentials/](/src/credentials/) - Credentials folder
    - [Chatwork.credentials.ts](/src/credentials/Chatwork.credentials.ts) - Credentials of the node (Chatwork api key)
  - [nodes/](/src/nodes/) - Nodes folder
    - [Chatwork/](/src/nodes/Chatwork/) - Chatwork node folder
      - [Chatwork.node.ts](/src/nodes/Chatwork/Chatwork.node.ts) - Chatwork node definition
  - [shared/](/src/shared/) - Shared folder
    - [Constants.ts](/src/shared/Constants.ts) - Constants definition
    - [GenericFunction.ts](/src/shared/GenericFunction.ts) - Utility functions
- [gulpfile.js](./gulpfile.js) - Gulp script to copy icon file to dist folder
- [nodemon.json](./nodemon.json) - Nodemon configuration file
- [package.json](./package.json) - This file is used to give information to `npm` that allows it to identify the project as well as handle the project's dependencies
- [tsconfig.json](./tsconfig.json) - Specify base the root level files and the compiler options that requires to compile a TypeScript project.
- [tsconfig.build.json](./tsconfig.build.json) - Extends from [tsconfig.json](./tsconfig.json). Custom compiler options for production build.
- [tslint.json](./tslint.json) - [TSLint](https://palantir.github.io/tslint/) configuration

## Development Setup

If you want to change or extend `n8n-nodes-chatwork` you have to make sure that all needed dependencies are installed and the packages get linked correctly. Here a short guide on how that can be done:

### Requirements

- node version >= 14.x
- npm version >= 7.x

### Actual n8n-nodes-chatwork setup

> **IMPORTANT**: All the steps bellow have to get executed at least once to get the development setup up and running!

Now that everything the project requires to run is installed the project can be checked out and set up:

1. Clone the repository

    ```sh
    git clone git@github.com:hoangsetup/n8n-nodes-chatwork.git
    ```

2. Go into repository folder

    ```sh
    cd n8n-nodes-chatwork
    ```

3. Install all dependencies

    ```sh
    npm install
    ```

4. Build the code

    ```sh
    npm run build
    ```

5. Symlink the package folder

    ```sh
    cp package.* ./dist
    cd dist
    npm link
    ```
6. Install n8n globally

    ```
    npm install -g n8n
    ```

7. Create symbolic link

    ```sh
    cd ~./n8n/custom
    npm link n8n-nodes-chatwork
    ```

### Start

```sh
npm run n8n
```

## Development cycle

While iterating on n8n-nodes-chatwork modules code, you can run `npm run dev`. It will then automatically build your code, restart the backend on every change you make.

1. Start n8n-nodes-chatwork in development mode

    ```sh
    npm run dev
    ```

2. code, code, code

3. Create a workflow on your n8n local service (http://localhost:4567) to test your function.

4. Run all lint & tests

    ```sh
    npm run lint && npm run test
    ```

5. Commit code and create pull request

## TODO list

The list of Chatwork apis need to complete:

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
- `/incoming_requests` - You can access contact approval requests you received
  - [ ] `GET /incoming_requests` - You can get the list of contact approval request you received
  - [ ] `PUT /incoming_requests/{request_id}` - You can approve a contact approval request you received
  - [ ] `DELETE /incoming_requests/{request_id}` - You can decline a contact approval request you received

[Chatwork api documentation link](https://download.chatwork.com/ChatWork_API_Documentation.pdf)
