
// Circle town
var circles = function(circles) {

  circles.setup = function() {
    var canvas = circles.createCanvas(800, 800);
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

  circles.keyPressed = function() {
    if (circles.keyCode === 83) {            // 83 is "S" or "s" 
      circles.saveCanvas('name','png');
    }
  }

};

var circleInstance = new p5(circles, 'circles');

// random walk 
var path = function(path) {

  path.setup = function() {
    var canvas = path.createCanvas(800, 800);
    xpos = path.width/2;
    ypos = path.height/2;
    interval = 100;
    colorSteps = 20;
    counter = 0;
    circles.color2 = path.color(path.random(255), path.random(255), path.random(255));
    canvas.mousePressed(path.walkit);
    path.walkit();
  }

  path.walkit = function() {  
    if (counter % colorSteps == 0) {
      circles.color1=circles.color2;
      circles.color2 = path.color(path.random(255), path.random(255), path.random(255));
    }

    currentColor = path.lerpColor(circles.color1, circles.color2, (counter % colorSteps) / colorSteps);
    path.stroke(currentColor);
    path.strokeWeight(10);
    counter++;

    path.nextSegment(xpos,ypos,interval);
  }

  path.nextSegment = function(xpos, ypos, interval) {
    if (xpos > path.width || xpos < 0 || ypos > path.height || ypos < 0) {
      // game over 
    } else {
      newxpos = xpos+path.random(-interval,interval);
      newypos = ypos+path.random(-interval,interval);
      path.line(xpos, ypos, newxpos, newypos);
      path.nextSegment(newxpos,newypos,interval);
    }
  }

}

var pathInstance = new p5(path, 'path');

var squares = function(squares) {
  squares.setup = function () {
    var canvas = squares.createCanvas(800, 800);
    canvas.mousePressed(squares.drawSquares);
    segments = 6;
    spacing = 1;
    squares.drawSquares();
  }

  squares.drawSquares = function() { 
    segments = squares.int(squares.random(6,15));
    
    color1 = squares.color(squares.random(0, 255), squares.random(0, 255), squares.random(0, 255));
    color2 = squares.color(squares.random(0, 255), squares.random(0, 255), squares.random(0, 255));

    squares.background(color2);

    for (i=0; i<segments; i++) {
      let xpos = squares.width/segments * i + spacing;
      for (j=0; j<segments; j++) {
        let ypos = squares.height/segments * j + spacing;    
        squares.noStroke();
        squares.fill(squares.lerpColor(color1, color2,(i+j+2)/(2*segments)));
        squares.rect(xpos, ypos, squares.width/segments - 2*spacing, squares.height/segments - 2*spacing);
      }
    }
  }
}

var squaresInstance = new p5(squares, 'squares');











