function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}

let tokenData = genTokenData(123);
function setup(){
  let canvas = createCanvas(600,600);
  canvas.parent('time_sketch');
  pixelDensity(4);
  strokeCap(SQUARE);
  rectMode(CENTER);
  noLoop();
}

function draw(){
  let R = new Random();

  let xOffset = R.random_num(-0.25*width, 0.25*width);
  let yOffset = R.random_num(-0.25*height, 0.25*height);

  background('white');

  let C1 = new Circle();
  C1.x = (0.50*width) + xOffset;
  C1.y = (0.50*width) + yOffset;
  C1.size = 0.04*width;
  C1.stroke = '#FAF9F6';
  C1.strokeWeight = 8;
  C1.show();

  let X1 = new Semicircle();
  X1.x = (0.50*width) + xOffset;
  X1.y = (0.50*width) + yOffset;
  X1.size = 0.04*width;
  X1.strokeWeight = 8;
  X1.degrees = 90;
  X1.spin = 0;
  X1.show();

  let C2 = new Circle();
  C2.x = (0.50*width) + xOffset;
  C2.y = (0.50*width) + yOffset;
  C2.size = 0.1*width;
  C2.stroke = '#FAF9F6';
  C2.strokeWeight = 16;
  C2.show();

  let X2 = new Semicircle();
  X2.x = (0.50*width) + xOffset;
  X2.y = (0.50*width) + yOffset;
  X2.size = 0.1*width;
  X2.strokeWeight = 16;
  X2.degrees = R.random_num(90, 180);
  X2.spin = R.random_num(0, 360);
  X2.show();

  let C3 = new Circle();
  C3.x = (0.50*width) + xOffset;
  C3.y = (0.50*width) + yOffset;
  C3.size = 0.2*width;
  C3.stroke = '#FAF9F6';
  C3.strokeWeight = 32;
  C3.show();

  let X3 = new Semicircle();
  X3.x = (0.50*width) + xOffset;
  X3.y = (0.50*width) + yOffset;
  X3.size = 0.2*width;
  X3.strokeWeight = 32;
  X3.degrees = R.random_num(135, 225);
  X3.spin = R.random_num(0, 360);
  X3.show();

  let C4 = new Circle();
  C4.x = (0.50*width) + xOffset;
  C4.y = (0.50*width) + yOffset;
  C4.size = 0.40*width;
  C4.stroke = '#FAF9F6';
  C4.strokeWeight = 64;
  C4.show();

  let X4 = new Semicircle();
  X4.x = (0.50*width) + xOffset;
  X4.y = (0.50*width) + yOffset;
  X4.size = 0.40*width;
  X4.strokeWeight = 64;
  X4.degrees = R.random_num(180, 270);
  X4.spin = R.random_num(0, 360);
  X4.show();

  let C5 = new Circle();
  C5.x = (0.50*width) + xOffset;
  C5.y = (0.50*width) + yOffset;
  C5.size = 0.77*width;
  C5.stroke = '#FAF9F6';
  C5.strokeWeight = 128;
  C5.show();

  let X5 = new Semicircle();
  X5.x = (0.50*width) + xOffset;
  X5.y = (0.50*width) + yOffset;
  X5.size = 0.77*width;
  X5.strokeWeight = 128;
  X5.degrees = R.random_num(225, 315);
  X5.spin = R.random_num(0, 360);
  X5.show();

  let C6 = new Circle();
  C6.x = (0.50*width) + xOffset;
  C6.y = (0.50*width) + yOffset;
  C6.size = 1.55*width;
  C6.stroke = '#FAF9F6';
  C6.strokeWeight = 300;
  C6.show();

  let X6 = new Semicircle();
  X6.x = (0.50*width) + xOffset;
  X6.y = (0.50*width) + yOffset;
  X6.size = 1.55*width;
  X6.strokeWeight = 300;
  X6.degrees = R.random_num(225, 315);
  X6.spin = R.random_num(0, 360);
  X6.show();

  // Function for granular texture
  function granulate(amount) {
      loadPixels();
      const d = pixelDensity();
      const pixelsCount = 4 * (width * d) * (height * d);
      for (let i = 0; i < pixelsCount; i += 4) {
          const grainAmount = R.random_num(-amount, amount);
          pixels[i] = pixels[i] + grainAmount;
          pixels[i+1] = pixels[i+1] + grainAmount;
          pixels[i+2] = pixels[i+2] + grainAmount;
          // comment in, if you want to granulate the alpha value
          // pixels[i+3] = pixels[i+3] + grainAmount;
      }
      updatePixels();
  }

  granulate(30);

}

class Circle {
  constructor() {
    this.x;
    this.y;
    this.size;
    this.stroke;
    this.strokeWeight;
    this.spin = 0;
  }

  //draw the circle to the canvas
  show() {
    angleMode(DEGREES);
    push();
    rotate(this.spin);
    noFill();
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}

class Semicircle {
  constructor() {
    this.x;
  	this.y;
  	this.size = 0.05*width;
    this.stroke = '#28282B';
    this.strokeWeight= 1;
    this.degrees = 45;
    this.spin = 0;
  }

  show() {
    angleMode(DEGREES);
    push();
    translate(this.x, this.y);
    rotate(this.spin);
    noFill();
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    if(this.degrees >= 0) {
    arc(0, 0, this.size, this.size, 270, 270 + this.degrees);
    } else if(this.degrees < 0) {
    arc(0, 0, this.size, this.size, 270 + this.degrees, 270);
    }
    pop();
  }
}

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
