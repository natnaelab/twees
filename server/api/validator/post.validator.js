// post validation
const validator = require("validator").default;
const isEmpty = require("../utils/isEmpty");

module.exports = {
  /**
   * post validator
   * post-body (text)
   */
  validatePostInput: data => {
    let errors = {};

    data.text = !isEmpty(data.username) ? data.username : "";

    // check post text or caption chars length
    !validator.isLength(data.text || data.pic.caption || data.vid.caption, {
      max: 700
    }) && (errors.text = "maximum character limit");

    // check if post text or caption field is empty
    validator.isEmpty(data.text || data.pic.caption || data.vid.caption) &&
      (errors.text = "required field!");

    // return error if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
