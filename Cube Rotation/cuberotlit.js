var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight,
    0.5, 1000
);

camera.position.z = 6; // camera offset

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

// Point light
var light = new THREE.PointLight(0xffffff, 75, 100); // (color, intensity, distance)
light.position.set(5, 5, 5); // Place the light above the scene
light.castShadow = true; // Enable shadows for the point light
scene.add(light);

// Directional light
// A DirectionalLight can simulate sunlight
var directionalLight = new THREE.DirectionalLight(0xffffff, 3); //(color, intensity)
directionalLight.position.set(3, 3, 3);
directionalLight.castShadow = true; // Enable shadows for the directional light
scene.add(directionalLight);

// Ambient light
var ambientLight = new THREE.AmbientLight(0x404040); // Global ambient light
scene.add(ambientLight);

// First cube
var geometry1 = new THREE.BoxGeometry(1, 1, 1);
var material1 = new THREE.MeshStandardMaterial({ color: 0x00aaff });
var cube1 = new THREE.Mesh(geometry1, material1);
cube1.castShadow = true; // Cube 1 casts a shadow
scene.add(cube1);

// Second cube
var geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
var cube2 = new THREE.Mesh(geometry2, material2);
cube2.castShadow = true; // Cube 2 casts a shadow
scene.add(cube2);

// Plane
var planeGeometry = new THREE.PlaneGeometry(10, 10); // A large plane
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 1 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
plane.position.y = -1; // Position it below the cubes
plane.receiveShadow = true; // The plane will receive shadows
scene.add(plane);

// Camera settings
let radius = 5;
camera.position.set(radius, 2, radius);
camera.lookAt(cube1.position); // Camera always looks at the first cube

// Camera orbit radius
let cameraRadius = 5;
// Orbit radius for the second cube
let cube2OrbitRadius = 2;

let clock = new THREE.Clock();

function animate() {
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
