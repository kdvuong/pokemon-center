module.exports = {
  globDirectory: "./public/",
  globPatterns: ["**/*.{js,css,html,png,svg}"],
  swDest: "./public/service-worker.js",
  clientsClaim: true,
  skipWaiting: false,
};
