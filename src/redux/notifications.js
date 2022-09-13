import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    notifications : []
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications : (state,action) => {
        state.notifications = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNotifications } = notificationsSlice.actions

export default notificationsSlice.reducer