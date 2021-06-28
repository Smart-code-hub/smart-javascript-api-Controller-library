const prettier = require("prettier");
const GetByJavascript = require("./js/services/jsController");
const ProcessController = entity => {
  try {
    const content = GetByJavascript(entity);
    return prettier.format(content);
  } catch (error) {
    return { error };
  }
};

module.exports = {
  ProcessController
};
