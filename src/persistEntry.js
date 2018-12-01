const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()

module.exports = async (post) => {
  console.log('persisting', post)
}
