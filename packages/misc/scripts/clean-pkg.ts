import path from 'path'
import fse from 'fs-extra'
import { cleanPackageJson } from './clean-package-json'

const files = fse.readdirSync(path.resolve(__dirname, '../src'))

files.forEach((file) => {
  const filename = path.parse(file).name
  cleanPackageJson(filename)
})
