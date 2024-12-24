import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { SkillsComponent } from './features/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, ProjectsComponent, SkillsComponent],
  template: `
    <!-- Fixed Sidebar -->
    <nav class="fixed left-0 top-0 h-screen w-20 bg-[#1a2518] flex flex-col items-center py-8 z-50">
      <div class="space-y-12">
        <a *ngFor="let item of menuItems" 
           [href]="'#' + item.id"
           class="block p-3 text-green-400 hover:text-green-300 transition-colors relative group">
          <i [class]="item.icon" class="text-2xl"></i>
          <span class="absolute left-20 bg-[#1a2518] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {{item.label}}
          </span>
        </a>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="ml-20">
      <section id="home" class="h-screen"><app-home></app-home></section>
      <section id="skills" class="min-h-screen"><app-skills></app-skills></section>
      <section id="projects" class="min-h-screen"><app-projects></app-projects></section>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      background: #0a0f0a;
      min-height: 100vh;
      color: #e5e7eb;
    }
  `]
})
export class AppComponent {
  menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' }
  ];
}