import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../../redux/userSlice"

import logic from "../../../logic"

import View from "../../library/View"
import Heading from "../../core/Heading"
import Header from "../components/Header"
import Button from "../../core/Button"
import PostList from "../components/PostList"
import Footer from "../../core/Footer"
import CreatePostForm from "../components/CreatePostForm"
import About from "../components/About"
import Alert from "../components/Alert"

import "./index.css"
import "../components/CreatePostForm"
import "../../core/TextArea.css"

function Home() {
  const navigate = useNavigate()

  console.log("Home --> render")

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [viewCreatePostForm, setViewCreatePostForm] = useState("")
  const [postListRefresh, setPostListRefresh] = useState(0)
  const [message, setMessage] = useState(null)

  const handleLogout = () => {
    logic.logoutUser()
    navigate("/login")
  }

  useEffect(() => {
    console.log("Home --> UseEffect")
    try {
      // prettier-ignore
      logic.getUserName()
        .then((user) => {
          console.log("Home --> setName")
          dispatch(setUser(user))
          
        })
        .catch((error) => {
          console.error(error.message)

          //alert(error.message)
          setMessage(error.message)
        })
    } catch (error) {
      console.error(error.message)

      //alert(error.message)
      setMessage(error.message)
    }
  }, [dispatch])

  const handleCreatePostClick = () => setViewCreatePostForm("create-post")
  const handleCancelCreatePost = () => setViewCreatePostForm("")
  const handleCreatePost = () => {
    setPostListRefresh(Date.now())
    setViewCreatePostForm("")
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleAlertAccepted = () => setMessage(null)

  return (
    <>
      <Header>
        <Heading level="3">{user.username}</Heading>
        <Link to="/about">About</Link>
        <Button onClick={handleLogout} className="LogoutButton">
          Logout
        </Button>
      </Header>

      <View className="View">
        <Routes>
          <Route path="/" element={<PostList refreshStamp={postListRefresh} />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {viewCreatePostForm === "create-post" && (
          <CreatePostForm
            onCancelCreatedPostClick={handleCancelCreatePost}
            onPostCreated={handleCreatePost}
            onClickScrollTop={scrollTop}
          />
        )}
      </View>

      {location.pathname !== "/about" && (
        <Footer onCreatePostClick={handleCreatePostClick} onClickScrollTop={scrollTop} />
      )}

      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </>
  )
}

export default Home
