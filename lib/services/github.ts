import { GitHubUser, GitHubRepository, GitHubApiError, UserAnalysisData } from '../types/github';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export class GitHubApiService {
  private static async fetchFromGitHub<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'shingeki-classification-app'
      }
    });

    if (!response.ok) {
      const error: GitHubApiError = {
        message: `GitHub API Error: ${response.status} ${response.statusText}`,
        status: response.status
      };
      
      if (response.status === 404) {
        error.message = 'ユーザーが見つかりません';
      } else if (response.status === 403) {
        error.message = 'API制限に達しました。しばらく待ってからお試しください。';
      } else if (response.status === 500) {
        error.message = 'GitHub APIでエラーが発生しました。しばらく待ってからお試しください。';
      }
      
      throw error;
    }

    return response.json();
  }

  static async getUserData(username: string): Promise<GitHubUser> {
    const url = `${GITHUB_API_BASE_URL}/users/${username}`;
    return this.fetchFromGitHub<GitHubUser>(url);
  }

  static async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const url = `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`;
    return this.fetchFromGitHub<GitHubRepository[]>(url);
  }

  static async analyzeUser(username: string): Promise<UserAnalysisData> {
    try {
      const [user, repositories] = await Promise.all([
        this.getUserData(username),
        this.getUserRepositories(username)
      ]);

      // プライベートリポジトリを除外
      const publicRepositories = repositories.filter(repo => !repo.private);

      // アカウント年数を計算
      const accountCreatedDate = new Date(user.created_at);
      const now = new Date();
      const accountAgeInYears = (now.getTime() - accountCreatedDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

      // 言語分布を計算
      const languageDistribution: Record<string, number> = {};
      publicRepositories.forEach(repo => {
        if (repo.language) {
          languageDistribution[repo.language] = (languageDistribution[repo.language] || 0) + 1;
        }
      });

      // リポジトリサイズ統計を計算
      const repositorySizes = publicRepositories.map(repo => repo.size);
      const totalRepositorySize = repositorySizes.reduce((sum, size) => sum + size, 0);
      const averageRepositorySize = repositorySizes.length > 0 ? totalRepositorySize / repositorySizes.length : 0;
      const maxRepositorySize = repositorySizes.length > 0 ? Math.max(...repositorySizes) : 0;

      // 最新コミットからの経過日数を計算
      const latestUpdate = publicRepositories.reduce((latest, repo) => {
        const repoUpdateTime = new Date(repo.updated_at).getTime();
        return repoUpdateTime > latest ? repoUpdateTime : latest;
      }, 0);
      const daysSinceLastCommit = latestUpdate > 0 ? (now.getTime() - latestUpdate) / (1000 * 60 * 60 * 24) : 0;

      // リポジトリサイズ分布を計算
      const repositorySizeDistribution = {
        small: repositorySizes.filter(size => size < 1000).length,
        medium: repositorySizes.filter(size => size >= 1000 && size < 10000).length,
        large: repositorySizes.filter(size => size >= 10000).length
      };

      // 継続期間を計算（最古のリポジトリから最新のリポジトリまで）
      const repositoryDates = publicRepositories.map(repo => new Date(repo.created_at).getTime());
      const oldestRepoDate = repositoryDates.length > 0 ? Math.min(...repositoryDates) : now.getTime();
      const newestRepoDate = repositoryDates.length > 0 ? Math.max(...repositoryDates) : now.getTime();
      const continuityPeriodInDays = (newestRepoDate - oldestRepoDate) / (1000 * 60 * 60 * 24);

      return {
        user,
        repositories: publicRepositories,
        accountAgeInYears,
        languageDistribution,
        totalRepositorySize,
        averageRepositorySize,
        maxRepositorySize,
        daysSinceLastCommit,
        repositorySizeDistribution,
        continuityPeriodInDays
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('ユーザーデータの取得に失敗しました');
    }
  }
}