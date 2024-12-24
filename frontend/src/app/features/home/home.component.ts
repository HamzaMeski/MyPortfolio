import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { CodeDisplayService } from '../../core/services/code-display.service';
import { screenVertexShader, screenFragmentShader } from '../../core/shaders/screen.glsl';

interface KeyData {
  initialY: number;
  animationOffset: number;
}

interface KeyMesh extends THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial> {
  userData: KeyData;
}

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
      <div class="container mx-auto px-4 z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Left side: Text content -->
          <div class="lg:w-1/3 space-y-12" #content>
            <!-- Glowing text effect -->
            <div class="relative space-y-4">
              <div class="inline-block">
                <span class="text-sm font-mono text-[#4DFFB5] tracking-wider">WELCOME TO MY PORTFOLIO</span>
                <div class="h-0.5 w-full bg-gradient-to-r from-[#4DFFB5] to-transparent mt-1"></div>
              </div>
              <h1 class="text-6xl font-bold text-white leading-tight neon-text">
                Hi, I'm <span class="text-[#4DFFB5]">Hamza</span>
              </h1>
              <div class="text-2xl text-[#4DFFB5] font-mono typing-text">
                Full Stack Developer
              </div>
            </div>

            <!-- Description -->
            <div class="space-y-6">
              <p class="text-lg text-gray-300 leading-relaxed">
                Passionate about crafting robust and scalable applications using
                <span class="text-[#4DFFB5]">Java Spring Boot</span> and 
                <span class="text-[#4DFFB5]">Angular</span>. Currently studying at
                <span class="text-[#4DFFB5]">YouCode</span>, turning innovative ideas
                into elegant solutions.
              </p>
              <div class="flex gap-6 items-center">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[#4DFFB5] animate-pulse"></div>
                  <span class="text-gray-400">Available for opportunities</span>
                </div>
                <div class="h-4 w-px bg-gray-700"></div>
                <div class="text-gray-400">Based in Morocco</div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex gap-4">
              <button class="group px-6 py-3 bg-[#4DFFB5]/10 border border-[#4DFFB5] rounded-lg 
                           hover:bg-[#4DFFB5]/20 transition-all duration-300 relative overflow-hidden">
                <span class="relative z-10 text-[#4DFFB5] group-hover:text-white transition-colors">
                  View Projects
                </span>
                <div class="absolute inset-0 bg-[#4DFFB5] transform translate-y-full 
                           group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <button class="group px-6 py-3 bg-[#2D9CDB]/10 border border-[#2D9CDB] rounded-lg 
                           hover:bg-[#2D9CDB]/20 transition-all duration-300 relative overflow-hidden">
                <span class="relative z-10 text-[#2D9CDB] group-hover:text-white transition-colors">
                  Contact Me
                </span>
                <div class="absolute inset-0 bg-[#2D9CDB] transform translate-y-full 
                           group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>

            <!-- Tech stack -->
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-[#4DFFB5] font-mono">Tech Stack</h3>
              <div class="grid grid-cols-4 gap-4">
                <div class="tech-icon">
                  <i class="fab fa-java text-2xl text-[#4DFFB5]"></i>
                  <span class="text-sm text-gray-400">Java</span>
                </div>
                <div class="tech-icon">
                  <i class="fab fa-angular text-2xl text-[#4DFFB5]"></i>
                  <span class="text-sm text-gray-400">Angular</span>
                </div>
                <div class="tech-icon">
                  <i class="fas fa-leaf text-2xl text-[#4DFFB5]"></i>
                  <span class="text-sm text-gray-400">Spring</span>
                </div>
                <div class="tech-icon">
                  <i class="fab fa-docker text-2xl text-[#4DFFB5]"></i>
                  <span class="text-sm text-gray-400">Docker</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side: 3D Computer -->
          <div class="lg:w-2/3">
            <div class="relative h-[800px] w-full">
              <canvas #canvas class="absolute inset-0 w-full h-full cursor-move"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .neon-text {
      text-shadow: 0 0 10px rgba(77, 255, 181, 0.3),
                   0 0 20px rgba(77, 255, 181, 0.2),
                   0 0 30px rgba(77, 255, 181, 0.1);
    }

    .tech-icon {
      @apply flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 
             hover:bg-white/10 transition-all duration-300 cursor-pointer;
    }

    .matrix-effect {
      background: linear-gradient(180deg, 
        transparent 0%,
        rgba(77, 255, 181, 0.1) 50%,
        transparent 100%
      );
      animation: matrix-rain 20s linear infinite;
    }

    @keyframes matrix-rain {
      0% { transform: translateY(0); }
      100% { transform: translateY(1000px); }
    }

    .typing-text {
      overflow: hidden;
      border-right: 2px solid #4DFFB5;
      white-space: nowrap;
      animation: typing 3.5s steps(30, end),
                blink-caret .75s step-end infinite;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: #4DFFB5 }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private computer!: THREE.Group;
  private screenMaterial!: THREE.MeshBasicMaterial;
  private animationFrameId!: number;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isBrowser: boolean;

  constructor(private codeService: CodeDisplayService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Register GSAP plugins
      gsap.registerPlugin();
      
      // Initialize Three.js scene
      this.initScene();
      this.screenMaterial = this.createScreenMaterial();
      this.createComputer();
      this.setupMouseListeners();
      this.animate();

      // Add animations
      gsap.from(this.content.nativeElement.children, {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.canvas?.nativeElement) {
        this.canvas.nativeElement.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.nativeElement.removeEventListener('mouseleave', this.handleMouseLeave);
      }
    }
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  private handleMouseLeave = () => {
    this.mouseX = 0;
    this.mouseY = 0;
  };

  private setupMouseListeners(): void {
    if (this.canvas?.nativeElement) {
      this.canvas.nativeElement.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.nativeElement.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    
    const aspect = this.isBrowser ? window.innerWidth / window.innerHeight : 16 / 9;
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 14);
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
      alpha: true
    });

    if (this.canvas?.nativeElement?.parentElement) {
      const container = this.canvas.nativeElement.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(this.isBrowser ? window.devicePixelRatio : 1);
    }

    if (this.isBrowser) {
      window.addEventListener('resize', this.handleResize);
    }
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    const keyLight = new THREE.DirectionalLight(0x4DFFB5, 1.2);
    const fillLight = new THREE.DirectionalLight(0x2D9CDB, 0.8);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    
    keyLight.position.set(8, 8, 8);
    fillLight.position.set(-8, 8, 8);
    backLight.position.set(0, -8, -8);
    
    this.scene.add(ambientLight, keyLight, fillLight, backLight);
  }

  private handleResize = (): void => {
    if (this.canvas?.nativeElement?.parentElement) {
      const container = this.canvas.nativeElement.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(width, height);
    }
  };

  private createScreenMaterial(): THREE.MeshBasicMaterial {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 2048;  
    canvas.height = 1024; 

    if (context) {
      // Set background
      context.fillStyle = '#1E1E1E';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Configure text settings
      context.font = 'bold 40px Consolas, monospace';
      context.fillStyle = '#4DFFB5';
      
      // Add file info bar
      context.fillStyle = '#2D2D2D';
      context.fillRect(0, 0, canvas.width, 60);
      
      context.fillStyle = '#4DFFB5';
      context.font = '32px Consolas, monospace';
      context.fillText('🗂 src/main/java/com/portfolio/demo/HomeController.java', 20, 40);

      // Main content
      const lines = [
        '@RestController',
        '@RequestMapping("/api")',
        'public class HomeController {',
        '    private final ProjectService projectService;',
        '',
        '    @Autowired',
        '    public HomeController(ProjectService projectService) {',
        '        this.projectService = projectService;',
        '    }',
        '',
        '    @GetMapping("/projects")',
        '    public ResponseEntity<List<Project>> getAllProjects() {',
        '        return ResponseEntity.ok(projectService.findAll());',
        '    }',
        '',
        '    @GetMapping("/skills")',
        '    public ResponseEntity<List<Skill>> getSkills() {',
        '        return ResponseEntity.ok(skillService.findAll());',
        '    }',
        '}'
      ];

      context.font = '36px Consolas, monospace';
      let y = 100;
      const lineHeight = 45;

      // Add line numbers
      context.fillStyle = '#666666';
      for (let i = 0; i < lines.length; i++) {
        context.fillText(String(i + 1).padStart(2, ' '), 20, y + i * lineHeight);
      }

      // Add code with syntax highlighting
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let x = 80;

        // Syntax highlighting
        const words = line.split(' ');
        words.forEach(word => {
          if (word.startsWith('@')) {
            context.fillStyle = '#C586C0'; // Purple for annotations
          } else if (['public', 'private', 'class', 'final'].includes(word)) {
            context.fillStyle = '#569CD6'; // Blue for keywords
          } else if (word.includes('Controller') || word.includes('Service')) {
            context.fillStyle = '#4EC9B0'; // Teal for class names
          } else if (word.includes('(') || word.includes(')')) {
            context.fillStyle = '#D4D4D4'; // White for parentheses
          } else if (word.includes('<') || word.includes('>')) {
            context.fillStyle = '#D4D4D4'; // White for generics
          } else {
            context.fillStyle = '#9CDCFE'; // Light blue for other text
          }
          
          context.fillText(word, x, y + i * lineHeight);
          x += context.measureText(word + ' ').width;
        });
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide
    });
  }

  private createComputer(): void {
    this.computer = new THREE.Group();

    // Monitor frame - increased width
    const monitorGeometry = new THREE.BoxGeometry(14, 6, 0.4);
    const monitorMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100,
      specular: 0x666666
    });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);

    // Screen
    const screenGeometry = new THREE.PlaneGeometry(13.5, 5.5);
    const screen = new THREE.Mesh(screenGeometry, this.screenMaterial);
    screen.position.z = 0.21;

    // Back panel
    const backPanelGeometry = new THREE.PlaneGeometry(14, 6);
    const backPanelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x222222,
      shininess: 50,
      specular: 0x444444
    });
    const backPanel = new THREE.Mesh(backPanelGeometry, backPanelMaterial);
    backPanel.position.z = -0.21;

    // Monitor edges
    const edgeThickness = 0.4;
    const edgeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x222222,
      shininess: 80,
      specular: 0x555555
    });

    // Top edge
    const topEdgeGeometry = new THREE.BoxGeometry(14, edgeThickness, edgeThickness);
    const topEdge = new THREE.Mesh(topEdgeGeometry, edgeMaterial);
    topEdge.position.y = 3;

    // Bottom edge
    const bottomEdgeGeometry = new THREE.BoxGeometry(14, edgeThickness, edgeThickness);
    const bottomEdge = new THREE.Mesh(bottomEdgeGeometry, edgeMaterial);
    bottomEdge.position.y = -3;

    // Stand assembly
    const standGroup = new THREE.Group();

    // Stand base
    const baseGeometry = new THREE.CylinderGeometry(1.4, 1.6, 0.2, 32);
    const base = new THREE.Mesh(baseGeometry, monitorMaterial);
    base.position.y = -4.5;
    base.position.z = -1;

    // Stand pole
    const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 16);
    const pole = new THREE.Mesh(poleGeometry, monitorMaterial);
    pole.position.y = -3;
    pole.position.z = -0.5;

    // Stand connector
    const connectorGeometry = new THREE.BoxGeometry(3, 1, 0.4);
    const connector = new THREE.Mesh(connectorGeometry, monitorMaterial);
    connector.position.y = -1.5;
    connector.position.z = -0.3;

    standGroup.add(base, pole, connector);

    // Mechanical Keyboard
    const keyboardGroup = this.createMechanicalKeyboard();
    keyboardGroup.scale.set(3, 2.5, 2.5);
    keyboardGroup.position.y = -4.5;
    keyboardGroup.position.z = 2;
    keyboardGroup.rotation.x = -0.2;

    // Add all components
    const monitorGroup = new THREE.Group();
    monitorGroup.add(monitor, screen, backPanel, topEdge, bottomEdge);
    
    this.computer.add(monitorGroup, standGroup, keyboardGroup);
    this.scene.add(this.computer);

    // Initial position adjustments
    this.computer.position.y = 1;
  }

  private createMechanicalKeyboard(): THREE.Group {
    const keyboard = new THREE.Group();
    const keySpacing = 0.12;
    const keySize = 0.1;
    const rows = 6;
    const keysPerRow = 15;

    const keyGeometry = new THREE.BoxGeometry(keySize, keySize, keySize * 0.5);
    const keyMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      shininess: 100,
      specular: 0x666666
    });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < keysPerRow; col++) {
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.x = (col - keysPerRow / 2) * keySpacing;
        key.position.y = (row - rows / 2) * keySpacing;
        keyboard.add(key);
      }
    }

    // Add keyboard base
    const baseGeometry = new THREE.BoxGeometry(2, 0.8, 0.1);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 50,
      specular: 0x444444
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.z = -0.1;
    keyboard.add(base);

    return keyboard;
  }

  private updateScreenCode() {
    // No need to update screen code as it's now handled by createScreenMaterial
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    
    if (this.computer) {
      // Update computer rotation based on mouse position
      const targetRotationX = (this.mouseY - window.innerHeight / 2) * 0.001;
      const targetRotationY = (this.mouseX - window.innerWidth / 2) * 0.001;
      
      this.computer.rotation.x += (targetRotationX - this.computer.rotation.x) * 0.05;
      this.computer.rotation.y += (targetRotationY - this.computer.rotation.y) * 0.05;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}