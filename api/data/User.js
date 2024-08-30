import { NAME_REGEX, EMAIL_REGEX, USERNAME_REGEX } from "com/validate.js"
import { Schema, model } from "mongoose"

const user = new Schema({
  name: {
    type: String,
    match: NAME_REGEX
  },
  surname: {
    type: String,
    match: NAME_REGEX

  },
  email: {
    type: String,
    match: EMAIL_REGEX
  },
  username: {
    type: String,
    required: true,
    unique: true,
    math: USERNAME_REGEX
  },
  password: {
    type: String,
    required: true,
  }
})

const User = model("User", user)

export default User
