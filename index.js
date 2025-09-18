import { Bird } from "./Bird.js";
import { GAME_HEIGHT, GAME_WIDTH,BIRD_RADIUS } from "./constants.js";
import { PipeManager } from "./PipeManager.js";
import { Player } from "./Player.js";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const gameScore = document.getElementById("gameScore");

let bird = new Bird(ctx,200,GAME_HEIGHT/2);
const pipeGenerator = new PipeManager(ctx);
const player = new Player("Shaurya");

function checkBirdClearance(){

    let {x,y} = bird.getBirdCoordinates();
    if(y <= 0 || y >= GAME_HEIGHT){
        throw new Error("Game Over");
    }
    
    let firstPipe = pipeGenerator.getFirstPipe();
    if(pipeGenerator.isInPassedSet(firstPipe)){
        return false
    }
    // console.log(JSON.stringify(firstPipe));
    if(firstPipe === null){
        
        return false; 
    }
          
    // console.log(x,y);
    
    let isXGreater = x > firstPipe.x + firstPipe.w;
    if(!isXGreater){
        return false;
    }
    if(firstPipe.topPipe){
        if(y >  + firstPipe.h + BIRD_RADIUS){
            pipeGenerator.addToPassedSet(firstPipe);
            return true;
        } 
    }else if(y + BIRD_RADIUS < firstPipe.y){
        pipeGenerator.addToPassedSet(firstPipe);
        return true;
    }
    return false;
}

function checkCollision(){
    // Check collision with topPipe
    let {x,y} = bird.getBirdCoordinates();

    for (let pipe of pipeGenerator.pipes) {
        if(bird.x - BIRD_RADIUS > pipe.x + pipe.w){
            continue
        }
        if(pipe.topPipe){
            // Collision on face
            if(x + BIRD_RADIUS >= pipe.x){
                if(y + BIRD_RADIUS <= pipe.h){
                    console.log("Collision");
                    throw new Error("Game Over");
                }
            }
            // Collision on tail
            if(x - BIRD_RADIUS >= pipe.x && x+BIRD_RADIUS <= pipe.x + pipe.w){
                if(y - BIRD_RADIUS <= pipe.h){
                    console.log("Collision");
                    
                    throw new Error("Game Over");
                }
            }
        }else if (!pipe.topPipe){
            // Collision on face
            if(x + BIRD_RADIUS >= pipe.x){
                if(y - BIRD_RADIUS >= pipe.y){
                    console.log("Collision");
                    throw new Error("Game Over");
                }
            }
            // Collision on tail
            if(x - BIRD_RADIUS >= pipe.x && x+BIRD_RADIUS <= pipe.x + pipe.w){
                if(y + BIRD_RADIUS >= pipe.y){
                    console.log("Collision");
                    
                    throw new Error("Game Over");
                }
            }
        }
    }
    return false;

}

window.addEventListener("keydown", (event) => {
    let {key,code} = event;
    
    if(code === "Space"){
        bird.move();
    }
    if(key === "p"){
        // window.alert("Game Paused");
        debugger;
    }    
    if(key === "r"){
        window.location.reload();
    }
})
pipeGenerator.generateInitialPipes();
function gameLoop(){
    
    try{
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    checkCollision();
    if(checkBirdClearance()){
        player.increaseScore();
        gameScore.innerText = 'Score: ' + player.getScore();
    }
    // ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    pipeGenerator.scrollPipes();
    pipeGenerator.drawPipes();
    
    bird.fallDueToGravity();
    bird.draw();
    
    requestAnimationFrame(gameLoop);
    }catch(error){
        pipeGenerator.drawPipes();
        bird.draw();
        ctx.font = "80px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillText("Game Over",GAME_WIDTH/2, GAME_HEIGHT/2);
        return;
    }
}
gameLoop();
