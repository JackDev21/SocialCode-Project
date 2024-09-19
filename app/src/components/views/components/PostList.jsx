import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../../redux/postsSlice"
import { useState, useEffect } from "react"

import View from "../../library/View"
import Post from "./Post"

import useContext from "../../../useContext"

import logic from "../../../logic"
import useInfiniteScroll from "../../../utils/useInfiniteScroll"

function PostList({ refreshStamp }) {
  console.log("Postlist --> render")

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)

  const { alert } = useContext()

  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    console.log("PostList --> useEffect")
    dispatch(setPosts([]))
    setPosts([])
    setPage(1)
    loadPosts(1, limit)
  }, [refreshStamp])

  const loadPosts = (page, limit) => {
    try {
      //prettier-ignore
      logic.getAllPosts(page, limit)
        .then((newPosts) => {
          console.log("cargando posts...")
          console.log(newPosts)         
          dispatch(setPosts(newPosts))
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
          return
        })
    } catch (error) {
      console.error(error.message)

      alert(error.message)
    }
  }

  const handlePostLoadDeleted = () => {
    setPage(1)
    dispatch(setPosts([]))
    loadPosts(1, limit)
  }
  const handlePostEdited = () => {
    setPage(1)
    dispatch(setPosts([]))
    loadPosts(1, limit)
  }

  useInfiniteScroll(() => {
    const nextPage = page + 1
    setPage(nextPage)
    loadPosts(nextPage, limit)
  })

  return (
    <>
      <View tag="section" className="Section">
        {posts.map((post) => (
          <Post post={post} key={post.id} onPostDeleted={handlePostLoadDeleted} onPostEdited={handlePostEdited}></Post>
        ))}
      </View>
    </>
  )
}

export default PostList
