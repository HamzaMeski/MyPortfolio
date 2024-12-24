import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black relative overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-black via-[#001a0d] to-black opacity-50"></div>
      
      <!-- Content wrapper -->
      <div class="container mx-auto px-4 min-h-screen flex items-center relative z-10">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <!-- Text content -->
          <div class="space-y-8">
            <div>
              <h2 class="text-[#00ff88] text-xl font-mono mb-2">Hello, I'm</h2>
              <h1 class="text-white text-6xl font-bold mb-4">Hamza Meski</h1>
              <div class="flex items-center space-x-4">
                <div class="h-[2px] w-12 bg-[#00ff88]"></div>
                <p class="text-[#00ff88] font-mono">Full Stack Developer</p>
              </div>
            </div>
            
            <p class="text-gray-400 text-lg leading-relaxed">
              Specializing in Java Spring Boot and Angular development. 
              Passionate about creating efficient and scalable solutions.
            </p>
            
            <div class="flex items-center space-x-6">
              <button class="px-6 py-3 bg-[#00ff88] text-black font-semibold rounded-none 
                           hover:bg-[#00cc6a] transition-colors duration-300">
                View Projects
              </button>
              <button class="px-6 py-3 border-2 border-[#00ff88] text-[#00ff88] font-semibold rounded-none 
                           hover:bg-[#00ff88] hover:text-black transition-colors duration-300">
                Contact Me
              </button>
            </div>
          </div>
          
          <!-- 3D Canvas -->
          <div class="h-[600px] relative">
            <canvas #canvas class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationFrameId!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScene();
      this.createSphere();
      this.animate();
      this.handleResize();
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff88, 2);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }

  private createSphere(): void {
    // Create main sphere
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x00ff88,
      emissiveIntensity: 0.5,
      shininess: 90,
      wireframe: true
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // Create outer glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    const glowMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });

    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(glowSphere);

    // Animations
    gsap.to(this.sphere.rotation, {
      y: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    gsap.to(glowSphere.rotation, {
      y: Math.PI * 2,
      duration: 12,
      repeat: -1,
      ease: "none"
    });

    gsap.to([this.sphere.position, glowSphere.position], {
      y: 0.2,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }

  private handleResize(): void {
    if (this.canvasRef?.nativeElement) {
      const width = this.canvasRef.nativeElement.clientWidth;
      const height = this.canvasRef.nativeElement.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize.bind(this));
      cancelAnimationFrame(this.animationFrameId);
      this.renderer.dispose();
    }
  }
}