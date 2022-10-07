function genTokenData() {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  return data;
}

let tokenData = genTokenData();
let colorList = ['#D42133', '#ffde17', '#0470DC', '#000000', '#ffffff'];
let blackOrWhite = ['#000000', '#ffffff'];
let geometry = ['Circle', 'Square', 'Triangle']
let geometryType;

function setup(){
  let canvas = createCanvas(400,400);
  canvas.parent('sketch-holder');
  noLoop();
  noStroke();
}

function draw(){
  let R = new Random();

  let leftTriangleFill = R.random_choice(blackOrWhite);
  let upperTriangleFill = R.random_choice(blackOrWhite);
  let rightTriangleFill = R.random_choice(blackOrWhite);
  let bottomTriangleFill = R.random_choice(blackOrWhite);

  fill(leftTriangleFill);
  triangle(0, 0, 0, 1*height, 0.5*width, 0.5*height);

  fill(upperTriangleFill);
  triangle(0, 0, 1*width, 0*height, 0.5*width, 0.5*height);

  fill(rightTriangleFill);
  triangle(1*width, 0, 1*width, 1*height, 0.5*width, 0.5*height);

  fill(bottomTriangleFill);
  triangle(0, 1*height, 1*width, 1*height, 0.5*width, 0.5*height);

  geometryType = R.random_choice(geometry);
  let shape1 = new RandomShape();
    shape1.x = 0.20*width;
    shape1.y = 0.50*height;
    shape1.size = 0.25*width;
    shape1.color = R.random_choice(colorList);
    shape1.show();

  geometryType = R.random_choice(geometry);
  let shape2 = new RandomShape();
    shape2.x = 0.50*width;
    shape2.y = 0.50*height;
    shape2.size = (0.25*width);
    shape2.color = R.random_choice(colorList)
    shape2.show();

  geometryType = R.random_choice(geometry);
  let shape3 = new RandomShape();
    shape3.x = 0.80*width;
    shape3.y = 0.50*height;
    shape3.size = (0.25*width);
    shape3.color = R.random_choice(colorList)
    shape3.show();
}

class RandomShape{
  constructor(){
    this.x = 200;
    this.y = 200;
    this.size = 10;
    this.color;
    this.spin = 0;
  }

  show() {
    let x1 = this.x - (this.size/2);
    let x2 = this.x;
    let x3 = this.x + (this.size/2);
    let y1 = this.y + (this.size/2);
    let y2 = this.y - (this.size/2);
    let y3 = this.y + (this.size/2);

    noStroke()
    rectMode(CENTER);
    angleMode(DEGREES);
    push();
    translate(this.x, this.y);
    rotate(this.spin);
    fill(this.color);
    if (geometryType == 'Square') {
      rect(0, 0, this.size, this.size);
    } else if (geometryType == 'Circle') {
      ellipse(0, 0, this.size);
    } else {
      beginShape();
      vertex(x1 - this.x, y1 - this.y);
      vertex(x2 - this.x, y2 - this.y);
      vertex(x3 - this.x, y3 - this.y);
      endShape(CLOSE);
    }
    pop();
  }
}

// Defining random functions (from artblocks instructions)
// https://docs.artblocks.io/creator-docs/creator-onboarding/readme/
class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}
