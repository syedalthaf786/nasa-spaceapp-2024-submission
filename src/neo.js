// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let scene, camera, renderer, controls, raycaster, mouse;
// const celestialBodies = [];
// const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&detailed=false&api_key=5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz'; // Replace with your API key

// function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 150);

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById('3d-container').appendChild(renderer.domElement);

//     // Add lighting
//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);

//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(100, 100, 100);
//     scene.add(pointLight);

//     // Initialize Controls
//     controls = new OrbitControls(camera, renderer.domElement);

//     // Initialize raycaster and mouse
//     raycaster = new THREE.Raycaster();
//     mouse = new THREE.Vector2();

//     // Fetch and visualize NEOs
//     fetchNeoData();

//     // Set up event listeners
//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('resize', onWindowResize);

//     animate();
// }

// async function fetchNeoData() {
//   try {
//       const response = await fetch(apiUrl);
      
//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Log the API response to understand its structure
//       console.log('API response:', data);

//       // Ensure that `data.near_earth_objects` exists and has the expected date key
//       const dateKey = '2015-09-07';  // Adjust to your date
//       if (data.near_earth_objects && data.near_earth_objects[dateKey]) {
//           const neosData = data.near_earth_objects[dateKey];

//           if (Array.isArray(neosData)) {
//               neosData.forEach((neo, index) => {
//                   // Increase the size multiplier as needed
//                   const size = (neo.estimated_diameter.kilometers.estimated_diameter_min +
//                       neo.estimated_diameter.kilometers.estimated_diameter_max) / 2 * 30; // Multiplier for size

//                   const geometry = new THREE.SphereGeometry(size, 10, 29);
//                   const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
//                   const neoSphere = new THREE.Mesh(geometry, material);

//                   // Position NEOs randomly in the scene
//                   const distance = Math.random() * 30 + 10;
//                   neoSphere.position.x = Math.cos(index) * distance;
//                   neoSphere.position.y = Math.sin(index) * distance;
//                   neoSphere.position.z = (Math.random() - 0.5) * 50;

//                   // Store NEO name and closest approach date in the mesh
//                   neoSphere.neoData = {
//                       name: neo.name,
//                       approachDate: neo.close_approach_data[0].close_approach_date
//                   };

//                   celestialBodies.push(neoSphere);
//                   scene.add(neoSphere);
//               });
//           } else {
//               console.error('NEO data is not an array:', neosData);
//           }
//       } else {
//           console.error('No NEO data found for the specified date:', data.near_earth_objects);
//       }
//   } catch (error) {
//       console.error('Error fetching NEO data:', error);
//   }
// }

// function onMouseMove(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(celestialBodies);

//     if (intersects.length > 0) {
//         const intersectedObject = intersects[0].object;
//         const neoInfo = document.getElementById('neo-info');
//         neoInfo.style.display = 'block';
//         neoInfo.style.left = `${event.clientX + 10}px`;
//         neoInfo.style.top = `${event.clientY + 10}px`;

//         // Display NEO name and closest approach date in the tooltip
//         neoInfo.innerHTML = `NEO: ${intersectedObject.neoData.name}<br>Date: ${intersectedObject.neoData.approachDate}`;
//     } else {
//         document.getElementById('neo-info').style.display = 'none';
//     }
// }

// function animate() {
//     requestAnimationFrame(animate);

//     celestialBodies.forEach(body => {
//         body.rotation.y += 0.01;
//     });

//     renderer.render(scene, camera);
//     controls.update();
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// init();
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import asteroidTexture from './img/asteroid_texture.jpg';

let scene, camera, renderer, controls, raycaster, mouse;
const celestialBodies = [];
const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&detailed=false&api_key=5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz'; // Replace with your API key

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 150);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    // Initialize Controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Initialize raycaster and mouse
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Fetch and visualize NEOs
    fetchNeoData();

    // Set up event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
}

async function fetchNeoData() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Log the API response to understand its structure
        console.log('API response:', data);

        // Ensure that `data.near_earth_objects` exists and has the expected date key
        const dateKey = '2015-09-07';  // Adjust to your date
        if (data.near_earth_objects && data.near_earth_objects[dateKey]) {
            const neosData = data.near_earth_objects[dateKey];

            if (Array.isArray(neosData)) {
                const textureLoader = new THREE.TextureLoader();
                const texture = textureLoader.load(asteroidTexture);

                neosData.forEach((neo, index) => {
                    // Increase the size multiplier as needed
                    const size = (neo.estimated_diameter.kilometers.estimated_diameter_min +
                        neo.estimated_diameter.kilometers.estimated_diameter_max) / 2 * 30; // Multiplier for size

                    const geometry = new THREE.SphereGeometry(size, 10, 29);
                    const material = new THREE.MeshBasicMaterial({ map: texture });
                    const neoSphere = new THREE.Mesh(geometry, material);

                    // Position NEOs randomly in the scene
                    const distance = Math.random() * 30 + 10;
                    neoSphere.position.x = Math.cos(index) * distance;
                    neoSphere.position.y = Math.sin(index) * distance;
                    neoSphere.position.z = (Math.random() - 0.5) * 50;

                    // Store NEO name and closest approach date in the mesh
                    neoSphere.neoData = {
                        name: neo.name,
                        approachDate: neo.close_approach_data[0].close_approach_date
                    };

                    celestialBodies.push(neoSphere);
                    scene.add(neoSphere);
                });
            } else {
                console.error('NEO data is not an array:', neosData);
            }
        } else {
            console.error('No NEO data found for the specified date:', data.near_earth_objects);
        }
    } catch (error) {
        console.error('Error fetching NEO data:', error);
    }
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(celestialBodies);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const neoInfo = document.getElementById('neo-info');
        neoInfo.style.display = 'block';
        neoInfo.style.left = `${event.clientX + 10}px`;
        neoInfo.style.top = `${event.clientY + 10}px`;

        // Display NEO name and closest approach date in the tooltip
        neoInfo.innerHTML = `NEO: ${intersectedObject.neoData.name}<br>Date: ${intersectedObject.neoData.approachDate}`;
    } else {
        document.getElementById('neo-info').style.display = 'none';
    }
}

function animate() {
    requestAnimationFrame(animate);

    celestialBodies.forEach(body => {
        body.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
    controls.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
