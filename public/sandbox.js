function evaluateCode (code) {
  'use strict'
  var fn = new Function(code + ';return {pause: pause, unpause: unpause}')
  return fn()
}

function testCode (functions) {
  with (functions) {
    return [{
      test: () => {
        var state = { paused: false}
        pause(state)
        if(state.paused !== true) {
          throw 'expected state.paused to be true, was ' + state.paused
        }
      },
      message: 'pause should set state.paused to true',
    }].map(x => {
      try {
        const lines = x.test.toString().split('\n')
        const indent = lines[1].length - lines[1].trimStart().length
        const unindentedLines = lines.map(line => line.slice(indent, line.length))
        x.test()
        return {
          id: 0,
          state: 'success',
          message: x.message,
          details: unindentedLines.slice(1, lines.length - 1).join('\n')
        }
      } catch(e) {
        return {
          id: 0,
          state: 'failure',
          message: x.message,
          details: e.toString()
        }
      }
    })
  }
}

onmessage = function(messageEvent) {
  'use strict'
  switch(messageEvent.data.type) {
    case 'codeChange':
      console.log('test')
      try {
        const result = evaluateCode(messageEvent.data.code)
        const testResults = testCode(result)
        this.postMessage({
          type: 'testResults',
          testState: testResults,
        })
      } catch (e) {
        this.postMessage({
          type: 'testResults',
          testState: [{
            id: 0,
            state: 'failure',
            message: 'it should run without error',
            details: e.toString()
          }]
        })
      }
      break
  }
}