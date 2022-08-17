import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
    refree_list:[
        {id:"1",name:"Refree Name" , PhNo : "0943631079" , refId:"ref-001", joinedOn : "08/13/2022"},
        {id:"2",name:"Refree Name" , PhNo : "0919833335" , refId:"ref-001", joinedOn : "08/13/2022"},

    ],
    refree_requests:[
        {name:"Refree Name", PhNo:"0916116180"},
        {name:"Refree Name", PhNo:"0965650642"},
    ]
    
}

export const refreeSlice = createSlice({
  name: 'refree',
  initialState,
  reducers: {
    deleteRequest: (state,action) => {
        const filteredArr = state.refree_requests.filter(request => request.PhNo !== action.payload) 
        // console.log(req.PhNo === action.payload)
        state.refree_requests = filteredArr
    },
    addRefree: (state,action) => {
        state.refree_list.push(action.payload)
    },
    editRefree:(state,action) => {
        // const newArr = state.refree_list.map((refree) => {
        //     if(refree.id === action.payload.id){
        //         return {...refree, name:action.payload.name,PhNo:action.payload.PhNo}
        //     }
        //     return refree
        // })

        // state.refree_list = newArr

        const foundRefree = state.refree_list.find((refree) => refree.id === action.payload.id)

        if(foundRefree){
            foundRefree.name = action.payload.name
            foundRefree.PhNo = action.payload.PhNo
        }
    },
    deleteRefree: (state,action) => {
        const filteredArr = state.refree_list.filter(refree => refree.id !== action.payload) 
        state.refree_list = filteredArr 
    },
  },
})

// Action creators are generated for each case reducer function
export const { deleteRequest, addRefree, editRefree, deleteRefree } = refreeSlice.actions

export default refreeSlice.reducer