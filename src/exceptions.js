
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
    super(400, 'Reward already redeemed.')
  }

}

exports.PostNotFoundException = class PostNotFoundException extends LambdaException {

  /**
   * @constructor
   */
  constructor () {
    super(404, 'No post found.')
  }

}

exports.RewardNotFoundException = class RewardNotFoundException extends LambdaException {

  /**
   * @constructor
   */
  constructor () {
    super(404, 'Reward does not exist.')
  }

}
