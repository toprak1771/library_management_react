import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { bookSlice } from "./bookSlice"

export default configureStore({
  reducer: {
    book: bookReducer
  }
})

// store.subscribe(() => console.log(store.getState()))