import React, { useRef, useEffect } from 'react'
import PongGraphics from './pong/graphics'
import PongState from './pong/state'

interface inputEvent {
  paddle: 'left' | 'right',
  action: 'up' | 'down' | 'stop',
}

function pong(canvas: HTMLCanvasElement, worker: Worker) {
  const pongGraphics = new PongGraphics(canvas.width, canvas.height)
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const ballSpeed = canvas.width / 500
  const state = new PongState(canvas.width, canvas.height, ballSpeed, performance.now())
  let inputEvents: inputEvent[] = []

  pongGraphics.draw(state, ctx)
  worker.postMessage({type: 'tick', state})

  canvas.parentElement!.addEventListener('keyup', event => {
    if ('qwertasdfg'.includes(event.key)) {
      state.paddles.left.velocity.y = 0
    }
    else if ('yuiophjkl;'.includes(event.key)) {
      state.paddles.right.velocity.y = 0
    }
  })
  canvas.parentElement!.addEventListener('keydown', event => {
    if ('qwert'.includes(event.key)) {
      state.paddles.left.velocity.y = -state.paddlesSpeed
    }
    else if ('asdfg'.includes(event.key)) {
      state.paddles.left.velocity.y = state.paddlesSpeed
    }
    else if ('yuiop'.includes(event.key)) {
      state.paddles.right.velocity.y = -state.paddlesSpeed
    }
    else if ('hjkl;'.includes(event.key)) {
      state.paddles.right.velocity.y = state.paddlesSpeed
    }
  })

  worker.addEventListener('message', event => {
    if (event.data.type !== 'tock') { return }
    requestAnimationFrame(time => {
      pongGraphics.draw(event.data.state, ctx)
      event.data.state.paddles.left.velocity = state.paddles.left.velocity
      event.data.state.paddles.right.velocity = state.paddles.right.velocity
      worker.postMessage({type: 'tick', state: event.data.state, time})
      inputEvents = []
    })
  })
  return () => console.log('TODO: cleanup')
}

const PongGame: React.FC<{worker: Worker}> = (props: {worker: Worker}) => {
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>
  useEffect(() => {
    const canvas = canvasRef.current
    const pixelRatio = window.devicePixelRatio
    canvas.width = canvas.clientWidth * pixelRatio
    canvas.height = canvas.clientHeight * pixelRatio
    return pong(canvas, props.worker)
  }, [canvasRef])
  return (<canvas ref={canvasRef}></canvas>)
}

export default PongGame
