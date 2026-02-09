
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Header from './components/Header';
import TheoryView from './components/TheoryView';
import GameView from './components/GameView';
import QuizView from './components/QuizView';
import TutorView from './components/TutorView';
import SettingsView from './components/SettingsView';
import { hasStoredApiKey } from './services/gemini';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isKeyMissing, setIsKeyMissing] = useState(false);

  useEffect(() => {
    setIsKeyMissing(!hasStoredApiKey());
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case View.THEORY:
        return <TheoryView />;
      case View.GAMES:
        return <GameView />;
      case View.QUIZ:
        return <QuizView />;
      case View.TUTOR:
        return <TutorView setView={setCurrentView} />;
      case View.SETTINGS:
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-12 py-12 px-4 text-center">
            {isKeyMissing && (
              <div className="w-full max-w-2xl bg-red-100 border-4 border-black p-4 rounded-2xl neo-card flex items-center justify-between animate-bounce-short">
                <div className="flex items-center space-x-3 text-left">
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <p className="font-black text-black uppercase text-sm tracking-tight">Cần nạp năng lượng AI!</p>
                    <p className="text-xs font-bold text-gray-700">Con hãy cài đặt API Key để trò chuyện với thầy Pi nhé.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentView(View.SETTINGS)}
                  className="bg-black text-white px-4 py-2 rounded-xl font-black text-xs uppercase neo-btn"
                >
                  Cài đặt ngay ⚙️
                </button>
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-1 bg-black rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=Capybara&backgroundColor=ffdfbf" 
                alt="Capybara Mascot" 
                className="relative w-40 h-40 rounded-full border-4 border-black bg-white neo-card"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 border-2 border-black px-3 py-1 rounded-full font-bold text-sm rotate-12">
                Zìa thui! 🍊
              </div>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-4 uppercase italic">
                Toán 8 <span className="text-pink-500">Chill</span> Phết!
              </h1>
              <p className="text-2xl font-bold text-gray-800 bg-white border-2 border-black inline-block px-4 py-2 rotate-[-1deg]">
                Chinh phục 7 hằng đẳng thức cùng thầy Pi & Capy 🤟
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
              <MenuCard 
                title="HỌC BÀI" 
                desc="Dễ như ăn kẹo!" 
                icon="📘" 
                color="bg-cyan-300" 
                onClick={() => setCurrentView(View.THEORY)} 
              />
              <MenuCard 
                title="PHÁ ĐẢO" 
                desc="Game cực cuốn, quà cực phê" 
                icon="🎮" 
                color="bg-purple-400" 
                onClick={() => setCurrentView(View.GAMES)} 
              />
              <MenuCard 
                title="THỬ THÁCH" 
                desc="Cày sao, nhận thưởng" 
                icon="📝" 
                color="bg-yellow-300" 
                onClick={() => setCurrentView(View.QUIZ)} 
              />
              <MenuCard 
                title="THẦY PI" 
                desc="Gia sư AI cực xịn" 
                icon="🤖" 
                color="bg-pink-400" 
                onClick={() => setCurrentView(View.TUTOR)} 
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="container mx-auto max-w-6xl pt-6">
        {renderContent()}
      </main>
      
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border-4 border-black rounded-full flex justify-around p-2 w-[90%] md:hidden z-50 neo-card">
        <NavButton icon="🏠" label="Chủ" active={currentView === View.HOME} onClick={() => setCurrentView(View.HOME)} />
        <NavButton icon="📘" label="Học" active={currentView === View.THEORY} onClick={() => setCurrentView(View.THEORY)} />
        <NavButton icon="🎮" label="Game" active={currentView === View.GAMES} onClick={() => setCurrentView(View.GAMES)} />
        <NavButton icon="📝" label="Quiz" active={currentView === View.QUIZ} onClick={() => setCurrentView(View.QUIZ)} />
        <NavButton icon="🤖" label="AI" active={currentView === View.TUTOR} onClick={() => setCurrentView(View.TUTOR)} />
      </nav>
    </div>
  );
};

const MenuCard: React.FC<{ title: string, desc: string, icon: string, color: string, onClick: () => void }> = ({ title, desc, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} text-black p-8 rounded-2xl neo-card text-left flex items-center space-x-6 group`}
  >
    <span className="text-6xl group-hover:scale-125 transition-transform duration-300">{icon}</span>
    <div>
      <h3 className="text-3xl font-black mb-1 uppercase tracking-tight">{title}</h3>
      <p className="font-bold opacity-80">{desc}</p>
    </div>
  </button>
);

const NavButton: React.FC<{ icon: string, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center px-4 py-1 rounded-full transition-all ${active ? 'bg-black text-white' : 'text-black'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-black uppercase">{label}</span>
  </button>
);

export default App;
