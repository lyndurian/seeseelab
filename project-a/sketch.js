
let worldSlide;          //this is the image sliding in the back that begins as a collage of the ocean but eventually transitions into a collage of a city this is the great change in octomorphinas terrain
let floorX;              // x coordinate of the floor scrolling by in the start as well
let counter = 0;         
let maxScroll;           //the boundary is the size of the image with is 2400 pixels wide which is 3 times longer than the canvas size
let cursorImg;         
let mySound;             

//stage 2 appearance of octomorphina
let eyeX, eyeY;                 
let showOctomorphina = false;   
let octoX, octoY;              
let n = 10;                      // the points for the blob shape taken from marcelas creature
let tentacleState = "chill";  // when she is chill calm and unprovoked
let octoAppear = 0;        
let octoDuration = 600;       

function preload() {
  worldSlide = loadImage("assets/world.png");           
  cursorImg = loadImage("assets/thesciencehands.png");  
  mySound = loadSound("assets/screamingtalkit.wav");  
}

function setup() {
let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
     canvas.parent("p5-canvas-container");
    // document.getElementById('p5-canvas-container').style.cursor='none';
  floorX = 0;              
  frameRate(60);           
  setEyePosition();       
  octoX = width / 2;       
  octoY = height / 2;     
                
}


function draw() {
  
  background(0);  

  if (mouseIsPressed && counter < 1600) {
    counter += 4;    
    floorX -= 6;      
    if (floorX < -100) {
      floorX = 0;     
    }
  }
//stage one
  if (counter < 1600) {
    stage1();  //this is wear octomorphina is witnessing the world around her change and she is shocked to see how she will have to adapt to the world
    let scared = constrain(map(counter, 0, 1600, 0, 1), 0, 1);  //map counter of her fear
    drawOctohead(scared);  
  } else if (counter >= 1600 && counter < 2000) {
    stage2();
  }

  console.log(counter);  
}

//moving floor and background
function stage1() {
  maxScroll = worldSlide.width - width;  // how much it can scroll
  image(worldSlide, 0, 0, width, height, counter, 0, width, height); 

  fill(100); strokeWeight(7); stroke(0);
  for (let i = 0; i < 9; i++) {
    rect(floorX + i * 100, height - 50, 100, 100);  
  }
}

// octomorphinas pretty face
function drawOctohead(scared) {
  noStroke(); fill(190, 144, 240);
  ellipse(350, 500, 500, 700);  

  drawEye(180, 300, 200, scared);  
  drawEye(550, 300, 200, scared);  

  fill(0); stroke(0); strokeWeight(10);
  let mouthY = lerp(420, 440, scared);           // mouth y position mouth changes
  let mouthStart = lerp(0, PI, scared);          // mouth open+ closes
  let mouthEnd = lerp(PI, 0, scared);
  arc(350, mouthY, 200, 100, mouthStart, mouthEnd, CHORD);  // final mouth 

//eyebrows
  if (scared > 0.1) {
    stroke(0); strokeWeight(scared * 30);
    let leftY = 170 - scared * 20;
    line(140, leftY, 220, leftY + 20);
    let rightY = 170 - scared * 20;
    line(580, rightY, 500, rightY + 20);
  }
}

//right eye blinks
function drawEye(x, y, size, scared) {
  let isBlinking = frameCount % 120 < 10;  //per 2 sec

  if (isBlinking) {
    stroke(0); strokeWeight(6);
    line(x - size / 2, y, x + size / 2, y);  // eye closes
  } else {
    noStroke(); fill(255);
    ellipse(x, y, size, size);  // eyeball whites

    //pupil lerping to fear
    let pupilSize = lerp(size * 0.8, size * 0.3, scared);
    let offsetX = sin(frameCount * 0.1) * 20;
    let offsetY = cos(frameCount * 0.07) * 10;
    fill(0);
    ellipse(x + offsetX, y + offsetY, pupilSize, pupilSize);
  }
}

// stage 2 octomorphina
function stage2() {
  noCursor();
  // background flashes along with emotion maybe this is more metaphorical than an actual part of her character but i thought it would make the emotion clearer or maybe shes glowing and that is her physical reaction
  if (tentacleState === "wiggle" && frameCount % 10 < 5) { //like 5 times per 10 frames
    background(255, 200, 255);
  } else if (tentacleState === "in" && frameCount % 30 < 5) {
    background(180, 80, 80);
  } else {
    background(77, 117, 154);
  }

//the city

//the tall cityscape
  fill(20);
 rect(0, 180, 60, 320); 
rect(50, 140, 50, 360);
 rect(90, 200, 30, 300);
  rect(120, 160, 70, 340); 
rect(180, 190, 40, 310);
 rect(210, 130, 90, 370);
  rect(290, 170, 60, 330);
 rect(340, 150, 50, 350);
 rect(390, 190, 30, 310);
  rect(420, 140, 70, 360);
 rect(490, 160, 40, 340); 
rect(530, 180, 60, 320);
  rect(590, 130, 80, 370);
 rect(670, 150, 60, 350);
 rect(730, 170, 70, 330);

  // lights on buildings
  fill(240);
  rect(60, 160, 5, 5); 
rect(70, 160, 5, 5);
 rect(60, 180, 5, 5);
 rect(70, 180, 5, 5);
  rect(220, 150, 5, 5);
 rect(230, 150, 5, 5); 
rect(220, 170, 5, 5);
 rect(230, 170, 5, 5);
//I really just gave up on adding more, you get the idea, but im rlly sleepy

  //tree
  fill(101, 67, 33); rect(40, 300, 20, 100);
  fill(34, 139, 34); ellipse(50, 280, 100, 100);

  drawStorefront();  // Draw building/store
  drawSidewalk();    // Draw sidewalk details

  











if (showOctomorphina && counter < 2000) {
    if (frameCount - octoAppear > octoDuration) {
      showOctomorphina = false;
      setEyePosition();//resets the eye for it to show up in another spot
    } else {
//she follows the scientist hand
      octoX = lerp(octoX, mouseX, 0.05);
      octoY = lerp(octoY, mouseY, 0.05);
      drawOctomorphinaScene(octoX, octoY);
    }
  } else {
    drawBlinkingEye(eyeX, eyeY, 60, false);
  }
//every 180 frames she will chill down
  if (frameCount % 180 === 0) {
    tentacleState = "chill";
  }
}

function mousePressed() {
  if (counter >= 1600 && counter < 2000) {
    if (!showOctomorphina) {
//distance of mouse to her eye
      let d = dist(mouseX, mouseY, eyeX, eyeY);
      if (d < 30) {
        showOctomorphina = true;
        octoAppear = frameCount;
        mySound.play();
      }
    } else {
//react when the user clicks the part of the screen
      if (mouseX < width / 3) {
        tentacleState = "up";//left
      } else if (mouseX > width * 2 / 3) {
        tentacleState = "in";//right
      } else if (mouseY > height * 2 / 3) {
        tentacleState = "down"; //bottom
      } else {
        tentacleState = "wiggle"; //center
      }
    }
  }
}

function setEyePosition() {
  eyeX = random(100, width - 100);
  eyeY = random(100, height - 100);
  showOctomorphina = false;
//she hides until clicked again
}
function drawOctomorphinaScene(x, y) {
  drawBlinkingEye(x - 50, y - 110, 70, true);
  let col = color(140, 129, 123);

  if (tentacleState === "wiggle") {
    x += random(-5, 5);
    y += random(-5, 5);
  }

  drawTentacle(x - 40, y + 40, col);
  drawTentacle(x, y + 30, col);
  drawTentacle(x + 40, y + 30, col);
  drawTentacle(x - 40, y - 40, col);
  drawTentacle(x + 40, y - 40, col);
  drawOctomorphina(x, y);
}

function drawOctomorphina(x, y) {
  let col = color(140, 129, 123);
  drawBlob(x, y, 0.7, 0.8, 0, col);
  drawBlob(x, y - 100, 0.6, 0.7, 100, col);

  fill(189, 122, 137);
  circle(x + 60, y - 80, 50);

  drawBlinkingEye(x + 55, y - 110, 75, false);

  fill(128, 103, 89);
  noStroke();
  push();
  translate(x - 80, y - 60);
  rotate(-PI / 3);
  rect(0, 0, 90, 60, 30);
  pop();

  drawFace(x, y - 90);
}

function drawFace(x, y) {
  noFill();
  strokeWeight(3);
  stroke(0);

  if (tentacleState === "up") {
    ellipse(x, y + 25, 12, 18);
  } else if (tentacleState === "in") {
    arc(x, y + 25, 30, 20, PI, TWO_PI);
  } else if (tentacleState === "wiggle") {
    fill(255, 100, 150);
    beginShape();
    for (let i = 0; i < 10; i++) {
      let xOffset = x + i * 3;
      let yOffset = y + 30 + sin(i * 0.5 + frameCount * 0.2) * 3;
      vertex(xOffset, yOffset);
    }
    endShape();
  } else {
    line(x - 10, y + 25, x + 10, y + 25);
  }
}

function drawBlob(centerX, centerY, scaleX, scaleY, phase, col) {
  if (tentacleState === "wiggle") {
    col = color(255, 100 + sin(frameCount * 0.5) * 100, 200);
  } else if (tentacleState === "in") {
    col = color(180, 50, 50);
  }
  fill(col);
  stroke(col);
  beginShape();
  for (let i = 0; i < n; i++) {
    let angle = map(i, 0, n, 0, TWO_PI);
    let offset = map(i, 0, n, 0, 5 * PI);
    let r = 100 + 10 * sin(frameCount * 0.1 + offset + phase);
    let x = centerX + (r * scaleX) * cos(angle);
    let y = centerY + (r * scaleY) * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function drawTentacle(startX, startY, col) {
  push();
  translate(startX, startY);
  noFill();
  stroke(col);
  strokeWeight(20);
  let timeOffset = frameCount * 0.01;
  let step = 20;
  let length = 133;
  beginShape();
  for (let i = 0; i <= step; i++) {
    let t = i / step;
    let angle = t * TWO_PI + timeOffset;
    if (tentacleState === "wiggle") {
      angle += sin(frameCount * 0.2 + t * 10) * 0.5;
    }
    let wiggle = sin(angle * 6 + frameCount * 0.2) * 10;
    let radius, x, y;
    if (tentacleState === "up") {
      radius = length - 50 + wiggle;
      x = cos(angle) * radius * 0.3;
      y = t * length - 60;
    } else if (tentacleState === "in") {
      radius = length - 30 + wiggle;
      x = cos(angle) * radius * 0.15;
      y = t * length;
    } else if (tentacleState === "down") {
      radius = length + 30 + wiggle;
      x = cos(angle) * radius * 0.3;
      y = t * length + 30;
    } else {
      radius = length + wiggle;
      x = cos(angle) * radius * 0.3;
      y = t * length;
    }
    curveVertex(x, y);
  }
  endShape();
  pop();
}

function drawBlinkingEye(x, y, size, isBack) {
  let isBlinking = frameCount % 120 < 10;
  let isAngry = tentacleState === "in";
  if (isBlinking) {
    stroke(0);
    strokeWeight(6);
    line(x - size / 2, y, x + size / 2, y);
  } else {
    noStroke();
    fill(isBack ? 180 : 255);
    ellipse(x, y, size, isAngry ? size * 0.6 : size);
    let pupilOffsetX = constrain(mouseX - x, -25, 25) * 0.2;
    let pupilOffsetY = constrain(mouseY - y, -25, 25) * 0.2;
    fill(0);
    circle(x + pupilOffsetX, y + pupilOffsetY, size * 0.8);
  }
}


function drawStorefront() {
  fill(230, 211, 149); 
rect(200, 0, 370, 300);
  fill(214, 159, 148);
 rect(200, 70, 370, 400);
  fill(0); 
rect(230, 190, 330, 400);
  fill(111, 162, 208);
 rect(245, 200, 300, 100);
  fill(148, 57, 15);
 rect(450, 300, 65, 180);

  fill(255, 0, 0); rect(230, 170, 40, 20); 
fill(255); rect(270, 170, 40, 20);
  fill(255, 0, 0); rect(310, 170, 40, 20); 
fill(255); rect(350, 170, 40, 20);
  fill(255, 0, 0); rect(390, 170, 40, 20);
 fill(255); rect(430, 170, 40, 20);
  fill(255, 0, 0); rect(470, 170, 40, 20);
 fill(255); rect(510, 170, 40, 20);
  fill(255, 0, 0); rect(550, 170, 40, 20);

  fill(139, 69, 19);
  rect(250, 370, 40, 20);
  fill(0, 200, 0);
  ellipse(260, 370, 20, 20);
 ellipse(270, 360, 20, 20);
  ellipse(250, 360, 20, 20);
 ellipse(280, 360, 20, 20);
}

function drawSidewalk() {
  fill(150);
  rect(0, 400, 800, 100);


  stroke(120);
  strokeWeight(2);
  fill(120); 
  rect(0, 400, 2, 100);
  rect(80, 400, 2, 100);
  rect(160, 400, 2, 100);
  rect(240, 400, 2, 100);
  rect(320, 400, 2, 100);
  rect(400, 400, 2, 100);
  rect(480, 400, 2, 100);
  rect(560, 400, 2, 100);
  rect(640, 400, 2, 100);
  rect(720, 400, 2, 100);
  rect(798, 400, 2, 100); 
  rect(0, 400, 800, 2);
  
  noStroke();
  fill(148, 222, 73); 
  rect(580, 290, 70, 110);
  rect(580, 250, 70, 110, 10);
  fill(246, 250, 145); 
  rect(590, 260, 50, 30, 20); 
  rect(590, 300, 50, 30, 20);

  fill(197, 58, 201); 
  rect(680, 290, 70, 110); 
  rect(680, 250, 70, 110, 10);
  fill(227, 149, 230); 
  rect(690, 260, 50, 30, 20);
  rect(690, 300, 50, 30, 20);
  
  noStroke();
  fill(100);
  rect(80, 360, 10, 40); rect(110, 360, 10, 40);
  rect(80, 340, 40, 20); rect(80, 320, 10, 20);
  rect(160, 360, 10, 40);
 rect(190, 360, 10, 40);
  rect(160, 340, 40, 20); 
rect(190, 320, 10, 20);

  fill(80, 50, 30);
  rect(115, 330, 50, 10); 
rect(135, 340, 10, 60);
  
  imageMode(CENTER);
  image(cursorImg, mouseX, mouseY, 50, 50);
}


