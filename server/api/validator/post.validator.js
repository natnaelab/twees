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

    // check post chars length
    !validator.isLength(data.text, { max: 700 }) &&
      (errors.text = "maximum character limit");

    // check if username field is empty
    validator.isEmpty(data.text) && (errors.text = "text field is required!");

    // return errors object if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
