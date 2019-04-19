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
  const { Item } = await ddb.getItem({
    Key: {
      user: { S: post.user.username },
      promoter: { S: promoter },
    },
    TableName: process.env.ENTRIES_TABLE,
    AttributesToGet: ['redeemedAt'],
  }).promise()

  if (Item) {
    throw new AlreadyRedeemedException
  }

  return ddb.putItem({
    Item: {
      mediaId: { S: String(post.id) },
      promoter: { S: promoter },
      url: { S: post.link },
      caption: { S: post.caption.text },
      redeemedAt: { S: String(Date.now()) },
      user: { S: post.user.username },
      image: { S: post.images.standard_resolution.url },
    },
    TableName: process.env.ENTRIES_TABLE,
  }).promise()
}
