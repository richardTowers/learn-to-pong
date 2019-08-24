import React from 'react'
import CodeMirror from 'react-codemirror';

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const initialCode = `function () {
  console.log('hello world')
}`;

const PongEditor: React.FC = () => {
  return (
    <CodeMirror value={initialCode} options={{
      mode: 'javascript',
      theme: 'cobalt',
      tabSize: 2,
      lineNumbers: true,
      viewportMargin: Infinity,
    }} />
  )
}

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="pong-editor">
        <PongEditor />
      </div>
      <div className="pong-game">
        TODO: pong game goes here
      </div>
      <div className="pong-tests">
        TODO: pong tests goes here
      </div>
    </div>
  )
}

export default App
