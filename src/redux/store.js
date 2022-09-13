import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user"
import refreeReducer from "./refree"
import agentReducer from "./agent"
import countdownReducer from "./countdown"
import languageReducer from "./langauge"
import twodThreedReducer from "./2d3dList"
import notificationsReducer from "./notifications"
import refereeProfileReducer from "./refereeProfile"

export const store = configureStore({
  reducer: {
    user : userReducer,
    refree : refreeReducer,
    agent : agentReducer,
    countdown:countdownReducer,
    language : languageReducer,
    twodThreed :  twodThreedReducer,
    notifications : notificationsReducer,
    refereeProfile : refereeProfileReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch