import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Projects } from './projects';
import { Project } from '../../models/project.model';

describe('ProjectsComponent', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;
  let httpMock: HttpTestingController;

  // Mock data matching public/data/projects.json schema
  const mockProjects: Project[] = [
    {
      id: 'cognitive-load-shield',
      title: 'Cognitive Load Shield',
      category: 'Sensory & Attention Management',
      operationalMode: 'Daily Training',
      description: 'A dynamic system filter that intercepts incoming notifications.',
      techStack: ['TypeScript', 'Rust Backend'],
      deployUrl: 'https://aac-voice-core.pages.dev',
      metrics: 'Reduces context-switching overhead by ~74%',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display projects on initialization', () => {
    // Trigger ngOnInit and initial HTTP request
    fixture.detectChanges();

    const req = httpMock.expectOne('/data/projects.json');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockProjects);

    // Update view with signals state changes
    fixture.detectChanges();

    // Verify projects are populated in component signal
    expect(component.projects().length).toBe(1);
    expect(component.projects()[0].title).toBe('Cognitive Load Shield');
    expect(component.isLoading()).toBe(false);

    // Verify DOM rendering
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = compiled.querySelector('.project-title');
    expect(cardTitle?.textContent).toContain('Cognitive Load Shield');
  });

  it('should handle HTTP error gracefully and display error message', () => {
    // Trigger ngOnInit and initial HTTP request
    fixture.detectChanges();

    const req = httpMock.expectOne('/data/projects.json');

    // Simulate server error response
    req.flush('Failed to load', { status: 500, statusText: 'Server Error' });

    // Update view
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBeTruthy();

    // Verify error message in DOM
    const compiled = fixture.nativeElement as HTMLElement;
    const errorBox = compiled.querySelector('.status-message.error');
    expect(errorBox).toBeTruthy();
  });
});
