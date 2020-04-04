// post validation
const validator = require("validator").default;
const isEmpty = require("../utils/isEmpty");

module.exports = {
  /**
   * post validator
   * post-body (text)
   * captions (pic/vid)
   */
  validatePostInput: (data) => {
    let errors = {};

    if (data.text) data.text = !isEmpty(data.text) ? data.text : "";
    if (data.pic)
      data.pic.caption = !isEmpty(data.pic.caption) ? data.pic.caption : "";
    if (data.vid)
      data.vid.caption = !isEmpty(data.vid.caption) ? data.vid.caption : "";

    // check text chars length
    data.text &&
      !validator.isLength(data.text, {
        max: 400,
      }) &&
      (errors.text = "you can't post more than 400 characters");

    // check if text field is empty
    data.text &&
      validator.isEmpty(data.text) &&
      (errors.text = "text field is required");

    data.caption &&
      !isEmpty(data.caption) &&
      !validator.isLength(data.caption, { max: 200 }) &&
      (errors.caption = "you can't use more than 200 characters");

    // return error if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
