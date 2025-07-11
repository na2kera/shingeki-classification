export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  created_at: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  size: number;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  private: boolean;
}

export interface GitHubApiError {
  message: string;
  status: number;
  documentation_url?: string;
}

export interface UserAnalysisData {
  user: GitHubUser;
  repositories: GitHubRepository[];
  accountAgeInYears: number;
  languageDistribution: Record<string, number>;
  totalRepositorySize: number;
  averageRepositorySize: number;
  maxRepositorySize: number;
  daysSinceLastCommit: number;
  repositorySizeDistribution: {
    small: number;
    medium: number;
    large: number;
  };
  continuityPeriodInDays: number;
}