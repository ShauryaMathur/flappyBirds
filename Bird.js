import { BIRD_RADIUS } from "./constants.js";
export class Bird{
    constructor(ctx,x,y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "yellow";
        this.ctx.arc(this.x,this.y,BIRD_RADIUS,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    move(){
        this.y -= 50;
    }

    fallDueToGravity(){
        this.y += 2;
    }

    getBirdCoordinates(){
        return {
            x: this.x,
            y: this.y
        }
    }
}