import fse from 'fs-extra'
import path from 'path'
import { cleanPackageJson } from './clean-package-json'

export function createPackageJson(filename: string) {
  const dir = path.resolve(__dirname, `../${filename}`)
  cleanPackageJson(dir)
  const pkg = {
    name: `@neon-ui/misc-${filename}`,
    main: `../lib/${filename}.js`,
    module: `../es/${filename}.js`,
    typings: `../lib/${filename}.d.ts`,
  }
  fse.mkdirSync(dir)
  fse.writeFileSync(
    path.resolve(dir, './package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  )
}
