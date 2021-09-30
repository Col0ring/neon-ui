type Percentage = `${string}%`
function rgb2hex(color: string): string {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')
  const a = parseFloat(values[3]) || 1
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  )
}

function percentage2Decimal(percentage: Percentage): number {
  const n = +percentage.slice(0, percentage.length - 1)
  return n / 100
}

function addHexZero(n: string): string {
  return parseInt(n, 16) < 16 ? '0' + n : n
}

function generateThemeTools(cb: (hexColor: string, decimal: number) => string) {
  return function (color: string, percentage: Percentage | number): string {
    let hex = color.startsWith('#') ? color : rgb2hex(color)
    if (hex.length === 4) {
      hex = hex + hex.slice(1)
    }
    const hexNum = hex.slice(1)
    const n = hexNum.length
    const decimal = Number.isNaN(+percentage)
      ? percentage2Decimal(percentage as Percentage)
      : +percentage
    let newHexNum = ''
    for (let i = 1; i < n; i += 2) {
      newHexNum += cb(hexNum[i - 1] + hexNum[i], decimal)
    }
    return `#${newHexNum}`
  }
}

export const lighten = generateThemeTools((hexColor, decimal) => {
  return addHexZero(
    Math.round(
      parseInt(hexColor, 16) + (255 - parseInt(hexColor, 16)) * decimal
    ).toString(16)
  )
})

export const darken = generateThemeTools((hexColor, decimal) => {
  return addHexZero(
    Math.round(parseInt(hexColor, 16) * (1 - decimal)).toString(16)
  )
})
