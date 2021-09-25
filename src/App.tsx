import React, {useState, useEffect} from 'react'
import {debounce} from 'lodash'
import PongEditor from './PongEditor'
import PongGame from './PongGame'
import PongTests from './PongTests'

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const defaultCode = `function init(width, height, time) {
  // You can probably leave this code more or less as it is. It's here to show
  // you what the "state" object looks like at the beginning.

  const ballSpeed = width / 500
  return {
    previousTime: time,
    paddlesSpeed: height / 50,
    areaWidth: width,
    areaHeight: height,
    ball: {
      radius: 10,
      velocity: { x: ballSpeed * Math.PI / 2, y: ballSpeed * Math.PI / 2 },
      position: { x: width / 2, y: height / 2 },
    },
    paddles: {
      left: {
        velocity: { x: 0, y: 0 },
        position: { x: 20, y: height / 2 },
        width: 5,
        height: height / 5,
      },
      right: {
        velocity: { x: 0, y: 0 },
        position: { x: width - 20, y: height / 2 },
        width: 5,
        height: height / 5,
      },
    },
  }
}

function moveBall(ball, dt) {

}

function bounceWall(state, dt) {

}

function movePaddles(paddles, dt) {

}

function clampPaddles(state, dt) {

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
