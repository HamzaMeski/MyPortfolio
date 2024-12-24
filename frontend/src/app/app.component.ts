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
  templateUrl: './app.component.html'
})
export class AppComponent {}