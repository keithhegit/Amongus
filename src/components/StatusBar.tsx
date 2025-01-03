import React from 'react';

interface StatusBarProps {
  remainingMistakes: number;
  isJudgmentMode: boolean;
  onToggleJudgmentMode: () => void;
  isSaving?: boolean;
  saveError?: Error | null;
}

export function StatusBar({ 
  remainingMistakes, 
  isJudgmentMode, 
  onToggleJudgmentMode,
  isSaving,
  saveError
}: StatusBarProps) {
  return (
    <div className="flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        {/* Level progress */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 ${
                  i < remainingMistakes 
                    ? 'bg-red-500 border-red-700' 
                    : 'bg-gray-700 border-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action button */}
        <button
          className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
            isJudgmentMode 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          onClick={onToggleJudgmentMode}
        >
          {isJudgmentMode ? '取消判定' : '开始判定'}
        </button>
      </div>
      
      {/* Status messages */}
      {(isSaving || saveError) && (
        <div className={`px-4 py-1 ${saveError ? 'bg-red-900' : 'bg-gray-800'}`}>
          <p className={`text-xs ${saveError ? 'text-red-200' : 'text-gray-300'}`}>
            {saveError ? '保存失败' : '保存中...'}
          </p>
        </div>
      )}
    </div>
  );
}