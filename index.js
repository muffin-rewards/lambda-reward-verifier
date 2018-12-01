const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })
const ddb = new AWS.DynamoDB()

exports.handler = (event, _, callback) => {
  /**
   * A message is stringified object that contains
   * properties token and reward id.
   * @type {Object}
   */
  const message = JSON.parse(event.Records.pop().Sns.Message)

  console.log(message)
}
