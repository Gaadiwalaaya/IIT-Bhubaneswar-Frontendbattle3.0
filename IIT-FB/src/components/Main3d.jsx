import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Main3d = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.007);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 55, 120);
    camera.lookAt(0, 0, -20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const cols = 50;
    const rows = 50;
    const spacing = 6.0;
    const particleCount = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const i = (x * rows + z) * 3;
        const posX = (x - cols / 2) * spacing;
        const posZ = (z - rows / 2) * spacing - 40;

        positions[i] = posX;
        positions[i + 1] = 0;
        positions[i + 2] = posZ;

        originalPositions[i] = posX;
        originalPositions[i + 1] = 0;
        originalPositions[i + 2] = posZ;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectPoint = new THREE.Vector3();
    let hasMouse = false;

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      hasMouse = true;
    };

    const onMouseLeave = () => {
      mouse.set(-9999, -9999);
      hasMouse = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const timeFactor = elapsedTime * 1.2;

      if (hasMouse && mouse.x !== -9999) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersectPoint);
      }

      const positionAttr = geometry.attributes.position;
      const posArray = positionAttr.array;
      const origArray = originalPositions;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = origArray[i3];
        const oz = origArray[i3 + 2];

        let waveY = Math.sin(ox * 0.035 + timeFactor) * Math.cos(oz * 0.035 + timeFactor) * 10.0;
        waveY += Math.sin(ox * 0.08 - timeFactor * 0.5) * 3.0;

        let targetX = ox;
        let targetZ = oz;
        let targetY = waveY;

        if (hasMouse && mouse.x !== -9999) {
          const dx = ox - intersectPoint.x;
          const dz = oz - intersectPoint.z;
          const dist = Math.sqrt(dx * dx + dz * dz);

          const forceRadius = 65;
          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius * 16.0;
            targetX = ox + (dx / dist) * force;
            targetZ = oz + (dz / dist) * force;
            targetY += (forceRadius - dist) * 0.25;
          }
        }

        posArray[i3] += (targetX - posArray[i3]) * 0.08;
        posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.08;
        posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * 0.08;
      }

      positionAttr.needsUpdate = true;

      camera.position.x = Math.sin(elapsedTime * 0.05) * 20;
      camera.lookAt(0, 0, -20);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="three-canvas-container" ref={containerRef} />;
};

export default Main3d;