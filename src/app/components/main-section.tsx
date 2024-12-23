'use client'

import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import FlareCursor from "../components/flareCursor";
import {ArrowDown} from "lucide-react"


export default function MainSection() {

  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { currentTarget: any; clientX: number; clientY: number; }) => {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const offsetX = (e.clientX - cardRect.left) / cardRect.width - 0.5;
    const offsetY = (e.clientY - cardRect.top) / cardRect.height - 0.5;

    setTransform({
      x: offsetX * 3,  // Ajuste a intensidade do movimento horizontal
      y: offsetY * -5   // Ajuste a intensidade do movimento vertical
    });
  }

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
    <main className="transition-all scroll-smooth cursor-none flex-grow flex-col z-10" id='main'>
      <FlareCursor />
      <section className='h-screen gap-3 w-screen flex flex-col items-center justify-center text-center'>
      <div className='h-full w-full flex flex-col flex-grow items-center justify-center text-center'>
      <h1 className="text-9xl text-main font-bold tracking-widest font-yanone text-shadow-xxl">SORRIA COM CONFIANÇA</h1>
      <p className="mt-2 text-2xl text-gray-600">seu sorriso é nosso compromisso!</p>
      </div>
      <div>
      <a href='#sec2'>
        <button className='w-28 h-28 justify-center items-top py-3 hover:animate- flex border-2  hover:border-double hover:border-8 transition-all  text-center border-gray-900 rounded-full m-3'>
          <ArrowDown/>
        </button>
      </a>
      </div>
      </section>
      <section className=' grid grid-cols-2 w-screen h-screen ' id='sec2'>
        
          <div className=' flex flex-col items-center justify-center text-center'>
            <div className='w-11/12 h-[50rem] bg-slate-600/50 border shadow-xl
          border-slate-100 backdrop-blur-md rounded-3xl backdrop-blur-2'
            onMouseMove={handleMouseMove}
            style={{
              transform: `perspective(3000px) rotateX(${transform.y}deg) rotateY(${transform.x}deg)`
            }}>
                  
            </div>
          </div>

          <div className=' bg-neutral-950 flex flex-col items-center justify-center text-center'>
            qlifjwoehgif
          </div>

        
      </section>
      
    </main>
    
  );
}
