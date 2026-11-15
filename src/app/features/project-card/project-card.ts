import { Component, computed, input } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  styleUrl: './project-card.scss',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  // Signal-based required input for strict type safety
  project = input.required<Project>();

  // Compute CSS modifier class based on operational mode
  modeClass = computed(() => {
    switch (this.project().operationalMode) {
      case 'Critical Rescue':
        return 'mode-rescue';
      case 'Continuous Shield':
        return 'mode-shield';
      case 'Daily Training':
        return 'mode-training';
    }
  });
}
