import * as THREE from 'three';
import { MindARThree } from '../vendor/mindar/mindar-face-three.prod.js?v=4';
import { setStatus, setupStartButton, stopTrackingWhenPageHidden } from './common.js?v=4';

const ANCHOR_INDEX = 168;      // Titik antara kedua mata
const HAT_SCALE = 1.65;
const HAT_OFFSET = { x: 0, y: 0.46, z: 0.0 };
const GLASSES_OFFSET = { x: 0, y: 0, z: 0.04 };
const GLASSES_SCALE = 1.9;

function buildHatAndGlasses() {
  const g = new THREE.Group();

  const hat = new THREE.Group();
  const hatMaterial = new THREE.MeshStandardMaterial({
    color: 0x1565c0,
    roughness: 0.55,
    metalness: 0.05
  });

  const hatBrim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.38, 0.035, 40),
    hatMaterial
  );
  hatBrim.position.y = 0;
  hatBrim.scale.set(1.25, 1, 0.72);

  const hatCrown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.33, 0.34, 40),
    hatMaterial
  );
  hatCrown.position.y = 0.19;
  hatCrown.scale.set(1.18, 1, 0.82);

  hat.add(hatBrim);
  hat.add(hatCrown);
  hat.scale.setScalar(HAT_SCALE);
  hat.position.set(HAT_OFFSET.x, HAT_OFFSET.y, HAT_OFFSET.z);
  g.add(hat);

  const glasses = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x151515,
    roughness: 0.3,
    metalness: 0.35
  });
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    metalness: 0.1
  });

  [-0.11, 0.11].forEach((x) => {
    const lens = new THREE.Mesh(
      new THREE.CircleGeometry(0.085, 32),
      lensMaterial
    );
    lens.position.set(x, 0, 0.008);
    glasses.add(lens);

    const frame = new THREE.Mesh(
      new THREE.TorusGeometry(0.085, 0.014, 8, 32),
      frameMaterial
    );
    frame.position.set(x, 0, 0.02);
    glasses.add(frame);
  });

  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.014, 0.014),
    frameMaterial
  );
  bridge.position.set(0, 0, 0.02);
  glasses.add(bridge);

  const leftArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.014, 0.014),
    frameMaterial
  );
  leftArm.position.set(-0.25, 0, 0);
  leftArm.rotation.z = -0.08;
  glasses.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 0.25;
  rightArm.rotation.z = 0.08;
  glasses.add(rightArm);

  glasses.position.set(GLASSES_OFFSET.x, GLASSES_OFFSET.y, GLASSES_OFFSET.z);
  glasses.scale.setScalar(GLASSES_SCALE);
  g.add(glasses);

  return g;
}

async function start() {
  const mindarThree = new MindARThree({ container: document.getElementById('container') });
  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(ANCHOR_INDEX);
  anchor.group.add(buildHatAndGlasses());

  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 1.4));
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(0, 1, 2);
  scene.add(dir);

  await mindarThree.start();
  stopTrackingWhenPageHidden(mindarThree, renderer);
  setStatus('Mencari wajah', 'searching');

  let hadFace = false;
  let lostCount = 0;
  renderer.setAnimationLoop(() => {
    const hasFace = mindarThree.getLatestEstimate() !== null;
    if (hasFace !== hadFace) {
      hadFace = hasFace;
      if (hasFace) {
        setStatus('Wajah terdeteksi', 'found');
      } else {
        lostCount++;
        setStatus('Wajah tidak terdeteksi - mencari wajah', 'searching');
      }
      document.getElementById('info').textContent = 'Wajah hilang ' + lostCount + ' kali.';
    }
    renderer.render(scene, camera);
  });
}

setupStartButton(start);
