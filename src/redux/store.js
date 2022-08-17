import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user"
import refreeReducer from "./refree"
import agentReducer from "./agent"

export const store = configureStore({
  reducer: {
    user : userReducer,
    refree : refreeReducer,
    agent : agentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch