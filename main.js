import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import bg from "./images/bg.jpg";
import cactus from "./images/cactus.png";
import jupiter from "./images/jupiter.jpg";
import normal from "./images/normal.jpg";
// import psykinetic from "./images/psykinetic.png";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const camera2 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
camera2.position.setZ(30);
camera2.position.setX(-3);

renderer.render(scene, camera2);

// Torus

const geometry = new THREE.TorusGeometry(10, 1.5, 3, 14);
const material = new THREE.MeshStandardMaterial({
  color: 0x0adaff,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(pointLight, ambientLight);

// Helpers

// const camHelper = new THREE.CameraHelper(camera);
// scene.add(camHelper);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const lightHelper2 = new THREE.PointLightHelper(ambientLight);
scene.add(lightHelper2);

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

function addStar() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let randomColorId = getRandomInt(4);
  console.log(randomColorId);
  let colorVar = 0xffffff;
  switch (randomColorId) {
    case 0:
      colorVar = 0x07ff77;
      break;
    case 1:
      colorVar = 0x8ff2ff;
      break;
    case 2:
      colorVar = 0xc1ffb1;
      break;
    case 3:
      colorVar = 0xffffff;
      break;
  }
  console.log(colorVar);
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: colorVar });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load(bg);
scene.background = spaceTexture;

// Avatar

const logoTexture = new THREE.TextureLoader().load(cactus);

const logobox = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ map: logoTexture })
);

scene.add(logobox);

// Moon

const moonTexture = new THREE.TextureLoader().load(jupiter);
const normalTexture = new THREE.TextureLoader().load(normal);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const moonRing = new THREE.Mesh(
  new THREE.TorusGeometry(4, 0.6, 2, 100),
  new THREE.MeshStandardMaterial({ color: 0xff7b00, wireframe: true })
);

scene.add(moonRing);

// Extra

//

moon.position.z = 30;
moon.position.setX(-10);

moonRing.position.z = 30;
moonRing.position.setX(-10);
moonRing.rotateX(1.2);

logobox.position.z = -5;
logobox.position.x = 4;

torus.position.z = -5;
torus.position.x = 4;

ambientLight.position.y = 10;

pointLight.position.set(-10, 5, 0);

// DEBUG:

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  logobox.rotation.y += 0.01;
  logobox.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

// const controls = new OrbitControls(camera2, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
