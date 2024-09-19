import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: "",
  surname: "",
  email: "",
  username: "",
  password: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, surname, email, username, password } = action.payload
      state.name = name
      state.surname = surname
      state.email = email
      state.username = username
      state.password = password
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
