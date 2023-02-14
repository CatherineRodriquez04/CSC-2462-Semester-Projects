


let bugSheetFilenames = ["Ant.png","BlueAnt.png","YellowAnt.png", "PurpleAnt.png"];
let bugSheets = []; 
let animations = [];

const GameState = {
  Start: "Start",
  PreGame: "Rules",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 25, state: GameState.Start};

function preload() {
  for (let i =0; i < bugSheetFilenames.length; i++){
    bugSheets[i] = loadImage("assets/" + bugSheetFilenames[i]);
  }
 
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER); 
  angleMode(DEGREES);

  reset(); 
}

function reset(){
  game.elapsedTime = 0;
  game.score = 0;
  game.totalBugs = random(10,30);

  animations = [];
  for(let i=0; i < game.totalBugs; i++) {
    animations[i] = new BugAnimation(random(bugSheets),32,30,random(100,300),random(100,300),4,random(0.5,1),6,random([0,1]));
  }

}

function draw() {
  switch(game.state){
    case GameState.Start:
      background(0,160,255);
      fill(255);
      textFont('Georgia');
      textSize(50);
      textAlign(CENTER);
      text("Ant Take Over!", 200,200);
      textSize(15);
      text("Press Any Key to See the Rules", 200, 250);
      image(bugSheets[0], 100, 85, 45, 40, 0, 0, 32, 30); //red ant
      image(bugSheets[1], 300, 300, 45, 40, 0, 0, 32, 30); //blue ant
      image (bugSheets[2], 350, 50, 45, 40, 0, 0, 32, 30); //yellow ant
      image (bugSheets[3], 45, 350, 45, 40 , 0, 0, 32, 30); //purple ant

      break;

    case GameState.Rules:
      background(0,160,255);
      fill(255);
      textFont('Georgia');
      textSize(25);
      textAlign(LEFT);
      text("Rules:", 10, 150);
      textSize(20);
      text("The goal of the game is to squish", 10, 180);
      text("all the ants.", 10, 210);
      text("Step 1: use mouse to click on the ants", 10, 240);
      text("Step 2: click on as many ants before", 10, 270);
      text("the time runs out", 75, 300);
      textSize(35);
      textAlign(CENTER);
      text("Can you stop the ants", 200, 60);
      text("from taking over?", 200, 100);
      textSize(15);
      text("Press Any Key to Start", 200, 350);
      image(bugSheets[0], 355, 180, 45, 40, 0, 0, 32, 30); //red ant
      image(bugSheets[1], 55, 320, 45, 40, 0, 0, 32, 30); //blue ant
      image (bugSheets[2], 30, 95, 45, 40, 0, 0, 32, 30); //yellow ant
      image (bugSheets[3], 350, 350, 45, 40 , 0, 0, 32, 30); //purple ant

      break;

    case GameState.Playing:
      background(100,255,120);

      for(let i=0; i <animations.length; i++){
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      textFont('Georgia');
      text(game.score,20,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 350,40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;

      break;

      case GameState.GameOver:
        game.maxScore = max(game.score, game.maxScore);

        background(50);
        fill(255);
        textSize(45);
        textFont("Georgia");
        textAlign(CENTER);
        text("Game Over!", 200, 150);
        textSize(25);
        text("Ants Squished: " + game.score, 200, 200);
        text("Max Squished: " + game.maxScore, 200, 245);
        textSize(15);
        text("Press Any Key to Restart", 200, 350);
        image(bugSheets[0],65, 290, 75, 70, 0, 0, 32, 30); //red ant
        image(bugSheets[2], 340, 60, 75, 70, 0, 0, 32, 30); //yellow ant

        break;
        
  }
}

function keyPressed(){ 
  switch(game.state){
    case GameState.Start:
      game.state = GameState.Rules;
      break;

    case GameState.Rules:
      game.state = GameState.Playing;
      break;

     case GameState.GameOver:
      reset();
      game.state = GameState.Start;
      break; 

  }
}

function mousePressed() {
  for (let i=0; i < animations.length; i++) {
    let contains = animations[i].contains(mouseX,mouseY);
    if (contains) {
      if (animations[i].moving != 0){
        animations[i].stop();
        game.score += 1;
      } 
    }
  }
}


class BugAnimation {
  constructor(bugSheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0){
    this.bugSheet = bugSheet;
    this.sw = sw; //sprite width
    this.sh = sh; //sprite height
    this.dx = dx; //x location
    this.dy = dy; //y location
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0; //brings standing postion (controls frame of motion)
    this.moving = 1; //allows bugs to be moving until clicked on
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;

  }

  draw(){ //creates the bug animation
    if (this.moving != 0){
      this.u = this.currentFrame % this.animationLength; 
    } 

    push(); 
    translate(this.dx, this.dy);
    if (!this.vertical){ //allows for animation to look normal walking up and down
      rotate(90);
    }
    else{
      rotate(180);
    }
    scale(1, this.xDirection);
    
    image(this.bugSheet, 0, 0, this.sw, this.sh, this.u * this.sw + this.offsetX, this.v * this.sh + this.offsetY, this.sw, this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw / 4,height - this.sw / 4);
    }
    else {
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw / 4,width - this.sw / 4);
    }

  }

  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    //rect(-10,-15,20,30); 
    let insideX = x >= this.dx - 10 && x <= this.dx + 10;
    let insideY = y >= this.dy - 15 && y <= this.dy + 15;
    return insideX && insideY;
  }

  stop() { //animation of squished bug
    this.moving = 0;
    this.u = 4; 
    this.v = 0;
  }

}