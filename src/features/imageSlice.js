import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImage = createAsyncThunk(
  'image/fetchImage',
  async () => {
    const baseUrl = window.location.origin;
    const response = await fetch(`${baseUrl}/wp-json/jess-block-scaffold-experiments/v1/open/29453`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.image;
  }
);

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    data: null,
    isLoading: true,
    error: null,
    isTransitioning: false
  },
  reducers: {
    startTransition: (state) => {
      state.isTransitioning = true;
    },
    endTransition: (state) => {
      state.isTransitioning = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        if (state.data !== action.payload) {
          state.data = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { startTransition, endTransition } = imageSlice.actions;
export default imageSlice.reducer;
