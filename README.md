# Task Manager App

AI-assisted task manager that lets users create projects, add tasks manually, or
generate step-by-step task lists from a prompt. The UI focuses on lightweight
project organization, while the API uses OpenAI to return structured task
breakdowns with user-friendly messages for unclear input.

<img width="500" height="500" alt="Screenshot 2026-01-20 at 01 12 55" src="https://github.com/user-attachments/assets/a75fe843-6b0a-4c06-9e9d-7fa70d506ab9" />
<img width="500" height="450" alt="Screenshot 2026-01-20 at 01 12 23" src="https://github.com/user-attachments/assets/d7d34596-e56c-49c9-b018-357335da1363" />


## MVP Features

- No Project UI
- Add a new project
- Generate tasks for a project (manual or AI-assisted)
- System prompt handles unclear or risky requests
- Delete tasks
- Delete projects
- Responsive UI
- Optimized images

## Upcoming / Possible MVP2 Features

- Drag and drop tasks
- Edit tasks
- Sort tasks by priority
- Data Persistence

## Project Structure

- `client/`: React + Vite frontend
- `server/`: Express backend API

## Requirements

- Node.js 18+ (recommended)
- npm
- OpenAI API key

## Environment Variables

Create a `.env` file in `server/`:

```
OPENAI_API_KEY=your_api_key_here
```

## Getting Started

### 1) Install Dependencies

```
cd server
npm install
```

```
cd client
npm install
```

### 2) Run the Server

From `server/`:

```
npm run dev
```

Server runs on `http://localhost:3005`.

### 3) Run the Client

From `client/`:

```
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`).

## API

`POST /generate`

Request body:

```json
{ "prompt": "Plan a product launch" }
```

## Scripts

### Client (`client/`)

- `npm run dev`: start Vite dev server
- `npm run build`: typecheck + production build
- `npm run lint`: run ESLint
- `npm run test`: run Jest tests
- `npm run preview`: preview production build

### Server (`server/`)

- `npm run dev`: start server with nodemon
- `npm start`: start server

## Notes

- The client calls `http://localhost:3005/generate`.
- Ensure the server is running before using AI task generation.
