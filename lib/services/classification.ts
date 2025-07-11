import { UserAnalysisData } from '../types/github';
import { TitanScore, ClassificationResult, TITAN_CHARACTERISTICS, LANGUAGE_AFFINITY } from '../types/titan';

export class TitanClassificationService {
  private static normalizeScore(score: number, max: number = 100): number {
    return Math.min(Math.max(score, 0), max);
  }

  private static calculateFounderTitanScore(data: UserAnalysisData): TitanScore {
    const baseScore = 
      (data.user.followers * 0.3) +
      (data.accountAgeInYears * 10) +
      (data.user.public_repos * 2);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '始祖の巨人',
      score,
      breakdown: {
        'フォロワー数': data.user.followers * 0.3,
        'アカウント年数': data.accountAgeInYears * 10,
        'リポジトリ数': data.user.public_repos * 2
      }
    };
  }

  private static calculateAttackTitanScore(data: UserAnalysisData): TitanScore {
    const daysSinceLastCommitInverse = data.daysSinceLastCommit > 0 ? 1 / data.daysSinceLastCommit : 1;
    const baseScore = 
      (daysSinceLastCommitInverse * 50) +
      (data.user.public_repos * 1.5);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '進撃の巨人',
      score,
      breakdown: {
        '最近の活動度': daysSinceLastCommitInverse * 50,
        'リポジトリ数': data.user.public_repos * 1.5
      }
    };
  }

  private static calculateColossalTitanScore(data: UserAnalysisData): TitanScore {
    const baseScore = 
      (data.averageRepositorySize * 0.01) +
      (data.maxRepositorySize * 0.005);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '超大型巨人',
      score,
      breakdown: {
        '平均リポジトリサイズ': data.averageRepositorySize * 0.01,
        '最大リポジトリサイズ': data.maxRepositorySize * 0.005
      }
    };
  }

  private static calculateArmoredTitanScore(data: UserAnalysisData): TitanScore {
    const defensiveLanguages = ['Go', 'Rust', 'Java', 'C++', 'TypeScript'];
    const defensiveLanguageCount = defensiveLanguages.filter(lang => 
      data.languageDistribution[lang] > 0
    ).length;
    
    const baseScore = 
      (defensiveLanguageCount * 20) +
      (data.accountAgeInYears * 5) +
      (data.continuityPeriodInDays * 0.01);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '鎧の巨人',
      score,
      breakdown: {
        '防御的言語の使用': defensiveLanguageCount * 20,
        'アカウント年数': data.accountAgeInYears * 5,
        '継続期間': data.continuityPeriodInDays * 0.01
      }
    };
  }

  private static calculateFemaleTitanScore(data: UserAnalysisData): TitanScore {
    const languageCount = Object.keys(data.languageDistribution).length;
    const languageDiversity = languageCount > 0 ? languageCount : 1;
    
    const baseScore = 
      (languageDiversity * 10) +
      (data.user.public_repos * 1.2) +
      (data.repositorySizeDistribution.medium * 3);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '女型の巨人',
      score,
      breakdown: {
        '言語の多様性': languageDiversity * 10,
        'リポジトリ数': data.user.public_repos * 1.2,
        '中規模リポジトリ': data.repositorySizeDistribution.medium * 3
      }
    };
  }

  private static calculateBeastTitanScore(data: UserAnalysisData): TitanScore {
    const oldLanguages = ['Assembly', 'COBOL', 'Fortran', 'C', 'Vim Script', 'Shell'];
    const oldLanguageCount = oldLanguages.filter(lang => 
      data.languageDistribution[lang] > 0
    ).length;
    
    const baseScore = 
      (oldLanguageCount * 25) +
      (data.accountAgeInYears * 8) +
      (data.averageRepositorySize * 0.005);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '獣の巨人',
      score,
      breakdown: {
        '古い言語の使用': oldLanguageCount * 25,
        'アカウント年数': data.accountAgeInYears * 8,
        '平均リポジトリサイズ': data.averageRepositorySize * 0.005
      }
    };
  }

  private static calculateJawTitanScore(data: UserAnalysisData): TitanScore {
    const baseScore = 
      (data.repositorySizeDistribution.small * 4) +
      (data.user.public_repos * 1.8) +
      (data.daysSinceLastCommit < 7 ? 20 : 0);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '顎の巨人',
      score,
      breakdown: {
        '小規模リポジトリ': data.repositorySizeDistribution.small * 4,
        'リポジトリ数': data.user.public_repos * 1.8,
        '最近の活動': data.daysSinceLastCommit < 7 ? 20 : 0
      }
    };
  }

  private static calculateWarhammerTitanScore(data: UserAnalysisData): TitanScore {
    const creativeLanguages = ['Haskell', 'Scala', 'Clojure', 'Elixir', 'R', 'MATLAB'];
    const creativeLanguageCount = creativeLanguages.filter(lang => 
      data.languageDistribution[lang] > 0
    ).length;
    
    const uniqueRepoRatio = data.user.public_repos > 0 ? 
      (data.repositorySizeDistribution.large / data.user.public_repos) : 0;
    
    const baseScore = 
      (creativeLanguageCount * 30) +
      (uniqueRepoRatio * 40) +
      (data.averageRepositorySize * 0.008);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '戦槌の巨人',
      score,
      breakdown: {
        '創造的言語の使用': creativeLanguageCount * 30,
        'ユニークプロジェクト比率': uniqueRepoRatio * 40,
        '平均リポジトリサイズ': data.averageRepositorySize * 0.008
      }
    };
  }

  private static calculateCartTitanScore(data: UserAnalysisData): TitanScore {
    const baseScore = 
      (data.continuityPeriodInDays * 0.02) +
      (data.accountAgeInYears * 12) +
      (data.repositorySizeDistribution.medium * 2.5);
    
    const score = this.normalizeScore(baseScore);
    
    return {
      titan: '車力の巨人',
      score,
      breakdown: {
        '継続期間': data.continuityPeriodInDays * 0.02,
        'アカウント年数': data.accountAgeInYears * 12,
        '中規模リポジトリ': data.repositorySizeDistribution.medium * 2.5
      }
    };
  }

  private static applyLanguageAffinity(scores: TitanScore[], data: UserAnalysisData): TitanScore[] {
    return scores.map(score => {
      let affinityBonus = 0;
      
      Object.entries(data.languageDistribution).forEach(([language, count]) => {
        const affinity = LANGUAGE_AFFINITY[language];
        if (affinity && affinity[score.titan]) {
          affinityBonus += (affinity[score.titan] || 0) * count * 5;
        }
      });
      
      return {
        ...score,
        score: this.normalizeScore(score.score + affinityBonus),
        breakdown: {
          ...score.breakdown,
          '言語親和性ボーナス': affinityBonus
        }
      };
    });
  }

  static classifyUser(data: UserAnalysisData): ClassificationResult {
    let scores: TitanScore[] = [
      this.calculateFounderTitanScore(data),
      this.calculateAttackTitanScore(data),
      this.calculateColossalTitanScore(data),
      this.calculateArmoredTitanScore(data),
      this.calculateFemaleTitanScore(data),
      this.calculateBeastTitanScore(data),
      this.calculateJawTitanScore(data),
      this.calculateWarhammerTitanScore(data),
      this.calculateCartTitanScore(data)
    ];

    scores = this.applyLanguageAffinity(scores, data);
    scores.sort((a, b) => b.score - a.score);

    const primaryTitan = scores[0].titan;
    const characteristics = TITAN_CHARACTERISTICS[primaryTitan];
    
    const userTraits = [];
    if (data.user.followers > 50) userTraits.push('影響力がある');
    if (data.daysSinceLastCommit < 7) userTraits.push('アクティブ');
    if (data.accountAgeInYears > 3) userTraits.push('経験豊富');
    if (Object.keys(data.languageDistribution).length > 5) userTraits.push('多言語対応');
    if (data.averageRepositorySize > 5000) userTraits.push('大規模開発');
    
    return {
      primaryTitan,
      scores,
      explanation: characteristics.description,
      userTraits
    };
  }
}