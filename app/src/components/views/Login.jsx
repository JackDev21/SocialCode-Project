import { useState } from "react"
import { useNavigate } from "react-router-dom"

import useContext from "../../useContext"
import { SystemError } from "com/errors"

import logic from "../../logic"

import View from "../library/View"
import Title from "../Title"
import FormWithFeedback from "../library/FormWithFeedback"
import Field from "../core/Field"
import CheckPasswordField from "../core/ShowPasswordField"
import Link from "../core/Link"
import SubmitButton from "../core/SubmitButton"

function Login() {
  console.log("Login --> render")

  const navigate = useNavigate()

  const [message, setMessage] = useState(null)
  const { alert } = useContext()

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const target = event.target

    const username = target.username.value
    const password = target.password.value

    try {
      // prettier-ignore
      logic.loginUser(username, password)
        .then(() => {
          navigate("/")
          console.log("user logged in")
        })
        .catch((error) => {
          console.log(error)
          if(error instanceof SystemError){
            alert(error.message)
            return
          }
          
          setMessage(error.message)
          setTimeout(() => setMessage(""), 2000)

        })
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => setMessage(""), 2000)
      console.error(error.message)
    }
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()

    navigate("/register")
  }

  return (
    <>
      <View className="View LoginForm" tag="main">
        <Title>LOGIN</Title>
        <FormWithFeedback className="LoginForm" onSubmit={handleLoginSubmit} message={message}>
          <Field id="username" placeholder="Username">
            Username
          </Field>
          <CheckPasswordField className="PasswordForm" id="password" placeholder="Password">
            Password
          </CheckPasswordField>
          <SubmitButton type="submit">Login</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleRegisterClick}> Don´t have an account? Register </Link>

        <div className="mt-5 flex w-[90%] flex-col items-center">
          <p className="flex text-center text-xl text-white">Registrate ó tambien puedes usar un usuario de prueba</p>
          <p className="text-2xl text-white">Username: Randomuser | Password: 1234</p>
        </div>
      </View>
    </>
  )
}

export default Login
