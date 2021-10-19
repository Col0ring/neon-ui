import fse from 'fs-extra'
import path from 'path'
import { createPackageJson } from './create-package-json'

const files = fse.readdirSync(path.resolve(__dirname, '../src'))

files.forEach((file) => {
  const filename = path.parse(file).name
  createPackageJson(filename)
})
