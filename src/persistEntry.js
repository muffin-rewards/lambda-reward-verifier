const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()
const crypto = require('crypto')

module.exports = (token, { id }, promoter) => {
  const code = crypto.randomBytes(48).toString('hex')

  return ddb.putItem({
    Item: {
      code: { S: code },
      userId: { S: token },
      promoter: { S: promoter },
      id: { S: id },
      used: { BOOL: false }
    },
    TableName: process.env.DDB_ENTRIES_TABLE
  }).promise()
}
