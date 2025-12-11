import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, getById } from "../services/discogService"; 


export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async ({ query, page, limit, signal}, { rejectWithValue }) => {
    try {
      const data = await getAll(query, page, limit, signal); 
      return data; 
    } catch (error) {
      if (error.name === 'AbortError') {
         return rejectWithValue('ABORTED');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAlbumById = createAsyncThunk(
  "albums/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    list: [],
    total: 0,
    selectedItem: null,
    
    loadingList: false,
    errorList: null,
    
    loadingItem: false,
    errorItem: null,
  },
  reducers: {
    
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.errorItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAlbums.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        if (action.payload === 'ABORTED') {
          console.log("Previous request cancelled intentionally");
          return; 
        }
        state.loadingList = false;
        state.errorList = action.payload || "Failed to fetch";
      })


      .addCase(fetchAlbumById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchAlbumById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || "Failed to fetch item";
      });
  },
});

export const { clearSelectedItem } = albumsSlice.actions;
export default albumsSlice.reducer;