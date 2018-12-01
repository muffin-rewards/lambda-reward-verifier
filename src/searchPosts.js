const axios = require('axios')
const geolib = require('geolib')
const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'

module.exports = async (token, location) => {
  const url = `${endpoint}?access_token=${token}`

  const { data } = await axios.get(url)

  const post = data.data.find(post => validate(post, location))

  if (! post) {
    throw new Error('No post could be find')
  }

  return post
}

const validate = (post, location) => {
  if (! post.location) {
    return false
  }

  const [ latitude, longitude ] = location

  const distance = geolib.getDistance(
    post.location,
    { latitude, longitude }
  )

  return distance < process.env.MAX_DISTANCE
}
