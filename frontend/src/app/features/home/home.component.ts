import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-[#0B1221] flex items-center relative overflow-hidden">
      <!-- Animated gradient background -->
      <div class="absolute inset-0 bg-gradient-radial from-[#0B1221] via-[#0B1221] to-[#090909] z-0"></div>
      
      <!-- Animated lines effect -->
      <div class="absolute inset-0 opacity-20">
        <div class="matrix-effect"></div>
      </div>

      <!-- Main content -->
      <div class="container mx-auto px-8 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left side: Text content -->
          <div class="space-y-8" #content>
            <!-- Glowing text effect -->
            <div class="relative">
              <h1 class="text-6xl font-bold mb-2 text-white leading-tight neon-text">
                Hamza Meski
                <span class="block text-2xl font-normal text-[#4DFFB5] mt-4 typing-effect">
                  Software Developer
                </span>
              </h1>
              <!-- Decorative line -->
              <div class="h-1 w-24 bg-gradient-to-r from-[#4DFFB5] to-transparent mt-4"></div>
            </div>
            
            <div class="space-y-6">
              <p class="text-xl leading-relaxed text-gray-300">
                Student at YOUCODE, specializing in Java-SpringBoot and Angular development.
                Passionate about creating efficient and scalable solutions.
              </p>
              
              <!-- Animated buttons -->
              <div class="flex flex-wrap gap-4">
                <a href="#projects" 
                   class="group relative inline-flex items-center px-8 py-3 bg-transparent overflow-hidden">
                  <span class="absolute inset-0 bg-[#4DFFB5]/10 rounded-lg"></span>
                  <span class="absolute inset-0 rounded-lg border border-[#4DFFB5] group-hover:scale-105 transition-transform duration-300"></span>
                  <span class="relative text-[#4DFFB5] group-hover:text-white transition-colors z-10">
                    View Projects
                    <i class="fas fa-arrow-right ml-2"></i>
                  </span>
                </a>
                <a href="#skills" 
                   class="group relative inline-flex items-center px-8 py-3 overflow-hidden">
                  <span class="absolute inset-0 bg-gradient-to-r from-[#4DFFB5] to-[#2D9CDB] opacity-75 rounded-lg"></span>
                  <span class="relative text-white z-10">
                    Explore Skills
                    <i class="fas fa-code ml-2"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <!-- Right side: 3D Computer -->
          <div class="relative h-[600px]">
            <canvas #canvas class="absolute inset-0 w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .neon-text {
      text-shadow: 0 0 10px rgba(77, 255, 181, 0.5),
                   0 0 20px rgba(77, 255, 181, 0.3),
                   0 0 30px rgba(77, 255, 181, 0.2);
    }

    .matrix-effect {
      background: linear-gradient(180deg, 
        transparent 0%,
        rgba(77, 255, 181, 0.05) 50%,
        transparent 100%
      );
      background-size: 100% 4px;
      animation: matrix 20s linear infinite;
    }

    @keyframes matrix {
      0% { transform: translateY(0); }
      100% { transform: translateY(1000px); }
    }

    .typing-effect {
      border-right: 2px solid #4DFFB5;
      animation: typing 3.5s steps(40, end),
                blink-caret .75s step-end infinite;
      white-space: nowrap;
      overflow: hidden;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: #4DFFB5; }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private computer!: THREE.Group;
  private animationFrameId!: number;

  ngAfterViewInit() {
    // Initialize text animations
    gsap.from(this.content.nativeElement.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    });

    // Initialize 3D scene
    this.initScene();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initScene() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth / 2, 600);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0x4DFFB5, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(ambientLight, directionalLight);

    // Create computer model (simplified for example)
    this.createComputer();

    // Position camera
    this.camera.position.z = 5;
  }

  private createComputer() {
    // Create a simple computer model
    const computerGroup = new THREE.Group();

    // Monitor
    const monitor = new THREE.Mesh(
      new THREE.BoxGeometry(3, 2, 0.2),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );

    // Screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 1.8),
      new THREE.MeshPhongMaterial({ 
        color: 0x4DFFB5,
        emissive: 0x4DFFB5,
        emissiveIntensity: 0.5
      })
    );
    screen.position.z = 0.11;

    // Stand
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.3, 1),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    stand.position.y = -1.5;

    computerGroup.add(monitor, screen, stand);
    this.computer = computerGroup;
    this.scene.add(computerGroup);
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.computer) {
      this.computer.rotation.y += 0.005;
      // Add subtle floating motion
      this.computer.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  }
}