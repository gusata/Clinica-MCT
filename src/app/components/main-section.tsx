'use client'

import * as THREE from 'three'
import { useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default function MainSection() {

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';

    document.body.appendChild(renderer.domElement);

    // Adiciona luz à cena
    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(0, 3, 10);
    scene.add(light);

    const loader = new GLTFLoader();
    let model: THREE.Object3D<THREE.Object3DEventMap>;


    // Carrega o modelo 3D
    loader.load('tooth2.glb', (gltf: { scene: any; }) => {
      model = gltf.scene;

  // Itera pelos filhos do modelo para alterar o material
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshToonMaterial({
        color: 0xffffff, // Cor branca
      });
    }
  });
      scene.add(model);
    });

    // Controle do movimento do cursor
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: { clientX: number; clientY: number; }) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.x += (mouse.y - model.rotation.x) * 0.1;
        model.rotation.y += (mouse.x - model.rotation.y) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.remove();
    };
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-6 z-10">
      <h1 className="text-9xl text-main font-bold tracking-widest font-yanone text-shadow-xxl">SORRIA COM CONFIANÇA</h1>
      <p className="mt-2 text-2xl text-gray-600">seu sorriso é nosso compromisso!</p>
      <div className="mt-6">
        <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 hover:bg-gray-100">
          <span className="text-xl">↓</span>
        </button>
      </div>
    </main>
  );
}
