// =========================
// Open World Explorer
// Part 1B-1
// =========================

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// Lights
const sun = new THREE.DirectionalLight(
0xffffff,
1.2
);

sun.position.set(
30,
40,
20
);

sun.castShadow = true;

scene.add(sun);

const ambient =
new THREE.AmbientLight(
0xffffff,
0.5
);

scene.add(ambient);

// Ground
const ground =
new THREE.Mesh(

new THREE.PlaneGeometry(
300,
300
),

new THREE.MeshPhongMaterial({
color:0x4CAF50
})

);

ground.rotation.x =
-Math.PI/2;

ground.receiveShadow = true;

scene.add(ground);

// Player
const player =
new THREE.Group();

const body =
new THREE.Mesh(

new THREE.BoxGeometry(
1,
2,
1
),

new THREE.MeshPhongMaterial({
color:0xff4444
})

);

body.position.y = 1;

body.castShadow = true;

player.add(body);

scene.add(player);

player.position.set(
0,
0,
0
);

// Camera
camera.position.set(
0,
8,
12
);

camera.lookAt(player.position);

// Movement
const moveSpeed = 0.5;

function moveForward(){

player.position.z -= moveSpeed;

}

function moveBackward(){

player.position.z += moveSpeed;

}

function moveLeft(){

player.position.x -= moveSpeed;

}

function moveRight(){

player.position.x += moveSpeed;

}

// Animation
function animate(){

requestAnimationFrame(animate);

camera.position.x =
player.position.x;

camera.position.z =
player.position.z + 12;

camera.lookAt(player.position);

renderer.render(
scene,
camera
);

}

animate();

// Resize
window.addEventListener(
"resize",
function(){

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
// =========================
// PART 1B-2
// Roads, Buildings & Trees
// =========================

// Road
const road = new THREE.Mesh(

new THREE.PlaneGeometry(
14,
300
),

new THREE.MeshPhongMaterial({
color:0x333333
})

);

road.rotation.x = -Math.PI/2;
road.position.y = 0.02;

scene.add(road);

// Road Lines
for(let i=0;i<40;i++){

const line = new THREE.Mesh(

new THREE.BoxGeometry(
0.3,
0.02,
4
),

new THREE.MeshBasicMaterial({
color:0xffffff
})

);

line.position.set(
0,
0.04,
-i*8
);

scene.add(line);

}

// Buildings
function createBuilding(x,z){

const h = Math.random()*10+5;

const building = new THREE.Mesh(

new THREE.BoxGeometry(
5,
h,
5
),

new THREE.MeshPhongMaterial({
color:0x888888
})

);

building.position.set(
x,
h/2,
z
);

building.castShadow = true;

scene.add(building);

}

// Trees
function createTree(x,z){

const trunk = new THREE.Mesh(

new THREE.CylinderGeometry(
0.25,
0.25,
2
),

new THREE.MeshPhongMaterial({
color:0x8B4513
})

);

trunk.position.set(
x,
1,
z
);

scene.add(trunk);

const leaves = new THREE.Mesh(

new THREE.SphereGeometry(
1.2,
16,
16
),

new THREE.MeshPhongMaterial({
color:0x228B22
})

);

leaves.position.set(
x,
2.8,
z
);

scene.add(leaves);

}

// Generate City
for(let i=0;i<25;i++){

createBuilding(
-14,
-i*12
);

createBuilding(
14,
-i*12
);

createTree(
-8,
-i*12
);

createTree(
8,
-i*12
);

}
// =========================
// PART 1B-3
// Street Lights & Coins
// =========================

// Street Lights
function createLamp(x,z){

const pole = new THREE.Mesh(

new THREE.CylinderGeometry(
0.1,
0.1,
3
),

new THREE.MeshPhongMaterial({
color:0x555555
})

);

pole.position.set(
x,
1.5,
z
);

scene.add(pole);

const lightHead = new THREE.Mesh(

new THREE.SphereGeometry(
0.2,
16,
16
),

new THREE.MeshBasicMaterial({
color:0xffff99
})

);

lightHead.position.set(
x,
3.1,
z
);

scene.add(lightHead);

}

// Coins
const coins=[];

function createCoin(x,z){

const coin = new THREE.Mesh(

new THREE.CylinderGeometry(
0.4,
0.4,
0.15,
24
),

new THREE.MeshPhongMaterial({
color:0xffd700
})

);

coin.rotation.x = Math.PI/2;

coin.position.set(
x,
0.5,
z
);

scene.add(coin);

coins.push(coin);

}

// Add lamps
for(let i=0;i<25;i++){

createLamp(
-5,
-i*12
);

createLamp(
5,
-i*12
);

}

// Add coins
for(let i=0;i<20;i++){

createCoin(

(Math.random()*6)-3,

-(Math.random()*250)

);

}

// Coin Collection
let coinScore = 0;

function updateCoins(){

coins.forEach(function(c){

if(!c.visible) return;

if(player.position.distanceTo(c.position)<1){

c.visible=false;

coinScore++;

document.getElementById("coins").innerHTML=
coinScore;

}

});

}

// Replace animation
const oldAnimate = animate;

animate = function(){

requestAnimationFrame(animate);

updateCoins();

camera.position.x = player.position.x;

camera.position.z = player.position.z + 12;

camera.lookAt(player.position);

renderer.render(scene,camera);

};

animate();
