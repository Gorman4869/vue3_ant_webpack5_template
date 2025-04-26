// .prettierrc.js
module.exports = {
  // 行宽，建议80-120
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用制表符缩进
  useTabs: false,
  // 语句末尾添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象属性名使用引号的方式
  quoteProps: "as-needed",
  // JSX 中使用双引号
  jsxSingleQuote: false,
  // 末尾添加逗号
  trailingComma: "all",
  // 对象字面量的括号间空格
  bracketSpacing: true,
  // JSX 标签闭合括号位置
  bracketSameLine: false,
  // 箭头函数唯一参数是否使用括号
  arrowParens: "always",
  // 格式化文件的整体范围
  rangeStart: 0,
  rangeEnd: Infinity,
  // 需要在文件顶部插入一个特殊标记，指定该文件格式需要被格式化
  requirePragma: false,
  // 自动在文件顶部插入 @format 标记
  insertPragma: false,
  // Markdown 文本换行方式
  proseWrap: "preserve",
  // HTML 空白敏感度
  htmlWhitespaceSensitivity: "css",
  // Vue 文件中的 <script> 和 <style> 标签内的代码是否缩进
  vueIndentScriptAndStyle: false,
  // 行结束符使用 lf
  endOfLine: "lf",
  // 格式化嵌入的内容
  embeddedLanguageFormatting: "auto",
  // 在 HTML、Vue 和 JSX 中每个属性强制换行
  singleAttributePerLine: false,
};
