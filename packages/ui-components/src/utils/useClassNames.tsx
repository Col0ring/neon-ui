import { useMemo } from 'react'
import classnames, { Argument } from 'classnames'

function addPrefix(pre: string, className: string | string[]): string {
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

export interface useClassNamesReturn {
  /**
   *A function of combining className and adding a prefix to each className.
   * At the same time, the default `classPrefix` is the first className.
   */
  withClassPrefix: (...classes: Argument[]) => string
  /**
   * Add a prefix to className
   */
  prefix: (...classes: Argument[]) => string
  /**
   * classnames alias
   */
  merge: typeof classnames
  /**
   *
   */
  rootPrefix: (...classes: Argument[]) => string
}

const classPrefix = 'neon'

/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns {useClassNamesReturn}
 *
 */
export function useClassNames(str: string): useClassNamesReturn {
  const componentName = useMemo(() => addPrefix(classPrefix, str), [str])

  return useMemo(
    () => ({
      /**
       * @example
       * if str = 'button':
       * prefix('red', { active: true }) => 'neon-button-red neon-button-active'
       */
      prefix(...classes) {
        const mergedClassNames = classes.length
          ? classnames(...classes)
              .split(' ')
              .map((item) => addPrefix(componentName, item))
          : []

        return mergedClassNames.filter(Boolean).join(' ')
      },
      withClassPrefix(...classes: Argument[]) {
        const mergedClassNames = this.prefix(classes)
        return mergedClassNames
          ? `${componentName} ${mergedClassNames}`
          : componentName
      },
      merge: classnames,
      rootPrefix(...classes: Argument[]) {
        const mergedClassNames = classes.length
          ? classnames(...classes)
              .split(' ')
              .map((item) => addPrefix(classPrefix, item))
          : []

        return mergedClassNames.filter(Boolean).join(' ')
      },
    }),
    [componentName]
  )
}

export default useClassNames
