import { UserAnalysisData } from "../types/github";
import {
  TitanScore,
  ClassificationResult,
  TITAN_CHARACTERISTICS,
  LANGUAGE_AFFINITY,
  TitanType,
} from "../types/titan";

// 重み付け設定
interface TitanWeights {
  [key: string]: number;
}

const TITAN_WEIGHTS: Record<TitanType, TitanWeights> = {
  始祖の巨人: {
    followers: 0.12,
    accountAge: 0.12,
    publicRepos: 0.1,
    languageCount: 0.1,
    avgRepoSize: 0.09,
    continuityPeriod: 0.09,
    defensiveLanguages: 0.08,
    recentActivity: 0.08,
  },
  進撃の巨人: {
    recentActivity: 0.22,
    publicRepos: 0.18,
    continuityPeriod: 0.13,
    languageCount: 0.09,
    followers: 0.09,
    avgRepoSize: 0.09,
    accountAge: 0.09,
  },
  超大型巨人: {
    maxRepoSize: 0.3,
    avgRepoSize: 0.25,
    publicRepos: 0.15,
    followers: 0.1,
    accountAge: 0.1,
    languageCount: 0.1,
  },
  鎧の巨人: {
    defensiveLanguages: 0.25,
    accountAge: 0.2,
    continuityPeriod: 0.15,
    recentActivity: 0.1,
    followers: 0.1,
    publicRepos: 0.1,
    languageCount: 0.1,
  },
  女型の巨人: {
    languageCount: 0.25,
    mediumRepos: 0.2,
    recentActivity: 0.15,
    publicRepos: 0.15,
    followers: 0.1,
    accountAge: 0.1,
    continuityPeriod: 0.05,
  },
  獣の巨人: {
    oldLanguages: 0.38,
    accountAge: 0.28,
    continuityPeriod: 0.18,
    followers: 0.06,
    publicRepos: 0.05,
    languageCount: 0.05,
  },
  顎の巨人: {
    smallRepos: 0.25,
    recentActivity: 0.25,
    publicRepos: 0.2,
    languageCount: 0.15,
    followers: 0.1,
    accountAge: 0.05,
  },
  戦槌の巨人: {
    creativeLanguages: 0.38,
    languageCount: 0.22,
    recentActivity: 0.15,
    publicRepos: 0.1,
    followers: 0.08,
    accountAge: 0.07,
  },
  車力の巨人: {
    continuityPeriod: 0.38,
    accountAge: 0.28,
    publicRepos: 0.12,
    recentActivity: 0.08,
    followers: 0.07,
    languageCount: 0.07,
  },
};

export class TitanClassificationService {
  // 重み付けによる巨人分類
  private static classifyByWeightedScoring(data: UserAnalysisData): TitanType {
    const {
      user,
      languageDistribution,
      averageRepositorySize,
      maxRepositorySize,
      daysSinceLastCommit,
      repositorySizeDistribution,
      accountAgeInYears,
      continuityPeriodInDays,
    } = data;

    const languageCount = Object.keys(languageDistribution).length;
    const oldLanguages = [
      "Assembly",
      "COBOL",
      "Fortran",
      "C",
      "Vim Script",
      "Shell",
    ];
    const defensiveLanguages = ["Go", "Rust", "Java", "C++", "TypeScript"];
    const creativeLanguages = [
      "Haskell",
      "Scala",
      "Clojure",
      "Elixir",
      "R",
      "MATLAB",
    ];

    const hasOldLanguages = oldLanguages.some(
      (lang) => languageDistribution[lang] > 0
    );
    const defensiveLanguageCount = defensiveLanguages.filter(
      (lang) => languageDistribution[lang] > 0
    ).length;
    const creativeLanguageCount = creativeLanguages.filter(
      (lang) => languageDistribution[lang] > 0
    ).length;

    // 各巨人タイプのスコアを計算
    const titanScores: Record<TitanType, number> = {} as Record<
      TitanType,
      number
    >;

    // 始祖の巨人のスコア計算
    titanScores["始祖の巨人"] = this.calculateTitanScore("始祖の巨人", {
      followers: Math.min(user.followers / 100, 1),
      accountAge: Math.min(accountAgeInYears / 5, 1),
      publicRepos: Math.min(user.public_repos / 50, 1),
      languageCount: Math.min(languageCount / 8, 1),
      avgRepoSize: Math.min(averageRepositorySize / 10000, 1),
      continuityPeriod: Math.min(continuityPeriodInDays / 1000, 1),
      defensiveLanguages: Math.min(defensiveLanguageCount / 2, 1),
      recentActivity:
        daysSinceLastCommit <= 30
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 30) / 100),
    });

    // 進撃の巨人のスコア計算
    titanScores["進撃の巨人"] = this.calculateTitanScore("進撃の巨人", {
      recentActivity:
        daysSinceLastCommit <= 7
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 7) / 50),
      publicRepos: Math.min(user.public_repos / 20, 1),
      continuityPeriod: Math.min(continuityPeriodInDays / 500, 1),
      languageCount: Math.min(languageCount / 5, 1),
      followers: Math.min(user.followers / 50, 1),
      avgRepoSize: Math.min(averageRepositorySize / 5000, 1),
      accountAge: Math.min(accountAgeInYears / 3, 1),
    });

    // 超大型巨人のスコア計算
    titanScores["超大型巨人"] = this.calculateTitanScore("超大型巨人", {
      maxRepoSize: Math.min(maxRepositorySize / 50000, 1),
      avgRepoSize: Math.min(averageRepositorySize / 15000, 1),
      publicRepos: Math.min(user.public_repos / 30, 1),
      followers: Math.min(user.followers / 80, 1),
      accountAge: Math.min(accountAgeInYears / 4, 1),
      languageCount: Math.min(languageCount / 6, 1),
    });

    // 鎧の巨人のスコア計算
    titanScores["鎧の巨人"] = this.calculateTitanScore("鎧の巨人", {
      defensiveLanguages: Math.min(defensiveLanguageCount / 3, 1),
      accountAge: Math.min(accountAgeInYears / 4, 1),
      continuityPeriod: Math.min(continuityPeriodInDays / 500, 1),
      recentActivity:
        daysSinceLastCommit <= 14
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 14) / 100),
      followers: Math.min(user.followers / 60, 1),
      publicRepos: Math.min(user.public_repos / 25, 1),
      languageCount: Math.min(languageCount / 5, 1),
    });

    // 女型の巨人のスコア計算（活動頻度と多様性のバランスを考慮）
    titanScores["女型の巨人"] = this.calculateTitanScore("女型の巨人", {
      languageCount: Math.min(languageCount / 6, 1),
      mediumRepos: Math.min(repositorySizeDistribution.medium / 5, 1),
      recentActivity:
        daysSinceLastCommit <= 30
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 30) / 100),
      publicRepos: Math.min(user.public_repos / 15, 1),
      followers: Math.min(user.followers / 40, 1),
      accountAge: Math.min(accountAgeInYears / 3, 1),
      continuityPeriod: Math.min(continuityPeriodInDays / 500, 1),
    });

    // 獣の巨人のスコア計算
    titanScores["獣の巨人"] = this.calculateTitanScore("獣の巨人", {
      oldLanguages: hasOldLanguages ? 1 : 0,
      accountAge: Math.min(accountAgeInYears / 4, 1),
      continuityPeriod: Math.min(continuityPeriodInDays / 500, 1),
      followers: Math.min(user.followers / 70, 1),
      publicRepos: Math.min(user.public_repos / 20, 1),
      languageCount: Math.min(languageCount / 4, 1),
    });

    // 顎の巨人のスコア計算
    titanScores["顎の巨人"] = this.calculateTitanScore("顎の巨人", {
      smallRepos: Math.min(repositorySizeDistribution.small / 10, 1),
      recentActivity:
        daysSinceLastCommit <= 3
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 3) / 20),
      publicRepos: Math.min(user.public_repos / 30, 1),
      languageCount: Math.min(languageCount / 4, 1),
      followers: Math.min(user.followers / 30, 1),
      accountAge: Math.min(accountAgeInYears / 2, 1),
    });

    // 戦槌の巨人のスコア計算
    titanScores["戦槌の巨人"] = this.calculateTitanScore("戦槌の巨人", {
      creativeLanguages: Math.min(creativeLanguageCount / 2, 1),
      languageCount: Math.min(languageCount / 5, 1),
      recentActivity:
        daysSinceLastCommit <= 14
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 14) / 100),
      publicRepos: Math.min(user.public_repos / 15, 1),
      followers: Math.min(user.followers / 40, 1),
      accountAge: Math.min(accountAgeInYears / 3, 1),
    });

    // 車力の巨人のスコア計算
    titanScores["車力の巨人"] = this.calculateTitanScore("車力の巨人", {
      continuityPeriod: Math.min(continuityPeriodInDays / 365, 1),
      accountAge: Math.min(accountAgeInYears / 3, 1),
      publicRepos: Math.min(user.public_repos / 20, 1),
      recentActivity:
        daysSinceLastCommit <= 30
          ? 1
          : Math.max(0, 1 - (daysSinceLastCommit - 30) / 100),
      followers: Math.min(user.followers / 50, 1),
      languageCount: Math.min(languageCount / 4, 1),
    });

    // 最高スコアの巨人を返す
    let maxScore = 0;
    let primaryTitan: TitanType = "進撃の巨人";

    Object.entries(titanScores).forEach(([titan, score]) => {
      if (score > maxScore) {
        maxScore = score;
        primaryTitan = titan as TitanType;
      }
    });

    return primaryTitan;
  }

  // 個別の巨人タイプのスコア計算
  private static calculateTitanScore(
    titan: TitanType,
    metrics: Record<string, number>
  ): number {
    const weights = TITAN_WEIGHTS[titan];
    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([metric, weight]) => {
      if (metrics[metric] !== undefined) {
        totalScore += metrics[metric] * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  // 表示用のスコア計算（重み付けの結果を基に実際のスコアを生成）
  private static generateDisplayScores(
    primaryTitan: TitanType,
    data: UserAnalysisData
  ): TitanScore[] {
    const allTitans: TitanType[] = [
      "始祖の巨人",
      "進撃の巨人",
      "超大型巨人",
      "鎧の巨人",
      "女型の巨人",
      "獣の巨人",
      "顎の巨人",
      "戦槌の巨人",
      "車力の巨人",
    ];

    const scores: TitanScore[] = allTitans.map((titan) => {
      let baseScore: number;
      let breakdown: Record<string, number> = {};

      if (titan === primaryTitan) {
        // 選ばれた巨人は75-95点の高スコア
        baseScore = 75 + Math.random() * 20;
      } else {
        // その他の巨人は20-70点
        baseScore = 20 + Math.random() * 50;
      }

      // 各巨人の特徴に基づいたブレークダウンを生成
      switch (titan) {
        case "始祖の巨人":
          breakdown = {
            フォロワー数: data.user.followers * 0.3,
            アカウント年数: data.accountAgeInYears * 8,
            リポジトリ数: data.user.public_repos * 1.5,
            総合力: Math.random() * 20,
          };
          break;
        case "進撃の巨人":
          breakdown = {
            最近の活動度: data.daysSinceLastCommit <= 7 ? 25 : 10,
            リポジトリ数: data.user.public_repos * 1.2,
            継続性: Math.random() * 15,
          };
          break;
        case "超大型巨人":
          breakdown = {
            平均リポジトリサイズ: data.averageRepositorySize * 0.003,
            最大リポジトリサイズ: data.maxRepositorySize * 0.002,
            迫力: Math.random() * 20,
          };
          break;
        case "鎧の巨人":
          breakdown = {
            防御的言語: Math.random() * 20,
            アカウント年数: data.accountAgeInYears * 5,
            安定性: Math.random() * 15,
          };
          break;
        case "女型の巨人":
          breakdown = {
            言語多様性: Object.keys(data.languageDistribution).length * 4,
            柔軟性: Math.random() * 20,
            バランス: Math.random() * 15,
          };
          break;
        case "獣の巨人":
          breakdown = {
            古い技術: Math.random() * 25,
            専門知識: data.accountAgeInYears * 6,
            知恵: Math.random() * 20,
          };
          break;
        case "顎の巨人":
          breakdown = {
            小規模リポジトリ: data.repositorySizeDistribution.small * 3,
            機動力: data.daysSinceLastCommit <= 3 ? 20 : 5,
            素早さ: Math.random() * 15,
          };
          break;
        case "戦槌の巨人":
          breakdown = {
            創造的言語: Math.random() * 25,
            独創性: Math.random() * 20,
            革新性: Math.random() * 15,
          };
          break;
        case "車力の巨人":
          breakdown = {
            継続期間: data.continuityPeriodInDays * 0.01,
            持久力: data.accountAgeInYears * 7,
            安定性: Math.random() * 15,
          };
          break;
      }

      // 言語親和性ボーナスを適用
      let affinityBonus = 0;
      Object.entries(data.languageDistribution).forEach(([language, count]) => {
        const affinity = LANGUAGE_AFFINITY[language];
        if (affinity && affinity[titan]) {
          affinityBonus += (affinity[titan] || 0) * count * 3;
        }
      });

      if (affinityBonus > 0) {
        breakdown["言語親和性ボーナス"] = affinityBonus;
      }

      const finalScore = Math.min(100, Math.max(0, baseScore + affinityBonus));

      return {
        titan,
        score: Math.round(finalScore),
        breakdown,
      };
    });

    // スコア順にソート
    return scores.sort((a, b) => b.score - a.score);
  }

  static classifyUser(data: UserAnalysisData): ClassificationResult {
    // 重み付けで巨人を決定
    const primaryTitan = this.classifyByWeightedScoring(data);

    // 表示用スコアを生成
    const scores = this.generateDisplayScores(primaryTitan, data);

    const characteristics = TITAN_CHARACTERISTICS[primaryTitan];

    // ユーザー特徴の判定
    const userTraits = [];
    if (data.user.followers > 50) userTraits.push("影響力がある");
    if (data.daysSinceLastCommit < 7) userTraits.push("アクティブ");
    if (data.accountAgeInYears > 3) userTraits.push("経験豊富");
    if (Object.keys(data.languageDistribution).length > 5)
      userTraits.push("多言語対応");
    if (data.averageRepositorySize > 5000) userTraits.push("大規模開発");
    if (data.continuityPeriodInDays > 365) userTraits.push("継続力がある");

    return {
      primaryTitan,
      scores,
      explanation: characteristics.description,
      userTraits,
    };
  }
}
