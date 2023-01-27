
let paintColor; //variable used to control boolean

function setup() {
  createCanvas(1100, 1000);
  background(255); //white background
}

function draw() { 

  push(); //controls the stroke color for the palette boxes
  stroke(255); //white outline
  strokeWeight(1); //stroke thickness

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
  fill(100,60,0);
  rect(10,195,25,25);

  //white 
  fill(255);
  rect(10,220,25,25);

  //black 
  fill(0);
  rect(10,245,25,25);
  
  pop(); //ends control of stroke

  
  strokeWeight(10);
  if (mouseIsPressed) { //selects the paint
    if(click(10,20)){ //red paint
      stroke(255,0,0);
      paintColor = true;
    }
    else if(click(10,45)){ //orange paint
      stroke(255,165,0);
      paintColor = true;
    }
    else if(click(10,70)){ //yellow paint
      stroke(255,255,0);
      paintColor = true;
    }
    else if(click(10,95)){ //green paint
      stroke(0,255,0);
      paintColor = true;
    }
    else if(click(10,120)){ //cyan paint
      stroke(0,255,255);
      paintColor = true;
    }
    else if(click(10,145)){ //blue paint
      stroke(0,0,255);
      paintColor = true;
    }
    else if(click(10,170)){ //magenta paint
      stroke(255,0,255);
      paintColor = true;
    }
    else if(click(10,195)){ //brown paint
      stroke(100,60,0);
      paintColor = true;
    }
    else if(click(10,220)){ //white paint
      stroke(255);
      paintColor = true;
    }
    else if(click(10,245)){ //black paint
      stroke(0);
      paintColor = true;
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


