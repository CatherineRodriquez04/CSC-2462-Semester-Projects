


function setup() {
  createCanvas(1100, 1000);
}

function draw() {
  
  fill(240);
  stroke(0);
  rect(5,0,1000,700);

  push(); //controls the stroke color for the palette boxes
  stroke(255); //white outline

  //red
  fill(255,0,0);
  rect(10,20,25,25);

  //orange
  fill(255,165,0);
  rect(10,45,25,25);

  //yellow
  fill(255,255,0);
  rect(10,70,25,25);

  //green
  fill(0,255,0);
  rect(10,95,25,25);

  //cyan
  fill(0,255,255);
  rect(10,120,25,25);

  //blue
  fill(0,0,255);
  rect(10,145,25,25);

  //magenta
  fill(255,0,255);
  rect(10,170,25,25);

  //brown
  fill(165,42,42);
  rect(10,195,25,25);

  //white
  fill(255);
  rect(10,220,25,25);

  //black
  fill(0);
  rect(10,245,25,25);
  
  pop(); //ends control of stroke

}



