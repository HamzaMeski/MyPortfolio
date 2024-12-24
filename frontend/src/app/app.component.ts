import { Component } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { SkillsComponent } from './features/skills/skills.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    SkillsComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    
    <main>
      <section id="home">
        <app-home></app-home>
      </section>

      <section id="projects">
        <app-projects></app-projects>
      </section>

      <section id="skills">
        <app-skills></app-skills>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class AppComponent {}