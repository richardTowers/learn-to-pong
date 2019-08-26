onmessage = function(messageEvent) {
  this.postMessage({
    testState: [{
      id: 0,
      state: 'failure',
      message: 'paused should be a function',
      details: 'didn\'t work lol',
    }]
  })
}