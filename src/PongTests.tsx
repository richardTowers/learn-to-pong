import React from 'react'

const PongTests: React.FC = () => {
  return (
    <div className="testResults">
      <div className="testResult success">pause should be a function</div>
      <div className="testResult success">unpause should be a function</div>
      <div className="testResult failure">pause should set <code>state.paused</code> to true</div>
      <div className="testResult failure">unpause should set <code>state.paused</code> to false</div>
    </div>
  )
}

export default PongTests
