import errors, { SystemError } from 'com/errors';
import validate from "com/validate"

const toggleLike = (postId) => {
  validate.id(postId, 'postId')

  return fetch(`${import.meta.env.VITE_API_URL}/posts/like/${postId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`,
    }
  })
    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 204) {
        return
      }

      return response.json()
        .catch(() => { throw new SystemError("connection error") })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}


export default toggleLike;
