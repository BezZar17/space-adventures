
//board
let board
let boardWidth = 800
let boardHeight = 700
let context


//spaceship
let shipWidth = 100
let shipHeight = 75
let shipX = boardWidth/8
let shipY = boardHeight/2
let shipImg

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

//asteriod

let asteriodArray= []
let asteriodWidth = 314
let asteriodHieght = 250
let asteriodX = boardWidth
let asteriodY = 0

let topAsteriodImg
let bottomAsteriodImg

//physics

let velocityX = -2 // asteriods moving left
let velocityY = 0 //ship fly up speed
let gravity = 0.4

let gameOver = false
let score = 0

window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d") //for drawing on the board

    //load imgs
    shipImg = new Image()
    shipImg.src = "/assets/images/pngegg.png"
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
    }

    topAsteriodImg = new Image()
    topAsteriodImg.src = "/assets/images/asteriod.png"

    bottomAsteriodImg = new Image()
    bottomAsteriodImg.src = "/assets/images/asteriod.png"

    requestAnimationFrame(update);
    setInterval(placeAsteriods, 3000) //every 2 seconds
    document.addEventListener("keydown", moveShip)
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return
    }
    context.clearRect(0, 0, board.width, board.height)


//spaceship
velocityY += gravity
ship.y = Math.max(ship.y + velocityY, 0) //apply gravity ship, limit ship to top of canvas
context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

if (ship.y > boardHeight){
    gameOver = true
}


//asteriod
 for(let i = 0; i < asteriodArray.length; i++){
    let asteriod = asteriodArray[i]
    asteriod.x += velocityX
    context.drawImage(asteriod.img, asteriod.x, asteriod.y, asteriod.width, asteriod.height)

    if(!asteriod.passed && ship.x > asteriod.x + asteriod.width){
        score += 0.5 // because there are two astriods
        asteriod.passed = true
    }

    if (detectCollision(ship, asteriod)){
        gameOver = true
    }

 }

//score
context.fillStyle = "white"
context.font = "45px sans-serif"
context.fillText(score, 5, 45)

if(gameOver){
    context.fillText("GAME OVER", 5, 90)
}

}


function placeAsteriods(){

    if (gameOver){
        return
    }

    let randomAsteriodY = asteriodY - asteriodHieght/4 - Math.random()*(asteriodHieght/2)
    let openingSpace = board.height/4

    let topAsteriod = {
        img : topAsteriodImg,
        x : asteriodX,
        y : randomAsteriodY,
        width : asteriodWidth,
        height : asteriodHieght,
        passed : false
    }

    let bottomAsteriod = {
        img : bottomAsteriodImg,
        x: asteriodX,
        y: randomAsteriodY + asteriodHieght + openingSpace,
        width: asteriodWidth,
        height: asteriodHieght,
        passed: false

    }
    asteriodArray.push(bottomAsteriod)
    

    asteriodArray.push(topAsteriod)

}

function moveShip(e){
    if (e.code == "Space" || e.code == "ArrowUp"){

        //fly
        velocityY = -6

        //reset game
        if(gameOver){
            ship.y = shipY
            asteriodArray = []
            score = 0
            gameOver = false
        }

    }
}

function detectCollision (a, b) {
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}