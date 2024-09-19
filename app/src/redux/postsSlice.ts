import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
  id: string
}

const initialState: Post[] = []

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.push(...action.payload)
    }
  }
})

export const { setPosts } = postsSlice.actions
export default postsSlice.reducer
