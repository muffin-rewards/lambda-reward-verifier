
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
    super(400, 'Reward Already Claimed!')
  }

}

exports.PostNotFoundException = class PostNotFoundException extends LambdaException {

  /**
   * @constructor
   */
  constructor (handle) {
    super(404, `No Post Found for @${handle} - please check the steps above`)
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
