import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    profile : {
      id:"",
      image:"",
      coin_amount:"",
      commission:"",
      refereeId:"",
      twod_sale_list:[],
      threed_sale_list:[],
      lonepyine_sale_list:[],
    }
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentProfile : (state,action) => {
      state.profile = action.payload
    },
    changeName: (state,action) => {
      state.profile.name = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAgentProfile, changeName } = agentSlice.actions

export default agentSlice.reducer