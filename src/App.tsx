import React, {useState, useEffect} from 'react'
import {debounce} from 'lodash'
import PongEditor from './PongEditor'
import PongGame from './PongGame'
import PongTests from './PongTests'

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const defaultCode = `function init(state) {

}

function moveBall(ball, dt) {

}

function bounceWall(state, dt) {

}

function movePaddles(paddles, dt) {

}

function clampPaddles(paddles, dt) {

}

function bouncePaddles(state, dt) {

}

function scoreGoal(state, dt) {

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
