import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Main3d = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use window dimensions if client bounds are temporarily 0 during layout reflow
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Setup Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505); // Dark monochrome background
    scene.fog = new THREE.FogExp2(0x050505, 0.007); // Fog to fade particles in distance

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 55, 120); // Tilt camera to view the grid at an angle
    camera.lookAt(0, 0, -20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Grid
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

    // Custom Canvas Texture for Glowing White Particles
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Solid white center
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)'); // Soft glow
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

    // 3. Raycaster & Plane for Mouse Tracking (Guarantees zero division-by-zero/NaN errors)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, -9999);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // y=0 plane
    const intersectPoint = new THREE.Vector3();
    let hasMouse = false;

    const onMouseMove = (event) => {
      // Calculate coordinates relative to window bounds directly (fixes esbuild/division-by-zero layout bugs)
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

    // 4. Animation Render Loop (Waving & Scattering Math)
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;
      const timeFactor = elapsedTime * 1.2;

      // Update raycaster with mouse coordinates to find intersection on plane y=0
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

        // 1. Base Waves
        let waveY = Math.sin(ox * 0.035 + timeFactor) * Math.cos(oz * 0.035 + timeFactor) * 10.0;
        waveY += Math.sin(ox * 0.08 - timeFactor * 0.5) * 3.0; // second wave layer

        let targetX = ox;
        let targetZ = oz;
        let targetY = waveY;

        // 2. Scattering Physics
        if (hasMouse && mouse.x !== -9999) {
          const dx = ox - intersectPoint.x;
          const dz = oz - intersectPoint.z;
          const dist = Math.sqrt(dx * dx + dz * dz);

          const forceRadius = 65; // Scattering area
          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius * 16.0;
            targetX = ox + (dx / dist) * force;
            targetZ = oz + (dz / dist) * force;
            targetY += (forceRadius - dist) * 0.25;
          }
        }

        // 3. Elastic dampening / spring-back interpolation
        posArray[i3] += (targetX - posArray[i3]) * 0.08;
        posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.08;
        posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * 0.08;
      }

      positionAttr.needsUpdate = true;

      // Slow camera rotation
      camera.position.x = Math.sin(elapsedTime * 0.05) * 20;
      camera.lookAt(0, 0, -20);

      renderer.render(scene, camera);
    };

    animate();

    // 5. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Cleanup
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