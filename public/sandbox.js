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
      message: 'pause should set state.paused from false to true',
    }, {
      test: () => {
        var state = { paused: true }
        pause(state)
        if(state.paused !== true) {
          throw 'expected state.paused to be true, was ' + state.paused
        }
      },
      message: 'pause should set state.paused from true to true',
    }, {
      test: () => {
        var state = { paused: true }
        unpause(state)
        if(state.paused !== false) {
          throw 'expected state.paused to be false, was ' + state.paused
        }
      },
      message: 'unpause should set state.paused from true to false',
    }, {
      test: () => {
        var state = { paused: false }
        unpause(state)
        if(state.paused !== false) {
          throw 'expected state.paused to be false, was ' + state.paused
        }
      },
      message: 'unpause should set state.paused from false to false',
    }].map((x, i) => {
      try {
        const lines = x.test.toString().split('\n')
        const indent = lines[1].length - lines[1].trimStart().length
        const unindentedLines = lines.map(line => line.slice(indent, line.length))
        x.test()
        return {
          id: i + 1,
          state: 'success',
          message: x.message,
          details: unindentedLines.slice(1, lines.length - 1).join('\n')
        }
      } catch(e) {
        return {
          id: i + 1,
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
          testState: [{
            id: 0,
            state: 'success',
            message: 'it should run without error'
          }].concat(testResults),
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