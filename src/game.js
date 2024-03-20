//import {sum} from './sum.js'

const Game = function(canvasId)  {
  let canvas = document.getElementById("screen");
  let screen = canvas.getContext("2d");
  this.player = new Player(canvas.width, canvas.height);
  
  let self = this;

  let tick = () => {
    self.update();
    self.draw(screen);
    requestAnimationFrame(tick);
  }

  tick();
}

Game.prototype = {
  draw: function(screen){
    this.player.draw(screen);
  },
  update :function (){
    this.player.update();
  }
}

const Player = function(canvasWidth, canvasHeight){

  this.size = { w:20, h:20 };
  this.position = { x: canvasWidth/2, y: canvasHeight - 20 };
  this.border = () => { 
    return {l:this.position.x - this.size.w/2, r: this.position.x + this.size.w/2,
     u: this.position.y - this.size.h/2, d: this.position.y + this.size.h/2 };
     };
  this.keyboard = new Keyboard();  

}

Player.prototype = {
  
  draw: function(screen){
    screen.fillRect(this.border().l, this.border().u, this.size.w, this.size.h);
  },
  update : function () {
    if(this.keyboard.right()){
      this.position.x += 4;
    }
  }
}


const Keyboard = function () {
  let keystate = {};
  window.onkeydown = function (ev) {
    keystate[ev.code] = true;
  };

  window.onkeyup = function (ev) {
    keystate[ev.code] = false;
  };
  this.right = () => {
    return keystate["ArrowRight"] === true;
  }

  this.left = () => {
    return keystate["ArrowLeft"] === true;
  }
}


new Game("screen");
