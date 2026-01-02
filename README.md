# n8n-nodes-chatwork

This is an n8n community node. It lets you use **ChatWork** in your n8n workflows.

**ChatWork** is a business chat platform that provides messaging, task management, file sharing, and team collaboration features via a REST API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

After installation, restart n8n to load the ChatWork node.

## Operations

This node supports the following ChatWork API operations:

### Me
- Get account information

### My
- Get status (unread counts, tasks)
- Get tasks assigned to the authenticated user

### Contacts
- Get contact list

### Rooms
- Get all rooms
- Get room details
- Create a room
- Update room information
- Leave or delete a room
- Get room members
- Change associated members
- Get messages
- Send a message
- Get message details
- Update a message
- Delete a message
- Get tasks
- Create a task
- Get task details
- Get files
- Get file details (with optional temporary download URL)

## Webhook Trigger

This package provides a **Chatwork Trigger** node that allows n8n workflows to receive events from Chatwork via webhooks.

### Supported Events

The trigger node listens to incoming Chatwork webhook events and routes them to different outputs:

| Event Type        | Output          |
|-------------------|-----------------|
| `mention_to_me`   | Mention To Me   |
| `message_created` | Message Created |
| `message_updated` | Message Updated |

### Webhook Security

Chatwork signs webhook requests using an HMAC-SHA256 signature.

The Chatwork Trigger node supports **optional signature verification** using one or more webhook tokens:

- Signature header: `x-chatworkwebhooksignature`
- Hash algorithm: HMAC-SHA256
- Secret key: Base64-decoded webhook token

> Signature verification can be disabled for local development and testing.


Each output can be connected independently in your workflow.

### Development Notes

- The workflow must be **active** for webhooks to be registered
- Webhooks will return `404 – unknown webhook` if the workflow is inactive
- Signature verification should be disabled when testing with manual `curl` requests

### Known Limitations

- Webhook events are currently processed **as-is**
- Duplicate or replayed webhook events are **not yet deduplicated**
- Replay protection and idempotency will be added in a future release

## Credentials

This node requires a **ChatWork API Token**.

### Prerequisites
- A ChatWork account
- An API token generated from your ChatWork account settings

### Setup
1. In n8n, go to **Credentials**
2. Create new credentials of type **ChatWork API**
3. Paste your ChatWork API token
4. Save the credentials and select them in the ChatWork node

Authentication is handled via the `X-ChatWorkToken` request header.

## Compatibility

- **Minimum n8n version**: 1.x
- **Tested with**: n8n 1.x (community nodes API v1)

This node uses the new **routing-based request system** introduced in n8n v1. Older n8n versions are not supported.

## Usage

Most operations are straightforward and map directly to ChatWork API endpoints.

Notes:
- Boolean options such as *Create download URL* control optional API query parameters.

If you are new to n8n, see the [Try it out](https://docs.n8n.io/try-it-out/) guide to get started.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [ChatWork API Documentation (PDF)](https://download.chatwork.com/ChatWork_API_Documentation.pdf)

## Version history

### 2.0.0
- Migrated to n8n routing-based request structure
- Improved Room operations
- Fixed message sending with multipart/form-data
- General refactoring and cleanup
