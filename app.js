
//board
let board
let boardWidth = 800
let boardHeight = 500
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
let asteriodWidth = 150
let asteriodHieght = 200
let asteriodX = boardWidth
let asteriodY = 0

let topAsteriodImg
let bottomAsteriodImg

//physics

let velocityX = -2 // asteriods moving left

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
    setInterval(placeAsteriods, 2000) //every 2 seconds
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height)


//spaceship
context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)

//asteriod
 for(let i = 0; i < asteriodArray.length; i++){
    let asteriod = asteriodArray[i]
    asteriod.x += velocityX
    context.drawImage(asteriod.img, asteriod.x, asteriod.y, asteriod.width, asteriod.height)
 }

}

function placeAsteriods(){
    let topAsteriod = {
        img : topAsteriodImg,
        x : asteriodX,
        y : asteriodY,
        width : asteriodWidth,
        height : asteriodHieght,
        passed : false
    }

    asteriodArray.push(topAsteriod)

}