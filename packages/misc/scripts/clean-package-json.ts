import fse from 'fs-extra'
export function cleanPackageJson(path: string) {
  fse.removeSync(path)
}
