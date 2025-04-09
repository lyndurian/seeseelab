let mic;

function setup(){
  createCanvas(800, 500);
  mic = new p5.AudioIn();
  mic.start();
  colorMode(HSB,100);
}

function draw() {
  background(0);
  let level = mic.getLevel();
  let dia = map(level, 0.0, 1.0, 0, 1000);
  let h = map(level, 0.0, 1.0, 0, 100);
  fill(h,100,100);
  noStroke();
  ellipse(width/2, height/2, dia, dia);
}
