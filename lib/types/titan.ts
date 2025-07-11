export type TitanType = 
  | '始祖の巨人'
  | '進撃の巨人'
  | '超大型巨人'
  | '鎧の巨人'
  | '女型の巨人'
  | '獣の巨人'
  | '顎の巨人'
  | '戦槌の巨人'
  | '車力の巨人';

export interface TitanCharacteristics {
  name: TitanType;
  description: string;
  traits: string[];
  color: string;
  icon: string;
}

export interface TitanScore {
  titan: TitanType;
  score: number;
  breakdown: {
    [key: string]: number;
  };
}

export interface ClassificationResult {
  primaryTitan: TitanType;
  scores: TitanScore[];
  explanation: string;
  userTraits: string[];
}

export const TITAN_CHARACTERISTICS: Record<TitanType, TitanCharacteristics> = {
  '始祖の巨人': {
    name: '始祖の巨人',
    description: '全体的にバランスが良く、多くの人に支持される存在です。リーダーシップを発揮し、コミュニティを導く力を持っています。',
    traits: ['バランス型', 'リーダーシップ', 'フォロワーが多い', '影響力が強い'],
    color: '#FFD700',
    icon: '👑'
  },
  '進撃の巨人': {
    name: '進撃の巨人',
    description: '常に前進し続ける情熱的な開発者です。アクティブなコミット活動で、絶えず新しい挑戦を続けています。',
    traits: ['高い活動量', '継続的な開発', '挑戦的', '情熱的'],
    color: '#DC143C',
    icon: '⚡'
  },
  '超大型巨人': {
    name: '超大型巨人',
    description: '大規模なプロジェクトを手がける実力者です。圧倒的な破壊力と存在感で、技術界に大きなインパクトを与えています。',
    traits: ['大規模開発', '高い技術力', '圧倒的な存在感', '影響力が大きい'],
    color: '#8B4513',
    icon: '🔥'
  },
  '鎧の巨人': {
    name: '鎧の巨人',
    description: '堅実で信頼性の高い技術を好む守りの専門家です。安全性とセキュリティを重視した開発を行っています。',
    traits: ['堅実性', '安全性重視', '防御的', '信頼性が高い'],
    color: '#708090',
    icon: '🛡️'
  },
  '女型の巨人': {
    name: '女型の巨人',
    description: '多様な技術スタックを使いこなす万能型の開発者です。柔軟性と適応力で様々な課題に対応できます。',
    traits: ['多様性', '柔軟性', '適応力', '万能型'],
    color: '#FF69B4',
    icon: '💎'
  },
  '獣の巨人': {
    name: '獣の巨人',
    description: '古い技術や特殊な分野に精通した知恵者です。深い専門知識で独特のアプローチを取ります。',
    traits: ['専門知識', '古い技術', '独特のアプローチ', '知恵者'],
    color: '#8B4513',
    icon: '🧠'
  },
  '顎の巨人': {
    name: '顎の巨人',
    description: '軽快で機動力のある開発スタイルを持つ開発者です。小さなプロジェクトを数多く手がけ、素早く成果を出します。',
    traits: ['機動力', '素早さ', '小回りが利く', '効率的'],
    color: '#32CD32',
    icon: '⚡'
  },
  '戦槌の巨人': {
    name: '戦槌の巨人',
    description: '創造性と独創性に富んだ開発者です。ユニークで革新的なプロジェクトで周囲を驚かせる力を持っています。',
    traits: ['創造性', '独創性', '革新的', 'ユニーク'],
    color: '#9932CC',
    icon: '🎨'
  },
  '車力の巨人': {
    name: '車力の巨人',
    description: '継続的で持続可能な開発を得意とする開発者です。長期間にわたるプロジェクトで真価を発揮します。',
    traits: ['継続性', '持久力', '長期開発', '安定性'],
    color: '#2E8B57',
    icon: '🚀'
  }
};

export const LANGUAGE_AFFINITY: Record<string, Partial<Record<TitanType, number>>> = {
  'Go': { '鎧の巨人': 0.8, '車力の巨人': 0.3 },
  'Rust': { '鎧の巨人': 0.9, '獣の巨人': 0.2 },
  'Assembly': { '獣の巨人': 0.9 },
  'COBOL': { '獣の巨人': 1.0 },
  'Fortran': { '獣の巨人': 0.8 },
  'JavaScript': { '女型の巨人': 0.6, '進撃の巨人': 0.4 },
  'TypeScript': { '女型の巨人': 0.7, '鎧の巨人': 0.3 },
  'Python': { '女型の巨人': 0.7, '戦槌の巨人': 0.3 },
  'Java': { '車力の巨人': 0.7, '始祖の巨人': 0.3 },
  'C++': { '超大型巨人': 0.6, '鎧の巨人': 0.4 },
  'C': { '超大型巨人': 0.7, '獣の巨人': 0.3 },
  'PHP': { '車力の巨人': 0.6, '女型の巨人': 0.4 },
  'Ruby': { '女型の巨人': 0.5, '戦槌の巨人': 0.5 },
  'Swift': { '顎の巨人': 0.7, '女型の巨人': 0.3 },
  'Kotlin': { '顎の巨人': 0.6, '女型の巨人': 0.4 },
  'Scala': { '戦槌の巨人': 0.8, '獣の巨人': 0.2 },
  'Haskell': { '戦槌の巨人': 0.9, '獣の巨人': 0.1 },
  'Clojure': { '戦槌の巨人': 0.8, '獣の巨人': 0.2 },
  'Elixir': { '戦槌の巨人': 0.7, '女型の巨人': 0.3 },
  'Shell': { '獣の巨人': 0.6, '車力の巨人': 0.4 },
  'Vim Script': { '獣の巨人': 0.8 },
  'Lua': { '戦槌の巨人': 0.6, '顎の巨人': 0.4 },
  'R': { '戦槌の巨人': 0.5, '獣の巨人': 0.5 },
  'MATLAB': { '戦槌の巨人': 0.6, '獣の巨人': 0.4 },
  'Dart': { '顎の巨人': 0.8, '女型の巨人': 0.2 },
  'HTML': { '女型の巨人': 0.4, '顎の巨人': 0.6 },
  'CSS': { '女型の巨人': 0.5, '戦槌の巨人': 0.5 },
};