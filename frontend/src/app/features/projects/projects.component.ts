// src/app/features/projects/projects.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  isHighlighted?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Custom Framework',
      description: 'A powerful framework built on top of Spring Boot that automatically generates CRUD components for your entities. This framework significantly reduces boilerplate code by generating controllers, services, repositories, mappers, and DTOs based on your entity definitions.',
      link: 'https://github.com/HamzaMeski/Components-Generator-Framework',
      technologies: ['spring boot'],
      isHighlighted: true
    },
    {
      title: 'YouQuiz',
      description: 'YouQuiz is an application designed to automate the creation and management of exams and quizzes to assess the skills and knowledge of learners.',
      link: 'https://github.com/HamzaMeski/YouQuiz',
      technologies: ['spring boot', 'postgresql']
    },
    {
      title: 'Waiting List Manager',
      description: 'A robust and flexible Java app for managing waiting lists and queues in various business contexts. Built with Spring Boot and designed for scalability.',
      link: 'https://github.com/HamzaMeski/Waiting-List-Manager',
      technologies: ['docker', 'spring boot', 'postgresql']
    },
    {
      title: 'Citronix',
      description: 'Citronix is a sophisticated farm management system designed specifically for lemon orchards. It provides comprehensive tools for managing farms, fields, trees, harvests, and sales.',
      link: 'https://github.com/HamzaMeski/Citronix',
      technologies: ['docker', 'spring boot', 'postgresql']
    },
    {
      title: 'Survey Manager',
      description: 'A robust Spring Boot application for managing surveys, questions, and answers with comprehensive analytics capabilities.',
      link: 'https://github.com/HamzaMeski/Survey-System',
      technologies: ['spring boot', 'postgresql']
    },
    {
      title: 'Cycling Club Horizon',
      description: 'CCH is RESTful API application that allow the management of cycling time trials, organized by the Cyclo Club Horizon.',
      link: 'https://github.com/HamzaMeski/CCH',
      technologies: ['spring framework', 'postgresql']
    },
    {
      title: 'Canteen Management System',
      description: 'This app allows managing the food distribution process in university restaurants using a badge system (RFID technology).',
      link: 'https://github.com/HamzaMeski/Canteen-Management-System',
      technologies: ['laravel', 'vue js', 'postgresql']
    }
  ];

  get highlightedProject() {
    return this.projects.find(p => p.isHighlighted);
  }

  get otherProjects() {
    return this.projects.filter(p => !p.isHighlighted);
  }
}