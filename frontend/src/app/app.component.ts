import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { SkillsComponent } from './features/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, ProjectsComponent, SkillsComponent],
  template: `
    <!-- Fixed Sidebar -->
    <nav class="fixed left-0 top-1/2 -translate-y-1/2 h-auto py-8 z-50">
      <!-- Background blur effect -->
      <div class="absolute inset-0 backdrop-blur-md bg-black/20"></div>
      
      <!-- Glowing border -->
      <div class="absolute inset-0 rounded-r-2xl border-r border-t border-b border-[#00ff88]/20"></div>
      
      <!-- Navigation items -->
      <div class="relative z-10 flex flex-col items-center gap-12 px-4">
        <a *ngFor="let item of menuItems; let i = index" 
           [href]="'#' + item.id"
           (click)="scrollToSection($event, item.id)"
           class="group relative flex items-center"
           [class.active]="activeSection === item.id">
          
          <!-- Icon container with animations -->
          <div class="w-14 h-14 flex items-center justify-center relative">
            <!-- Background circle -->
            <div class="absolute inset-0 rounded-xl bg-black/50 transform 
                        group-hover:scale-90 transition-transform duration-300"></div>
            
            <!-- Glowing effect -->
            <div class="absolute inset-0 rounded-xl bg-[#00ff88]/10 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300
                        shadow-[0_0_15px_rgba(0,255,136,0.3)]"></div>
            
            <!-- Letter Icon -->
            <span class="relative text-2xl font-bold text-[#00ff88] transform 
                       group-hover:scale-110 transition-all duration-300
                       group-hover:text-white">{{item.icon}}</span>
          </div>
          
          <!-- Label tooltip -->
          <div class="absolute left-full ml-4 px-4 py-2 rounded-lg bg-black/90 backdrop-blur-sm
                      border border-[#00ff88]/20 opacity-0 -translate-x-2
                      group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-300 whitespace-nowrap">
            <span class="text-[#00ff88] text-sm font-medium">{{item.label}}</span>
            <p class="text-gray-400 text-xs mt-1">{{item.description}}</p>
            
            <!-- Arrow -->
            <div class="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                        border-8 border-transparent border-r-black/90"></div>
          </div>
          
          <!-- Active indicator -->
          <div *ngIf="activeSection === item.id"
               class="absolute -right-4 h-12 w-1 bg-[#00ff88] rounded-full
                      shadow-[0_0_10px_#00ff88]"></div>
        </a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="ml-24">
      <section id="home" class="h-screen" #homeSection><app-home></app-home></section>
      <section id="skills" class="min-h-screen" #skillsSection><app-skills></app-skills></section>
      <section id="projects" class="min-h-screen" #projectsSection><app-projects></app-projects></section>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      background: #0a0f0a;
      min-height: 100vh;
      color: #e5e7eb;
    }

    .active span {
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }

    .active .absolute:first-child {
      background: rgba(0, 255, 136, 0.1);
      box-shadow: inset 0 0 15px rgba(0, 255, 136, 0.2);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    /* Hide scrollbar but keep functionality */
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  `]
})
export class AppComponent implements OnInit {
  menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: 'H',
      description: 'Back to Home'
    },
    { 
      id: 'skills', 
      label: 'Technical Skills', 
      icon: 'S',
      description: 'View My Skills'
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: 'P',
      description: 'Browse Projects'
    }
  ];

  activeSection: string = 'home';
  private observer!: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // Set up intersection observer for section tracking
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe each section
    ['home', 'skills', 'projects'].forEach(id => {
      const element = this.el.nativeElement.querySelector(`#${id}`);
      if (element) this.observer.observe(element);
    });
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}