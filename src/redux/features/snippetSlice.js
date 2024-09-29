import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Async action to save a new snippet
export const saveSnippet = createAsyncThunk(
  "snippets/saveSnippet",
  async (snippetData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/snippets`,
        snippetData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're storing JWT in localStorage
          },
        }
      );
      return response.data.snippet;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to fetch user's snippets
export const fetchSnippets = createAsyncThunk(
  "snippets/fetchSnippets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/snippets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.snippets;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to delete a snippet
export const deleteSnippet = createAsyncThunk(
  "snippets/deleteSnippet",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/snippets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const snippetSlice = createSlice({
  name: "snippets",
  initialState: {
    snippets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets.push(action.payload);
      })
      .addCase(saveSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload;
      })
      .addCase(fetchSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.snippets = state.snippets.filter(
          (snippet) => snippet._id !== action.payload
        );
      });
  },
});

export default snippetSlice.reducer;
