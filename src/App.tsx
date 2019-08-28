import React, {useState, useEffect} from 'react'
import {debounce} from 'lodash'
import PongEditor from './PongEditor'
import PongGame from './PongGame'
import PongTests from './PongTests'

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const defaultCode = `function moveBall(ball, dt) {
  ball.position = {
    x: ball.position.x + ball.velocity.x * dt,
    y: ball.position.y + ball.velocity.y * dt,
  }
}

function bounceWall(state) {
  if (state.ball.position.y + state.ball.radius >= state.areaHeight) {
    state.ball.velocity.y = -Math.abs(state.ball.velocity.y)
  }
  if (state.ball.position.y - state.ball.radius <= 0) {
    state.ball.velocity.y = Math.abs(state.ball.velocity.y)
  }
}`;

const codeFromStorage = localStorage.getItem('pong-code')
const initialCode = codeFromStorage || defaultCode

const worker = new Worker('./sandbox.js')
const App: React.FC = () => {
  const [testState, setTestState] = useState([])
  useEffect(() => {
    worker.postMessage({type: 'codeChange', code: initialCode})
    worker.addEventListener('message', (ev: MessageEvent) => {
      if (ev.data.type !== 'testResults') { return }
      setTestState(ev.data.testState)
      // The first test is "it should run without error" - only save the code if it doesn't error
      if (ev.data.testState[0].state === 'success') {
        localStorage.setItem('pong-code', ev.data.code)
      }
    })
  }, [])
  return (
    <div className="App">
      <div className="pong-editor">
        <PongEditor value={initialCode} onChange={debounce(code => worker.postMessage({type: 'codeChange', code: code}), 300)}/>
      </div>
      <div className="pong-game" tabIndex={-1}>
        <PongGame worker={worker}/>
      </div>
      <div className="pong-tests">
        <PongTests tests={testState} />
      </div>
    </div>
  )
}

export default App
