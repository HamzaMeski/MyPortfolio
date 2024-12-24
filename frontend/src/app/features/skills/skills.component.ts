import { Component } from '@angular/core';
import { SkillCategory } from '../../models/skill.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      category: 'Languages',
      skills: ['JAVA 8+', 'TypeScript', 'PHP', 'HTML', 'CSS']
    },
    {
      category: 'Frameworks',
      skills: ['SPRING BOOT', 'ANGULAR']
    },
    {
      category: 'Databases',
      skills: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB']
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'Docker', 'Docker Compose', 'Jira', 'Trello', 'Lucidchart']
    },
    {
      category: 'Development Environments',
      skills: ['IntelliJ IDEA', 'VSCode', 'Vim']
    },
    {
      category: 'Operating Systems',
      skills: ['Linux', 'Windows']
    }
  ];
}
