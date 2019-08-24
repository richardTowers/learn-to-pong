import React, { useRef, useEffect } from 'react'
import PongGraphics from './pong/graphics'

// TODO: don't hardcode these
const AREA_HEIGHT = 700
const AREA_WIDTH = 1420
const BALL_SPEED = 300
const INITIAL_BALL_ANGLE = Math.PI / 8

function initialisePaddle(xPosition: number) {
  return {
    velocity: {
      x: 0,
      y: 0,
    },
    position: {
      x: xPosition,
      y: AREA_HEIGHT / 2,
    },
    width: 10,
    height: AREA_HEIGHT / 5
  }
}

function initialiseState(time: number) {
  const ball = {
    radius: 10,
    velocity: {
      x: BALL_SPEED * Math.cos(INITIAL_BALL_ANGLE),
      y: BALL_SPEED * Math.sin(INITIAL_BALL_ANGLE),
    },
    position: {
      x: AREA_WIDTH / 2,
      y: AREA_HEIGHT / 2
    }
  }
  return {
    previousTime: time,
    ball: ball,
    paddles: {
      left: initialisePaddle(20),
      right: initialisePaddle(AREA_WIDTH - 20),
    },
    scores: {
      left: 0,
      right: 0,
    }
  }
}

function pong(canvas: HTMLCanvasElement) {
  const pongGraphics = new PongGraphics(AREA_WIDTH, AREA_HEIGHT)
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const state = initialiseState(performance.now())
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
