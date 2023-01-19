function setup() {
  var canvas = createCanvas(1200, 1000);
  //provides the demisions of the background
}

function draw() {
  background(255);
  
  //Example 1: ***

  //green rectangle background
  fill(0,255,0);
  noStroke(); //takes away outline
  rect(10,10,400,200);

  push(); //controls the stroke color and weight for both the circle and square
  //white circle with black outline
  fill(255);
  stroke(0);
  strokeWeight(2); //thickness of stroke
  circle(110, 110, 170);
  
  //white sqaure with black outline
  fill(255);
  square(225, 30, 160);
  pop(); //ends the control
  

  //Example 2: ***

  push(); //controls taking away the stroke
  //white square background
  fill(255);
  noStroke(); //takes away outline
  square(50,250,300);

  //red transparent circle
  fill(255,0,0,100);
  circle(200,350,170);
  
  //green transparent circle
  fill(0,255,0,100);
  circle(260,440,170);
  
  //blue transparent circle
  fill(0,0,255,100);
  circle(140,440,170);
  pop(); //ends the control


  //Example 3: ***

  //black background made from a rectangle
  fill(0);
  stroke(0);
  rect(550,10,400,200);

  push(); //controls taking away the stroke

  //pac man image (circle)
  fill(250,250,10);
  noStroke(); //takes off outline
  circle(650,110,165);
  
  //pac man mouth (sideways triangle)
  fill(0);
  triangle(557,40,557,185,660,110) //x,y ; x,y ; x,y coordinates
  
  push(); //controls the fill
  //circular head of ghost
  fill(255,70,30);
  circle(845,105,160);
  
  //body of ghost (rectangle)
  rect(765,101,160,90);
  pop(); //ends control of the fill
  
  push(); //controls the fill
  //left outer part of eye
  fill(255);
  circle(805,105,50);

  //right outer part of eye
  circle(885,105,50);
  pop(); //ends control on fill
  
  push(); //controls the fill
  //left inner part of eye
  fill(20,0,255);
  circle(805,105,33);
  
  //right inner part of eye
  circle(885,105,33);
  pop(); //ends control on fill

  pop(); //ends the control that takes away the stroke


  //Example 4: ***

  //navy blue background in square shape
  fill(0,0,160);
  noStroke();
  square(555,250,390);

  push(); //controls the stroke thickness and color
  //circle in green
  stroke(255); //color of the stroke is white
  strokeWeight(5); //thickens of the stroke
  fill(0,150,0);
  circle(750,450,190);

  //creating the star
  fill(255,0,0);
  beginShape();
  vertex(750,355);
  vertex(725,425);
  vertex(660,425);
  vertex(715,465);
  vertex(695,530);
  vertex(750,490);
  vertex(805,530);
  vertex(785,465);
  vertex(840,425);
  vertex(775,425);
  vertex(750,355);
  
  endShape(CLOSE); //finishes star shape
  
  pop(); // ends control on the stroke thickness and color
  
}




