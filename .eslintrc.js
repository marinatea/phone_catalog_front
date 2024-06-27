module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    "prettier/prettier": [
      "error",
      { endOfLine: "auto" }
    ],
    "@typescript-eslint/no-explicit-any": "off"
  },
};
