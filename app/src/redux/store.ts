import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "./userSlice.ts"
import postsReducer from "./postsSlice.ts"

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
