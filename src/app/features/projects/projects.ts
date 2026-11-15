import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OperationalMode, Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  imports: [ProjectCard],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  private http = inject(HttpClient);

  projects = signal<Project[]>([]);
  selectedMode = signal<OperationalMode | 'All'>('All');
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  readonly modes: Array<OperationalMode | 'All'> = [
    'All',
    'Critical Rescue',
    'Continuous Shield',
    'Daily Training',
  ];

  // Derived signal filtering projects without mutating source state
  filteredProjects = computed(() => {
    const mode = this.selectedMode();
    const all = this.projects();
    return mode === 'All' ? all : all.filter((p) => p.operationalMode === mode);
  });

  ngOnInit(): void {
    this.fetchProjects();
  }

  setFilter(mode: OperationalMode | 'All'): void {
    this.selectedMode.set(mode);
  }

  private fetchProjects(): void {
    this.http.get<Project[]>('/data/projects.json').subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load projects configuration', err);
        this.errorMessage.set('Failed to load project parameters. Check local data stream.');
        this.isLoading.set(false);
      },
    });
  }
}
