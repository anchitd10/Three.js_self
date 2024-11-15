var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight,
    0.5, 1000
);

camera.position.z = 5; // camera offset

var renderer = new THREE.WebGLRenderer(  { antialias: true } );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1); // (width, height, depth)
var material = new THREE.MeshNormalMaterial( {color: 0x00aaff});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y +=0.01;

    renderer.render(scene, camera);
}

animate();

// renderer.render(scene, camera);