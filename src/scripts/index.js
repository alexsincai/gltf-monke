import "the-new-css-reset/css/reset.css";
import "../styles/styles.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import monkey from "../models/monkey.gltf";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

let colors = ["bg", "text", "primary", "alt"]
    .map((c) => ({
        [c]: new THREE.Color(
            ...getComputedStyle(document.documentElement)
                .getPropertyValue(`--${c}`)
                .replace("#", "")
                .match(/../g)
                .map((n) => parseInt(n, 16) / 255)
        ),
    }))
    .reduce((a, v) => ({ ...a, ...v }), {});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const material = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
        dark: { value: new THREE.Vector3(...colors.bg) },
        light: { value: new THREE.Vector3(...colors.primary) },
        lightPosition: { value: camera.position },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
});

const loader = new GLTFLoader();
loader.load(monkey, (gltf) => {
    gltf.scene.children[0].material = material;
    gltf.scene.children[0].position.y -= 0.5;
    scene.add(gltf.scene.children[0]);
});

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();
