import React, { useMemo, useEffect, createContext } from 'react'
import { isBrowser } from '@neon-ui/misc/env'
import { addClass, removeClass } from '@neon-ui/misc/dom'
import { ThemeType } from '@neon-ui/misc/element-type'
import { Locale } from '../locales'
import addPrefix from '../utils/addPrefix'
import useClassNamePrefix from '../utils/useClassNamePrefix'

export interface CustomContextValue<T = Locale> {
  /** Language configuration */
  locale?: T

  /** Support right-to-left */
  rtl?: boolean

  /**
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * Example:
   *
   *  import format from 'date-fns/format';
   *  import eo from 'date-fns/locale/eo'
   *
   *  function formatDate(date, formatStr) {
   *    return format(date, formatStr, { locale: eo });
   *  }
   *
   * */
  formatDate?: (date: Date | number, format: string) => string

  /**
   * Return the date parsed from string using the given format string.
   *
   * Example:
   *
   *  import parse from 'date-fns/parse';
   *  import eo from 'date-fns/locale/eo'
   *
   *  function parseDate(date, formatStr) {
   *    return parse(date, formatStr, new Date(), { locale: eo });
   *  }
   *
   * */
  parseDate?: (dateString: string, formatString: string) => Date
}

export interface CustomProviderProps<T = Locale> extends CustomContextValue<T> {
  /** Supported themes */
  theme?: ThemeType

  /** The prefix of the component CSS class */
  classPrefix?: string

  /** Primary content */
  children?: React.ReactNode
}

const CustomContext = createContext<CustomProviderProps>({})
const themes = ['light', 'dark', 'high-contrast'] as const

export const CustomProvider = (props: CustomProviderProps) => {
  const [classNamePrefix] = useClassNamePrefix()
  const { children, classPrefix = classNamePrefix, theme, ...rest } = props

  const value = useMemo(
    () => ({ classPrefix, theme, ...rest }),
    [classPrefix, theme, rest]
  )

  useEffect(() => {
    if (isBrowser() && theme) {
      addClass(document.body, addPrefix(classPrefix, `theme-${theme}`))

      // Remove the className that will cause style conflicts
      themes.forEach((t) => {
        if (t !== theme) {
          removeClass(document.body, addPrefix(classPrefix, `theme-${t}`))
        }
      })
    }
  }, [classPrefix, theme])

  return (
    <CustomContext.Provider value={value}>{children}</CustomContext.Provider>
  )
}

export { CustomContext }

export default CustomProvider
