const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const lines : number = 4
const scGap : number = 0.05
const scDiv : number = 0.51
const sizeFactor : number = 3
const strokeFactor : number = 90
const color : string = "#e74c3c"

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1 / n, Math.max(0, scale - i / n)) * n
}

const scaleFactor : Function = (scale : number) : number => Math.floor(scale / scDiv)

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}

const drawSOSNode : Function = (context, i, scale) => {
    const gap : number = w / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    context.strokeStyle = color
    context.lineCap = 'round'
    context.lineWidth = Math.min(w, h) / strokeFactor 
    context.save()
    context.translate(gap * (i + 1), h / 2)
    for (var j = 0; j < lines; j++) {
        const scc1 : number = divideScale(sc1, j, lines)
        const scc2 : number = divideScale(sc2, j, lines)
        context.save()
        context.rotate(Math.PI/2 * j)
        context.save()
        context.translate(-size, size)
        context.rotate(Math.PI/2 * scc2)
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(-2 * size * scc1, 0)
        context.stroke()
        context.restore()
        context.restore()
    }
    context.restore()
}

const updateScale : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * scGap * dir
}

class SquareOpenerStepStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : SquareOpenerStepStage = new SquareOpenerStepStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
