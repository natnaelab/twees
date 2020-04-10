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
    if (data.youtube) data.youtube = !isEmpty(data.youtube) ? data.youtube : "";

    // check text chars length
    data.text &&
      !validator.isLength(data.text, {
        max: 400,
      }) &&
      (errors.text = "characters limit exceeds");

    // check if text field is empty
    data.text &&
      validator.isEmpty(data.text) &&
      (errors.text = "text field is required");

    let yt_rgx = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    data.youtube &&
      !data.youtube.match(yt_rgx) &&
      (errors.youtube = "invalid youtube link");

    // return error if the form is invalid
    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};
