import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./features/albumSlice"

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    
  },
});

