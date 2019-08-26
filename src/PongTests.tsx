import React from 'react'

const PongTests: React.FC<{tests: any[]}> = (props) => {
  return (
    <div className="testResults">
      {props.tests.map(test => 
        <details key={test.id} className={test.state + " testResult"}>
          <summary>{test.message}</summary>
          <div className="detailsBody">{test.details}</div>
        </details>
      )}
    </div>
  )
}

export default PongTests
