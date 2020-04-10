// post validation
const validator = require("validator").default;
const isEmpty = require("../utils/isEmpty");

module.exports = {
  /**
   * post validator
   * post (text)
   */
  validatePostInput: (data) => {
    let errors = {};

    if (data.text) data.text = !isEmpty(data.text) ? data.text : "";
    if (data.yt) data.yt = !isEmpty(data.yt) ? data.yt : "";

    // check text chars length
    !validator.isLength(data.text, {
      max: 400,
    }) && (errors.text = "characters limit exceeds");

    // check if text field is empty
    validator.isEmpty(data.text) && (errors.text = "text field is required");

    let yt_rgx = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    !data.yt.match(yt_rgx) && (errors.yt = "invalid youtube link");

    // return error if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
