import "the-new-css-reset/css/reset.css";
import "./styles.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Demo {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.doSetup();
        this.addGeometry();
    }

    doSetup() {
        this.camera.position.z = 3;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        window.addEventListener("resize", () => this.onWindowResize(), false);
    }

    onWindowResize() {
        console.log(this);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }

    addGeometry() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        });
        const cube = new THREE.Mesh(geometry, material);

        this.scene.add(cube);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const cube = this.scene.children[0];

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

const demo = new Demo();
demo.animate();
