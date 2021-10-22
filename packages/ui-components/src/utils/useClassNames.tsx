import { useMemo } from 'react'
import classnames, { Argument } from 'classnames'
import addPrefix from './addPrefix'
import useClassNamePrefix from './useClassNamePrefix'

export interface useClassNamesReturn {
  /**
   * A function of combining className and adding a prefix to each className
   * The default classPrefix is `neon-${prefix}`, and add className `neon-{prefix}`
   */
  withClassPrefix: (...classes: Argument[]) => string
  /**
   * Add a prefix to className, the default classPrefix is `neon-${prefix}`
   */
  addPrefix: (...classes: Argument[]) => string
  /**
   * classnames alias
   */
  merge: typeof classnames
  /**
   * Add a rootPrefix to className，the default className is 'neon-'
   */
  addRootPrefix: (...classes: Argument[]) => string
}

/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns {useClassNamesReturn}
 *
 */
export function useClassNames(prefix: string): useClassNamesReturn {
  const [classPrefix] = useClassNamePrefix()
  return useMemo(() => {
    const componentName = addPrefix(classPrefix, prefix)

    const addComponentPrefix: useClassNamesReturn['addPrefix'] = (
      ...classes
    ) => {
      const mergedClassNames = classes.length
        ? classnames(...classes)
            .split(' ')
            .map((item) => addPrefix(componentName, item))
        : []

      return mergedClassNames.filter(Boolean).join(' ')
    }
    return {
      /**
       * @example
       * if str = 'button':
       * addPrefix('red', { active: true }) => 'neon-button-red neon-button-active'
       */
      addPrefix: addComponentPrefix,
      /**
       * @example
       * if str = 'button':
       * withClassPrefix('red', { active: true }) => 'neon-button neon-button-red neon-button-active'
       */
      withClassPrefix(...classes: Argument[]) {
        const mergedClassNames = addComponentPrefix(classes)
        return mergedClassNames
          ? `${componentName} ${mergedClassNames}`
          : componentName
      },
      merge: classnames,
      /**
       * @example
       * addRootPrefix('red', { active: true }) => 'neon-red neon-active'
       */
      addRootPrefix(...classes: Argument[]) {
        const mergedClassNames = classes.length
          ? classnames(...classes)
              .split(' ')
              .map((item) => addPrefix(classPrefix, item))
          : []

        return mergedClassNames.filter(Boolean).join(' ')
      },
    }
  }, [prefix, classPrefix])
}

export default useClassNames
