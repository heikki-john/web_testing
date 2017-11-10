var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

var colorArray = [
  '#5C190A',
  '#A02800',
  '#654321',
  '#4F0009',
  '#6D0910',
];

var gravity = 1;
var friction = 0.99;

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function Ball(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy;
    this.radius = radius
    this.color = color

    this.update = function(){
        if(this.y + this.radius > canvas.height){
          this.dy = -this.dy * friction;
        }else{
          this.dy += gravity;
        }
        this.y += this.dy;
        this.draw()
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

var ball;
var ballArray = [];
// Implementation
function init() {
    for (var i = 0; i<500; i++){
        var x = randomIntFromRange(0, canvas.width);
        var y = randomIntFromRange(0, canvas.height);
        ballArray.push(new Ball(x, y, 2, 30, 'blue'));
    }
}

function animate(){
  requestAnimationFrame(animate);
  //c.fillStyle = 'black';
  c.clearRect(0,0, innerWidth, innerHeight);
//  c.fillRect(0,0, innerWidth, innerHeight);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }

}

init();
animate();
