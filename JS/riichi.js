
let rounded;

export function Event(){
    this.time = Math.floor(Math.random() * 20) + 1;

    if(this.time < 10) rounded=2;
    if(this.time > 9 && this.time < 15) rounded=4;
    if(this.time > 14 && this.time < 19) rounded=6;
    if(this.time > 18) rounded=8;

    return rounded;
}

export function ReRoll (number){

    

}