import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

export const isMorningOrEvening = () => {
    var dt = new Date();//current Date that gives us current Time also

    
    var startTime1 = '06:00:00';
    var endTime1 = '12:30:00';
    var startTime2 = "12:30:00";
    var endTime2 = "24:00:00"

    if(dt.getDay() === 6 || dt.getDay() === 7){
      isMorningRound = false
      isEveningRound = false
      return ({isEveningRound,isEveningRound})
    }

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

    var isMorningRound = dt >= dt1 && dt <= dt2
    var isEveningRound = dt >= dt3 && dt <= dt4
    return ({isMorningRound,isEveningRound})
}

export const threeDCountDown = () => {
  const now = new Date()
  const date1 = new Date(now.getFullYear(),now.getMonth(),16,14)
  const date2 = new Date(now.getFullYear(),now.getMonth() + 1,1,14)

  const A = new Date(now.getFullYear(),now.getMonth(),1,14)
  const B = new Date(now.getFullYear(),now.getMonth()-1,16,14)
  // console.log(date1,date2,A,B)
  // console.log(now)
  let diffInTime
  if(now < date1){
    if(now < A){
      diffInTime = A - now.getTime()
    }else{
      diffInTime = date1.getTime() - now.getTime()
    }   
    // console.log('round1')
  }

  //round 2
  if(now > date1){
    diffInTime = date2.getTime() - now.getTime()
    // console.log("round2")
  }
  let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))
  let diffinHours = Math.floor((diffInTime / (1000* 3600)) % 24)
  // console.log(Math.floor(diffInDays),Math.floor(diffinHours))
  // console.log(diffinHours)
  // console.log(Math.floor(diffInDays))
  // console.log(diffInTime / (1000 * 3600))
  return ({diffInDays,diffinHours})
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
    },
    remaining_days:{
      days:"",
      hours:"",
      minutes:"",
      seconds:""
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
            state.morning_evening.evening = false
        } 
        if(action.payload === "evening"){
          // console.log(action.payload === "evening")
            state.morning_evening.evening = true
            state.morning_evening.morning = false
        } 
      },
      resetRound:(state,action) => {
        state.morning_evening = initialState
      }
    },
})

export const { countdown, changeRound,resetRound } = countdownSlice.actions

export default countdownSlice.reducer

