---
name: backend-code-review
description: Review Node.js and Express.js backend code for bugs, security issues, and maintainability.
---

# Purpose

Review backend code only.

Focus on:

- api/
- server.js
- db/
- util/

## Stack

- Node.js
- Express.js
- PostgreSQL
- pg-promise
- ES Modules (`import` / `export`)

Assume this stack unless specified otherwise.

## Repository Rules

- Respect `.gitignore` rules for project files.
- Ignore `.gitignore` exclusions only for `skill.md` files.
- Do not analyze ignored files unless explicitly requested.
- Avoid unnecessary refactors.

## Review Priorities

Prioritize:

1. Correctness
2. Bugs
3. Security
4. Maintainability

Check for:

- Authentication and authorization flaws
- Input validation issues
- SQL injection risks
- Unsafe database queries
- Error handling problems
- Async/await issues
- Race conditions
- Improper resource handling
- Configuration/security issues

## Database

- Assume PostgreSQL accessed through pg-promise.
- Prefer parameterized SQL queries.
- Prefer PostgreSQL-native solutions.
- Do not recommend ORMs unless explicitly requested.

## JavaScript

- Use modern ES Modules.
- Do not suggest CommonJS unless requested.
- Follow modern Node.js best practices.

## Performance

Do not suggest performance optimizations unless explicitly requested.

## Responses

- Explain why each recommendation improves correctness, security, or maintainability.
- Keep suggestions consistent with the existing architecture.
