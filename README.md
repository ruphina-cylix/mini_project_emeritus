# Task and Productivity Manager

This is a simple, responsive task manager built for Mini Project 1. It shows 20 sample tasks from JSONPlaceholder, lets you search and filter them, and lets you mark tasks as completed during your current visit.

## Features and routes

| Route | What it shows |
| --- | --- |
| `/` | Dashboard with task counts and the next tasks to do. |
| `/tasks` | Searchable task list with All, To do, and Completed filters. |
| `/tasks/:id` | A single task's title, status, assigned user, and completion button. |

The completion button updates React state shared across the routes. JSONPlaceholder is a read-only sample data source for this app, so changes are **temporary** and reset when the page is refreshed. There is no account or permanent task storage.

## Public API and data states

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/):

- `GET /todos?_limit=20` loads the dashboard and task list.
- `GET /todos/:id` loads a task detail page.

TanStack Query manages these requests and caches them under `['todos', { limit: 20 }]` and `['todo', id]`. The app shows a loading message while fetching, an error message with a **Try again** button when a request fails, and an empty message if the list is empty or a search has no matches. A missing task ID shows **Task not found**. Queries use a 60-second stale time and do not automatically retry errors.

## Screenshots

### Dashboard (`/`)

![Dashboard showing task counts and next tasks](docs/screenshots/dashboard.png)

### Tasks (`/tasks`, mobile width)

![Mobile task list with search, filter, and task cards](docs/screenshots/tasks-mobile.png)

### Task detail (`/tasks/1`)

![Task detail showing task status and completion button](docs/screenshots/task-detail.png)

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/ruphina-cylix/mini_project_emeritus.git
cd mini_project_emeritus
npm install
npm run dev
```

Open the local address printed by Vite. The GitHub repository is private, so access is required to clone it.

Useful checks:

```bash
npm run lint
npm run build
```

## Tech stack

React, React Router, TanStack Query, Tailwind CSS, Vite, and ESLint.
