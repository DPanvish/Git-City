import { CitySchema, Building, District } from './types';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const CITY_QUERY = `
  query GetViewerCity {
    viewer {
      login
      avatarUrl
      createdAt
      followers {
        totalCount
      }
      repositories(first: 60, orderBy: {field: PUSHED_AT, direction: DESC}, isFork: false) {
        nodes {
          id
          name
          url
          stargazerCount
          diskUsage
          pushedAt
          primaryLanguage {
            name
          }
          issues(states: OPEN) {
            totalCount
          }
          pullRequests(states: OPEN) {
            totalCount
          }
        }
      }
    }
  }
`;

export async function fetchLiveCityData(accessToken: string): Promise<CitySchema> {
  console.log("Debug Token Check: length =", accessToken?.length, "starts with =", accessToken?.substring(0, 4));
  
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Git-City-App', // GitHub requires a User-Agent header
    },
    body: JSON.stringify({ query: CITY_QUERY }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("GitHub API Error Details:", errorText);
    throw new Error(`GitHub API returned ${response.status}: ${errorText}`);
  }

  const { data } = await response.json();
  const viewer = data.viewer;

  // Calculate account age
  const createdDate = new Date(viewer.createdAt);
  const now = new Date();
  const accountAgeYears = Math.max(1, now.getFullYear() - createdDate.getFullYear());

  // Group repositories into districts by Primary Language
  const districtsMap = new Map<string, Building[]>();

  interface RepoNode {
    id: string;
    name: string;
    url: string;
    stargazerCount: number;
    diskUsage: number;
    pushedAt: string;
    primaryLanguage: { name: string } | null;
    issues: { totalCount: number };
    pullRequests: { totalCount: number };
  }

  viewer.repositories.nodes.forEach((repo: RepoNode) => {
    // Normalize language to match our design system keys
    const lang = repo.primaryLanguage?.name?.toLowerCase() || 'unknown';
    
    // Calculate days since last push
    const pushDate = new Date(repo.pushedAt);
    const diffTime = Math.abs(now.getTime() - pushDate.getTime());
    const lastCommitDaysAgo = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Normalize height (stars) and footprint (disk size)
    const height = Math.min(1, Math.max(0.1, repo.stargazerCount / 100)); // Cap at 100 stars for full height
    const footprint = Math.min(1, Math.max(0.2, (repo.diskUsage || 0) / 100000)); // Cap at 100MB for full footprint
    
    // Glow based on recency (within last 7 days = max glow)
    const windowGlow = Math.max(0, 1 - (lastCommitDaysAgo / 30));

    const building: Building = {
      id: repo.id,
      repoName: repo.name,
      height,
      footprint,
      material: lang,
      windowGlow,
      isPinned: false, // We can enhance this later with pinnedItems query
      contributors: 1, // Fallback as fetching contributors requires complex queries
      openPRs: repo.pullRequests.totalCount + repo.issues.totalCount,
      lastCommitDaysAgo,
      url: repo.url,
      stars: repo.stargazerCount,
    };

    if (!districtsMap.has(lang)) {
      districtsMap.set(lang, []);
    }
    districtsMap.get(lang)!.push(building);
  });

  const districts: District[] = Array.from(districtsMap.entries()).map(([name, buildings]) => ({
    name,
    buildings,
  }));

  return {
    user: {
      login: viewer.login,
      avatarUrl: viewer.avatarUrl,
      followers: viewer.followers.totalCount,
      accountAgeYears,
    },
    districts,
    ambient: {
      streakDays: 0, // Fallback for now
      timeOfDay: 'night',
      weather: 'clear',
    },
  };
}
