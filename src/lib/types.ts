export type OccupancyLevel = 'low' | 'medium' | 'high' | 'unknown';

export interface StudySpace {
  id: string;
  name: string;
  location: string;
  occupancy: OccupancyLevel;
  capacity?: number;
  features?: string[];
}

export interface FavoriteLocation {
  id: string;
  name: string;
  category: string; // e.g., "Lecture Hall", "Study Room", "Office"
  icon?: React.ElementType; // For a specific icon if needed
}

export interface ARNavigationState {
  status: 'idle' | 'prompt_destination' | 'navigating' | 'obstacle_alert' | 'rerouting' | 'arrived';
  destination?: string;
  currentInstruction?: string;
  obstacleMessage?: string;
  eta?: string;
}
