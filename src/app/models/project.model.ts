// Define structural contract for project cards
export type OperationalMode = 'Critical Rescue' | 'Daily Training' | 'Continuous Shield';

export interface Project {
  id: string;
  title: string;
  category: string;
  operationalMode: OperationalMode;
  description: string;
  techStack: string[];
  deployUrl: string;
  metrics?: string;
}
