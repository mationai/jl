/*
Simple Physics Engine Demo #1, Demostrates:

- grouping of different objects
- collision policy setting based on groups
- rendering using canvas (use of SVG would be in another demo)

https://github.com/mationai/SPE.js
*/

var world, canvas, ctx, canvasWd, canvasHt,
  framesPerSec = 30,
  msecInterval = 1000/framesPerSec,
  time = 1/framesPerSec,
  randNum = SPE.Math.randMinMax,
  _2PI = Math.PI*2;


// Default Settings:
var C = {
  WORLD: {
    gravity: 16,
    nCircles: 5,
    nDots: 5
  },

  RECT: {  
    wd: 150,
    ht: 100,
    gap: 70
  },

  CIR: {  
    radius: 10,
    vel: 50
  },

  DOT: {  
    vel: 20
  }
};

var create = {
  randomCircle: function(x, y) {
    var shape = new SPE.Circle(x, y, C.CIR.radius);
    shape.setSpeedInDegrees(C.CIR.vel, randNum(0, 360) );
    return shape;
  },

  randomCircle2: function(x, y) {
    var shape = new SPE.Circle(x, y, C.CIR.radius);
    shape.setSpeedInDegrees(C.CIR.vel, randNum(0, 360) );
    shape.setStyle({fillColor:'green'});
    return shape;
  },

  diagCircle: function(x, y) {
    var shape = new SPE.Circle(x, y, C.CIR.radius);
    shape.setVelocity( C.CIR.vel, C.CIR.vel );
    shape.setStyle({fillColor:'yellow'});
    return shape;
  },

  randomDot: function(x, y) {
    var shape = new SPE.Particle(x, y);
    shape.setSpeedInDegrees(C.DOT.vel, randNum(0, 360) );
    shape.setStyle({fillColor:'black'});
    return shape;
  },

  horiDot: function(x, y) {
    var shape = new SPE.Particle(x, y);
    shape.setVelocity(C.DOT.vel, 0); 
    shape.setStyle({fillColor:'black'});
    return shape;
  },

  vertDot: function(x, y) {
    var shape = new SPE.Particle(x, y);
    shape.setVelocity(0, C.DOT.vel); 
    shape.setStyle({fillColor:'black'});
    return shape;
  }
};


function populate(world) {
  var i,
    circles1 = new SPE.Group(world),
    dots1 = new SPE.Group(world),
    dots2 = new SPE.Group(world),
    circles2 = new SPE.Group(world),
    containers = new SPE.Group(world),
    outerCircles = new SPE.Group(world),
    rects = new SPE.Group(world),

    rect1 = new SPE.Rect(
      C.RECT.gap, C.RECT.gap, C.RECT.wd, C.RECT.ht),

    rect2 = new SPE.Rect(
      C.RECT.gap*2 + C.RECT.wd, C.RECT.gap, C.RECT.wd, C.RECT.ht),

    rect3 = new SPE.Rect(
      C.RECT.gap, C.RECT.gap*2+C.RECT.ht, C.RECT.wd, C.RECT.ht),

    rect4 = new SPE.Rect(
      C.RECT.gap*2 + C.RECT.wd, C.RECT.gap*2 + C.RECT.ht, C.RECT.wd, C.RECT.ht),

    worldRect = new SPE.Rect(0,0, canvasWd, canvasHt);


  for (i=0; i<C.WORLD.nCircles; i++){
    circles1.add( create.randomCircle(
      C.RECT.gap + C.RECT.wd/2, C.RECT.gap + C.RECT.ht/2 ));
    circles2.add( create.randomCircle(
      C.RECT.gap*2 + C.RECT.wd*1.5, C.RECT.gap*2 + C.RECT.ht*1.5 ));
    outerCircles.add( create.randomCircle2(
      C.RECT.gap/2, C.RECT.gap/2 ));
  }
  for (i=0; i<C.WORLD.nDots; i++){
    dots1.add( create.randomDot(
      C.RECT.gap*2 + C.RECT.wd*1.5, C.RECT.gap + C.RECT.ht/2 ));
    dots2.add( create.randomDot(
      C.RECT.gap + C.RECT.wd/2, C.RECT.gap*2 + C.RECT.ht*1.5 ));
  }

  circles1.setCollideWith(rect1);
  dots1.setCollideWith(rect2);
  dots2.setCollideWith(rect3);
  circles2.setCollideWith(rect4);

  outerCircles.add( create.diagCircle(
    C.RECT.gap*1.5 + C.RECT.wd, C.RECT.gap*1.5 + C.RECT.ht ));
  outerCircles.add( create.vertDot(
    C.RECT.gap + C.RECT.wd,     C.RECT.gap*1.5 + C.RECT.ht ));
  outerCircles.add( create.horiDot(
    C.RECT.gap*1.5 + C.RECT.wd, C.RECT.gap + C.RECT.ht ));
  containers.add( rect1, rect2, rect3, rect4, worldRect );
  containers.setFixed();

  outerCircles.setCollideWith(containers);
  world.add(worldRect, containers, circles1, dots1, dots2, circles2, outerCircles);
}

function initCanvas(el) {
  canvas = el || document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvasWd = parseInt(canvas.getAttribute('width'), 10);
  canvasHt = parseInt(canvas.getAttribute('height'), 10);
}

function initSPE(el) {
  initCanvas(el);
  world = new SPE.World();
  //world.addMasslessForce(0, WORLD.gravity);
  populate(world);
  //runforever()
  setInterval('runforever()', msecInterval);
}

function runforever() {
  world.step(time);
  ctx.clearRect(0,0, canvasWd,canvasHt);
  world.draw(drawer);
}

function drawer(objStyles, args) {
  setDrawStyles(objStyles);
  ctx.beginPath();

  switch (objStyles.shape) {

  case "Particle":
    drawParticle(objStyles, arguments[1], arguments[2], arguments[3]);
    break;

  case "Circle":
    drawCircle(objStyles, arguments[1], arguments[2], arguments[3]);
    break;

  case "Rect":
    drawRect(objStyles, arguments[1], arguments[2], arguments[3], arguments[4]);
    break;

  default:
    throw Error('drawer() does not support '+objStyles.shape);
  }
  ctx.closePath();
}

function setDrawStyles(objStyles) {
  if (objStyles.fillColor) ctx.fillStyle   = objStyles.fillColor;
  if (objStyles.lineColor) ctx.strokeStyle = objStyles.lineColor;
  if (objStyles.lineWidth) ctx.lineWidth   = objStyles.lineWidth;
}

function drawParticle(objStyles, x, y, radius) {
  ctx.rect(x-radius, y-radius, radius*2, radius*2);
  if (objStyles.fillColor) ctx.fill();
}

function drawCircle(objStyles, x, y, radius) {
  ctx.arc(x, y, radius, 0, _2PI, true);
  if (objStyles.fillColor) ctx.fill();
  if (objStyles.lineWidth) ctx.stroke();
}

function drawRect(objStyles, x0, y0, wd, ht) {
  ctx.rect(x0, y0, wd, ht);
  if (objStyles.fillColor) ctx.fill();
  if (objStyles.lineWidth) ctx.stroke();
}
