module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["warn", "double"],
    radix: "off",
    "no-shadow-restricted-names": "off",
    "react-native/no-inline-styles": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true },
    ],
  },
};
