function evaluateCode (code) {
  'use strict'
  var fn = new Function(`
  function init() {}
  function moveBall() {}
  function bounceWall() {}
  function movePaddles() {}
  function clampPaddles() {}
  function bouncePaddles() {}
  function scoreGoal() {}
  ${code};
  return {
    init: init,
    moveBall: moveBall,
    movePaddles: movePaddles,
    clampPaddles: clampPaddles,
    bounceWall: bounceWall,
    bouncePaddles: bouncePaddles,
    scoreGoal: scoreGoal,
  }`)
  return fn()
}

function testCode (functions) {
  with (functions) {
    return [{
      test: function () {
        var ball = {position:{x:100,y:100},velocity:{x:2,y:0}}
        functions.moveBall(ball, 3)
        if (ball.position.x !== 100 + 2*3) {
          throw new Error(`ball should have moved right by 2*3 pixels (v = 2, dt = 3)`)
        }
        if (ball.position.y !== 100) {
          throw new Error(`ball should not have moved up or down (v = 0)`)
        }
      },
      message: 'moveBall should move the ball right by v*dt'
    }, {
      test: function () {
        var ball = {position:{x:100,y:100},velocity:{x:-2,y:0}}
        functions.moveBall(ball, 3)
        if (ball.position.x !== 100 - 2*3) {
          throw new Error(`ball should have moved left by 2*3 pixels (v = -2, dt = 3)`)
        }
        if (ball.position.y !== 100) {
          throw new Error(`ball should not have moved up or down (v = 0)`)
        }
      },
      message: 'moveBall should move the ball left by v*dt'
    }, {
      test: function () {
        var ball = {position:{x:100,y:100},velocity:{x:0,y:-2}}
        functions.moveBall(ball, 3)
        if (ball.position.y !== 100 - 2*3) {
          throw new Error(`ball should have moved up by 2*3 pixels (v = -2, dt = 3)`)
        }
        if (ball.position.x !== 100) {
          throw new Error(`ball should not have moved left or right (v = 0)`)
        }
      },
      message: 'moveBall should move the ball up by v*dt'
    }, {
      test: function () {
        var ball = {position:{x:100,y:100},velocity:{x:0,y:2}}
        functions.moveBall(ball, 3)
        if (ball.position.y !== 100 + 2*3) {
          throw new Error(`ball should have moved down by 2*3 pixels (v = 2, dt = 3)`)
        }
        if (ball.position.x !== 100) {
          throw new Error(`ball should not have moved left or right (v = 0)`)
        }
      },
      message: 'moveBall should move the ball down by v*dt'
    }, {
      test: function () {
        var ball = {position:{x:100,y:100},velocity:{x:3,y:4}}
        functions.moveBall(ball, 3)
        if (ball.position.x !== 100 + 3*3) {
          throw new Error(`ball should have moved down by 3*3 pixels (v = 3, dt = 3)`)
        }
        if (ball.position.y !== 100 + 4*3) {
          throw new Error(`ball should have moved down by 4*3 pixels (v = 4, dt = 3)`)
        }
      },
      message: 'moveBall should move the ball diagonally by v*dt (right and down)'
    }, {
      test: function () {
        var ball = {position:{x:100,y:200},velocity:{x:0,y:10}}
        var state = { ball: ball, areaHeight: 200 }
        functions.bounceWall(state)
        if (ball.velocity.x !== 0) {
          throw new Error(`ball should have still have 0 horizontal velocity`)
        }
        if (ball.velocity.y != -10) {
          throw new Error(`ball should have reversed its vertical velocity (was ${ball.velocity.y}, should have been -10)`)
        }
      },
      message: 'bounceWall should bounce the ball off the bottom wall'
    }, {
      test: function () {
        var ball = {position:{x:100,y:0},velocity:{x:0,y:-10}}
        var state = { ball: ball, areaHeight: 200 }
        functions.bounceWall(state)
        if (ball.velocity.x !== 0) {
          throw new Error(`ball should have still have 0 horizontal velocity`)
        }
        if (ball.velocity.y != 10) {
          throw new Error(`ball should have reversed its vertical velocity (was ${ball.velocity.y}, should have been 10)`)
        }
      },
      message: 'bounceWall should bounce the ball off the top wall'
    }, {
      test: function () {
        var paddles = {
          left: { position: { x: 0, y: 0}, velocity: {x: 0, y: 5}},
          right: { position: { x: 0, y: 0}, velocity: {x: 0, y: 0}},
        }
        functions.movePaddles(paddles, 6)
        if (paddles.left.position.y !== 5*6) {
          throw new Error(`left paddle should have moved down by 5*6 pixels (v= 5, dt = 6)`)
        }
        if (paddles.left.position.x !== 0) {
          throw new Error(`left paddle should not have moved horizontally`)
        }
      },
      message: 'movePaddles should move the left paddle'
    }, {
      test: function () {
        var paddles = {
          left: { position: { x: 0, y: 0}, velocity: {x: 0, y: 0}},
          right: { position: { x: 0, y: 0}, velocity: {x: 0, y: 5}},
        }
        functions.movePaddles(paddles, 6)
        if (paddles.right.position.y !== 5*6) {
          throw new Error(`right paddle should have moved down by 5*6 pixels (v= 5, dt = 6)`)
        }
        if (paddles.right.position.x !== 0) {
          throw new Error(`right paddle should not have moved horizontally`)
        }
      },
      message: 'movePaddles should move the right paddle'
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

const noop = () => {};
let functions = {};

function tick(state, time) {
  const dt = time ? Math.min(1, (time - state.previousTime) / 1000) : 0
  if (!state.initialised && functions.init) {
    functions.init(state)
    state.initialised = true
  }
  ;(functions.movePaddles || noop)(state.paddles, dt)
  ;(functions.moveBall || noop)(state.ball, dt)
  ;(functions.bounceWall || noop)(state, dt)
  ;(functions.clampPaddles || noop)(state.paddles, dt)
  ;(functions.bouncePaddles || noop)(state, dt)
  ;(functions.scoreGoal || noop)(state, dt)
}

onmessage = function(messageEvent) {
  'use strict'
  switch(messageEvent.data.type) {
    case 'codeChange':
      try {
        functions = evaluateCode(messageEvent.data.code)
        const testResults = testCode(functions)
        this.postMessage({
          type: 'testResults',
          code: messageEvent.data.code,
          testState: [{
            id: 0,
            state: 'success',
            message: 'it should run without error'
          }].concat(testResults),
        })
      } catch (e) {
        this.postMessage({
          type: 'testResults',
          code: messageEvent.data.code,
          testState: [{
            id: 0,
            state: 'failure',
            message: 'it should run without error',
            details: e.toString()
          }]
        })
      }
      break
    case 'tick':
      const state = messageEvent.data.state
      try {
        tick(state, messageEvent.data.time)
      } catch(e) {
        this.console.error(e)
      }
      this.postMessage({
        type: 'tock',
        state: state,
      })
  }
}