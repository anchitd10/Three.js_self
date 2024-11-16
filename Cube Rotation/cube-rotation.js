var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight,
    0.5, 1000
);

camera.position.z = 2; // camera offset

var renderer = new THREE.WebGLRenderer(  { antialias: true } ); //aliasing = jagged lines on the edges of meshes
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1); // (width, height, depth)
// var material = new THREE.MeshBasicMaterial( {color: 0x00aaff});
var material = new THREE.MeshNormalMaterial();

var cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1;
scene.add(cube);

let clock = new THREE.Clock();

let radius = 3;
camera.position.set(radius, 0, 0); // Start at a distance along the X-axis
camera.lookAt(cube.position); // Ensure the camera is always looking at the cube

function animate(){
    requestAnimationFrame(animate);

    let time = performance.now() / 1000; // Time in seconds for smooth animation
    camera.position.x = radius * Math.cos(time); // X coordinate on the circular orbit
    camera.position.z = radius * Math.sin(time); // Z coordinate on the circular orbit
    camera.lookAt(cube.position); // Keep the camera focused on the cube

    renderer.render(scene, camera);
}

animate();

// renderer.render(scene, camera);