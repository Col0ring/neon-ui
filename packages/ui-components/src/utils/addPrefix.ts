import classnames from 'classnames'

export function addPrefix(pre: string, className: string | string[]): string {
  if (!pre || !className) {
    return ''
  }

  if (Array.isArray(className)) {
    return classnames(
      className.filter((name) => !!name).map((name) => `${pre}-${name}`)
    )
  }
  return `${pre}-${className}`
}

export default addPrefix
