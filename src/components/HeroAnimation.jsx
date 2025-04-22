// src/components/HeroAnimation.jsx
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const HeroAnimation = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let scene, camera, renderer, particlesMesh, animationId;
    const particlesCount = 2000;
    
    // Initialize everything inside a function to better control timing
    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 20;
      
      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Clean DOM and append
      const container = document.getElementById('animation-container');
      if (!container) return;
      
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      container.appendChild(renderer.domElement);
      
      // Particle geometry
      const particlesGeometry = new THREE.BufferGeometry();
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      
      // Color palette
      const colors = [
        new THREE.Color('#172E7C'), // Primary blue
        new THREE.Color('#4E63BD'), // Lighter blue
        new THREE.Color('#7389F0'), // Even lighter blue
        new THREE.Color('#2D3F99'), // Medium blue
        new THREE.Color('#FFFFFF')  // White accent
      ];
      
      // Fill position and color arrays
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Position: random in a sphere
        const radius = 15 + Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = radius * Math.cos(phi);
        
        // Color
        const color = colors[Math.floor(Math.random() * colors.length)];
        colorArray[i3] = color.r;
        colorArray[i3 + 1] = color.g;
        colorArray[i3 + 2] = color.b;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      // Material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });
      
      // Create mesh and add to scene
      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Global mouse state
      const mouse = { x: 0, y: 0 };
      
      // Animation loop
      const animate = () => {
        // Rotation
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Wave effect
        const positions = particlesGeometry.attributes.position.array;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const y = positions[i3 + 1];
          const z = positions[i3 + 2];
          
          positions[i3] = x + Math.sin(time + x * 0.1) * 0.05;
          positions[i3 + 1] = y + Math.sin(time + y * 0.1) * 0.05;
          positions[i3 + 2] = z + Math.sin(time + z * 0.1) * 0.05;
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        
        // Mouse interaction
        particlesMesh.rotation.x += mouse.y * 0.001;
        particlesMesh.rotation.y += mouse.x * 0.001;
        
        // Render
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
      
      // Event listeners
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Track initialization
      setIsInitialized(true);
      
      // Return cleanup function for event listeners
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };
    
    // Initialize the scene
    const cleanupEvents = init();
    
    // Comprehensive cleanup
    return () => {
      // Cancel animation
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Clean event listeners
      if (cleanupEvents) {
        cleanupEvents();
      }
      
      // Dispose resources
      if (particlesMesh && particlesMesh.geometry) {
        particlesMesh.geometry.dispose();
      }
      
      if (particlesMesh && particlesMesh.material) {
        particlesMesh.material.dispose();
      }
      
      if (scene) {
        scene.clear();
      }
      
      if (renderer) {
        renderer.dispose();
        
        const container = document.getElementById('animation-container');
        if (container && container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);  // Empty dependency array - run once on mount

  return (
    <div className="relative w-full h-screen">
      {/* Container for Three.js animation */}
      <div 
        id="animation-container" 
        className="absolute inset-0 -z-10"
      />
      
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          Advanced Academic Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-12 text-gray-100"
        >
          Innovation • Research • Excellence
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white bg-opacity-20 backdrop-blur-md border-2 border-[#57e1ff] rounded-full text-white font-medium transition-all hover:bg-opacity-30 shadow-[0_0_15px_#57e1ff]"
        >
          Explore
        </motion.button>
      </div>
    </div>
  );
};

export default HeroAnimation;