
//Video:https://youtu.be/VJE84IsiD7U

let port;
let writer, reader;
let slider; 
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

//let activationState = { active: false };

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);

  if ("serial" in navigator) {
    // The Web Serial API is supported.
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont('Georgia');

    let button = createButton("Connect");
    button.position(10,15);
    button.mousePressed(connect);
    button.style('width', '75px');
    button.style('height', '40px');
    button.style('font-size', '15px');
    button.style('background-color', 'white');

    // slider = createSlider(0, 255, 127);
    // slider.position(50, 175);
    // slider.style('width', '300px');
  }
}

// function keyTyped() {
//   if (key === 'a') {
//     activationState.active = !activationState.active;
//     serialWrite(activationState);
//   }
// }

let color
try {color = value;}
catch {color = 200;}


function draw() {

  background(parseInt(sensorData)/10,100,100);
  
 
  if (reader) {
    serialRead();
  }

  // if (activationState.active) {
  //   text("cm: " + parseInt(sensorData) , 10, 100);
  //   text("slider: "+ slider.value(),10,150);
  // }
  // if (writer) {
  //   writer.write(new Uint8Array([slider.value()]));
 
  //  }
}

// function serialWrite(jsonObject) {
//   if (writer) {
//    writer.write(new Uint8Array([slider.value()]));

//   }
// }

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    console.log(value);
    sensorData = value;
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
