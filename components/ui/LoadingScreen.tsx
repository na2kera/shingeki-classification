'use client';

import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  username: string;
}

const loadingSteps = [
  { message: 'GitHubデータを取得中...', duration: 1000 },
  { message: 'リポジトリを分析中...', duration: 1500 },
  { message: '巨人適性を判定中...', duration: 1000 },
  { message: '適性診断結果を準備中...', duration: 500 }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ username }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">巨人適性診断中</h2>
            <p className="text-gray-400">@{username} のGitHubアカウントを分析しています</p>
          </div>

          {/* Titan Silhouette Animation */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120" className="animate-pulse">
                <defs>
                  <linearGradient id="titanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#DC143C', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#8B0000', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                
                {/* Titan silhouette */}
                <rect x="40" y="30" width="40" height="65" fill="url(#titanGradient)" stroke="#DC143C" strokeWidth="2" rx="5" />
                <rect x="30" y="45" width="15" height="30" fill="url(#titanGradient)" stroke="#DC143C" strokeWidth="2" rx="3" />
                <rect x="75" y="45" width="15" height="30" fill="url(#titanGradient)" stroke="#DC143C" strokeWidth="2" rx="3" />
                <rect x="45" y="95" width="12" height="20" fill="url(#titanGradient)" stroke="#DC143C" strokeWidth="2" rx="2" />
                <rect x="63" y="95" width="12" height="20" fill="url(#titanGradient)" stroke="#DC143C" strokeWidth="2" rx="2" />
                
                {/* Glowing effects */}
                <circle cx="60" cy="60" r="30" fill="none" stroke="#DC143C" strokeWidth="1" opacity="0.3" className="animate-ping" />
                <circle cx="60" cy="60" r="25" fill="none" stroke="#FF4500" strokeWidth="1" opacity="0.5" className="animate-ping" style={{ animationDelay: '0.5s' }} />
              </svg>
              
              {/* Steam effects */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-gray-300 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }}></div>
              </div>
              <div className="absolute -top-1 left-1/3 transform -translate-x-1/2">
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <div className="absolute -top-1 right-1/3 transform translate-x-1/2">
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-400">
              {Math.round(progress)}% 完了
            </div>
          </div>

          {/* Loading Steps */}
          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gray-700 text-white'
                    : index < currentStep
                    ? 'bg-gray-800 text-green-400'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                <div className="flex-shrink-0 mr-3">
                  {index < currentStep ? (
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : index === currentStep ? (
                    <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                  )}
                </div>
                <span className="text-sm font-medium">{step.message}</span>
              </div>
            ))}
          </div>

          {/* Warning message */}
          <div className="mt-6 p-3 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-yellow-300">
                適性診断には数秒かかる場合があります
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;