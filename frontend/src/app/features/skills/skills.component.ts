import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faJava, faJs, faPhp, faHtml5, faCss3Alt, 
  faAngular, faGithub, faDocker, faLinux, faWindows,
  faNode, faGit 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faCode, faTools, faLaptopCode, 
  faServer, faTerminal, faCog 
} from '@fortawesome/free-solid-svg-icons';

interface Skill {
  name: string;
  icon: any;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  template: `
    <section class="min-h-screen bg-black py-20 relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-radial from-[#001a0d] via-black to-black opacity-50"></div>
        <!-- Animated Background Dots -->
        <div class="absolute inset-0" style="background-image: radial-gradient(#00ff88 1px, transparent 1px); background-size: 50px 50px; opacity: 0.1;"></div>
      </div>

      <!-- Section Title -->
      <div class="text-center mb-20 relative z-10">
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Technical Skills
        </h2>
        <div class="w-32 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto"></div>
      </div>

      <!-- Skills Network -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="skills-network min-h-[800px] md:min-h-[900px] relative">
          <!-- Center Circle - Main Skills -->
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div class="skill-circle group main-circle">
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#00ff88] 
                          flex items-center justify-center bg-black/50 backdrop-blur-lg
                          transform transition-all duration-500
                          shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                <span class="text-[#00ff88] text-xl md:text-2xl font-bold tracking-wider">SKILLS</span>
              </div>
            </div>
          </div>

          <!-- Frameworks Circle Group -->
          <div class="absolute left-1/2 top-0 md:top-[15%] -translate-x-1/2 w-full md:w-auto">
            <h3 class="text-xl md:text-2xl text-[#00ff88] text-center font-mono mb-4 md:mb-6 tracking-wide">Frameworks</h3>
            <div class="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 justify-center">
              <ng-container *ngFor="let skill of getSkillsByCategory('Frameworks'); trackBy: trackSkill">
                <div class="skill-circle group relative">
                  <div class="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#00ff88]/50 
                              flex items-center justify-center bg-black/50 backdrop-blur-lg
                              transform transition-all duration-300 group-hover:scale-110
                              group-hover:border-[#00ff88] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                    <fa-icon [icon]="skill.icon" [style.color]="skill.color" 
                            class="text-xl md:text-3xl transform transition-all duration-300 group-hover:scale-110">
                    </fa-icon>
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-gray-300 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">{{ skill.name }}</span>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- Languages Circle Group -->
          <div class="absolute left-0 md:left-[10%] top-1/3 md:top-1/2 -translate-y-1/2 w-full md:w-auto px-4 md:px-0">
            <h3 class="text-xl md:text-2xl text-[#00ff88] text-center font-mono mb-4 md:mb-6 tracking-wide">Languages</h3>
            <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <ng-container *ngFor="let skill of getSkillsByCategory('Languages'); trackBy: trackSkill">
                <div class="skill-circle group">
                  <div class="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#00ff88]/50 
                              flex items-center justify-center bg-black/50 backdrop-blur-lg
                              transform transition-all duration-300 group-hover:scale-110
                              group-hover:border-[#00ff88] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                    <fa-icon [icon]="skill.icon" [style.color]="skill.color" 
                            class="text-xl md:text-3xl transform transition-all duration-300 group-hover:scale-110">
                    </fa-icon>
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-gray-300 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">{{ skill.name }}</span>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- Databases Circle Group -->
          <div class="absolute right-0 md:right-[10%] top-2/3 md:top-1/2 -translate-y-1/2 w-full md:w-auto px-4 md:px-0">
            <h3 class="text-xl md:text-2xl text-[#00ff88] text-center font-mono mb-4 md:mb-6 tracking-wide">Databases</h3>
            <div class="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 justify-center">
              <ng-container *ngFor="let skill of getSkillsByCategory('Databases'); trackBy: trackSkill">
                <div class="skill-circle group">
                  <div class="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#00ff88]/50 
                              flex items-center justify-center bg-black/50 backdrop-blur-lg
                              transform transition-all duration-300 group-hover:scale-110
                              group-hover:border-[#00ff88] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                    <fa-icon [icon]="skill.icon" [style.color]="skill.color" 
                            class="text-xl md:text-3xl transform transition-all duration-300 group-hover:scale-110">
                    </fa-icon>
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-gray-300 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">{{ skill.name }}</span>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- Tools Circle Group -->
          <div class="absolute left-1/2 bottom-0 md:bottom-[5%] -translate-x-1/2 w-full md:w-auto">
            <h3 class="text-xl md:text-2xl text-[#00ff88] text-center font-mono mb-4 md:mb-6 tracking-wide">Tools</h3>
            <div class="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 justify-center">
              <ng-container *ngFor="let skill of getSkillsByCategory('Tools'); trackBy: trackSkill">
                <div class="skill-circle group">
                  <div class="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[#00ff88]/50 
                              flex items-center justify-center bg-black/50 backdrop-blur-lg
                              transform transition-all duration-300 group-hover:scale-110
                              group-hover:border-[#00ff88] group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                    <fa-icon [icon]="skill.icon" [style.color]="skill.color" 
                            class="text-xl md:text-3xl transform transition-all duration-300 group-hover:scale-110">
                    </fa-icon>
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-gray-300 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">{{ skill.name }}</span>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>

          <!-- Connecting Lines SVG -->
          <svg class="absolute inset-0 w-full h-full" style="pointer-events: none;">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00ff88;stop-opacity:0" />
                <stop offset="50%" style="stop-color:#00ff88;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#00ff88;stop-opacity:0" />
              </linearGradient>
              <!-- Add filter for glow effect -->
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g class="connecting-lines" filter="url(#glow)">
              <!-- Main connections to center -->
              <line x1="50%" y1="50%" x2="50%" y2="20%" class="skill-line" />
              <line x1="50%" y1="50%" x2="20%" y2="50%" class="skill-line" />
              <line x1="50%" y1="50%" x2="80%" y2="50%" class="skill-line" />
              <line x1="50%" y1="50%" x2="50%" y2="80%" class="skill-line" />
              
              <!-- Inter-category connections -->
              <path d="M 20% 50% Q 35% 35% 50% 20%" class="skill-line" fill="none" />
              <path d="M 80% 50% Q 65% 35% 50% 20%" class="skill-line" fill="none" />
              <path d="M 20% 50% Q 35% 65% 50% 80%" class="skill-line" fill="none" />
              <path d="M 80% 50% Q 65% 65% 50% 80%" class="skill-line" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-network {
      position: relative;
    }

    .skill-circle {
      perspective: 1000px;
      z-index: 10;
    }

    .skill-circle:hover fa-icon {
      transform: rotateY(360deg) scale(1.1);
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .skill-line {
      stroke: url(#lineGradient);
      stroke-width: 1;
      stroke-dasharray: 5,5;
      animation: dash 20s linear infinite;
    }

    .main-circle::before {
      content: '';
      position: absolute;
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
      border-radius: 50%;
      background: linear-gradient(45deg, #00ff88, transparent);
      opacity: 0.1;
      filter: blur(15px);
      animation: rotate 10s linear infinite;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes dash {
      to { stroke-dashoffset: -100; }
    }

    @media (max-width: 768px) {
      .skills-network {
        transform: scale(0.8);
        margin: -50px 0;
      }
      
      .connecting-lines {
        opacity: 0.3;
      }

      .skill-circle {
        margin: 0 auto;
      }
    }

    @media (max-width: 640px) {
      .skills-network {
        transform: scale(0.7);
        margin: -100px 0;
      }
    }
  `]
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      name: 'Frameworks',
      skills: [
        { name: 'Spring Boot', icon: faServer, color: '#6db33f' },
        { name: 'Angular', icon: faAngular, color: '#dd0031' }
      ]
    },
    {
      name: 'Languages',
      skills: [
        { name: 'Java', icon: faJava, color: '#f89820' },
        { name: 'TypeScript', icon: faJs, color: '#007acc' },
        { name: 'PHP', icon: faPhp, color: '#777bb4' },
        { name: 'HTML5', icon: faHtml5, color: '#e34f26' },
        { name: 'CSS3', icon: faCss3Alt, color: '#1572b6' }
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', icon: faGit, color: '#f05032' },
        { name: 'GitHub', icon: faGithub, color: '#181717' },
        { name: 'Docker', icon: faDocker, color: '#2496ed' },
        { name: 'Terminal', icon: faTerminal, color: '#ffffff' },
        { name: 'DevOps', icon: faCog, color: '#00ff88' }
      ]
    },
    {
      name: 'Databases',
      skills: [
        { name: 'PostgreSQL', icon: faDatabase, color: '#336791' },
        { name: 'MySQL', icon: faDatabase, color: '#4479a1' },
        { name: 'MongoDB', icon: faDatabase, color: '#47a248' }
      ]
    }
  ];

  trackCategory(index: number, category: SkillCategory): string {
    return category.name;
  }

  trackSkill(index: number, skill: Skill): string {
    return skill.name;
  }

  getSkillsByCategory(categoryName: string): Skill[] {
    return this.skillCategories.find(cat => cat.name === categoryName)?.skills || [];
  }
}
