var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight,
    0.5, 1000
);

camera.position.z = 6; // camera offset

var renderer = new THREE.WebGLRenderer(  { antialias: true } ); //aliasing = jagged lines on the edges of meshes
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Point light
var light = new THREE.PointLight(0xffffff, 75, 100); // (color, intensity, distance)
light.position.set(5, 5, 5); // Place the light above the scene
scene.add(light);

// Directional light
// A DirectionalLight can simulate sunlight
var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //(color, intensity)
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

// Hemisphere light
// A HemisphereLight adds ambient light from the sky and ground, creating a natural effect
var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1); // (skycolor, groundcolor, intensity)
scene.add(hemiLight);

// Ambient light
// global light
var ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
scene.add(ambientLight);

// first cube
var geometry1 = new THREE.BoxGeometry(1, 1, 1);
var material1 = new THREE.MeshStandardMaterial({ color: 0x00aaff });
var cube1 = new THREE.Mesh(geometry1, material1);
scene.add(cube1);

// second cube
var geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
var cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);

// initial camera position at a fixed radius
let radius = 5;
camera.position.set(radius, 2, radius); // set angle
camera.lookAt(cube1.position); // camera always looks first cube

// Camera orbit radius
let cameraRadius = 5;
// Orbit radius for the second cube
let cube2OrbitRadius = 2;

let clock = new THREE.Clock();


function animate(){
    requestAnimationFrame(animate);

    // Time for smooth rotation
    let time = performance.now() / 1000;

    // Rotate the first cube on its axis
    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;

    // Rotate the second cube around the first cube
    cube2.position.x = cube1.position.x + cube2OrbitRadius * Math.cos(time);
    cube2.position.z = cube1.position.z + cube2OrbitRadius * Math.sin(time);
    cube2.position.y = 0; // Keep the second cube at the same height

    // Render the scene
    renderer.render(scene, camera);
}

animate();

// renderer.render(scene, camera);