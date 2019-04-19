const axios = require('axios')
const { PostNotFoundException } = require('./exceptions')

/**
 * @var {string} endpoint Instagram APIs endpoint to query
 */
const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'

/**
 * Fetches user posts from IG and validates them. If request fails, retries again.
 *
 * @param {string} token User IG valid token to access the endpoint
 * @param {string} handle Client IG handle that needs to be in the caption
 * @return Post fetched from the APIs
 */
module.exports = async (token, handle) => {
  for (let i = 0; i < Number(process.env.MAX_RETRIES); i++) {
    try {
      return await fetchPost(token, handle)
    } catch {
      await new Promise(
        resolve => setTimeout(resolve, Number(process.env.DELAY_BETWEEN_RETRIES)),
      )
    }
  }

  throw new PostNotFoundException
}

const fetchPost = async (token, handle) => {
  // Gets the data from the APIs.
  const { data } = await axios.get(`${endpoint}?access_token=${token}`)

  console.log('fetchPost', data)

  // Finds a valid post that includes restaurant handle in its caption.
  const post = data.data.find(
    post => post.caption && post.caption.text.includes(handle),
  )

  if (! post) {
    throw new Error('No post could be find')
  }

  return post
}
