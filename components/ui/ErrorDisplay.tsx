'use client';

import React from 'react';
import { GitHubApiError } from '../../lib/types/github';

interface ErrorDisplayProps {
  error: GitHubApiError | Error;
  username?: string;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, username, onRetry, onReset }) => {
  const getErrorIcon = () => {
    if ('status' in error) {
      switch (error.status) {
        case 404:
          return (
            <svg className="w-16 h-16 text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          );
        case 403:
          return (
            <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          );
        default:
          return (
            <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" />
            </svg>
          );
      }
    }
    
    return (
      <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" />
      </svg>
    );
  };

  const getErrorTitle = () => {
    if ('status' in error) {
      switch (error.status) {
        case 404:
          return 'ユーザーが見つかりません';
        case 403:
          return 'API制限に達しました';
        case 500:
          return 'サーバーエラーが発生しました';
        default:
          return 'エラーが発生しました';
      }
    }
    return 'エラーが発生しました';
  };

  const getErrorMessage = () => {
    if ('status' in error) {
      switch (error.status) {
        case 404:
          return `「${username}」というユーザーは存在しないか、アクセスできません。ユーザー名を確認してください。`;
        case 403:
          return 'GitHub APIの制限に達しました。1時間後に再度お試しください。';
        case 500:
          return 'GitHub APIでエラーが発生しています。しばらく待ってから再度お試しください。';
        default:
          return error.message || '不明なエラーが発生しました。';
      }
    }
    return error.message || '不明なエラーが発生しました。';
  };

  const getSuggestions = () => {
    if ('status' in error) {
      switch (error.status) {
        case 404:
          return [
            'ユーザー名のスペルを確認してください',
            '大文字・小文字を正しく入力してください',
            'そのユーザーが実在するか確認してください',
            'プライベートアカウントの場合は診断できません'
          ];
        case 403:
          return [
            '1時間後に再度お試しください',
            'GitHub APIの制限が原因です',
            'しばらく時間をおいてからアクセスしてください'
          ];
        case 500:
          return [
            'GitHubのサーバーで一時的な問題が発生しています',
            'しばらく待ってから再度お試しください',
            '問題が継続する場合は後日お試しください'
          ];
        default:
          return [
            'ネットワーク接続を確認してください',
            'しばらく待ってから再度お試しください',
            'ページを更新してみてください'
          ];
      }
    }
    return [
      'ネットワーク接続を確認してください',
      'しばらく待ってから再度お試しください',
      'ページを更新してみてください'
    ];
  };

  const canRetry = () => {
    if ('status' in error) {
      return error.status !== 404; // 404エラーの場合はリトライボタンを表示しない
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700">
          <div className="text-center">
            {getErrorIcon()}
            
            <h2 className="text-2xl font-bold text-white mb-4">
              {getErrorTitle()}
            </h2>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {getErrorMessage()}
            </p>

            {/* Error Details */}
            {'status' in error && (
              <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">エラー詳細</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>ステータス: {error.status}</div>
                  {username && <div>ユーザー名: {username}</div>}
                  <div>時刻: {new Date().toLocaleString('ja-JP')}</div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-blue-300 mb-2">💡 解決方法</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                {getSuggestions().map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {canRetry() && (
                <button
                  onClick={onRetry}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  再試行
                </button>
              )}
              <button
                onClick={onReset}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium"
              >
                最初に戻る
              </button>
            </div>
          </div>
        </div>

        {/* Additional help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            問題が解決しない場合は、
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline ml-1"
            >
              GitHub
            </a>
            で正しいユーザー名を確認してください
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;