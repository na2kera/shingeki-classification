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
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide">🔥 適性診断結果 🔥</h1>
          <p className="text-xl text-gray-300 font-medium">@{user.login} のGitHub活動分析</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6 shadow-2xl border border-gray-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              あなたは<br className="block sm:hidden" />
              <span 
                className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl"
                style={{ 
                  backgroundImage: `linear-gradient(45deg, ${primaryTitan.color}, ${primaryTitan.color}AA)` 
                }}
              >
                {result.primaryTitan}
              </span>
              <br />の適性があります！
            </h2>
          </div>

          {/* Avatar + Titan Visualization */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
            {/* Left side: Avatar and user info */}
            <div className="flex flex-col items-center lg:items-end lg:flex-1">
              <div className="relative mb-4">
                <Image
                  src={user.avatar_url}
                  alt={`${user.login}のアバター`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-700 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2 border-2 border-gray-600">
                  <span className="text-2xl">{primaryTitan.icon}</span>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-xl font-semibold text-white mb-1">@{user.login}</p>
                <p className="text-gray-400 text-sm">GitHub Developer</p>
              </div>
            </div>

            {/* Center: Transformation arrow */}
            <div className="flex items-center justify-center lg:mx-8">
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="text-4xl lg:text-6xl">⚡</div>
                <div className="text-center lg:text-left">
                  <p className="text-yellow-400 font-bold text-lg lg:text-xl">TRANSFORMATION</p>
                  <p className="text-gray-400 text-sm">巨人化</p>
                </div>
              </div>
            </div>

            {/* Right side: Titan image */}
            <div className="lg:flex-1 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src={`/titans/${getTitanImageFile(result.primaryTitan)}`}
                    alt={`${result.primaryTitan}の体`}
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                  style={{ backgroundColor: primaryTitan.color }}
                ></div>
              </div>
            </div>
          </div>

          {/* Titan Name and Description */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-3" style={{ color: primaryTitan.color }}>
                {result.primaryTitan}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {result.explanation}
              </p>
            </div>
          </div>

          {/* Traits */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-white text-center mb-4">巨人の特徴</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {primaryTitan.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full text-white font-medium text-lg shadow-lg"
                  style={{ backgroundColor: primaryTitan.color + '80' }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* User Traits */}
          {result.userTraits.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-white text-center mb-4">
                あなたの開発スタイル
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {result.userTraits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-base font-medium shadow-lg"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Score Summary */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-8 mb-8 border-2 border-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">巨人適性度</h3>
                <p className="text-gray-300 text-base">
                  全9種の巨人の中での<span className="font-semibold" style={{ color: primaryTitan.color }}>{result.primaryTitan}</span>への適性度
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(
                      result.scores[0].score
                    )} drop-shadow-lg`}
                  >
                    {formatScore(result.scores[0].score)}
                  </div>
                  <div className="text-lg text-gray-300 font-medium">/ 100点</div>
                </div>
                <div className="w-32 bg-gray-800 rounded-full h-3 mx-auto">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getScoreBarColor(result.scores[0].score)}`}
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onReset}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              🔄 もう一度適性診断する
            </button>
            <button
              onClick={() => {
                const text = `私は進撃の巨人 GitHub適性診断で「${result.primaryTitan}」の適性がありました！\n\n${result.explanation}\n\n#進撃の巨人適性診断 #GitHub`;
                if (navigator.share) {
                  navigator.share({
                    title: "進撃の巨人 GitHub適性診断結果",
                    text: text,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(text);
                  alert("結果をクリップボードにコピーしました！");
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              📤 結果をシェア
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
