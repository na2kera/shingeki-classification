"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ClassificationResult } from "../../lib/types/titan";
import { TITAN_CHARACTERISTICS } from "../../lib/types/titan";
import { GitHubUser } from "../../lib/types/github";

interface DiagnosisResultProps {
  result: ClassificationResult;
  user: GitHubUser;
  onReset: () => void;
}

// TitanType→画像ファイル名のマッピング関数を追加
const getTitanImageFile = (titan: string) => {
  switch (titan) {
    case "始祖の巨人":
      return "shiso.png";
    case "進撃の巨人":
      return "shingeki.png";
    case "超大型巨人":
      return "oogata.png";
    case "鎧の巨人":
      return "yoroi.png";
    case "女型の巨人":
      return "megata.png";
    case "獣の巨人":
      return "kemono.png";
    case "顎の巨人":
      return "agito.png";
    case "戦槌の巨人":
      return "sentsui.png";
    case "車力の巨人":
      return "syariki.png";
    default:
      return "";
  }
};

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  user,
  onReset,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const primaryTitan = TITAN_CHARACTERISTICS[result.primaryTitan];

  const formatScore = (score: number) => Math.round(score);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide leading-tight">🔥 適性診断結果 🔥</h1>
          <p className="text-lg sm:text-xl text-gray-300 font-medium">@{user.login} のGitHub活動分析</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 mb-6 shadow-2xl border border-gray-700 mx-2 sm:mx-4 md:mx-0">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              あなたは<br className="block sm:hidden" />
              <span 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl block sm:inline"
                style={{ 
                  backgroundImage: `linear-gradient(45deg, ${primaryTitan.color}, ${primaryTitan.color}AA)` 
                }}
              >
                {result.primaryTitan}
              </span>
              <br className="hidden sm:block" />の適性があります！
            </h2>
          </div>

          {/* Avatar + Titan Visualization */}
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* User Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Image
                  src={user.avatar_url}
                  alt={`${user.login}のアバター`}
                  width={100}
                  height={100}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-gray-700 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gray-900 rounded-full p-1 sm:p-2 border-2 border-gray-600">
                  <span className="text-lg sm:text-xl md:text-2xl">{primaryTitan.icon}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-semibold text-white mb-1">@{user.login}</p>
                <p className="text-gray-400 text-sm">GitHub Developer</p>
              </div>
            </div>

            {/* Transformation Effect */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl md:text-5xl animate-pulse">⚡</div>
              <div className="text-center">
                <p className="text-yellow-400 font-bold text-base sm:text-lg md:text-xl">TRANSFORMATION</p>
                <p className="text-gray-400 text-xs sm:text-sm">巨人化</p>
              </div>
            </div>

            {/* Titan Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src={`/titans/${getTitanImageFile(result.primaryTitan)}`}
                    alt={`${result.primaryTitan}の体`}
                    width={250}
                    height={250}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
                    priority
                  />
                </div>
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-xl sm:blur-2xl"
                  style={{ backgroundColor: primaryTitan.color }}
                ></div>
              </div>
            </div>
          </div>

          {/* Titan Name and Description */}
          <div className="text-center mb-6 sm:mb-8 px-2">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: primaryTitan.color }}>
                {result.primaryTitan}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-full sm:max-w-2xl md:max-w-3xl mx-auto px-2">
                {result.explanation}
              </p>
            </div>
          </div>

          {/* Traits */}
          <div className="mb-6 sm:mb-8 px-2">
            <h4 className="text-lg sm:text-xl font-semibold text-white text-center mb-3 sm:mb-4">巨人の特徴</h4>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {primaryTitan.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-white font-medium text-sm sm:text-base md:text-lg shadow-lg"
                  style={{ backgroundColor: primaryTitan.color + '80' }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* User Traits */}
          {result.userTraits.length > 0 && (
            <div className="mb-6 sm:mb-8 px-2">
              <h4 className="text-lg sm:text-xl font-semibold text-white text-center mb-3 sm:mb-4">
                あなたの開発スタイル
              </h4>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {result.userTraits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-sm sm:text-base font-medium shadow-lg"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Score Summary */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-gray-600 mx-2">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">巨人適性度</h3>
                <p className="text-gray-300 text-sm sm:text-base px-2">
                  全9種の巨人の中での<span className="font-semibold" style={{ color: primaryTitan.color }}>{result.primaryTitan}</span>への適性度
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 sm:mb-4">
                  <div
                    className={`text-4xl sm:text-5xl md:text-6xl font-bold ${getScoreColor(
                      result.scores[0].score
                    )} drop-shadow-lg`}
                  >
                    {formatScore(result.scores[0].score)}
                  </div>
                  <div className="text-base sm:text-lg text-gray-300 font-medium">/ 100点</div>
                </div>
                <div className="w-24 sm:w-32 md:w-40 bg-gray-800 rounded-full h-2 sm:h-3 mx-auto">
                  <div 
                    className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${getScoreBarColor(result.scores[0].score)}`}
                    style={{ width: `${result.scores[0].score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
              {showDetails ? "詳細を隠す" : "詳細なスコアを見る"}
            </button>
          </div>

          {/* Detailed Scores */}
          {showDetails && (
            <div className="bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                全巨人のスコア
              </h3>
              <div className="space-y-4">
                {result.scores.map((score) => {
                  const titan = TITAN_CHARACTERISTICS[score.titan];
                  return (
                    <div
                      key={score.titan}
                      className="flex items-center justify-between p-3 bg-gray-600 rounded-lg"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{titan.icon}</span>
                        <div>
                          <div className="font-medium text-white">
                            {score.titan}
                          </div>
                          <div className="text-sm text-gray-400">
                            {formatScore(score.score)}点
                          </div>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getScoreBarColor(
                              score.score
                            )}`}
                            style={{ width: `${score.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Share Preview */}
          <div className="bg-gray-700 rounded-xl p-4 sm:p-6 mb-6 mx-2">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 text-center">シェア用プレビュー</h4>
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-600">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">進</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1">進撃の巨人 GitHub適性診断</div>
                  <div className="text-gray-300 text-xs sm:text-sm mb-2 leading-relaxed">
                    私は「{result.primaryTitan}」でした！あなたはなんの巨人に適性があるか診断してみましょう。
                  </div>
                  <div className="text-blue-400 text-xs sm:text-sm break-all">
                    {typeof window !== 'undefined' ? window.location.origin : 'https://shingeki-classification.vercel.app'}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm text-center mt-3">
              このプレビューのような形でリンクが表示されます
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-2">
            <button
              onClick={onReset}
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg active:scale-95 sm:hover:scale-105"
            >
              🔄 もう一度適性診断する
            </button>
            <button
              onClick={async () => {
                const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://shingeki-classification.vercel.app';
                const shareText = `私は「${result.primaryTitan}」でした！あなたはなんの巨人に適性があるか診断してみましょう。\n\n${appUrl}`;
                
                try {
                  await navigator.clipboard.writeText(shareText);
                  // Show success message
                  const button = document.getElementById('share-button');
                  if (button) {
                    const originalText = button.innerHTML;
                    button.innerHTML = '✅ コピーしました！';
                    button.style.backgroundColor = '#10b981';
                    setTimeout(() => {
                      button.innerHTML = originalText;
                      button.style.backgroundColor = '';
                    }, 2000);
                  }
                } catch (err) {
                  console.error('Failed to copy text: ', err);
                  alert('コピーに失敗しました。手動でコピーしてください。');
                }
              }}
              id="share-button"
              className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg active:scale-95 sm:hover:scale-105"
            >
              📋 結果をコピー
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>このアプリはGitHubの公開データを使用して作成されています</p>
          <p className="mt-2">© 2024 進撃の巨人診断アプリ</p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
