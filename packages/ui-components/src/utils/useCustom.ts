import { useContext, useCallback } from 'react'
import { GetRequiredProps, UnionToIntersection } from '@neon-ui/misc/type-utils'
import { defaultLocale, Locale } from '../locales'
import { CustomContext, CustomContextValue } from '../custom-provider'
import { format, parse } from '../utils/date'

function mergeObject<T extends any[]>(list: T) {
  return list.reduce((a, b) => {
    return { ...a, ...b }
  }, {})
}

const getDefaultRTL = () =>
  typeof window !== 'undefined' &&
  (document.body.getAttribute('dir') || document.dir) === 'rtl'

type MergedLocalValue<T extends keyof Locale> = UnionToIntersection<
  NonNullable<Locale[T]>
>

/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param keys
 */
function useCustom<T extends keyof Locale>(
  keys: T | T[],
  overrideLocale?: Partial<MergedLocalValue<T>>
): CustomContextValue<MergedLocalValue<T>> {
  const {
    locale = defaultLocale,
    rtl = getDefaultRTL(),
    formatDate,
    parseDate,
  } = useContext(CustomContext)

  let componentLocale: MergedLocalValue<T> = {
    // Public part locale
    ...locale.common,
    // Part of the locale of the component itself
    ...(typeof keys === 'string'
      ? locale[keys]
      : mergeObject(keys.map((key) => locale[key]))),
  }

  // Component custom locale
  if (overrideLocale) {
    componentLocale = mergeObject([componentLocale, overrideLocale])
  }

  const defaultFormatDate: GetRequiredProps<CustomContextValue, 'formatDate'> =
    useCallback(
      (date, formatStr) =>
        format(date, formatStr, {
          locale: locale.Calendar?.dateLocale,
        }),
      [locale.Calendar?.dateLocale]
    )

  const defaultParseDate: GetRequiredProps<CustomContextValue, 'parseDate'> =
    useCallback(
      (dateString, formatString) =>
        parse(dateString, formatString, new Date(), {
          locale: locale.Calendar?.dateLocale,
        }),
      [locale.Calendar?.dateLocale]
    )

  return {
    locale: componentLocale,
    rtl,
    formatDate: formatDate || defaultFormatDate,
    parseDate: parseDate || defaultParseDate,
  }
}

export default useCustom
