import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-black relative overflow-hidden">
      <!-- Animated background patterns -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1),transparent_50%)]"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.9),transparent_50%,rgba(0,0,0,0.9))]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3),transparent_70%)]"></div>
        
        <!-- Animated dots -->
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(0,255,136,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        
        <!-- Moving lines -->
        <div class="absolute inset-0 overflow-hidden">
          <div *ngFor="let i of [1,2,3,4,5]" 
               class="absolute h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-20"
               [ngStyle]="{
                 'top': (i * 20) + '%',
                 'left': '-100%',
                 'width': '200%',
                 'animation': 'moveLines ' + (10 + i) + 's linear infinite'
               }">
          </div>
        </div>
      </div>

      <!-- Content wrapper -->
      <div class="container mx-auto px-4 min-h-screen flex items-center relative z-10">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <!-- Text content -->
          <div class="space-y-8 relative">
            <!-- Animated text reveal -->
            <div class="overflow-hidden">
              <h2 class="text-[#00ff88] text-xl font-mono mb-2 transform translate-y-full opacity-0" #greeting>
                Hello, I'm
              </h2>
              <h1 class="text-white text-6xl md:text-7xl font-bold mb-4 transform translate-y-full opacity-0" #name>
                Hamza Meski
              </h1>
              <div class="flex items-center space-x-4 transform translate-y-full opacity-0" #title>
                <div class="h-[2px] w-12 bg-[#00ff88]"></div>
                <p class="text-[#00ff88] font-mono typewriter" #roleText></p>
              </div>
            </div>
            
            <p class="text-gray-400 text-lg leading-relaxed transform translate-y-full opacity-0" #description>
              Specializing in Java Spring Boot and Angular development. 
              Passionate about creating efficient and scalable solutions.
            </p>
            
            <div class="flex flex-wrap items-center gap-6 transform translate-y-full opacity-0" #buttons>
             
            </div>

            <!-- Social links -->
            <div class="flex items-center space-x-6 transform translate-y-full opacity-0" #social>
              <a href="https://github.com/HamzaMeski" target="_blank" 
                 class="text-gray-400 hover:text-[#00ff88] transition-colors duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/your-profile" target="_blank"
                 class="text-gray-400 hover:text-[#00ff88] transition-colors duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- 3D Canvas -->
          <div class="h-[600px] relative transform translate-x-full opacity-0" #canvas3D>
            <canvas #canvas class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes moveLines {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(50%); }
    }

    .typewriter {
      border-right: 2px solid #00ff88;
      padding-right: 5px;
      animation: blink 0.7s step-end infinite;
    }

    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: #00ff88; }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('greeting') private greeting!: ElementRef;
  @ViewChild('name') private name!: ElementRef;
  @ViewChild('title') private title!: ElementRef;
  @ViewChild('description') private description!: ElementRef;
  @ViewChild('buttons') private buttons!: ElementRef;
  @ViewChild('social') private social!: ElementRef;
  @ViewChild('canvas3D') private canvas3D!: ElementRef;
  @ViewChild('roleText') private roleText!: ElementRef;
  
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
      this.initAnimations();
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private initAnimations(): void {
    // Text reveal animations
    const timeline = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' }});
    
    timeline
      .to(this.greeting.nativeElement, { y: 0, opacity: 1 })
      .to(this.name.nativeElement, { y: 0, opacity: 1 }, '-=0.6')
      .to(this.title.nativeElement, { y: 0, opacity: 1 }, '-=0.6')
      .to(this.description.nativeElement, { y: 0, opacity: 1 }, '-=0.4')
      .to(this.buttons.nativeElement, { y: 0, opacity: 1 }, '-=0.4')
      .to(this.social.nativeElement, { y: 0, opacity: 1 }, '-=0.4')
      .to(this.canvas3D.nativeElement, { x: 0, opacity: 1, duration: 1 }, '-=0.8');

    // Typewriter effect
    const roles = ['Full Stack Developer', 'Java Spring Expert', 'Angular Developer'];
    let currentRole = 0;

    const typeRole = () => {
      gsap.to(this.roleText.nativeElement, {
        duration: 1,
        text: roles[currentRole],
        ease: 'none',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(this.roleText.nativeElement, {
              duration: 0.5,
              text: '',
              ease: 'none',
              onComplete: () => {
                currentRole = (currentRole + 1) % roles.length;
                typeRole();
              }
            });
          }, 2000);
        }
      });
    };

    typeRole();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    
    // Camera setup with improved perspective
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.camera.position.y = 0.5;

    // Renderer setup with better quality
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.3);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff88, 2);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00ff88, 1);
    pointLight2.position.set(-5, -5, 2);
    this.scene.add(pointLight2);
  }

  private createSphere(): void {
    // Create main sphere with more complex geometry
    const geometry = new THREE.IcosahedronGeometry(1.5, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x00ff88,
      emissiveIntensity: 0.5,
      shininess: 90,
      wireframe: true
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // Create multiple outer glow spheres for better effect
    const createGlowSphere = (size: number, opacity: number, speed: number) => {
      const glowGeometry = new THREE.IcosahedronGeometry(size, 2);
      const glowMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: opacity,
        wireframe: true
      });

      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      this.scene.add(glowSphere);

      // Rotation animation
      gsap.to(glowSphere.rotation, {
        y: Math.PI * 2,
        duration: speed,
        repeat: -1,
        ease: "none"
      });

      // Floating animation
      gsap.to(glowSphere.position, {
        y: 0.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });

      return glowSphere;
    };

    // Create multiple glow spheres
    createGlowSphere(1.6, 0.1, 12);
    createGlowSphere(1.7, 0.05, 15);
    createGlowSphere(1.8, 0.02, 18);

    // Main sphere animations
    gsap.to(this.sphere.rotation, {
      y: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    gsap.to(this.sphere.rotation, {
      x: Math.PI * 2,
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    gsap.to(this.sphere.position, {
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
    
    // Add subtle camera movement
    this.camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
    this.camera.position.y = Math.cos(Date.now() * 0.0005) * 0.5;
    this.camera.lookAt(this.scene.position);
    
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