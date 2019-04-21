
class LambdaException extends Error {

  /**
   * @param {number} status Http status
   * @param {string} body Body to yield with the response
   */
  constructor (status, body) {
    super(body)
    this.status = status
  }

}

exports.LambdaException = LambdaException

exports.AlreadyRedeemedException = class AlreadyRedeemedException extends LambdaException {

  /**
   * @constructor
   */
  constructor () {
    super(400, {
      label: 'Reward Already Claimed!',
      message: 'Only one reward can be claimed per account, per month.',
    })
  }

}

exports.PostNotFoundException = class PostNotFoundException extends LambdaException {

  /**
   * @constructor
   */
  constructor () {
    super(404, {
      label: `No Post Found!`,
      message: 'Please check the steps above.',
    })
  }

}

exports.RewardNotFoundException = class RewardNotFoundException extends LambdaException {

  /**
   * @constructor
   */
  constructor () {
    super(404, {
      label: 'Reward does not exist.',
      message: 'Reward with this id does not exist in our database.',
    })
  }

}
