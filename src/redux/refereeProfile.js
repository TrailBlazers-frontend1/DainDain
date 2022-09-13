import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
   refereeProfile:{

   }
    
}

export const refreeProfileSlice = createSlice({
  name: 'refreeProfile',
  initialState,
  reducers: {
    setRefereeProfile:(state,action) => {
        state.refereeProfile = action.payload
    },
}
})

// Action creators are generated for each case reducer function
export const { setRefereeProfile } = refreeProfileSlice.actions

export default refreeProfileSlice.reducer