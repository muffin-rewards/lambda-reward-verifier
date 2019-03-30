const AWS = require('aws-sdk')
const searchPosts = require('./src/searchPosts')
const persistEntry = require('./src/persistEntry')

AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()

exports.handler = async (event, _, callback) => {
  /**
   * A message is stringified object that contains
   * properties token and reward id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)

  /**
   * Finds a client IG handle for reward ID.
   */
  const { Item } = await ddb.getItem({
    Key: {
      id: { S: message.reward }
    },
    TableName: process.env.DDB_REWARDS_TABLE,
    AttributesToGet: ['handle'],
  }).promise()

  // Gets the IG post information from the APIs. This throws if no valid post
  // was found or the token sent in the message was invalid.
  const post = await searchPosts(message.token, Item.handle.S)

  // Saves the entry into a DynamoDB.
  await persistEntry(message.token, post, message.reward)

  callback(null, 'Reward confirmation successful')
}
