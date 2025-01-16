import { createSlice } from '@reduxjs/toolkit'

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    book: {}
  },
  reducers: {
    addBook: (state, action) => {
        console.log(action.payload)
      state.book = action.payload
    },
  }
})

export const { addBook } = bookSlice.actions

export default bookSlice.reducer