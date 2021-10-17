import { getPageOffset, getRect } from '@neon-ui/misc/dom'
import { RectProps } from './type'

export function getPosition(
  target: HTMLElement,
  event: React.MouseEvent
): RectProps {
  const { offsetLeft, offsetTop } = getPageOffset(target)
  const { width, height } = getRect(target)
  const offsetX = (event.pageX || 0) - offsetLeft
  const offsetY = (event.pageY || 0) - offsetTop

  const radiusX = Math.max(width - offsetX, offsetX)
  const radiusY = Math.max(height - offsetY, offsetY)
  const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2))

  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius,
  }
}
