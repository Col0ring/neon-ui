export default function isOneOf<T>(one: T, ofTarget: T | T[]) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0
  }
  return one === ofTarget
}
