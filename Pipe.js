export class Pipe{
    constructor(ctx,x,y,w,h,topPipe){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.topPipe = topPipe;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.w,this.h);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}