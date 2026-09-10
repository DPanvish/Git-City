export interface Building {
  id: string;
  repoName: string;
  height: number;      // 0-1 scale (normalized, e.g., based on stars)
  footprint: number;   // 0-1 scale (normalized, e.g., based on size)
  material: string;    // e.g., 'javascript', 'python', 'typescript', 'rust'
  windowGlow: number;  // 0-1 scale (normalized, based on recent commit frequency)
  isPinned: boolean;
  contributors: number;
  openPRs: number;
  lastCommitDaysAgo: number;
  url: string; // Direct link to the repository
  stars: number;
}

export interface District {
  name: string;
  buildings: Building[];
}

export interface AmbientState {
  streakDays: number;
  timeOfDay: 'day' | 'night' | 'dusk';
  weather: 'clear' | 'rain' | 'cloudy';
}

export interface UserProfile {
  login: string;
  followers: number;
  accountAgeYears: number;
  avatarUrl?: string;
}

export interface CitySchema {
  user: UserProfile;
  districts: District[];
  ambient: AmbientState;
}
