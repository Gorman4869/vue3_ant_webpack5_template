# 使用 Vite 创建 Vue3 项目（比 webpack 更快的构建工具，但后续会转为 webpack）

npm create vite@latest admin-system --template vue

# 进入项目目录

cd admin-system

# 初始化 git 仓库

git init

# 安装 Vue 相关依赖

npm install vue-router@4 pinia

# 安装 Ant Design Vue

npm install ant-design-vue@next

# 安装样式相关

npm install css-loader style-loader less less-loader tailwindcss postcss postcss-loader autoprefixer postcss-preset-env -D

# 安装 ESLint 相关

npm install eslint eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier prettier @vue/eslint-config-prettier eslint-webpack-plugin -D

# 安装 Commitlint 和 Husky lint-staged

npm install husky commitizen @commitlint/cli @commitlint/config-conventional lint-staged cz-git -D

# 安装 stylelint

npm install stylelint stylelint-config-html stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard stylelint-config-recommended-less -D

# 安装 Webpack 5 相关

npm install webpack webpack-cli webpack-dev-server webpack-merge webpack-bundle-analyzer cross-env -D

# 安装相关 plugin

npm install webpack-manifest-plugin copy-webpack-plugin compression-webpack-plugin terser-webpack-plugin css-minimizer-webpack-plugin html-webpack-plugin workbox-webpack-plugin speed-measure-webpack-plugin mini-css-extract-plugin bundle-stats-webpack-plugin clean-webpack-plugin -D

# 安装相关 loader

npm install vue-loader thread-loader babel-loader -D

# 无损优化图像

npm install image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D

# 安装 babel

npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/runtime -D

# 安装其他依赖

npm install axios mockjs


eslint的使用注意版本