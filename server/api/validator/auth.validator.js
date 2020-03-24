// auth form validation
const validator = require("validator").default;
const isEmpty = require("./isEmpty");

module.exports = {
  /**
   * signup validator
   * username
   * password
   * confirm password
   */
  validateRegisterInput: data => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirm_password = !isEmpty(data.confirm_password)
      ? data.confirm_password
      : "";

    // check if username isn't alphanumeric
    !validator.isAlphanumeric(data.username) &&
      (errors.username = "username should contain only letters and numbers");

    // check username chars length
    !validator.isLength(data.username, { min: 4, max: 12 }) &&
      (errors.username = "username characters length should be between 4 & 12");

    // check if username field is empty
    validator.isEmpty(data.username) &&
      (errors.username = "username field is required!");

    // check password length
    !validator.isLength(data.password, { min: 4, max: 30 }) &&
      (errors.password = "minimum of 4 digit password is required!");

    // check if password field is empty
    validator.isEmpty(data.password) &&
      (errors.password = "password field is required!");

    //check if confirm password field is empty. &&
    // check if password and confirm password match.
    validator.isEmpty(data.confirm_password)
      ? (errors.confirm_password = "confirm password field is required!")
      : !validator.equals(data.password, data.confirm_password) &&
        (errors.confirm_password = "password fields must match");

    // return errors object if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },

  /**
   * login validator
   * username
   * password
   */
  validateLoginInput: data => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // check if username & password field is empty

    validator.isEmpty(data.username) &&
      (errors.username = "username field is required");

    validator.isEmpty(data.password) &&
      (errors.password = "password field is required");

    // return errors object if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
