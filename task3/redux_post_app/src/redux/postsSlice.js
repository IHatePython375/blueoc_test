import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// addPost — generates a tempId upfront so it’s available in both pending and fulfilled states.
// The thunk argument ({ title, body, tempId }) lets both reducers access the same tempId via action.meta.arg.

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ title, body }, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  addStatus: 'idle',
  addError: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearAddError(state) {
      state.addError = null;
      state.addStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load posts';
      })

      .addCase(addPost.pending, (state, action) => {
        state.addStatus = 'loading';
        state.addError = null;
        const { tempId, title, body } = action.meta.arg;
        state.items.unshift({
          id: tempId,
          userId: 1,
          title,
          body,
          _optimistic: true,
        });
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        const { tempId } = action.meta.arg;
        const index = state.items.findIndex((p) => p.id === tempId);
        if (index !== -1) {
          state.items[index] = { ...action.payload, _justAdded: true };
        }
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = action.payload || 'Failed to add post';
        const { tempId } = action.meta.arg;
        state.items = state.items.filter((p) => p.id !== tempId);
      });
  },
});

export const { clearAddError } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectAddStatus = (state) => state.posts.addStatus;
export const selectAddError = (state) => state.posts.addError;

export default postsSlice.reducer;