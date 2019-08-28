import React, { useRef, useEffect } from 'react'
import PongGraphics from './pong/graphics'
import PongState from './pong/state'

function pong(canvas: HTMLCanvasElement, worker: Worker) {
  const pongGraphics = new PongGraphics(canvas.width, canvas.height)
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const ballSpeed = canvas.width / 500
  let state = new PongState(canvas.width, canvas.height, ballSpeed, performance.now())

  pongGraphics.draw(state, ctx)
  worker.postMessage({type: 'tick', state})

  worker.addEventListener('message', event => {
    if (event.data.type !== 'tock') { return }
    requestAnimationFrame(time => {
      state = event.data.state
      pongGraphics.draw(state, ctx)
      worker.postMessage({type: 'tick', state, time})
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
