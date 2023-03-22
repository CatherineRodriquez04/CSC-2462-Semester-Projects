/* idea:
  - sound with background
  - animation appears when clearing screen
  - reset / clear button
  - sound when clicking color
  - sound when brushing
*/



let paintColor; //variable used to control boolean
let initTone = true;
let effect = true;
let sweeper; //clear screen animation
let currentFrame = 0;
let pStarter = false;

let synth = new Tone.Synth().toDestination();
let synthA = new Tone.MembraneSynth().toDestination();
let synthB = new Tone.Synth().toDestination();


let melody = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, ['E5', null, 'D5', null, 'C5', null, 'E5', null]).start(0);

let chords = [
  {"time": "0:0", "note": ['C4', 'E3', 'G4']},
  {"time": "0:3", "note": ['F4', 'A4', 'C4']}
]

let chord = new Tone.Part((time, notes) => {
  synthA.triggerAttackRelease(notes.note, '2n', time)
}, chords).start();

chord.loop = 10;

let pattern = new Tone.Pattern(function (time, note ){ 
  synth.triggerAttackRelease(note, 0.25, time); 
}, ['C4', ['E5', 'G4', 'D4'],'C5']);


function preload(){
  sweeper = loadImage('assets/Broom.png');
}

function setup() {

  synth.volume.value = -20;
  synthA.volume.value = -10;

  createCanvas(1100, 1000);
  background(255); //white background
  button = createButton('ERASE!');
  button.position(10,35);
  button.mousePressed(reset);

  soundButton = createButton('Activate Audio');
  soundButton.position(10,5);
  soundButton.mousePressed(audio);
}

function reset(){
  effect = false;
  synthA.triggerAttackRelease("A4", '1n');
}


function audio(){
  if(initTone === true){
    Tone.start();
    initTone = false;
    Tone.Transport.start();
  } 
}

function draw() { 
  if(effect === false){
    background(255);
    image(sweeper, 400, 100, 275, 300, 0 + 750 * currentFrame, 100, 800, 0);
  }
  
  if((frameCount % 20) === 0){
    currentFrame++;
  }
  if(currentFrame > 1 && effect === true){
    currentFrame = 0;
  }
  if(currentFrame > 3 && effect === false){
    currentFrame = 0;
    effect = true;
    clear();
  }

  push(); //controls the stroke color for the palette boxes
  stroke(255); //white outline
  strokeWeight(1); //stroke thickness

  //red 
  fill(255,0,0);
  rect(10,55,25,25);

  //orange 
  fill(255,165,0);
  rect(10,80,25,25);

  //yellow 
  fill(255,255,0);
  rect(10,105,25,25);

  //green 
  fill(0,255,0);
  rect(10,130,25,25);

  //cyan 
  fill(0,255,255);
  rect(10,155,25,25);

  //blue 
  fill(0,0,255);
  rect(10,180,25,25);

  //magenta 
  fill(255,0,255);
  rect(10,205,25,25);

  //brown 
  fill(100,60,0);
  rect(10,230,25,25);

  //white 
  fill(255);
  rect(10,255,25,25);

  //black 
  fill(0);
  rect(10,280,25,25);
  
  pop(); //ends control of stroke

  
  strokeWeight(10);
  if (mouseIsPressed) { //selects the paint
    if(click(10,55)){ //red paint
      stroke(255,0,0);
      paintColor = true;
      synthA.triggerAttackRelease("C3", '2n');
    }
    else if(click(10,80)){ //orange paint
      stroke(255,165,0);
      paintColor = true;
      synthA.triggerAttackRelease("D3", '2n');
    }
    else if(click(10,105)){ //yellow paint
      stroke(255,255,0);
      paintColor = true;
      synthA.triggerAttackRelease("E3", '2n');
    }
    else if(click(10,130)){ //green paint
      stroke(0,255,0);
      paintColor = true;
      synthA.triggerAttackRelease("F3", '2n');
    }
    else if(click(10,155)){ //cyan paint
      stroke(0,255,255);
      paintColor = true;
      synthA.triggerAttackRelease("G3", '2n');
    }
    else if(click(10,180)){ //blue paint
      stroke(0,0,255);
      paintColor = true;
      synthA.triggerAttackRelease("A3", '2n');
    }
    else if(click(10,205)){ //magenta paint
      stroke(255,0,255);
      paintColor = true;
      synthA.triggerAttackRelease("B3", '2n');
    }
    else if(click(10,230)){ //brown paint
      stroke(100,60,0);
      paintColor = true;
      synthA.triggerAttackRelease("C4", '2n');
    }
    else if(click(10,255)){ //white paint
      stroke(255);
      paintColor = true;
      synthA.triggerAttackRelease("D4", '2n');
    }
    else if(click(10,280)){ //black paint
      stroke(0);
      paintColor = true;
      synthA.triggerAttackRelease("F4", '2n');
    }
  }
  
  if(paintColor == true){ //boolean prevent being able to paint prior to picking a color
    if(mouseIsPressed){ //allows the stroke on the canvas
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
}

function click (x, y){ //this function is used to issue the specifc location clicked will affect anything
  if (mouseX >= x && mouseX <= x + 25 &&    //checks hortizontal location
    mouseY >= y && mouseY <= y + 25) {    //checks vertical location
        return true;
  }
  else {
    return false; 
  }
}

function mouseDragged(){
  pattern.start();
}

function mouseReleased(){
  pattern.stop();
}


