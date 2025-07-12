'use client';

import React, { useState } from 'react';
import { GitHubApiService } from '../lib/services/github';
import { TitanClassificationService } from '../lib/services/classification';
import { UserAnalysisData } from '../lib/types/github';
import { ClassificationResult } from '../lib/types/titan';
import { GitHubApiError } from '../lib/types/github';
import GitHubUsernameInput from '../components/ui/GitHubUsernameInput';
import LoadingScreen from '../components/ui/LoadingScreen';
import DiagnosisResult from '../components/ui/DiagnosisResult';
import ErrorDisplay from '../components/ui/ErrorDisplay';

type AppState = 'input' | 'loading' | 'result' | 'error';

export default function Home() {
  const [state, setState] = useState<AppState>('input');
  const [username, setUsername] = useState('');
  const [analysisData, setAnalysisData] = useState<UserAnalysisData | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<GitHubApiError | Error | null>(null);

  const handleUsernameSubmit = async (inputUsername: string) => {
    setUsername(inputUsername);
    setState('loading');
    setError(null);

    try {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fetch and analyze user data
      const userAnalysis = await GitHubApiService.analyzeUser(inputUsername);
      setAnalysisData(userAnalysis);
      
      // Classify the user
      const classification = TitanClassificationService.classifyUser(userAnalysis);
      setResult(classification);
      
      // Add slight delay before showing result
      await new Promise(resolve => setTimeout(resolve, 500));
      setState('result');
    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err as GitHubApiError | Error);
      setState('error');
    }
  };

  const handleReset = () => {
    setState('input');
    setUsername('');
    setAnalysisData(null);
    setResult(null);
    setError(null);
  };

  const handleRetry = () => {
    if (username) {
      handleUsernameSubmit(username);
    } else {
      handleReset();
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'input':
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="mb-6 sm:mb-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  <span className="text-red-500">進撃の巨人</span><br className="block sm:hidden" /> GitHub適性診断
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-2 leading-relaxed">
                  あなたのGitHub活動を分析して、どの巨人への適性が最も高いかを診断します
                </p>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  GitHub の公開データを使用して、あなたの開発スタイルから9つの巨人への適性を判定します
                </p>
              </div>
              <GitHubUsernameInput onSubmit={handleUsernameSubmit} />
            </div>
          </div>
        );
      
      case 'loading':
        return <LoadingScreen username={username} />;
      
      case 'result':
        return result && analysisData ? (
          <DiagnosisResult 
            result={result} 
            user={analysisData.user} 
            onReset={handleReset} 
          />
        ) : null;
      
      case 'error':
        return error ? (
          <ErrorDisplay 
            error={error} 
            username={username}
            onRetry={handleRetry}
            onReset={handleReset}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderContent()}
    </div>
  );
}
