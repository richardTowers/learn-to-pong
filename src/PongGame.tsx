import React, { useRef, useEffect } from 'react'

// TODO: don't hardcode these
const AREA_HEIGHT = 150
const AREA_WIDTH = 300
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
    width: 5,
    height: AREA_HEIGHT / 5
  }
}

function initialiseState(time: number) {
  const ball = {
    radius: 5,
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
      left: initialisePaddle(10),
      right: initialisePaddle(AREA_WIDTH - 10),
    },
    scores: {
      left: 0,
      right: 0,
    }
  }
}

function drawBall(state: any, ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.arc(state.ball.position.x, state.ball.position.y, state.ball.radius, 0, 2 * Math.PI, false)
  ctx.fill()
}

function drawPaddle(paddle: any, ctx: CanvasRenderingContext2D) {
  ctx.rect(
    paddle.position.x - paddle.width / 2,
    paddle.position.y - paddle.height / 2,
    paddle.width,
    paddle.height
  )
  ctx.fill()
}

function drawScores(state: any, ctx: CanvasRenderingContext2D) {
  ctx.font = '24px sans-serif'
  ctx.fillText(state.scores.left, 48, 48)
  ctx.fillText(state.scores.right, AREA_WIDTH - 48 * 2, 48)
}

function draw(state: any, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, AREA_WIDTH, AREA_HEIGHT)
  drawScores(state, ctx)
  drawBall(state, ctx)
  drawPaddle(state.paddles.left, ctx)
  drawPaddle(state.paddles.right, ctx)
}

function pong(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) { throw new Error('Could not get 2d context'); }
  const state = initialiseState(performance.now())
  draw(state, ctx)
}

const PongGame: React.FC = () => {
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>
  useEffect(() => {
    pong(canvasRef.current)
    return () => console.log('TODO: cleanup')
  }, [canvasRef])
  return (<canvas ref={canvasRef}></canvas>)
}

export default PongGame
