
var canvasSize = 800;

// Circle town
var circles = function(circles) {

  circles.setup = function() {
    var canvas = circles.createCanvas(canvasSize, canvasSize);
    canvas.mousePressed(circles.randomize);
    circles.randomize();
  };

  circles.randomize = function() {  
    segments = circles.int(circles.random(2,11));
    numCircles = circles.random(2,8);
    circles.drawCircles();
  }

  circles.drawCircles = function () { 
    rand1 = circles.random(0,255);
    rand2 = circles.random(0,255);
    rand3 = circles.random(0,255);
    circles.color1 = circles.color(circles.random(0, 255), circles.random(0, 255), circles.random(0, 255));
    circles.color2 = circles.color(rand1, rand2, rand3);
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
    counter = 0;
    resetSteps = 500;     // number of ticks after which to reset the canvas
    path.color2 = path.color(path.random(255), path.random(255), path.random(255));
    path.background(path.color2);
    path.frameRate(20);
  }

  path.walkit = function() {  
    if (counter % path.colorSteps == 0) {
      path.color1=path.color2;
      path.color2 = path.color(path.random(255), path.random(255), path.random(255));
    }
    currentColor = path.lerpColor(path.color1, path.color2, (counter % path.colorSteps) / path.colorSteps);
    if (counter % resetSteps == 0) {
      path.background(currentColor);
    }
    path.stroke(currentColor);
    path.strokeWeight(30);
    counter++;
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
    var canvas = squares.createCanvas(canvasSize, canvasSize);
    canvas.mousePressed(squares.drawSquares);
    spacing = 1;
    squares.drawSquares();
  }

  squares.drawSquares = function() { 
    segments = squares.int(squares.random(5,15));
    squares.color1 = squares.color(squares.random(0, 255), squares.random(0, 255), squares.random(0, 255));
    squares.color2 = squares.color(squares.random(0, 255), squares.random(0, 255), squares.random(0, 255));
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
    var canvas = sines.createCanvas(canvasSize,canvasSize);
    canvas.mousePressed(sines.drawSines);
    sines.noStroke();
    sines.color2 = sines.color(sines.random(0, 255), sines.random(0, 255), sines.random(0, 255));
    sines.drawSines();
  }

  sines.drawSines = function () {
    sines.colorSteps = sines.int(sines.random(20,1000));
    numFrames = sines.random(400,1000);
    diameter = sines.random(100,300);
    sines.background(sines.color2);
    for (i=0; i<=numFrames; i++) {
      if (i % sines.colorSteps == 0) {
        sines.color1 = sines.color2;
        sines.color2 = sines.color(sines.random(0, 255), sines.random(0, 255), sines.random(0, 255));
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
    tree.drawTree();
  }

  tree.drawTree = function() {

    tree.color1 = tree.color(tree.random(255), tree.random(255), tree.random(255));
    tree.color2 = tree.color(tree.random(255), tree.random(255), tree.random(255));
    tree.background(tree.color1);

    flip = tree.random(100);
    console.log(flip);
    tree.tree(tree.width / 2, tree.height, 175, - tree.PI / 2, 3, tree.PI / 3, 0.8, m=20);
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
        tree.stroke(tree.color(tree.random(255), tree.random(255), tree.random(255)));
      }
      tree.line(x, y, x + l * tree.cos(a), y + l * tree.sin(a));
      for (let i = 0; i < b; i++) tree.tree(x + l * tree.cos(a), y + l * tree.sin(a), l * r, a + v * (tree.random() - 0.5), b, v, r, m);
  }
}

var treeInstance = new p5(tree, 'tree');
