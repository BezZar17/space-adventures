
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
window.onload = function(){
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d") //for drawing on the board

    //load img
    shipImg = new Image()
    shipImg.src = "/assets/images/pngegg.png"
    shipImg.onload = function() {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
    }
}
