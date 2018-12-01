const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()
const crypto = require('crypto')

module.exports = (token, postId, reward) => {
  const code = crypto.randomBytes(48).toString('hex')

  return ddb.putItem({
    Item: {
      postId: { S: postId },
      userId: { S: token },
      reward: { S: reward },
      id: { S: code },
      used: { BOOL: false }
    },
    TableName: process.env.DDB_ENTRIES_TABLE
  }).promise()
}
