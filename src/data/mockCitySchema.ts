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

// Generate some fake buildings for our static prototype
const generateMockBuildings = (count: number, baseMaterial: string): Building[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `repo-${baseMaterial}-${i}`,
    repoName: `${baseMaterial}-project-${i + 1}`,
    height: Math.max(0.1, Math.random()), // Avoid completely flat buildings
    footprint: 0.2 + Math.random() * 0.8,
    material: baseMaterial,
    windowGlow: Math.random() > 0.5 ? Math.random() : 0.1, // Some dark, some glowing
    isPinned: i === 0, // Pin the first one
    contributors: Math.floor(Math.random() * 10) + 1,
    openPRs: Math.floor(Math.random() * 5),
    lastCommitDaysAgo: Math.floor(Math.random() * 100),
    url: `https://github.com/example/${baseMaterial}-project-${i + 1}`,
    stars: Math.floor(Math.random() * 1000),
  }));
};

export const mockCityData: CitySchema = {
  user: {
    login: "octocat",
    followers: 42,
    accountAgeYears: 6,
  },
  districts: [
    {
      name: "personal-projects",
      buildings: generateMockBuildings(20, "typescript"),
    },
    {
      name: "open-source",
      buildings: generateMockBuildings(15, "rust"),
    },
    {
      name: "legacy",
      buildings: generateMockBuildings(10, "python"),
    }
  ],
  ambient: {
    streakDays: 14,
    timeOfDay: "night", // We'll start with night mode to make the window glows stand out
    weather: "clear",
  },
};
