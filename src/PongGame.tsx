import React, { useRef, useEffect } from 'react'
import PongGraphics from './pong/graphics'
import PongState from './pong/state'

// TODO: don't hardcode these
const AREA_HEIGHT = 700
const AREA_WIDTH = 1420
const BALL_SPEED = 300

function pong(canvas: HTMLCanvasElement) {
  const pongGraphics = new PongGraphics(AREA_WIDTH, AREA_HEIGHT)
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const state = new PongState(AREA_WIDTH, AREA_HEIGHT, BALL_SPEED, performance.now())
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
