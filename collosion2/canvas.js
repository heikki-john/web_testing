let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
let minRadius = 2;

let colorArray = [
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

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

//this is javascript object
function Particle(x,y,dx,dy,radius, color){
  this.x = x;
  this.y = y;
  this.velocity = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5
  };

  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color;
  this.mass = 1;
  this.opacity = 0;

  //Anonyymi funktio piirtoa letten
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
    c.stroke();

    c.closePath();
  }

  this.update = function(particles){
    this.draw();

    for (let i = 0; i<particles.length; i++){
      if (particles[i] === this) continue;

      if(distance(this.x, this.y, particles[i].x, particles[i].y) <
          this.radius + particles[i].radius){
            resolveCollision(this, particles[i]);
      }
    }

    if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth){
      this.velocity.x = -this.velocity.x;
    }
    if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
      this.velocity.y = -this.velocity.y;
    }

    // Hiiren havanointi
    if(distance(mouse.x, mouse.y, this.x, this.y) < 80 && this.opacity < 1){
      this.opacity += 0.1;
    }else if(this.opacity >0){
      this.opacity -= 0.1;
      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  } // update
}

let particles;

function init(){
  particles = [];
  for( let i = 0; i < 200; i++ ){
    const radius = 10;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);

    const color = randomColor(colorArray);

    if( i != 0){
      for(let j = 0; j < particles.length; j++){
        if(distance(x, y, particles[j].x, particles[j].y) <
            radius + particles[j].radius){
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    particles.push(new Particle(x,y, 0,0, radius, color));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);
  c.fillStyle = 'black';
  c.fillRect(0,0,innerWidth, innerHeight);
  particles.forEach(function(particle){
    particle.update(particles);
  });
  // for (let i = 0; i< particles.length; i++){
  //   particles[i].update();
  // }
}

init();
animate();
