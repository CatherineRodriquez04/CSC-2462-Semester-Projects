let initTone = true;

const synth = new Tone.PluckSynth();

let notes = {

  'a': 'C4', //octave 1 - mid pitch
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4', 
  'k': 'C5',
  'l': 'D5',

  'q': 'B5',  //octave 2 - high pitch
  'w': 'C6', 
  'e': 'D6',
  'r': 'E6',
  't': 'F6',
  'y': 'G6',
  'u': 'A6',
  'i': 'B6',
  'o': 'C7',
  'p': 'B7',

  'z': 'C3', //octave 3 - low pitch
  'x': 'D3',
  'c': 'E3',
  'v': 'F3',
  'b': 'G3',
  'n': 'A3',
  'm': 'B3'

}

let slider;
const pingPong = new Tone.PingPongDelay("4n", 0.2);

function setup() {
  createCanvas(400, 400);

  synth.toDestination();
  pingPong.toDestination();

  synth.connect(pingPong);

  slider = new Nexus.Slider("#slider");
  slider.on('change', (v) => {
    pingPong.feedback.value = v;
  })
}

function draw() { 
  background(100,50,50);
}

function keyPressed(){
  let whatNote = notes[key];
  synth.triggerAttackRelease(whatNote, 0.4);
}

function keyPressed(){ //allows the browser to implement audio [not all browsers need this]
  if(key === ' ' && initTone === true){
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}
