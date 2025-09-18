import {Pipe} from "./Pipe.js";
import { generateRandomNumberInInterval } from "./utils.js";
import { GAME_HEIGHT } from "./constants.js";

export class PipeManager{
    constructor(ctx){
        this.ctx = ctx;
        this.pipeWidth = 100;
        this.pipeHeight = 300;
        this.pipeGap = 100;
        this.pipeX = 1000;
        this.pipeSpeed = 3;
        this.pipes = [];
        this.lastX = 0;
        this.firstPipe = null;
        this.lastTop = true;
        this.passedPipes = new Set();
    }

    getFirstPipe(){
        return this.firstPipe;
    }


    generatePipes(){
        for(let i = 0;i < 5;i++){
            let startx = this.lastX;
            let endx = (i+1)*200 - this.pipeWidth;
            
            let height = generateRandomNumberInInterval(100,300);
            let width = generateRandomNumberInInterval(100,150);
            
            let x = generateRandomNumberInInterval(startx,endx);
            let y = this.lastTop ? 0:(GAME_HEIGHT - height);

            this.lastX = x + width
            let pipe = new Pipe(this.ctx,x,y,width,height,this.lastTop);
            this.pipes.push(pipe);
            this.lastTop = !this.lastTop
        }
        // console.log(this.pipes);
    }

    generateNewPipes(){
        
        let height = generateRandomNumberInInterval(100,300);
        let width = generateRandomNumberInInterval(100,150);

        let x = this.lastX + generateRandomNumberInInterval(0,200) + this.pipeGap;
        let y = this.lastTop ? 0:(GAME_HEIGHT - height);
        this.lastX = x + width
        
        let pipe = new Pipe(this.ctx,x,y,width,height,this.lastTop);
        this.lastTop = !this.lastTop
        
        this.pipes.push(pipe);
    }

    generateInitialPipes(){
        this.generatePipes();
    }

    scrollPipes(){
        this.lastX -= this.pipeSpeed;
        for(let pipe of this.pipes){
            pipe.x -= this.pipeSpeed;
            if(pipe.x + pipe.w <= 0){
                // debugger;
                this.pipes.shift();
                this.firstPipe = this.pipes[0];
            }
        }
        if(this.pipes.length === 4){            
            this.generateNewPipes();
        }
    }

    drawPipes(){
        for(let pipe of this.pipes){
            pipe.draw();
        }
    }

    addToPassedSet(pipe){
        this.passedPipes.add(pipe);
    }

    clearPassedSet(){
        if(this.passedPipes.size <= 10){
            return;
        }
        this.passedPipes.clear();
    }
    isInPassedSet(pipe){
        if(this.passedPipes.has(pipe)){
            return true;
        }
        return false;
    }
}