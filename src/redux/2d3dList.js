import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    twodList : [],
    lonePyineList : [],
    threedList : [],
}

export const twodThreedSlice = createSlice({
  name: 'twodThreedList',
  initialState,
  reducers: {
    setTwodList : (state,action) => {
        state.twodList = action.payload
    },
    setLonePyineList : (state,action) => {
        state.lonePyineList = action.payload
    },
    setThreedList : (state,action) => {
        state.threedList = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTwodList,setLonePyineList,setThreedList } = twodThreedSlice.actions

export default twodThreedSlice.reducer