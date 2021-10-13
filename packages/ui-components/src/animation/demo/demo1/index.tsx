import React, { useState } from 'react'
import { CssTransition } from '@neon-ui/ui-components'
import './index.less'
let key = 0
const Demo1: React.FC = () => {
  const [state, setState] = useState(true)
  const [list, setList] = useState([
    {
      id: key++,
      content: 'demo1',
    },
  ])
  return (
    <>
      <button onClick={() => setState(!state)}>click</button>
      <button
        onClick={() => setList([...list, { id: key++, content: 'demo2' }])}
      >
        add
      </button>
      {list.map((item) => (
        <CssTransition
          key={item.id}
          in={state}
          transitionAppear
          enteringClassName="css-transition-demo1-entering"
          enteredClassName="css-transition-demo1-entered"
          exitingClassName="css-transition-demo1-exiting"
          exitedClassName="css-transition-demo1-exited"
        >
          <div className="css-transition-demo1-box1">{item.content}</div>
        </CssTransition>
      ))}
    </>
  )
}

export default Demo1
