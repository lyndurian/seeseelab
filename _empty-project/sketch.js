function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mySound.play();
}

function draw() {
  background(220);
}
function preload(){
  mySound = loadSound("assets/song.mp3");
}
  function mousePressed(){
    mySound.play();
  }