import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    user_register:{
        name:"",
        phNo:"",
        password:"",
        confirmPassword:""
    },
    user_login:{
      name:"",
      phNo:"",
      role:"",
      isLoggedIn : false,
    }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action) => {
       state.user_register = action.payload
    },
    login:(state,action) => {
      state.user_login = action.payload
    },
    logout:(state,action) => {
      state.user_login = initialState
     },
    promoteRole:(state,action) => {
      state.user_login.role = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { signup, login, logout, promoteRole } = userSlice.actions

export default userSlice.reducer