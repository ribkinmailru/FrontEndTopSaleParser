function Obstacles(positionX,positionY,width,heigth){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.heigth = heigth
}


var jump = false;
var fail = false;
var obstacles = []
var playerPositionY = 0

function performJump(){
    if(jump){
        if(playerPositionY!=200) playerPositionY+=10
        else {fail = true; jump = false}
    }
    else if(fail){
        if(playerPositionY!=0) playerPositionY-=10
        else fail = false
    }
 }


var speed = 7

var time;
var spawnTime = 1000;
var score = 0;
var game = true;
document.addEventListener('DOMContentLoaded', function() {
    
    var backgroud = new Image()
    var cactus = new Image(15,30)
    var dino =  new Image()
    backgroud.src = "game/desert.jpg"
    cactus.src = "game/cactus.png"
    dino.src = "game/dino.png"
    time = performance.now()
    console.log(time)
    var canvas = document.getElementById("canvas")
    canvas.width = 950
    canvas.heigth = "400"
    var canvasContext = canvas.getContext("2d")
    

    function draw(){
    if(game){
        if(performance.now() - time > spawnTime){
            obstacles.push(new Obstacles(canvas.width-70,canvas.heigth-80,70,80))
            time = performance.now()
        }
        performJump()
        canvasContext.drawImage(backgroud,0,0,canvas.width,canvas.heigth)
        canvasContext.drawImage(cactus,80,canvas.heigth-120-playerPositionY,80,120)
        obstacles.forEach((item, index) => {
            canvasContext.drawImage(dino,item.positionX,item.positionY,item.width,item.heigth)
            checkCollision(item)
            item.positionX -= speed
            if(item.positionX < -item.width/2){
                obstacles.splice(index,1)
                score++
            }
            
            }
        )
        canvasContext.fillStyle = "#000";
        canvasContext.font = '18px serif';
        canvasContext.fillText("Score: " + score, 10, 20);
        requestAnimationFrame(draw)
        }
    }
    draw()
 }, false);

 document.body.onkeydown = function(e){
     if(e.keyCode == 32 && !jump && !fail){
         jump = true
     }
 }

function checkCollision(obstacle){
    if(obstacle.positionY>canvas.heigth-120-playerPositionY && obstacle.positionY<canvas.heigth-playerPositionY
         && obstacle.positionX<80+40 && obstacle.positionX+obstacle.width-40>80){
        gameOver()
    }

}

function gameOver(){
    score = 0
    obstacles.splice(0)
}


