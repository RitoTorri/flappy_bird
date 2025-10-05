// board
let board
let boardWidth = 360
let boardHeight = 640
let context

// bird 
let birdWidth = 34
let birdHeight = 24
let birdx = boardWidth / 8
let birdy = boardHeight / 2

let bird = {
    x: birdx,
    y: birdy,
    width: birdWidth,
    height: birdHeight,
}
let birdImg

// pipes
let pipesArray = []
let pipesWidth = 64
let pipesHeight = 512
let pipeX = boardWidth
let pipeY = 0

let TopPipeImg
let BottomPipeImg

// phisics  
let velocityX = -2
let velocityY = 0
let gravity = 0.4

let gameOver = false
let score = 0

// recomendation
let recomendations = [
    "Mantén un ritmo constante de saltos, no esperes hasta el último momento",
    "Intenta volar en el centro del espacio entre tuberías para mayor margen de error",
    "No pulses demasiado rápido, cada salto te da un impulso controlado",
    "Observa el patrón de las tuberías y anticipa tus movimientos",
    "Mantén la calma cuando pases por espacios estrechos",
    "Practica el timing perfecto entre saltos para un vuelo más estable",
    "Enfócate en la siguiente tubería, no en las que ya pasaron",
    "Usa clicks/taps suaves en lugar de mantener presionado",
    "Descansa la vista periódicamente para mantener la concentración",
]

window.onload = () => {
    board = document.getElementById("board")
    board.width = boardWidth
    board.height = boardHeight
    context = board.getContext("2d")

    // draw bird
    birdImg = new Image()
    birdImg.src = "/assets/character/flappybird.png"
    birdImg.onload = () => {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    // draw pipes
    TopPipeImg = new Image()
    TopPipeImg.src = "/assets/obstacles/toppipe.png"

    BottomPipeImg = new Image()
    BottomPipeImg.src = "/assets/obstacles/bottompipe.png"

    requestAnimationFrame(update)
    setInterval(placePipes, 1500)
    document.addEventListener("keydown", moveBird)
    document.addEventListener("click", () => {
        velocityY = -5
    })
}

const update = () => {
    requestAnimationFrame(update)
    if (gameOver) return
    context.clearRect(0, 0, boardWidth, boardHeight)

    // bird
    velocityY += gravity
    bird.y = Math.max(bird.y + velocityY, 0)
    bird.y += velocityY
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > boardHeight) gameOver = true

    // pipes
    for (let i = 0; i < pipesArray.length; i++) {
        let pipe = pipesArray[i]
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5 // 0.5 because there are 2 pipes
            pipe.passed = true
        }
        if (detectCollision(bird, pipe)) gameOver = true
    }

    // clear pipes
    while (pipesArray.length > 0 && pipesArray[0].x < -pipesWidth) {
        pipesArray.shift()
    }

    // score
    context.fillStyle = "#fff"
    context.font = "45px Arial"
    context.fillText(score, 5, 45)


    // game over
    if (gameOver) {
        document.getElementById("gameOverModal").style.display = "block"
        document.getElementById("pointsDisplay").innerHTML = score
        document.getElementById("recommendationMessage").innerHTML = recomendations[Math.floor(Math.random() * recomendations.length)]

        document.getElementById("playAgainBtn").addEventListener("click", () => {
            location.reload()
        })

        document.getElementById("goHomeBtn").addEventListener("click", () => {
            window.location.href = "../../index.html"
        })
    }
}

const placePipes = () => {
    if (gameOver) return

    let randomPipeY = pipeY - pipesHeight / 4 - Math.random() * (pipesHeight / 2)
    let openingSpace = pipesHeight / 4

    let topPipe = {
        img: TopPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipesWidth,
        height: pipesHeight,
        passed: false,
    }
    pipesArray.push(topPipe)

    let bottomPipe = {
        img: BottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipesHeight + openingSpace,
        width: pipesWidth,
        height: pipesHeight,
        passed: false,
    }
    pipesArray.push(bottomPipe)
}

const moveBird = (event) => {
    if (event.code === "Space" || event.code === 'ArrowUp') {
        velocityY = -5
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}
