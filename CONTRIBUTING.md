# Contributing to n8n-nodes-chatwork

Thank you for your interest in contributing to **n8n-nodes-chatwork** 🎉  
This repository provides an **n8n community node** for integrating with the **ChatWork API**.

This document follows the official **n8n community node contribution guidelines** and explains how to set up the project, follow conventions, and contribute effectively.

---

## Contents

- [Project Principles](#project-principles)
- [Development Setup](#development-setup)
- [Development Cycle](#development-cycle)
- [Coding Conventions](#coding-conventions)
- [Submitting Changes](#submitting-changes)
- [References](#references)

---

## Project Principles

This project follows n8n community node best practices:

- Uses **n8n v1+ routing-based node architecture**
- Avoids large `execute()` logic when possible
- Uses declarative `routing.request` definitions
- Keeps node UX consistent with official n8n nodes
- Maintains backward compatibility when possible

---

## Development Setup

### Requirements

- **Node.js** ≥ 18.x
- **npm** ≥ 8.x
- **n8n** ≥ 1.x

### Local Setup

```shell
git clone https://github.com/hoangsetup/n8n-nodes-chatwork.git
cd n8n-nodes-chatwork
npm ci
```

---

## Development Cycle

Use watch mode for development:

```shell
npm run dev
```

Workflow:

1. Update routing or properties
2. Test in n8n UI (http://localhost:5678)
3. Run lint/tests
4. Commit and submit PR

### Coding Conventions

This project strictly follows routing-based node conventions.

#### ✅ Preferred (Routing-based)

```typescript
routing: {
  request: {
    method: 'GET',
      url: '/me',
  },
}
```

#### ❌ Avoid (Imperative execution)

```typescript
async execute() {
// avoid complex logic here
}
```

#### Naming rules

- **resource**: noun (`room`, `contact`)
- **operation**: verb phrase (`getAll`, `sendMessage`)
- UI labels must be **human-readable**
- Operation `value` must be **stable**

#### Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Ensure:
   - Lint passes
   - Node loads without warnings
   - Routing-based implementation is used
4. Submit a pull request with a clear description

---

## References

- [n8n Community Node Guidelines](https://docs.n8n.io/integrations/community-nodes/)
- [Creating Nodes in n8n](https://docs.n8n.io/integrations/creating-nodes/)
- [ChatWork API Documentation](https://download.chatwork.com/ChatWork_API_Documentation.pdf)
