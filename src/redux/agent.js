import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    agent_list:[
        {name:"Agent 1",phNo:'0976682966',remainingAmount:"100000"},
        {name:"Agent 2",phNo:'0922589988',remainingAmount:"200000"},
    ]   
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {  } = agentSlice.actions

export default agentSlice.reducer