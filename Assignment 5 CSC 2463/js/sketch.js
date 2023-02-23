
let sounds = new Tone.Players({
  "Drip": "assets/Droplet.wav",
  "Drum Roll Please...": "assets/Drums.wav",
  "He's Snoring too LOUD": "assets/Snoring.wav",
  "Time to Get Up!": "assets/Wackey.mp3"
})

const delay = new Tone.PingPongDelay("4n", 0.2);

let soundNames = ["Drip", "Drum Roll Please...", "He's Snoring too LOUD", "Time to Get Up!"];
let buttons = [];

let dSlider;
let pSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index + 50, 50 + index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0, 1, 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  pSlider = createSlider(0, 1, 0.5, 0.05);
  pSlider.mouseReleased( () => {
    delay.feedback.value = pSlider.value();
  })

}

function draw() {
  background(100, 100, 240);
  textAlign(CENTER);
  fill(255);
  textSize(20);
  textFont('Gerogia');
  text('Click on the Buttons to Activate Sound', 200, 300);
  text('Move the Sliders to Control the', 200, 350);
  text('Delay and Feedback', 200, 375);
}

function buttonSound(whichSound){
  sounds.player(whichSound).start();
}