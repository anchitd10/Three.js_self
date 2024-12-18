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


function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y +=0.01;
    // by default rotation speed depends on FPS supported by user's pc
    
    cube.rotation.x = clock.getElapsedTime() * 2;
    cube.rotation.y = clock.getElapsedTime() * 2;

    renderer.render(scene, camera);
}

animate();

// renderer.render(scene, camera);