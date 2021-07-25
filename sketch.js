
// Circle town

var circles = function(circles) {

  circles.setup = function() {
    var canvas = circles.createCanvas(500, 500);
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

var myp5 = new p5(circles, 'circles');











