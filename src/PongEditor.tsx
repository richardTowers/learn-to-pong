import React from 'react'
import CodeMirror from 'react-codemirror'

const PongEditor: React.FC<{value: string}> = (props) => {
  return (
    <CodeMirror value={props.value} options={{
      mode: 'javascript',
      theme: 'cobalt',
      tabSize: 2,
      lineNumbers: true,
      viewportMargin: Infinity,
    }} />
  )
}

export default PongEditor
