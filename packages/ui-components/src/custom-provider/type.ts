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
