import defaultLocale from './default'
export { defaultLocale }
export { default as arEG } from './ar_EG'
export { default as daDK } from './da_DK'
export { default as deDE } from './de_DE'
export { default as enGB } from './en_GB'
export { default as enUS } from './en_US'
export { default as esAR } from './es_AR'
export { default as esES } from './es_ES'
export { default as fiFI } from './fi_FI'
export { default as itIT } from './it_IT'
export { default as koKR } from './ko_KR'
export { default as ptBR } from './pt_BR'
export { default as ruRU } from './ru_RU'
export { default as svSE } from './sv_SE'
export { default as zhCN } from './zh_CN'
export { default as zhTW } from './zh_TW'
export { default as faIR } from './fa_IR'

export type Locale = Partial<typeof defaultLocale>
export type CommonLocale = Partial<typeof defaultLocale.common>
export type CalendarLocale = Partial<typeof defaultLocale.Calendar>
export type PlaintextLocale = Partial<typeof defaultLocale.Plaintext>
export type PaginationLocale = Partial<typeof defaultLocale.Pagination>
export type TableLocale = CommonLocale
export type DatePickerLocale = Partial<typeof defaultLocale.DatePicker>
export type DateRangePickerLocale = Partial<
  typeof defaultLocale.DateRangePicker
>
export type PickerLocale = Partial<typeof defaultLocale.Picker> & CommonLocale
export type InputPickerLocale = PickerLocale &
  Partial<typeof defaultLocale.InputPicker>
export type UploaderLocale = Partial<typeof defaultLocale.Uploader>
export type CloseButtonLocale = Partial<typeof defaultLocale.CloseButton>
export type BreadcrumbLocale = Partial<typeof defaultLocale.Breadcrumb>
export type ToggleLocale = Partial<typeof defaultLocale.Toggle>
