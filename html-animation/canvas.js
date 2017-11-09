var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(146, 120, 110, 0.5)';
// c.fillRect(10,10,50,50);
// c.fillStyle = 'rgba(1, 0, 110, 0.5)';
// c.fillRect(200,50,50,50);
// c.fillStyle = 'rgba(1, 120, 0, 0.5)';
// c.fillRect(10,200,50,50);
//
// console.log(canvas);
//
// //Line
//
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.lineTo(50,300);
// c.strokeStyle = "#4f2d5a";
// c.stroke();

// Arc eli ympyrä
// x, y, sade, aloituskulma, lopetuskulma, piirto myötäpäivään
// Kulmat on radiaaneina siksi Pii on matkassa
// c.beginPath();
// c.arc(300, 200, 30, 0, Math.PI * 2, true);
// c.strokeStyle = 'blue';
// c.stroke();

//
// for (var i = 0; i < 100; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var sec = Math.random() * (Math.PI * 2);
//
//   c.beginPath();
//   c.arc(x, y, 30, 0, sec, true);
//   c.strokeStyle = 'blue';
//   c.stroke();
// }

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

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

//this is javascript object
function Circle(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  //Anonyymi funktio piirtoa varten
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
       && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < maxRadius) {
        this.radius += 1;
      }
    }else if (this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }

}

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

// var circle = new Circle(x, y, dx, dy, radius);

var circleArray = [];

function init(){
  c.fillStyle = 'black';
  c.fillRect(0,0, 100, 100);

  circleArray = [];
  for( var i = 0; i < 1000; i++ ){
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = Math.random() * 3 + 1;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  // c.clearRect(0,0, innerWidth, innerHeight);
  c.fillRect(0,0, innerWidth, innerHeight);

  for( var i = 0; i < circleArray.length; i++ ){
    circleArray[i].update();
  }
}

init();
animate();
