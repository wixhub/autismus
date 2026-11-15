import { Routes } from '@angular/router';
import { Projects } from './features/projects/projects';

export const routes: Routes = [
  // Redirect root path to /projects
  { path: '', redirectTo: '/projects', pathMatch: 'full' },

  // Shell acts as a wrapper for all main pages
  {
    path: 'projects',
    component: Projects,
  },

  // Wildcard route to handle 404s by redirecting to home
  { path: '**', redirectTo: '/projects', pathMatch: 'full' },
];
