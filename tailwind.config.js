/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html', // 如果你有独立html
    './src/**/*.{vue,js,ts,jsx,tsx}', // 重点扫描 src 里的所有文件
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // 自定义主色
        secondary: '#9333EA', // 自定义辅色
      },
    },
  },
  plugins: [],
};
