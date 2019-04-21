const AWS = require('aws-sdk')
const searchPosts = require('./searchPosts')
const persistEntry = require('./persistEntry')
const { LambdaException, RewardNotFoundException } = require('./exceptions')

AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()

/**
 * Access headers for CORs.
 *
 * @var {object} headers
 */
const headers = {
  'Access-Control-Allow-Origin': '*',
}

exports.handler = async (event, _, callback) => {
  /**
   * @param {number} status Http status to return
   * @param {string} body Response body
   */
  const respond = (statusCode, body) => callback(null, { body, headers, statusCode })

  try {
    /**
     * A message is stringified object that contains
     * properties token and reward id.
     * @type {Object}
     */
    const message = JSON.parse(event.body)

    /**
     * Finds a client IG handle for reward ID.
     */
    const { Item } = await ddb.getItem({
      Key: {
        promoter: { S: message.promoter },
        slug: { S: message.slug },
      },
      TableName: process.env.REWARDS_TABLE,
    }).promise()

    if (!Item) {
      throw new RewardNotFoundException
    }

    // Gets the IG post information from the APIs. This throws if no valid post
    // was found or the token sent in the message was invalid.
    const post = await searchPosts(message.token, message.promoter)

    // Saves the entry into a DynamoDB.
    await persistEntry(message.promoter, message.slug, post)

    respond(200)
  } catch (error) {
    console.log('error', error)

    return error instanceof LambdaException
      ? respond(error.status, error.message)
      : respond(422, JSON.stringify({
        label: 'Try Again Later',
        message: 'Woops, something went wrong. Please, try again later.',
      }))
  }
}
