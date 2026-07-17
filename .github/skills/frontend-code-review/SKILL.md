---
name: frontend-code-review
description: Review React.js client code for bugs, security issues, and maintainability.
---

# Purpose

Review frontend code only.

Focus on:

- client/

## Stack

- React.js
- Functional components
- React Hooks API
- Zustand
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

- React Hooks misuse
- Incorrect component state handling
- Unnecessary re-renders
- Memory leaks
- Incorrect effect dependencies
- Broken component composition
- Accessibility issues
- Unsafe rendering
- Client-side security issues
- Error handling problems

## React

- Use functional components with Hooks.
- Do not suggest class components unless requested.
- Follow React Hooks best practices.
- Preserve existing component patterns.

## State Management

- Assume Zustand is used for global state.
- Review store usage, selectors, and state updates.
- Do not recommend Redux, MobX, Context API, or alternatives unless requested.

## Performance

Do not suggest performance optimizations unless explicitly requested.

## Responses

- Explain why each recommendation improves correctness, security, or maintainability.
- Keep suggestions consistent with the existing architecture.
