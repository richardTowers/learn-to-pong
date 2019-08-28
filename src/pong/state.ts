interface Vector {
  x: number;
  y: number;
}

export class PongBall {
  public readonly radius: number
  public velocity: Vector
  public position: Vector

  constructor(areaWidth: number, areaHeight: number, ballSpeed: number, ballAngleRadians: number) {
    this.radius = 10
    this.velocity = {
      x: ballSpeed * Math.cos(ballAngleRadians),
      y: ballSpeed * Math.sin(ballAngleRadians),
    }
    this.position = {
      x: areaWidth / 2,
      y: areaHeight / 2,
    }
  }
}

export class PongPaddle {
  public velocity: Vector
  public position: Vector
  public width: number
  public height: number

  constructor(areaHeight: number, xPosition: number) {
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.position = {
        x: xPosition,
        y: areaHeight / 2,
    }
    this.width = 10
    this.height = areaHeight / 5
  }
}

interface LeftRight<T> {
  left: T
  right: T
}

export default class PongState {
  public previousTime: number
  public ball: PongBall
  public paddles: LeftRight<PongPaddle>
  public scores: LeftRight<number>
  public areaWidth: number
  public areaHeight: number

  constructor(areaWidth: number, areaHeight: number, ballSpeed: number, time: number) {
    this.areaWidth = areaWidth
    this.areaHeight = areaHeight
    this.previousTime = time
    this.ball = new PongBall(areaWidth, areaHeight, ballSpeed, Math.PI / 2)
    this.paddles = {
      left: new PongPaddle(areaHeight, 20),
      right: new PongPaddle(areaHeight, areaWidth - 20),
    }
    this.scores = {
      left: 0,
      right: 0,
    }
  }
}