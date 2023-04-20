
//Video:

//graphics
let paintColor; //variable used to control boolean
let initTone = true;
let effect = true;
let sweeper; //clear screen animation
let currentFrame = 0;
let pStarter = false;
let button;
let soundButton;
let button2;


//arduino
let connectButton;
let port;
let writer, reader;
let xAxis = 0;
let yAxis = 0;
let joySwitch;
let sensorData = {};
let switchIsPressed = 1;
let button1 = 0;


const encoder = new TextEncoder();
const decoder = new TextDecoder();

//tone
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


//preload image for animation
function preload(){
  sweeper = loadImage('assets/Broom.png');
}

//building the paint app
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); //white background

 if ("serial" in navigator) {
   // The Web Serial API is supported
   connectButton = createButton("Connect");
   connectButton.position(15, 25);
   connectButton.mousePressed(connect);
   connectButton.style('width', '75px');
   connectButton.style('height', '40px');
   connectButton.style('font-size', '15px');
   connectButton.style('background-color', 'white');
 }

 //erase button
 button = createButton('Press JoyStick to Erase!');
 button.position(1040,55);
 button.style('width', '180px');
 button.style('height', '40px');
 button.style('font-size', '15px');
 button.style('background-color', 'white');

 //change color
 button2 = createButton('Press Button for Surprise Paint Color!');
 button2.position(1040, 10);
 button2.style('width', '275px');
 button2.style('height', '40px');
 button2.style('font-size', '15px');
 button2.style('background-color', 'white');
 

 //sound activator button
 soundButton = createButton('Activate Audio');
 soundButton.position(100, 25);
 soundButton.mousePressed(audio);
 soundButton.style('width', '120px');
 soundButton.style('height', '40px');
 soundButton.style('font-size', '15px');
 soundButton.style('background-color', 'white');
}

synth.volume.value = -20;
synthA.volume.value = -10;

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
  //background(255);
  
  if(switchIsPressed == 0){
    clear();
 } 

 if (reader) {
   serialRead();
 }


 if (writer) {
   writer.write(encoder.encode(xAxis + "," + yAxis + "," + switchIsPressed + "\n"));
 }

//sets ardiuno data
 switchIsPressed = sensorData.Switch;
 xAxis = sensorData.Xaxis;
 yAxis = sensorData.Yaxis;
 button1 = sensorData.MouseClick1;


 //title box
 push();
 fill(200);
 strokeWeight(1);
 stroke(255);
 rect(width/3+20, -10, width/3, 100);
 pop();

 //title
 push()
 fill(0);
 strokeWeight(0);
 textSize(40);
 textAlign(CENTER);
 textFont('Georgia');
 text("Paint App!", width/2, 55);
 pop();

 //box design around color pallete
 push();
 fill(200);
 strokeWeight(1);
 stroke(255);
 rect(-10, 115, 70, 380);
 pop();

 
 push();
 noFill();
 strokeWeight(10);
 circle(map(xAxis, 0, 255, 0, width), map(yAxis, 0, 255, 0, height), 10);
 pop();

 push(); //controls the stroke color for the palette boxes
 stroke(255); //white outline
 strokeWeight(1); //stroke thickness

 //red 
 fill(255,0,0);
 rect(10,130,35,35);

 //orange 
 fill(255,165,0);
 rect(10,165,35,35);

 //yellow 
 fill(255,255,0);
 rect(10,200,35,35);

 //green 
 fill(0,255,0);
 rect(10,235,35,35);

 //cyan 
 fill(0,255,255);
 rect(10,270,35,35);

 //blue 
 fill(0,0,255);
 rect(10,305,35,35);

 //magenta 
 fill(255,0,255);
 rect(10,340,35,35);

 //brown 
 fill(100,60,0);
 rect(10,375,35,35);

 //white 
 fill(255);
 rect(10,410,35,35);

 //black 
 fill(0);
 rect(10,445,35,35);
 
 pop(); //ends control of stroke

 if(button1 == 1){
  redPaint();
}

}

function redPaint(){
  let rand = random(0, 255);
  let rand1 = random(100,255);
  let rand2 = random(50, 200);
  stroke(rand,rand1,rand2);
}

async function serialRead() {
 while (true) {
   const { value, done } = await reader.read();
   if (done) {
     reader.releaseLock();
     break;
   }
  //  console.log(value);
   sensorData = JSON.parse(value);
 }
}


async function connect() {
 port = await navigator.serial.requestPort();


 await port.open({ baudRate: 9600 });


 writer = port.writable.getWriter();


 reader = port.readable
   .pipeThrough(new TextDecoderStream())
   .pipeThrough(new TransformStream(new LineBreakTransformer()))
   .getReader();
}


class LineBreakTransformer {
 constructor() {
   // A container for holding stream data until a new line.
   this.chunks = "";
 }

 transform(chunk, controller) {
   // Append new chunks to existing chunks.
   this.chunks += chunk;
   // For each line breaks in chunks, send the parsed lines out.
   const lines = this.chunks.split("\n");
   this.chunks = lines.pop();
   lines.forEach((line) => controller.enqueue(line));
 }

 flush(controller) {
   // When the stream is closed, flush any remaining chunks out.
   controller.enqueue(this.chunks);
 }
}
