'use client';

import React, { useState } from 'react';

interface GitHubUsernameInputProps {
  onSubmit: (username: string) => void;
  loading?: boolean;
}

export const GitHubUsernameInput: React.FC<GitHubUsernameInputProps> = ({ onSubmit, loading = false }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const validateUsername = (value: string): string | null => {
    if (!value.trim()) {
      return 'ユーザー名を入力してください';
    }
    
    if (value.length > 39) {
      return 'ユーザー名は39文字以下で入力してください';
    }
    
    if (!/^[a-zA-Z0-9-]+$/.test(value)) {
      return 'ユーザー名は英数字とハイフンのみ使用できます';
    }
    
    if (value.startsWith('-') || value.endsWith('-')) {
      return 'ユーザー名の最初と最後にハイフンは使用できません';
    }
    
    if (value.includes('--')) {
      return 'ユーザー名に連続するハイフンは使用できません';
    }
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    onSubmit(username.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">進撃の巨人診断</h2>
          <p className="text-gray-400">あなたのGitHubアカウントを分析し、どの巨人に最も適性があるかを判定します</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              GitHubユーザー名
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange}
                placeholder="例: octocat"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-gray-600'
                }`}
                disabled={loading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              loading || !username.trim()
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                診断中...
              </div>
            ) : (
              '診断開始'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            このアプリはGitHubの公開データのみを使用し、データを保存しません
          </p>
        </div>
      </div>
    </div>
  );
};

export default GitHubUsernameInput;