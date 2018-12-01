const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()
const searchPosts = require('./src/searchPosts')
const persistEntry = require('./src/persistEntry')

exports.handler = async (event, _, callback) => {
  /**
   * A message is stringified object that contains
   * properties token and reward id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)

  const { Item } = await ddb.getItem({
    Key: {
      id: { S: message.reward }
    },
    TableName: process.env.DDB_REWARDS_TABLE,
    AttributesToGet: ['location']
  }).promise()

  const post = await searchPosts(message.token, Item.location.NS)

  await persistEntry(message.token, post.id, message.reward)

  callback(null, 'Reward confirmation successful')
}
