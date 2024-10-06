
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
// import plutoTexture from './img/pluto.jpg';

// // Setup the API URL with your API key
// const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&detailed=false&api_key=5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz'; // Replace with your API key

// // Initialize global variables
// const celestialBodies = [];
// const mouse = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();

// // Create the renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create the scene
// const scene = new THREE.Scene();

// // Create the camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(-90, 140, 140);

// // Setup the background
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);

// // Setup orbit controls
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

// // Setup lights
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 3, 100);
// scene.add(pointLight);

// // Load textures
// const textureLoader = new THREE.TextureLoader();

// // Create the sun
// const sunGeo = new THREE.SphereGeometry(12, 25, 20);
// const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
// const sun = new THREE.Mesh(sunGeo, sunMat);
// scene.add(sun);

// // Function to create planets
// function createPlanet(size, texture, position, ring) {
//   const geometry = new THREE.SphereGeometry(size, 25, 20);
//   const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
//   const planet = new THREE.Mesh(geometry, material);
//   const planetObj = new THREE.Object3D();
//   planetObj.add(planet);
//   scene.add(planetObj);
//   planet.position.x = position;

//   // Check if `ring` is defined
//   if (ring) {
//     const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
//     const ringMat = new THREE.MeshStandardMaterial({ 
//       map: textureLoader.load(ring.texture), 
//       side: THREE.DoubleSide 
//     });
//     const ringMesh = new THREE.Mesh(ringGeo, ringMat);
//     planetObj.add(ringMesh);

//     ringMesh.position.x = position;
//     ringMesh.rotation.x = -0.5 * Math.PI;
//   }

//   return { planet, planetObj };
// }

// // Load planets
// const mercury = createPlanet(4, mercuryTexture, 20);
// const venus = createPlanet(5, venusTexture, 40);
// const earth = createPlanet(5.56, earthTexture, 60);
// const mars = createPlanet(5, marsTexture, 80);
// const jupiter = createPlanet(6, jupiterTexture, 100);
// const saturn = createPlanet(8, saturnTexture, 150, { 
//   innerRadius: 10, 
//   outerRadius: 20, 
//   texture: saturnRingTexture 
// });
// const uranus = createPlanet(8.2, uranusTexture, 200, { 
//   innerRadius: 10, 
//   outerRadius: 20, 
//   texture: uranusRingTexture 
// });
// const neptune = createPlanet(5, neptuneTexture, 240);

// // Fetch NEO data and add to the scene
// async function fetchNeoData() {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('API response:', data);

//     const dateKey = '2015-09-07';  // Adjust to your date
//     if (data.near_earth_objects && data.near_earth_objects[dateKey]) {
//       const neosData = data.near_earth_objects[dateKey];
//       if (Array.isArray(neosData)) {
//         neosData.forEach((neo, index) => {
//           const size = (neo.estimated_diameter.kilometers.estimated_diameter_min +
//               neo.estimated_diameter.kilometers.estimated_diameter_max) / 2 * 20;
//           const geometry = new THREE.SphereGeometry(size, 18, 10);
//           const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//           const neoSphere = new THREE.Mesh(geometry, material);
//           const distance = Math.random() * 30 + 10;
//           neoSphere.position.x = Math.cos(index) * distance;
//           neoSphere.position.y = Math.sin(index) * distance;
//           neoSphere.position.z = (Math.random() - 0.5) * 50;

//           neoSphere.neoData = {
//             name: neo.name,
//             approachDate: neo.close_approach_data && neo.close_approach_data[0] ? neo.close_approach_data[0].close_approach_date : 'Unknown'
//           };

//           celestialBodies.push(neoSphere);
//           scene.add(neoSphere);
//         });
//       } else {
//         console.error('NEO data is not an array:', neosData);
//       }
//     } else {
//       console.error('No NEO data found for the specified date:', data.near_earth_objects);
//     }
//   } catch (error) {
//     console.error('Error fetching NEO data:', error);
//   }
// }

// // Handle mouse movement
// function onMouseMove(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(celestialBodies);

//   if (intersects.length > 0) {
//     const intersectedObject = intersects[0].object;
//     const neoInfo = document.getElementById('neo-info');
//     neoInfo.style.display = 'block';
//     neoInfo.style.left = `${event.clientX + 10}px`;
//     neoInfo.style.top = `${event.clientY + 10}px`;
//     neoInfo.innerHTML = `NEO: ${intersectedObject.neoData.name}<br>Date: ${intersectedObject.neoData.approachDate}`;
//   } else {
//     document.getElementById('neo-info').style.display = 'none';
//   }
// }

// // Animate the scene
// function animate() {
//   sun.rotateY(0.002);
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

// // Set up the animation loop
// renderer.setAnimationLoop(animate);

// // Handle window resize
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize);
// window.addEventListener('mousemove', onMouseMove);

// // Fetch NEO data
// fetchNeoData();


// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// // Import textures
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
// import plutoTexture from './img/pluto.jpg';
// import asteroidTexture from './img/asteroid_texture.jpg';

// // NASA API URL with demo key
// const apiUrl = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";

// // Initialize global variables
// const celestialBodies = [];
// const mouse = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();

// // Create the renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create the scene
// const scene = new THREE.Scene();

// // Create the camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(-90, 140, 140);

// // Setup the background
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);

// // Setup orbit controls
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.update();

// // Setup lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1.5, 1000);
// scene.add(pointLight);

// // Load textures
// const textureLoader = new THREE.TextureLoader();

// // Create celestial bodies
// const sun = createCelestialBody(12, sunTexture, 0, 0);
// const mercury = createCelestialBody(4, mercuryTexture, 20);
// const venus = createCelestialBody(5, venusTexture, 40);
// const earth = createCelestialBody(5, earthTexture, 60);
// const mars = createCelestialBody(4, marsTexture, 80);
// const jupiter = createCelestialBody(10, jupiterTexture, 100);
// const saturn = createCelestialBody(8, saturnTexture, 150, { innerRadius: 8.5, outerRadius: 12, texture: saturnRingTexture });
// const uranus = createCelestialBody(7, uranusTexture, 200, { innerRadius: 6.5, outerRadius: 10, texture: uranusRingTexture });
// const neptune = createCelestialBody(6, neptuneTexture, 240);
// const pluto = createCelestialBody(3, plutoTexture, 280);

// // Function to create a celestial body
// function createCelestialBody(size, texture, position, ring) {
//   const geometry = new THREE.SphereGeometry(size, 25, 20);
//   const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
//   const body = new THREE.Mesh(geometry, material);
  
//   // Create an object to hold the body and ring if necessary
//   const bodyObj = new THREE.Object3D();
//   bodyObj.add(body);
//   scene.add(bodyObj);
//   body.position.x = position;

//   // Create ring if defined
//   if (ring) {
//     const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
//     const ringMaterial = new THREE.MeshStandardMaterial({ 
//       map: textureLoader.load(ring.texture), 
//       side: THREE.DoubleSide 
//     });
//     const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
//     bodyObj.add(ringMesh);
//     ringMesh.position.x = position;
//     ringMesh.rotation.x = -0.5 * Math.PI;
//   }

//   return bodyObj;
// }

// // Create orbit lines for each planet
// function createOrbitLine(radius, color) {
//   const points = [];
//   const segments = 100;
  
//   for (let i = 0; i <= segments; i++) {
//     const angle = (i / segments) * Math.PI * 2;
//     points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
//   }

//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   const material = new THREE.LineBasicMaterial({ color: color, opacity: 0.5, transparent: true });
//   const line = new THREE.LineLoop(geometry, material);
//   scene.add(line);
// }

// // Create orbit lines with colors
// createOrbitLine(20, 0xffcc00); // Mercury (gold)
// createOrbitLine(40, 0xff6600); // Venus (orange)
// createOrbitLine(60, 0x00ccff); // Earth (blue)
// createOrbitLine(80, 0xff3300); // Mars (red)
// createOrbitLine(100, 0xffcc00); // Jupiter (gold)
// createOrbitLine(150, 0xff9900); // Saturn (orange)
// createOrbitLine(200, 0x00ffcc); // Uranus (turquoise)
// createOrbitLine(240, 0x3366ff); // Neptune (blue)

// // Function to fetch Near Earth Objects (NEOs) from NASA API
// async function fetchNEOs() {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const asteroids = data.near_earth_objects;

//     // Create NEOs from fetched data
//     Object.keys(asteroids).forEach(date => {
//       asteroids[date].forEach(neo => {
//         console.log(neo);
//         createNEO(neo);
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching NEO data:', error);
//   }
// }

// // Function to create an NEO
// function createNEO(neo) {
//   const estimatedDiameter = neo.estimated_diameter?.meters?.estimated_diameter_max || 0;
//   const size = Math.max(0.1, estimatedDiameter / 3000);

//   const geometry = new THREE.SphereGeometry(size, 10, 10);
//   const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(asteroidTexture) });
//   const asteroid = new THREE.Mesh(geometry, material);

//   // Set position based on the NEO's orbital data
//   if (neo.orbit_data?.semi_major_axis) {
//     asteroid.position.set(neo.orbit_data.semi_major_axis, 0, 0);
//   } else {
//     console.warn('Orbit data is missing for NEO:', neo);
//     asteroid.position.set(0, 0, 0);
//   }

//   asteroid.neoData = neo; // Store data for later access
//   celestialBodies.push(asteroid);
//   scene.add(asteroid);
// }

// // Handle mouse click to display NEO information
// function onMouseClick(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(celestialBodies);

//   if (intersects.length > 0) {
//     const intersectedObject = intersects[0].object;

//     // Zoom to NEO position
//     const targetPosition = intersectedObject.position.clone().add(new THREE.Vector3(0, 0, 10));
//     camera.position.copy(targetPosition);
//     camera.lookAt(intersectedObject.position);

//     // Display NEO information
//     const neoInfo = document.getElementById('neo-info');
//     neoInfo.innerHTML = `
//       <h3>${intersectedObject.neoData.name}</h3>
//       <p>Estimated Diameter: ${intersectedObject.neoData.estimated_diameter.meters.estimated_diameter_max} meters</p>
//       <p>Missed Distance: ${intersectedObject.neoData.close_approach_data[0].miss_distance.kilometers} kilometers</p>
//     `;
//   }
// }

// // Setup event listeners
// window.addEventListener('click', onMouseClick);
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);
  
//   // Rotate celestial bodies
//   celestialBodies.forEach(body => {
//     body.rotation.y += 0.05; // Rotate each body
//   });

//   orbitControls.update();
//   renderer.render(scene, camera);
// }

// // Fetch NEOs and start the animation loop
// fetchNEOs().then(() => {
//   animate();
// });

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
import asteroidTexture from './img/asteroid_texture.jpg'; 
import TWEEN from '@tweenjs/tween.js';
// NEO texture

// Setup the API URL with your API key
// const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&detailed=false&api_key=5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz'; // Replace with your API key

// Initialize global variables
const celestialBodies = [];
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let zoomedNeo = null; // Store the zoomed NEO

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-90, 140, 140);

// Setup the background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture]);

// Setup orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.25;
controls.update();

// Setup lights
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 3, 100);
scene.add(pointLight);

// Load textures
const textureLoader = new THREE.TextureLoader();

// Create the sun
const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Function to create planets
function createPlanet(size, texture, position, ring) {
    const geometry = new THREE.SphereGeometry(size, 25, 20);
    const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
    const planet = new THREE.Mesh(geometry, material);
    const planetObj = new THREE.Object3D();
    planetObj.add(planet);
    scene.add(planetObj);
    planet.position.x = position;

    // Add orbit line with color based on the planet
    const orbitGeometry = new THREE.CircleGeometry(position, 100);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: Math.random() * 0xffffff, opacity: 0.3 }); // Random color for each orbit
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = Math.PI / 2; // Align with the horizontal plane
    scene.add(orbitLine);

    // Check if `ring` is defined
    if (ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
        const ringMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetObj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }

    return { planet, planetObj };
}

// Load planets
const mercury = createPlanet(4, mercuryTexture, 20);
const venus = createPlanet(5, venusTexture, 40);
const earth = createPlanet(5.56, earthTexture, 60);
const mars = createPlanet(5, marsTexture, 80);
const jupiter = createPlanet(6, jupiterTexture, 100);
const saturn = createPlanet(8, saturnTexture, 150, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(8.2, uranusTexture, 200, {
    innerRadius: 10,
    outerRadius: 20,
    texture: uranusRingTexture
});
const neptune = createPlanet(5, neptuneTexture, 240);

// Fetch NEO data and add to the scene
async function fetchData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Please select both start and end dates.');
        return;
    }

    // Update the API URL with the selected date range
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        // Clear previous NEOs from the scene
        celestialBodies.forEach((body) => scene.remove(body));
        celestialBodies.length = 0; // Clear the array

        const neosData = data.near_earth_objects;
        for (const dateKey in neosData) {
            if (neosData.hasOwnProperty(dateKey)) {
                neosData[dateKey].forEach((neo, index) => {
                    const size = (neo.estimated_diameter.kilometers.estimated_diameter_min +
                        neo.estimated_diameter.kilometers.estimated_diameter_max) / 2*1.5;
                    const geometry = new THREE.SphereGeometry(size, 18, 10);
                    const material = new THREE.MeshBasicMaterial({ map: textureLoader.load(asteroidTexture) });
                    const neoSphere = new THREE.Mesh(geometry, material);

                    // Fetch the miss distance from the close approach data
                    const closeApproachData = neo.close_approach_data && neo.close_approach_data[0];
                    let distance = closeApproachData ? parseFloat(closeApproachData.miss_distance.kilometers) : 50; // Default to 50 if undefined

                    // Scale the distance for proper visualization in the 3D scene
                    const scalingFactor = 0.0001; // Adjust as needed for your scene
                    const minSceneDistance = 10;  // Minimum allowed distance in the 3D scene
                    const maxSceneDistance = 150; // Maximum allowed distance in the 3D scene
                    distance = distance * scalingFactor;
                    distance = Math.max(minSceneDistance, Math.min(maxSceneDistance, distance)); // Clamp distance

                    // Set the NEO's position based on the calculated distance
                    neoSphere.position.set(
                        Math.cos(index) * distance,
                        Math.sin(index) * distance,
                        (Math.random() - 0.5) * 10 // Random Z-depth for variation
                    );

                    // Store NEO data for interaction
                    neoSphere.userData = {
                        name: neo.name,
                        size: size,
                        distance: distance
                    };

                    // Add NEO to the scene and store in celestialBodies array
                    scene.add(neoSphere);
                    celestialBodies.push(neoSphere);
                });
            }
        }
    } catch (error) {
        console.error('Error fetching NEO data:', error);
    }
}

// Add event listener to the button
document.getElementById('fetchData').addEventListener('click', fetchData);

// Handle mouse movement
// Handle NEO clicks for zoom functionality
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(celestialBodies);

    if (intersects.length > 0) {
        const intersectedNeo = intersects[0].object;
        const directionToNeo = new THREE.Vector3().subVectors(intersectedNeo.position, camera.position).normalize();

        const zoomDistance = 20; // Adjust this for how close the zoom is
        const zoomedPosition = new THREE.Vector3().copy(intersectedNeo.position).sub(directionToNeo.multiplyScalar(zoomDistance));

        const duration = 1.5; // Duration in seconds
        const tween = new TWEEN.Tween(camera.position)
            .to({ x: zoomedPosition.x, y: zoomedPosition.y, z: zoomedPosition.z }, duration * 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                camera.lookAt(intersectedNeo.position); // Continuously update camera to look at the NEO
            })
            .start();

        controls.target.copy(intersectedNeo.position); // Update controls target
    }
}

// Display NEO details on hover
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(celestialBodies);

    const neoInfo = document.getElementById('neo-info');
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        // Check if the intersected object has user data (NEO info)
        if (intersectedObject.userData) {
            neoInfo.style.display = 'block';
            neoInfo.style.left = `${event.clientX + 10}px`;
            neoInfo.style.top = `${event.clientY + 10}px`;
            neoInfo.innerHTML = `NEO: ${intersectedObject.userData.name}<br>Date: ${intersectedObject.userData.approachDate}`;
        }
    } else {
        neoInfo.style.display = 'none';
    }
}

// Animate the scene with slow planet rotations
// Animate the scene with slow planet rotations
function animate() {
    controls.update(); // Update camera controls for smooth movement

    // Update TWEEN for smooth animations (like zoom)
    TWEEN.update();

    // Rotate planets and NEOs
    mercury.planet.rotation.y += 0.001;
    venus.planet.rotation.y += 0.001;
    earth.planet.rotation.y += 0.001;
    mars.planet.rotation.y += 0.001;
    jupiter.planet.rotation.y += 0.001;
    saturn.planet.rotation.y += 0.001;
    uranus.planet.rotation.y += 0.001;
    neptune.planet.rotation.y += 0.001;
    
    celestialBodies.forEach(neo => {
        neo.rotation.y += 0.001; // Slow rotation for NEOs
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate); // Continue the animation loop
}

// Fetch NEO data and start animation
fetchData();
animate();

// Event listeners for interaction
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);
