// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function isOneOf<T>(one: T, ofTarget: T | T[]) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0
  }
  return one === ofTarget
}
