export class Player{

    #score = 0;
    constructor(name){
        this.name = name;
    }

    getScore(){
        return this.#score;
    }

    increaseScore(){
        this.#score += 1;
    }
}