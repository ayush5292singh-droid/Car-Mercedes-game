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
