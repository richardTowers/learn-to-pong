import React from 'react'
import CodeMirror from 'react-codemirror'

const PongEditor: React.FC<{value: string, onChange: (newValue: string) => any}> = (props) => {
  return (
    <CodeMirror value={props.value} onChange={props.onChange} options={{
      mode: 'javascript',
      theme: 'cobalt',
      tabSize: 2,
      lineNumbers: true,
      viewportMargin: Infinity,
    }} />
  )
}

export default PongEditor
