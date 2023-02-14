
let sprite1; //Spelunky Guy
let sprite2; //Eskimo
let sprite3; //Monkey
let sprite4; //Round Boy

let animation1;
let animation2;
let animation3;
let animation4;


function preload() {
  sprite1 = loadImage("assets/Spelunky Guy.png");
  sprite2 = loadImage("assets/Animation2.png");
  sprite3 = loadImage("assets/Monkeys.png");
  sprite4 = loadImage("assets/RoundBoy.png");

}


function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  animation1 = new WalkingAnimation(sprite1, 80, 80, 200, 200, 9);
  animation2 = new WalkingAnimation(sprite2, 80, 80, 100, 200, 9);
  animation3 = new WalkingAnimation(sprite3, 80, 80, 300, 300, 6);
  animation4 = new WalkingAnimation(sprite4, 80, 80, 50, 50, 9);
}

function draw() {
  background(220); //white background
  animation1.draw();
  animation2.draw();
  animation3.draw();
  animation4.draw();

}

function keyPressed(){ 
  animation1.keyPressed();
  animation2.keyPressed();
  animation3.keyPressed();
  animation4.keyPressed();
}


function keyReleased() {
  animation1.keyReleased();
  animation2.keyReleased();
  animation3.keyReleased();
  animation4.keyReleased();
}

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength){
    this.spriteSheet = spriteSheet;
    this.sw = sw; //sprite width
    this.sh = sh; //sprite height
    this.dx = dx; //x location
    this.dy = dy; //y location
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0; //brings standing postion (controls frame of motion)
    this.moving = 0; 
    this.xDirection = 1;

  }

  draw(){ //creates the character animation
    if (this.moving != 0){
      this.u = this.currentFrame % this.animationLength; 
    } 
    else{
      this.u = 0;
    }

    push(); 
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
    pop();

    if (frameCount % 6 == 0){
      this.currentFrame++;
    }
    this.dx += this.moving;

  }

  keyPressed(){ //controls the movement of the animation
    if(keyCode === RIGHT_ARROW){
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }
    else if (keyCode === LEFT_ARROW){
      this.moving -= 1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased(){ //stops animation movement
    if (keyCode === RIGHT_ARROW || LEFT_ARROW){
      this.moving = 0;
    }
  }
}

