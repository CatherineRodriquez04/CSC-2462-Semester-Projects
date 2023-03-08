
let effect = true; //change sprite sheet
let currentFrame = 0;

let initTone = true;
let pitch = 53;

let cloud; //sprite one
let lightning; //sprite two

// Set up Tone
//const synth = new Tone.Synth();

let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.2,
  decay: 0.2,
  sustain: 1.0,
  release: 1.0
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

let noiseFilter = new Tone.Filter(100, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter);

noiseFilter.toDestination().start();

function preload(){
  cloud = loadImage("assets/Cloud.png");
  lightning = loadImage("assets/Lightning.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  
}

function draw() {
  background(50, 80, 160);

  if(effect == true){
    image(cloud, 175, 150, 275, 300, 0 + 750 * currentFrame, 100, 700, 0);
  }
  else {
    image(lightning, 175, 150, 275, 300, 0 + 750 * currentFrame, 100, 700, 0);
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
  }
}


function mousePressed() {
  console.log('pressed');
  if(initTone === true){
    Tone.start();
    initTone = false;
    pattern.start(0);
  }

  effect = false;

  ampEnv.triggerAttackRelease('4n');
  
}

