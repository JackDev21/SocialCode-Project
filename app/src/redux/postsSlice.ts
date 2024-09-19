import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
  id: string
  author: string
  title: string
  description: string
  image: string
  date: string
  liked: string[]
  comments: {
    author: string
    text: string
    date: string
  }[]
}
type PostsState = Post[]

const initialState: PostsState = []

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      if (action.payload.length === 0) {
        return state
      }
      return action.payload
    },
    deletePost: (state, action: PayloadAction<string>) => {
      return state.filter((post) => post.id !== action.payload)
    }
  }
})

export const { setPosts, deletePost } = postsSlice.actions
export default postsSlice.reducer
