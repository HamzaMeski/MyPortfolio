// src/app/features/projects/projects.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  image?: string;
  isHighlighted?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 relative overflow-hidden">
      <!-- Background Effect -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff88' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');">
        </div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-[#00ff88] to-transparent mx-auto"></div>
        </div>

        <!-- Featured Project -->
        <div class="mb-20" *ngIf="highlightedProject">
          <div class="bg-black/40 backdrop-blur-lg rounded-xl border border-[#00ff88]/20 p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="md:w-1/2">
                <h3 class="text-3xl font-bold mb-4 text-white">
                  {{highlightedProject.title}}
                  <span class="ml-2 px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-full border border-[#00ff88]/20">Featured</span>
                </h3>
                <p class="text-gray-300 mb-6 leading-relaxed">{{highlightedProject.description}}</p>
                <div class="flex flex-wrap gap-3 mb-6">
                  <span *ngFor="let tech of highlightedProject.technologies" 
                        class="px-4 py-1.5 bg-white/5 rounded-full text-sm text-white/80 border border-white/10 hover:border-[#00ff88]/50 transition-colors">
                    {{tech}}
                  </span>
                </div>
                <a [href]="highlightedProject.link" 
                   target="_blank"
                   class="inline-flex items-center px-6 py-3 bg-[#00ff88] text-black font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-colors group">
                  View Project
                  <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
              <div class="md:w-1/2 relative">
                <!-- Project Preview/Screenshot here -->
                <div class="aspect-video bg-gradient-to-br from-[#00ff88]/20 to-purple-500/20 rounded-lg overflow-hidden">
                  <!-- Add project screenshot/preview here -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let project of otherProjects" 
               class="group bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 hover:border-[#00ff88]/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-white group-hover:text-[#00ff88] transition-colors">
                {{project.title}}
              </h3>
              <p class="text-gray-400 mb-4 h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00ff88]/20 scrollbar-track-transparent">
                {{project.description}}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.technologies" 
                      class="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10">
                  {{tech}}
                </span>
              </div>
              <a [href]="project.link" 
                 target="_blank"
                 class="inline-flex items-center text-[#00ff88] hover:text-white transition-colors group">
                View Project
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Custom Scrollbar */
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }

    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 136, 0.2);
      border-radius: 2px;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 255, 136, 0.4);
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Custom Framework',
      description: 'A powerful framework built on top of Spring Boot that automatically generates CRUD components for your entities. This framework significantly reduces boilerplate code by generating controllers, services, repositories, mappers, and DTOs based on your entity definitions.',
      link: 'https://github.com/HamzaMeski/Components-Generator-Framework',
      technologies: ['Spring Boot', 'Java', 'Code Generation', 'REST API'],
      isHighlighted: true
    },
    {
      title: 'YouQuiz',
      description: 'YouQuiz is an application designed to automate the creation and management of exams and quizzes to assess the skills and knowledge of learners.',
      link: 'https://github.com/HamzaMeski/YouQuiz',
      technologies: ['Spring Boot', 'PostgreSQL', 'REST API', 'JUnit']
    },
    {
      title: 'Waiting List Manager',
      description: 'A robust and flexible Java app for managing waiting lists and queues in various business contexts. Built with Spring Boot and designed for scalability.',
      link: 'https://github.com/HamzaMeski/Waiting-List-Manager',
      technologies: ['Docker', 'Spring Boot', 'PostgreSQL', 'Microservices']
    },
    {
      title: 'Citronix',
      description: 'Citronix is a sophisticated farm management system designed specifically for lemon orchards. It provides comprehensive tools for managing farms, fields, trees, harvests, and sales.',
      link: 'https://github.com/HamzaMeski/Citronix',
      technologies: ['Docker', 'Spring Boot', 'PostgreSQL', 'REST API']
    },
    {
      title: 'Survey Manager',
      description: 'A robust Spring Boot application for managing surveys, questions, and answers with comprehensive analytics capabilities.',
      link: 'https://github.com/HamzaMeski/Survey-System',
      technologies: ['Spring Boot', 'PostgreSQL', 'JPA', 'REST API']
    },
    {
      title: 'Cycling Club Horizon',
      description: 'CCH is RESTful API application that allow the management of cycling time trials, organized by the Cyclo Club Horizon.',
      link: 'https://github.com/HamzaMeski/CCH',
      technologies: ['Spring Framework', 'PostgreSQL', 'REST API']
    },
    {
      title: 'Canteen Management System',
      description: 'This app allows managing the food distribution process in university restaurants using a badge system (RFID technology).',
      link: 'https://github.com/HamzaMeski/Canteen-Management-System',
      technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'RFID']
    }
  ];

  get highlightedProject() {
    return this.projects.find(p => p.isHighlighted);
  }

  get otherProjects() {
    return this.projects.filter(p => !p.isHighlighted);
  }
}