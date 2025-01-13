const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// array to hold the cubes
const cubes = [];
const numCubes = 5;
const cubeSize = 1;
const totalWidth = (numCubes * cubeSize) + ((numCubes - 1) * 0.5); // Total width including spacing

for (let i = 0; i < numCubes; i++) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    // center the cubes around the origin
    cube.position.x = i * (cubeSize + 0.5) - totalWidth / 2 + cubeSize / 2;
    scene.add(cube);
    cubes.push(cube);
}

camera.position.z = 5;

let scaleDirection = 1;
let scaleFactor = 0;

function animate() {
    requestAnimationFrame(animate);

    // Update the scale of each cube
    for (let i = 0; i < numCubes; i++) {
        const cube = cubes[i];
        const scale = Math.sin((Date.now() * 0.001) + (i * 0.5)) * 0.5 + 1.5;
        cube.scale.set(scale, scale, scale);
    }

    renderer.render(scene, camera);
}

animate();
