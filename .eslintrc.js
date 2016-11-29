module.exports = {
  root: true,
  // https://github.com/babel/babel-eslint
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // https://github.com/BenoitZugmeyer/eslint-plugin-html
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow tab
    'no-tabs': 0,
    // any indent
    'indent': 0,
    // allow vars
    'no-unused-vars': 0,
    // allow mixed space tab
    'no-mixed-spaces-and-tabs': 0
  }
};
