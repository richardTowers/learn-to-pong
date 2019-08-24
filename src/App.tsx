import React from 'react'
import PongEditor from './PongEditor'
import PongGame from './PongGame'
import PongTests from './PongTests'

import './App.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/cobalt.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="pong-editor">
        <PongEditor />
      </div>
      <div className="pong-game">
        <PongGame />
      </div>
      <div className="pong-tests">
        <PongTests />
      </div>
    </div>
  )
}

export default App
