const AWS = require('aws-sdk')
const { AlreadyRedeemedException } = require('./exceptions')

const ddb = new AWS.DynamoDB()
AWS.config.update({ region: 'eu-west-1' })

/**
 * Saves information about IG post (which is the way user qualifies for reward)
 * into a DynamoDB.
 *
 * @param {string} promoter Restaurant that promotes this reward
 * @param {object} post Instagram response with post information
 */
module.exports = async (promoter, post) => {
  console.log('persisting', promoter, post)

  const { Item } = await ddb.getItem({
    Key: {
      user: { S: post.user.username },
      promoter: { S: message.promoter },
    },
    TableName: process.env.ENTRIES_TABLE,
    AttributesToGet: ['handle'],
  }).promise()

  console.log('persist', Item)

  if (Item && Item.handle) {
    throw new AlreadyRedeemedException
  }

  return ddb.putItem({
    Item: {
      promoter: { S: promoter },
      url: { S: post.text },
      caption: { S: post.caption.text },
      redeemedAt: { N: Date.now() },
      user: { S: post.user.username },
      image: { S: post.images.standard_resolution.url || '' },
    },
    TableName: process.env.ENTRIES_TABLE,
  }).promise()
}
