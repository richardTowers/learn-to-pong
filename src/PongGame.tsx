import React, { useRef, useEffect } from 'react'
import PongGraphics from './pong/graphics'
import PongState from './pong/state'

function pong(canvas: HTMLCanvasElement) {
  const pongGraphics = new PongGraphics(canvas.width, canvas.height)
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const ballSpeed = canvas.width / 5
  const state = new PongState(canvas.width, canvas.height, ballSpeed, performance.now())
  pongGraphics.draw(state, ctx)
  return () => console.log('TODO: cleanup')
}

const PongGame: React.FC = () => {
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>
  useEffect(() => {
    const canvas = canvasRef.current
    const pixelRatio = window.devicePixelRatio
    canvas.width = canvas.clientWidth * pixelRatio
    canvas.height = canvas.clientHeight * pixelRatio
    return pong(canvas)
  }, [canvasRef])
  return (<canvas ref={canvasRef}></canvas>)
}

export default PongGame
