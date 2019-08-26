import React, {useState} from 'react'
import {debounce} from 'lodash'
import PongEditor from './PongEditor'
import PongGame from './PongGame'
import PongTests from './PongTests'

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const defaultCode = `/*
 *  -----------------------------
 * | Welcome to "Learn to Pong!" |
 *  -----------------------------
 *
 * Hello! I'm a comment, and I'm going to be your guide
 * for this tutorial.
 *
 * You should see three panels on your screen.
 *
 * The panel I'm in is the code panel. We'll be using this
 * panel to write the code for our Pong game. As you
 * progress, I'll update myself to let you know what to do
 * next.
 *
 * In the top right there's our Pong game - we've already
 * made a bit of a start and handled some of the boring
 * bits, but we still need to write the game code.
 *
 * In the bottom right there are some tests - these will
 * help you know when you've got your functions correct,
 * and give you some hints as to what might be wrong.
 *
 * To get started, let's build some simple pause / unpause
 * functions. The pause function should set "state.paused"
 * to true, and the unpause function should set
 * "state.paused" to false.
 */

function pause (state) {
  // TODO implement this
}

function unpause (state) {
  // TODO implement this
}`;


const codeFromStorage = localStorage.getItem('pong-code')
const initialCode = codeFromStorage || defaultCode

const worker = new Worker('./sandbox.js')
worker.postMessage({type: 'codeChange', code: initialCode})

const App: React.FC = () => {
  const [testState, setTestState] = useState([])
  worker.onmessage = (ev: MessageEvent) => {
    setTestState(ev.data.testState)
    // The first test is "it should run without error" - only save the code if it doesn't error
    if (ev.data.testState[0].state === 'success') {
      localStorage.setItem('pong-code', ev.data.code)
    }
  }
  return (
    <div className="App">
      <div className="pong-editor">
        <PongEditor value={initialCode} onChange={debounce(code => worker.postMessage({type: 'codeChange', code: code}), 300)}/>
      </div>
      <div className="pong-game" tabIndex={-1}>
        <PongGame />
      </div>
      <div className="pong-tests">
        <PongTests tests={testState} />
      </div>
    </div>
  )
}

export default App
