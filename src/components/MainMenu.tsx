import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LevelSelect } from './LevelSelect';
import { GameBanner } from './GameBanner';

export function MainMenu() {
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Banner and diagonal lines */}
      <GameBanner />
      <div className="absolute w-[467.62px] h-[1px] left-0 top-[237px] bg-black rotate-[33.49deg]" />
      <div className="absolute w-[463.79px] h-[1px] left-0 top-[490px] bg-black rotate-[-32.76deg]" />
      
      {/* Buttons container */}
      <div className="absolute w-[279px] left-[56px] space-y-12">
        <button
          onClick={() => navigate('/level/1')}
          className="w-full h-[51px] bg-[#8E8E8E] text-white font-bold text-2xl rounded-lg"
        >
          开始游戏
        </button>
        
        <button
          onClick={() => setShowLevelSelect(true)}
          className="w-full h-[51px] bg-[#8E8E8E] text-white font-bold text-2xl rounded-lg"
        >
          选择关卡
        </button>
      </div>

      {/* Level select modal */}
      {showLevelSelect && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl bg-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">选择关卡</h2>
              <button 
                onClick={() => setShowLevelSelect(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LevelSelect onClose={() => setShowLevelSelect(false)} />
          </div>
        </div>
      )}
    </div>
  );
}