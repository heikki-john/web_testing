var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
  '#5C190A',
  '#A02800',
  '#654321',
  '#4F0009',
  '#6D0910',
];

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colorArray) {
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


//this is javascript object
function Circle(x,y,dx,dy,radius, color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;

  //Anonyymi funktio piirtoa varten
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  this.update = function(){
    // if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
    //   this.dx = -this.dx;
    // }
    //
    // if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
    //   this.dy = -this.dy;
    // }
    //
    // this.x += this.dx;
    // this.y += this.dy;
    //
    // // interactivity
    // if (mouse.x - this.x < 50 && mouse.x - this.x > -50
    //    && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
    //   if(this.radius < maxRadius) {
    //     this.radius += 1;
    //   }
    // }else if (this.radius > this.minRadius){
    //   this.radius -= 1;
    // }

    this.draw();
  }

}

var circleArray = [];

function init(){
  circleArray = [];
  for( var i = 0; i < 1000; i++ ){
    // var x = Math.random() * (innerWidth - radius * 2) + radius;
    // var y = Math.random() * (innerHeight - radius * 2) + radius;
    // var dx = (Math.random() - 0.5);
    // var dy = (Math.random() - 0.5);
    // var radius = Math.random() * 3 + 1;
    //
    // circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);

  // for( var i = 0; i < circleArray.length; i++ ){
  //   circleArray[i].update();
  // }
}

init();
animate();
