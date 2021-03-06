
var canvasSize = 800;

// oranges
// let colorArray = [[255, 123, 0], [255, 136, 0], [255, 149, 0], [255, 162, 0], [255, 170, 0],
  // [255, 183, 0], [255, 195, 0], [255, 149, 0], [255, 208, 0], [255, 221, 0], [255, 234, 0]];

// easter bunnies
let colorArray = [[255, 173, 173], [255, 214, 165], [253, 255, 182], [202, 255, 191], [155, 246, 255],
  [160, 196, 255], [189, 178, 255], [255, 198, 255], [255, 255, 252]];

// 24k gold https://www.color-hex.com/color-palette/2799 
// let colorArray = [[166,124,0], [191,155,48], [255,191,0], [255,207,64], [255,220,115]];

// parrot green https://www.color-hex.com/color-palette/5016 
// let colorArray = [[35,77,32], [54,128,45], [119,171,89], [201,223,138], [240,247,218]];

// facebook 
// let colorArray = [[59,89,152], [139,157,195], [223,227,238], [247,247,247]];

// RGB 
// let colorArray = [[255,0,0], [0,255,0], [0,0,255]];

// hot dog stand https://blog.codinghorror.com/a-tribute-to-the-windows-31-hot-dog-stand-color-scheme/ 
// let colorArray = [[252, 13, 27], [255, 253, 56], [0,0,0]];

// Circle town
var circles = function(circles) {

  circles.setup = function() {
    var canvas = circles.createCanvas(canvasSize, canvasSize);

    circles.colors = [];

    for (let i = 0; i < colorArray.length; i++) {
      circles.colors.push(circles.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }

    circles.shuffledColors = circles.shuffle(circles.colors);

    canvas.mousePressed(circles.randomize);
    circles.randomize();
  }

  circles.randomize = function() {  
    segments = circles.int(circles.random(2,11));
    numCircles = circles.random(2,8);
    circles.drawCircles();
  }

  circles.drawCircles = function () { 
    circles.shuffledColors = circles.shuffle(circles.colors);
    circles.color1 = circles.shuffledColors.pop();
    circles.color2 = circles.shuffledColors.pop();

    circles.background(circles.color1);
    for (i=0; i<segments; i++) {
      let xpos = circles.width/segments * (i+0.5);
      for (j=0; j<segments; j++) {
        let ypos = circles.height/segments * (j+0.5);    
        for (k=0; k<numCircles;k++) {
          circles.noStroke();
          circles.fill(circles.lerpColor(circles.color1, circles.color2,(k+1)/numCircles));
          circles.ellipse(xpos+circles.random(-1.1*k,1.1*k), ypos+circles.random(-1.1*k,1.1*k), circles.min(circles.width/segments, (1-k/numCircles)*circles.width/segments));
        }
      }
    }
  }
};

var circleInstance = new p5(circles, 'circles');


// Random walk  
var path = function(path) {

  path.setup = function() {
    var canvas = path.createCanvas(canvasSize, canvasSize);
    xpos = 0;              // path starting x position
    interval = 200;        // max distance travelled in each path step 
    path.colorSteps = 100;  // number of paths to draw between two colors
    path.counter = 0;
    resetSteps = 500;     // number of ticks after which to reset the canvas

    path.colors = [];

    for (let i = 0; i < colorArray.length; i++) {
      path.colors.push(path.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }

    path.shuffledColors = path.shuffle(path.colors);
    // path.color2 = path.color(path.random(255), path.random(255), path.random(255));
    path.color2 = path.shuffledColors.pop();
    path.background(path.color2);
    path.frameRate(20);
  }

  path.walkit = function() {  
    if (path.counter % path.colorSteps == 0) {
      path.color1=path.color2;
      path.color2 = path.shuffledColors.pop();
      path.shuffledColors = path.shuffle(path.colors);
    }
    currentColor = path.lerpColor(path.color1, path.color2, (path.counter % path.colorSteps) / path.colorSteps);
    if (path.counter % resetSteps == 0) {
      path.background(currentColor);
    }
    path.stroke(currentColor);
    path.strokeWeight(30);
    path.counter++;
    ypos = path.randomGaussian(path.height/2,150);
    path.nextSegment(xpos,ypos,interval);
  }

  path.nextSegment = function(xpos, ypos, interval) {
    if (xpos > path.width || xpos < 0 || ypos > path.height || ypos < 0) {
      // game over 
    } else {
      newxpos = xpos+path.random(0,interval/4);
      newypos = ypos+path.random(-interval/2,interval/2);
      path.line(xpos, ypos, newxpos, newypos);
      path.nextSegment(newxpos,newypos,interval);
    }
  }

  path.draw = function() {
    path.walkit();
  }
}

var pathInstance = new p5(path, 'path');


// Squares in a grid with a dope gradient 
var squares = function(squares) {
  squares.setup = function () {

    squares.colors = [];
    for (let i = 0; i < colorArray.length; i++) {
      squares.colors.push(squares.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }

    var canvas = squares.createCanvas(canvasSize, canvasSize);
    canvas.mousePressed(squares.drawSquares);
    spacing = 1;
    squares.drawSquares();
  }

  squares.drawSquares = function() { 
    segments = squares.int(squares.random(5,15));

    squares.shuffledColors = squares.shuffle(squares.colors);
    squares.color1 = squares.shuffledColors.pop();
    squares.color2 = squares.shuffledColors.pop();

    squares.background(squares.color2);
    for (i=0; i<segments; i++) {
      let xpos = squares.width/segments * i + spacing;
      for (j=0; j<segments; j++) {
        let ypos = squares.height/segments * j + spacing;    
        squares.noStroke();
        squares.fill(squares.lerpColor(squares.color1, squares.color2,(i+j+2)/(2*segments)));
        squares.rect(xpos, ypos, squares.width/segments - 2*spacing, squares.height/segments - 2*spacing);
      }
    }
  }
}

var squaresInstance = new p5(squares, 'squares');

// sine waves
var sines = function(sines) {
  sines.setup = function() {
    
    sines.colors = [];
    for (let i = 0; i < colorArray.length; i++) {
      sines.colors.push(sines.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }

    var canvas = sines.createCanvas(canvasSize,canvasSize);
    canvas.mousePressed(sines.drawSines);
    sines.noStroke();
    sines.drawSines();
  }

  sines.drawSines = function () {
    sines.shuffledColors = sines.shuffle(sines.colors);
    sines.color2 = sines.shuffledColors.pop();

    sines.colorSteps = sines.int(sines.random(20,1000));
    numFrames = sines.random(400,1000);
    diameter = sines.random(100,300);
    sines.background(sines.color2);
    for (i=0; i<=numFrames; i++) {
      if (i % sines.colorSteps == 0) {
        sines.color1 = sines.color2;

        if (sines.shuffledColors.length < 1) {
          sines.shuffledColors = sines.shuffle(sines.colors);
        }

        sines.color2 = sines.shuffledColors.pop();
      }
      sines.fill(sines.lerpColor(sines.color1, sines.color2, (i % sines.colorSteps) / sines.colorSteps));
      let ypos = (diameter/2) + i*((sines.height-diameter)/(numFrames));
      let xpos = (sines.width/4)*sines.sin(ypos/(sines.height/20)) + sines.width/2;
      sines.ellipse(xpos,ypos,diameter, diameter);
    }
  }
}

var sineInstance = new p5(sines,'sines');

//trees and shit
var tree = function(tree) {
  tree.setup = function () {
    var canvas = tree.createCanvas(canvasSize, canvasSize);
    canvas.mousePressed(tree.drawTree);

    tree.colors = [];
    for (let i = 0; i < colorArray.length; i++) {
      tree.colors.push(tree.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }

    tree.drawTree();
  }

  tree.drawTree = function() {

    tree.shuffledColors = tree.shuffle(tree.colors);

    tree.color1 = tree.shuffledColors.pop();
    tree.color2 = tree.shuffledColors.pop();
    tree.background(tree.color1);

    flip = tree.random(100);
    tree.tree(tree.width / 2, tree.height, 175, - tree.PI / 2, 3, tree.PI / 3, 0.8, m=23);
  }

  // SYNTAX: 
  // tree(positionX, positionY, baseLength, angle, branches (default = 3),
  //   angleVariation (default = PI / 2), childLengthRatio (default = 0.8), 
  //   minimumLength (default = 15))
  // From: https://redd.it/oqtmne

  tree.tree = function(x, y, l, a, b = 3, v = tree.PI / 2, r = 0.8, m = 15) {
      if (l < m) return;
      tree.strokeWeight(l / m);
      if (flip > 50) {
        tree.stroke(tree.lerpColor(tree.color1, tree.color2, 1.5*m/l));
      } else {
        if (tree.shuffledColors.length < 1) {
          tree.shuffledColors = tree.shuffle(tree.colors);
        }
        tree.stroke(tree.shuffledColors.pop());
      }
      tree.line(x, y, x + l * tree.cos(a), y + l * tree.sin(a));
      for (let i = 0; i < b; i++) tree.tree(x + l * tree.cos(a), y + l * tree.sin(a), l * r, a + v * (tree.random() - 0.5), b, v, r, m);
  }
}

var treeInstance = new p5(tree, 'tree');



// donuts

var donut = function(donut) {
  donut.setup = function() {
    var canvas = donut.createCanvas(canvasSize, canvasSize);
    margin=20;
    outerRadius = 250; 
    donut.numCircles = 150;
    donut.numColors = 1;
    donut.circlesPerColor = donut.int(donut.numCircles / donut.numColors);
    xcenter = donut.width / 2;
    ycenter = donut.height/ 2;
    innerRadius = (ycenter - outerRadius/2) - margin;   // aka the hypoteneuse! 
    donut.counter = 0;
    donut.angleMode(donut.DEGREES);
    donut.noStroke();

    donut.colors = [];
    for (let i = 0; i < colorArray.length; i++) {
      donut.colors.push(donut.color(colorArray[i][0], colorArray[i][1], colorArray[i][2]));
    }
    donut.shuffledColors = donut.shuffle(donut.colors);

    donut.color2=donut.shuffledColors.pop();
  }

  donut.drawDonut = function () {

  }

  donut.draw = function () {
    if (donut.counter % donut.circlesPerColor == 0) {
      donut.color1 = donut.color2;

      if (donut.shuffledColors.length < 1) { 
        donut.shuffledColors = donut.shuffle(donut.colors);
      }

      donut.color2=donut.shuffledColors.pop();
    }
    if (donut.counter % (10*donut.numCircles) == 0 ) {
      donut.background(donut.color1);
    }
    donut.fill(donut.lerpColor(donut.color1, donut.color2, (donut.counter % donut.circlesPerColor) / donut.circlesPerColor));
    donut.angle = 360 * donut.counter / donut.numCircles;
    donut.xpos = donut.cos(donut.angle)*innerRadius + xcenter;
    donut.ypos = (donut.sin(donut.angle))*innerRadius + ycenter;
    donut.ellipse(donut.xpos, donut.ypos, outerRadius);
    donut.counter++;
  }

}

var donutInstance = new p5(donut, 'donut');

