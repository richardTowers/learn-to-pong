import React from 'react'
import CodeMirror from 'react-codemirror'

const initialCode = `function updatePosition (state, time) {
  state.pos.x = state.pos.x + state.speed.x * time
  state.pos.y = state.pos.y + state.speed.y * time
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

export default PongEditor
