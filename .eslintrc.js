/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["@ticketing/eslint-config"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
