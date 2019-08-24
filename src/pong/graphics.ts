export default class PongGraphics {
  constructor(
    private readonly areaWidth: number,
    private readonly areaHeight: number,
  ) {}

  private drawBall(state: any, ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(state.ball.position.x, state.ball.position.y, state.ball.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  private drawPaddle(paddle: any, ctx: CanvasRenderingContext2D) {
    ctx.rect(
      paddle.position.x - paddle.width / 2,
      paddle.position.y - paddle.height / 2,
      paddle.width,
      paddle.height
    )
    ctx.fill()
  }

  private drawScores(state: any, ctx: CanvasRenderingContext2D) {
    ctx.font = '48px sans-serif'
    ctx.fillText(state.scores.left, 48, 48)
    ctx.fillText(state.scores.right, this.areaWidth - 48 * 2, 48)
  }

  public draw(state: any, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.areaWidth, this.areaHeight)
    this.drawScores(state, ctx)
    this.drawBall(state, ctx)
    this.drawPaddle(state.paddles.left, ctx)
    this.drawPaddle(state.paddles.right, ctx)
  }
}