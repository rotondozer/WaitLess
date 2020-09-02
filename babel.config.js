module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          api: ["./src/api"],
          common: ["./src/common"],
          components: ["./src/components"],
          graphql: ["./src/graphql"],
          state: ["./src/state"],
          styles: ["./src/styles"],
          types: ["./src/types"],
        },
      },
    ],
  ],
};
