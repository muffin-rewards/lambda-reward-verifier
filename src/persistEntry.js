const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()
const crypto = require('crypto')

/**
 * Saves information about IG post (which is the way user qualifies for reward)
 * into a DynamoDB.
 *
 * @param {string} token User to match the post to
 * @param {object} post Instagram response with post information
 * @param {string} reward Reward id
 */
module.exports = (token, post, reward) => {
  const code = crypto.randomBytes(48).toString('hex')

  return ddb.putItem({
    Item: {
      postId: { S: post.id },
      link: { S: post.link },
      userId: { S: token },
      reward: { S: reward },
      id: { S: code },
      used: { BOOL: false },
    },
    TableName: process.env.DDB_ENTRIES_TABLE,
  }).promise()
}
