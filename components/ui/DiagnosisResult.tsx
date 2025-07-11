'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ClassificationResult } from '../../lib/types/titan';
import { TITAN_CHARACTERISTICS } from '../../lib/types/titan';
import { GitHubUser } from '../../lib/types/github';
import TitanIcon from './TitanIcon';

interface DiagnosisResultProps {
  result: ClassificationResult;
  user: GitHubUser;
  onReset: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result, user, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);
  const primaryTitan = TITAN_CHARACTERISTICS[result.primaryTitan];

  const formatScore = (score: number) => Math.round(score);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">診断結果</h1>
          <p className="text-gray-400">@{user.login} のGitHub活動分析</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              あなたは<span className="text-red-400">{result.primaryTitan}</span>です！
            </h2>
          </div>

          {/* Avatar + Titan Visualization */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* GitHub Avatar */}
              <div className="relative z-10 mb-4">
                <Image
                  src={user.avatar_url}
                  alt={`${user.login}のアバター`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-700 shadow-lg mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-2 border-2 border-gray-600">
                  <span className="text-2xl">{primaryTitan.icon}</span>
                </div>
              </div>

              {/* Titan Body */}
              <div className="relative z-0">
                <TitanIcon 
                  titan={result.primaryTitan} 
                  size={180} 
                  className="mx-auto" 
                />
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 blur-xl"
                  style={{ backgroundColor: primaryTitan.color }}
                ></div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {result.explanation}
            </p>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {primaryTitan.traits.map((trait, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* User Traits */}
          {result.userTraits.length > 0 && (
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">あなたの特徴</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {result.userTraits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Score Summary */}
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">適性度</h3>
                <p className="text-gray-400 text-sm">全巨人の中での{result.primaryTitan}としての適性</p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getScoreColor(result.scores[0].score)}`}>
                  {formatScore(result.scores[0].score)}点
                </div>
                <div className="text-sm text-gray-400">100点満点</div>
              </div>
            </div>
          </div>

          {/* Details Toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
              {showDetails ? '詳細を隠す' : '詳細なスコアを見る'}
            </button>
          </div>

          {/* Detailed Scores */}
          {showDetails && (
            <div className="bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">全巨人のスコア</h3>
              <div className="space-y-4">
                {result.scores.map((score) => {
                  const titan = TITAN_CHARACTERISTICS[score.titan];
                  return (
                    <div key={score.titan} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{titan.icon}</span>
                        <div>
                          <div className="font-medium text-white">{score.titan}</div>
                          <div className="text-sm text-gray-400">{formatScore(score.score)}点</div>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="bg-gray-800 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getScoreBarColor(score.score)}`}
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
          <div className="flex justify-center gap-4">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              もう一度診断する
            </button>
            <button
              onClick={() => {
                const text = `私は進撃の巨人診断で「${result.primaryTitan}」でした！\n\n${result.explanation}\n\n#進撃の巨人診断 #GitHub`;
                if (navigator.share) {
                  navigator.share({
                    title: '進撃の巨人診断結果',
                    text: text,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('結果をクリップボードにコピーしました！');
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              結果をシェア
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