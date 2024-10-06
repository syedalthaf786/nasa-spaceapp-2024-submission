
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// import starsTexture from './img/stars.jpg';
// import sunTexture from './img/sun.jpg';
// import mercuryTexture from './img/mercury.jpg';
// import venusTexture from './img/venus.jpg';
// import earthTexture from './img/earth.jpg';
// import marsTexture from './img/mars.jpg';
// import jupiterTexture from './img/jupiter.jpg';
// import saturnTexture from './img/saturn.jpg';
// import saturnRingTexture from './img/saturn ring.png';
// import uranusTexture from './img/uranus.jpg';
// import uranusRingTexture from './img/uranus ring.png';
// import neptuneTexture from './img/neptune.jpg';

// // Initialize renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(-90, 140, 140);

// // Set up texture loader
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//   starsTexture,
//   starsTexture,
//   starsTexture,
//   starsTexture,
//   starsTexture,
//   starsTexture
// ]);

// // Set up orbit controls
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

// // Set up lights
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 500); // Adjust intensity and distance
// pointLight.position.set(100, 100, 100);
// scene.add(pointLight);

// // Load and create planets
// const textureLoader = new THREE.TextureLoader();

// // Define the `sun` variable globally
// let sun;

// // Function to create planets and their orbits
// function createPlanet(size, texture, position, ring, orbitColor) {
//   const geometry = new THREE.SphereGeometry(size, 32, 32); // Increased segments for smoother sphere
//   const material = new THREE.MeshStandardMaterial({
//     map: textureLoader.load(texture),
//     roughness: 0.7, // Adjust material properties
//     metalness: 0.3
//   });
//   const planet = new THREE.Mesh(geometry, material);
//   const planetObj = new THREE.Object3D();
//   planetObj.add(planet);
//   scene.add(planetObj);
//   planet.position.x = position;

//   // Create orbit ring
//   const orbitGeometry = new THREE.RingGeometry(position + 1, position + 2, 100); // Rings around the planet
//   const orbitMaterial = new THREE.MeshBasicMaterial({
//     color: orbitColor,
//     side: THREE.DoubleSide,
//     transparent: true,
//     opacity: 0.5
//   });
//   const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
//   orbitMesh.rotation.x = -0.5 * Math.PI; // Rotate to lie flat
//   scene.add(orbitMesh);

//   if (ring) {
//     const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
//     const ringMaterial = new THREE.MeshStandardMaterial({
//       map: textureLoader.load(ring.texture),
//       side: THREE.DoubleSide
//     });
//     const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
//     planetObj.add(ringMesh);

//     ringMesh.position.x = position;
//     ringMesh.rotation.x = -0.5 * Math.PI;
//   }
  
//   return { planet, planetObj };
// }

// // Create the sun and other planets
// const sunGeo = new THREE.SphereGeometry(12, 25, 20);
// const sunMat = new THREE.MeshBasicMaterial({
//   map: textureLoader.load(sunTexture)
// });
// sun = new THREE.Mesh(sunGeo, sunMat); // Declare and initialize sun here
// scene.add(sun);

// // Create planets with different orbit colors
// const mercury = createPlanet(4, mercuryTexture, 20, null, 0xaaaaaa); // Grey orbit
// const venus = createPlanet(5, venusTexture, 40, null, 0xffcc00); // Yellow orbit
// const earth = createPlanet(5.56, earthTexture, 60, null, 0x0000ff); // Blue orbit
// const mars = createPlanet(5, marsTexture, 80, null, 0xff4500); // Red orbit
// const jupiter = createPlanet(6, jupiterTexture, 100, null, 0xffd700); // Gold orbit
// const saturn = createPlanet(8, saturnTexture, 150, {
//   innerRadius: 10,
//   outerRadius: 20,
//   texture: saturnRingTexture
// }, 0xffff00); // Yellow orbit
// const uranus = createPlanet(8.2, uranusTexture, 200, {
//   innerRadius: 10,
//   outerRadius: 20,
//   texture: uranusRingTexture
// }, 0x00ffff); // Cyan orbit
// const neptune = createPlanet(5, neptuneTexture, 240, null, 0x00008b); // Dark blue orbit

// // Animation function
// function animate() {
//   if (sun) {
//     sun.rotateY(0.002);
//   }
//   mercury.planet.rotateY(0.001);
//   mercury.planetObj.rotateY(0.001);
//   venus.planet.rotateY(0.0012);
//   venus.planetObj.rotateY(0.0015);
//   earth.planet.rotateY(0.012);
//   earth.planetObj.rotateY(0.0012);
//   mars.planet.rotateY(0.013);
//   mars.planetObj.rotateY(0.0019);
//   jupiter.planet.rotateY(0.04);
//   jupiter.planetObj.rotateY(0.0023);
//   saturn.planet.rotateY(0.01);
//   saturn.planetObj.rotateY(0.0021);
//   uranus.planet.rotateY(0.01);
//   uranus.planetObj.rotateY(0.0015);
//   neptune.planet.rotateY(0.01);
//   neptune.planetObj.rotateY(0.001);

//   renderer.render(scene, camera);
// }

// renderer.setAnimationLoop(animate);

// // Handle window resizing
// window.addEventListener('resize', function() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TweenLite } from 'gsap';

import starsTexture from './img/stars.jpg';
import sunTexture from './img/sun.jpg';
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import saturnRingTexture from './img/saturn ring.png';
import uranusTexture from './img/uranus.jpg';
import uranusRingTexture from './img/uranus ring.png';
import neptuneTexture from './img/neptune.jpg';

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-90, 140, 140);

// Set up texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

// Set up orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 500); // Adjust intensity and distance
pointLight.position.set(100, 100, 100);
scene.add(pointLight);

// Load and create planets
const textureLoader = new THREE.TextureLoader();

let planets = []; // Store planets for raycasting

// Function to create planets and their orbits
function createPlanet(size, texture, position, ring, orbitColor) {
  const geometry = new THREE.SphereGeometry(size, 32, 32); // Increased segments for smoother sphere
  const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
    roughness: 0.7, // Adjust material properties
    metalness: 0.3
  });
  const planet = new THREE.Mesh(geometry, material);
  const planetObj = new THREE.Object3D();
  planetObj.add(planet);
  scene.add(planetObj);
  planet.position.x = position;

  // Create orbit ring
  const orbitGeometry = new THREE.RingGeometry(position + 1, position + 2, 100); // Rings around the planet
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: orbitColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });
  const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbitMesh.rotation.x = -0.5 * Math.PI; // Rotate to lie flat
  scene.add(orbitMesh);

  if (ring) {
    const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    planetObj.add(ringMesh);

    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }

  planets.push(planet); // Add planet to planets array
  
  return { planet, planetObj };
}

// Create the sun and other planets
const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Create planets with different orbit colors
const mercury = createPlanet(4, mercuryTexture, 20, null, 0xaaaaaa);
const venus = createPlanet(5, venusTexture, 40, null, 0xffcc00);
const earth = createPlanet(5.56, earthTexture, 60, null, 0x0000ff);
const mars = createPlanet(5, marsTexture, 80, null, 0xff4500);
const jupiter = createPlanet(6, jupiterTexture, 100, null, 0xffd700);
const saturn = createPlanet(8, saturnTexture, 150, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
}, 0xffff00);
const uranus = createPlanet(8.2, uranusTexture, 200, {
  innerRadius: 10,
  outerRadius: 20,
  texture: uranusRingTexture
}, 0x00ffff);
const neptune = createPlanet(5, neptuneTexture, 240, null, 0x00008b);

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to handle mouse clicks
window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(planets);

  if (intersects.length > 0) {
    const selectedPlanet = intersects[0].object;
    zoomToPlanet(selectedPlanet);
  }
});

// Function to smoothly zoom to a planet
function zoomToPlanet(planet) {
  const targetPosition = planet.position.clone().multiplyScalar(1.5); // Adjust zoom level
  TweenLite.to(camera.position, 1, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    onUpdate: () => {
      camera.lookAt(planet.position);
    }
  });
}

// Animation function
function animate() {
  sun.rotateY(0.002);

  mercury.planet.rotateY(0.001);
  mercury.planetObj.rotateY(0.001);
  venus.planet.rotateY(0.0012);
  venus.planetObj.rotateY(0.0015);
  earth.planet.rotateY(0.012);
  earth.planetObj.rotateY(0.0012);
  mars.planet.rotateY(0.013);
  mars.planetObj.rotateY(0.0019);
  jupiter.planet.rotateY(0.04);
  jupiter.planetObj.rotateY(0.0023);
  saturn.planet.rotateY(0.01);
  saturn.planetObj.rotateY(0.0021);
  uranus.planet.rotateY(0.01);
  uranus.planetObj.rotateY(0.0015);
  neptune.planet.rotateY(0.01);
  neptune.planetObj.rotateY(0.001);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Handle window resizing
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
