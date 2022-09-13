import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    current_language : "english"
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLangauge:(state,action) => {
        state.current_language = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeLangauge } = languageSlice.actions

export default languageSlice.reducer