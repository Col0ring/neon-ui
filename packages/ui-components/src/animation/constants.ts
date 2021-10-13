import PropTypes from 'prop-types'

export enum AnimationStatus {
  Unmount = 0,
  Exited = 1,
  Entering = 2,
  Entered = 3,
  Exiting = 4,
}

export const animationPropTypes = {
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
}
