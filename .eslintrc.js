module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["warn", "double"],
    "@typescript-eslint/no-use-before-define": "off",
    "react-native/no-inline-styles": "off",
    "no-shadow-restricted-names": "off",
    radix: "off",
  },
};
