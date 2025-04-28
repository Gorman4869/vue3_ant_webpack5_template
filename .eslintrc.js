// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended', // Vue3 推荐规则
    'eslint:recommended',
    'prettier',
    // "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
    // "@vue/typescript/recommended",
    // "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 生产环境禁用 console 和 debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Vue 相关规则
    'vue/no-v-html': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-reserved-component-names': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // TypeScript 规则
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Prettier 集成
    'prettier/prettier': [
      'error',
      {
        // 这些规则会被 .prettierrc 文件覆盖
      },
    ],

    // 通用规则
    'no-var': 'error',
    'prefer-const': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'object-shorthand': ['error', 'always'],
    'array-callback-return': 'error',
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'prefer-template': 'warn',
    'no-param-reassign': ['error', { props: false }],
    eqeqeq: ['error', 'always'],
    'spaced-comment': ['warn', 'always'],
    curly: ['error', 'all'],
    // 'scss/at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
    //   },
    // ],
  },
  // 针对不同文件的特定规则
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
    {
      files: ['**/tests/**/*.[jt]s?(x)', '**/*.spec.[jt]s?(x)'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  // 全局变量定义
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  // 忽略特定文件和目录
  ignorePatterns: ['dist', 'node_modules', 'public', '*.min.js', '*.d.ts', 'coverage'],
};
