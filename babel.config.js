module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-transform-inline-environment-variables",
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env.dev",
        "blockList": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true
      }],
      "react-native-reanimated/plugin" // Agrega esta línea para el plugin de react-native-reanimated
    ],
  };
};
