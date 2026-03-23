module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // React Native Reanimated Babel plugin must be last!
    plugins: [
      "react-native-reanimated/plugin",
    ],
  };
};
