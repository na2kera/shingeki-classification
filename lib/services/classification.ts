import { UserAnalysisData } from '../types/github';
import { TitanScore, ClassificationResult, TITAN_CHARACTERISTICS, LANGUAGE_AFFINITY, TitanType } from '../types/titan';

export class TitanClassificationService {
  // 決定木による巨人分類（始祖の巨人は最も厳しい条件）
  private static classifyByDecisionTree(data: UserAnalysisData): TitanType {
    const {
      user,
      languageDistribution,
      averageRepositorySize,
      maxRepositorySize,
      daysSinceLastCommit,
      repositorySizeDistribution,
      accountAgeInYears,
      continuityPeriodInDays
    } = data;

    const languageCount = Object.keys(languageDistribution).length;
    const oldLanguages = ['Assembly', 'COBOL', 'Fortran', 'C', 'Vim Script', 'Shell'];
    const defensiveLanguages = ['Go', 'Rust', 'Java', 'C++', 'TypeScript'];
    const creativeLanguages = ['Haskell', 'Scala', 'Clojure', 'Elixir', 'R', 'MATLAB'];
    
    const hasOldLanguages = oldLanguages.some(lang => languageDistribution[lang] > 0);
    const defensiveLanguageCount = defensiveLanguages.filter(lang => languageDistribution[lang] > 0).length;
    const creativeLanguageCount = creativeLanguages.filter(lang => languageDistribution[lang] > 0).length;

    // 【始祖の巨人】- 最も厳しい条件（全分野で高いレベルが必要）
    if (
      user.followers >= 100 &&           // 高い影響力
      accountAgeInYears >= 5 &&          // 長い経験
      user.public_repos >= 50 &&         // 豊富な開発経験  
      languageCount >= 8 &&              // 多様な技術力
      averageRepositorySize >= 10000 &&  // 大規模開発経験
      continuityPeriodInDays >= 1000 &&  // 長期間の継続開発
      defensiveLanguageCount >= 2 &&     // 堅実な技術基盤
      daysSinceLastCommit <= 30          // 現在もアクティブ
    ) {
      return '始祖の巨人';
    }

    // 【第1段階】活動頻度による分岐
    if (daysSinceLastCommit <= 3) {
      // 非常にアクティブな場合
      if (repositorySizeDistribution.small >= 10 && user.public_repos >= 30) {
        // 多数の小さなプロジェクト = 顎の巨人
        return '顎の巨人';
      } else if (user.public_repos >= 20) {
        // 高頻度コミット + 多くのリポジトリ = 進撃の巨人
        return '進撃の巨人';
      }
    }

    // 【第2段階】技術特性による分岐
    if (hasOldLanguages && accountAgeInYears >= 4) {
      // 古い技術 + 経験豊富 = 獣の巨人
      return '獣の巨人';
    }

    if (creativeLanguageCount >= 2) {
      // 創造的な言語を多用 = 戦槌の巨人
      return '戦槌の巨人';
    }

    if (defensiveLanguageCount >= 3 || languageDistribution['Rust'] > 0 || languageDistribution['Go'] > 0) {
      // 防御的言語重視 = 鎧の巨人
      return '鎧の巨人';
    }

    // 【第3段階】プロジェクト規模による分岐
    if (maxRepositorySize >= 50000 || averageRepositorySize >= 15000) {
      // 巨大プロジェクト = 超大型巨人
      return '超大型巨人';
    }

    // 【第4段階】多様性と継続性による分岐
    if (languageCount >= 6 && repositorySizeDistribution.medium >= 5) {
      // 多様な技術スタック = 女型の巨人
      return '女型の巨人';
    }

    if (accountAgeInYears >= 3 && continuityPeriodInDays >= 365) {
      // 長期継続開発 = 車力の巨人
      return '車力の巨人';
    }

    // 【デフォルト】条件に該当しない場合
    // 最近の活動状況で判定
    if (daysSinceLastCommit <= 7) {
      return '進撃の巨人'; // アクティブ
    } else if (user.public_repos >= 10) {
      return '女型の巨人'; // 万能型
    } else {
      return '顎の巨人';   // 軽快型
    }
  }

  // 表示用のスコア計算（決定木の結果を基にダミースコアを生成）
  private static generateDisplayScores(primaryTitan: TitanType, data: UserAnalysisData): TitanScore[] {
    const allTitans: TitanType[] = [
      '始祖の巨人', '進撃の巨人', '超大型巨人', '鎧の巨人',
      '女型の巨人', '獣の巨人', '顎の巨人', '戦槌の巨人', '車力の巨人'
    ];

    const scores: TitanScore[] = allTitans.map(titan => {
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
        case '始祖の巨人':
          breakdown = {
            'フォロワー数': data.user.followers * 0.3,
            'アカウント年数': data.accountAgeInYears * 8,
            'リポジトリ数': data.user.public_repos * 1.5,
            '総合力': Math.random() * 20
          };
          break;
        case '進撃の巨人':
          breakdown = {
            '最近の活動度': data.daysSinceLastCommit <= 7 ? 25 : 10,
            'リポジトリ数': data.user.public_repos * 1.2,
            '継続性': Math.random() * 15
          };
          break;
        case '超大型巨人':
          breakdown = {
            '平均リポジトリサイズ': data.averageRepositorySize * 0.003,
            '最大リポジトリサイズ': data.maxRepositorySize * 0.002,
            '迫力': Math.random() * 20
          };
          break;
        case '鎧の巨人':
          breakdown = {
            '防御的言語': Math.random() * 20,
            'アカウント年数': data.accountAgeInYears * 5,
            '安定性': Math.random() * 15
          };
          break;
        case '女型の巨人':
          breakdown = {
            '言語多様性': Object.keys(data.languageDistribution).length * 4,
            '柔軟性': Math.random() * 20,
            'バランス': Math.random() * 15
          };
          break;
        case '獣の巨人':
          breakdown = {
            '古い技術': Math.random() * 25,
            '専門知識': data.accountAgeInYears * 6,
            '知恵': Math.random() * 20
          };
          break;
        case '顎の巨人':
          breakdown = {
            '小規模リポジトリ': data.repositorySizeDistribution.small * 3,
            '機動力': data.daysSinceLastCommit <= 3 ? 20 : 5,
            '素早さ': Math.random() * 15
          };
          break;
        case '戦槌の巨人':
          breakdown = {
            '創造的言語': Math.random() * 25,
            '独創性': Math.random() * 20,
            '革新性': Math.random() * 15
          };
          break;
        case '車力の巨人':
          breakdown = {
            '継続期間': data.continuityPeriodInDays * 0.01,
            '持久力': data.accountAgeInYears * 7,
            '安定性': Math.random() * 15
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
        breakdown['言語親和性ボーナス'] = affinityBonus;
      }

      const finalScore = Math.min(100, Math.max(0, baseScore + affinityBonus));

      return {
        titan,
        score: Math.round(finalScore),
        breakdown
      };
    });

    // スコア順にソート
    return scores.sort((a, b) => b.score - a.score);
  }

  static classifyUser(data: UserAnalysisData): ClassificationResult {
    // 決定木で巨人を決定
    const primaryTitan = this.classifyByDecisionTree(data);
    
    // 表示用スコアを生成
    const scores = this.generateDisplayScores(primaryTitan, data);
    
    const characteristics = TITAN_CHARACTERISTICS[primaryTitan];
    
    // ユーザー特徴の判定
    const userTraits = [];
    if (data.user.followers > 50) userTraits.push('影響力がある');
    if (data.daysSinceLastCommit < 7) userTraits.push('アクティブ');
    if (data.accountAgeInYears > 3) userTraits.push('経験豊富');
    if (Object.keys(data.languageDistribution).length > 5) userTraits.push('多言語対応');
    if (data.averageRepositorySize > 5000) userTraits.push('大規模開発');
    if (data.continuityPeriodInDays > 365) userTraits.push('継続力がある');
    
    return {
      primaryTitan,
      scores,
      explanation: characteristics.description,
      userTraits
    };
  }
}