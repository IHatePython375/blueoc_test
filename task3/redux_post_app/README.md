# Redux Posts App

A compact React + Redux Toolkit application that retrieves, displays, and creates posts using the [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) API.

Developed as a submission for a technical coding test.

## Overview

This app showcases a clean Redux workflow for API-driven data:

* Fetching a list of posts on load
* Adding new posts through a controlled form
* Handling loading, error, and empty states
* Using optimistic UI updates for a more responsive feel
* Implementing simple client-side search

## Features

* Fetches posts from `GET /posts` on mount
* `PostForm` component with controlled inputs to create new posts (`POST /posts`)
* Uses Redux Toolkit `createSlice` and `createAsyncThunk` for all state management and async logic
* Handles loading, error, and empty UI states
* Implements optimistic add (new post appears instantly, syncs with server response, and rolls back on failure)
* Displays the most recently added post at the top
* Supports searching/filtering posts by title
* Allows retry on fetch failure
* Keeps a small, focused component tree


## Tech Stack

* **React 18** (functional components + hooks)
* **Redux Toolkit** (`@reduxjs/toolkit`)
* **React Redux** (`useSelector`, `useDispatch`)
* **Create React App** (zero-config build tooling)
* Plain CSS — no UI library


## Project Structure

```text
src/
├── components/
│   ├── PostForm.js      // Controlled form, dispatches addPost
│   ├── PostList.js      // Connects to store, renders list + search + states
│   ├── PostItem.js      // Presentational post card
│   └── SearchBar.js     // Controlled search input
├── redux/
│   ├── store.js         // configureStore
│   └── postsSlice.js    // State, thunks (fetchPosts, addPost), selectors
├── App.js               // Layout: header + form + list
├── App.css              // Component styles
├── index.js             // React entry + Redux <Provider>
└── index.css            // Global base styles


## Architecture Decisions

* **Redux Toolkit** was used to reduce Redux boilerplate and keep async/API state handling clean with `createAsyncThunk` and `createSlice`.
* **Single `postsSlice`** was enough for this app because all core behavior revolves around one resource: posts.
* **Optimistic UI + local search** were chosen to improve UX while keeping the app simple and aligned with the JSONPlaceholder API limitations.

## Setup & Run

Requires Node.js 16+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

The app will open at `http://localhost:3000`.

To build for production:

```bash
npm run build
```

---

## Trade-offs & Assumptions

* **JSONPlaceholder doesn’t persist data.** POST responses aren’t saved; refresh resets the list.
* **No routing.** Kept as a simple single-page app.
* **No tests.** Focused on core features; would add tests in a real project.
* **No TypeScript.** Used ES6 per requirements.
* **No pagination or debounce.** Dataset is small and filtering is lightweight.
* **`userId` fixed to 1.** No auth needed for this task.


## What I'd Add With More Time

* Unit tests for the slice (`fetchPosts`, `addPost` happy/error paths, optimistic rollback)
* Component tests for `PostForm` (validation, submit, error display)
* Edit / delete flows (PUT / DELETE)
* Pagination or infinite scroll

