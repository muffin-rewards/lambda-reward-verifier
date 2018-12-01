const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()
const searchPosts = require('./src/searchPosts')
const persistEntry = require('./src/persistEntry')

exports.handler = (event, _, callback) => {
  /**
   * A message is stringified object that contains
   * properties token and reward id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)

  return ddb.getItem({
    Key: {
      id: { S: message.id }
    },
    TableName: process.env.DDB_REWARDS_TABLE,
    AttributesToGet: ['location']
  }).promise()
    .then(({ Item }) => searchPosts(message.token, Item.location.NS))
    .then(post => persistEntry(post))
    .then(() => callback(null, 'Reward confirmation successful'))
    //.catch(() => callback('Reward confirmation failed.'))
    .catch(console.log)
}
