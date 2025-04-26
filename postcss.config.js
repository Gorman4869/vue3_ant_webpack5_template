// postcss.config.js
module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
      autoprefixer: {
        flexbox: "no-2009",
        grid: true,
      },
    },
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
