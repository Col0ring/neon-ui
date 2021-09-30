import { defineConfig } from 'dumi'
import StylelintPlugin from 'stylelint-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'

export default defineConfig({
  title: 'neon-ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  chainWebpack(config) {
    // add runtime eslint
    config.plugin('eslint-webpack-plugin').use(EslintPlugin, [
      {
        fix: true,
        files: ['packages/**/*.(ts|tsx)'],
      },
    ])
    config.plugin('stylelint-webpack-plugin').use(StylelintPlugin, [
      {
        files: ['packages/**/*.(less|css)'],
        ignorePath: 'node_modules|es|lib',
      },
    ])
  },
  mode: 'site',
  webpack5: {},
  exportStatic: {},
  // more config: https://d.umijs.org/config
})
