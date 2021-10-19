import React from 'react'
import { Button, IconButton, ButtonToolbar } from '@neon-ui/ui-components'

const Demo1: React.FC = () => {
  return (
    <>
      <ButtonToolbar buttonProps={{ disabled: true, size: 'lg' }}>
        <IconButton
          icon={<span>+</span>}
          active
          circle
          disabled={false}
          appearance="primary"
        >
          {/* primary */}
        </IconButton>
        <Button appearance="primary" color="red">
          Default
        </Button>
        <Button appearance="primary" color="red">
          Default
        </Button>
        <Button appearance="primary" color="red">
          Default
        </Button>
      </ButtonToolbar>
    </>
  )
}

export default Demo1
