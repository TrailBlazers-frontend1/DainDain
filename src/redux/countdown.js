import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

export const isMorningOrEvening = () => {
    var dt = new Date();//current Date that gives us current Time also

    var startTime1 = '06:00:00';
    var endTime1 = '12:00:00';
    var startTime2 = "12:30:00";
    var endTime2 = "16:00:00"

    var s1 =  startTime1.split(':');
    var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
                    parseInt(s1[0]), parseInt(s1[1]), parseInt(s1[2]));

    var e1 =  endTime1.split(':');
    var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
                    dt.getDate(),parseInt(e1[0]), parseInt(e1[1]), parseInt(e1[2]));

    var s2 =  startTime2.split(':');
    var dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
    parseInt(s2[0]), parseInt(s2[1]), parseInt(s2[2]));

    var e2 =  endTime2.split(':');
    var dt4 = new Date(dt.getFullYear(), dt.getMonth(),
                    dt.getDate(),parseInt(e2[0]), parseInt(e2[1]), parseInt(e2[2]));

    const isMorningRound = dt >= dt1 && dt <= dt2
    const isEveningRound = dt >= dt3 && dt <= dt4
    return ({isMorningRound,isEveningRound})
}

const initialState = {
    remaining_time:{
        hours:"",
        minutes:"",
        seconds:""
    },
    morning_evening:{
        morning:false,
        evening:false
    }
   
}

export const countdownSlice = createSlice({
    name: 'countdown',
    initialState,
    reducers: {
      countdown:(state,action) => {
        state.remaining_time = action.payload
      },
      changeRound:(state,action) => {
        if(action.payload === "morning"){
            state.morning_evening.morning = true
        } 
        if(action.payload){
          console.log(action.payload === "evening")
            state.morning_evening.evening = true
        } 
      },
      resetRound:(state,action) => {
        state.morning_evening = initialState
      }
    },
})

export const { countdown, changeRound,resetRound } = countdownSlice.actions

export default countdownSlice.reducer

