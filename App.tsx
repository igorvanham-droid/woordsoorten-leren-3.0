
import React, { useState, useEffect, useCallback } from 'react';
import { generateSentence } from './services/geminiService';
import { SentenceData, WordType, UserSelections } from './types';
import { WORD_TYPE_CONFIG } from './constants';
import Word from './components/Word';
import LegendItem from './components/LegendItem';
import Confetti from './components/Confetti';
import Flower from './components/Flower';

// Enum for managing the state of the game
enum GameState {
  LOADING,
  PLAYING,
  CHECKED,
  COMPLETED,
  ERROR,
}

const App: React.FC = () => {
  const [sentenceData, setSentenceData] = useState<SentenceData | null>(null);
  const [userSelections, setUserSelections] = useState<UserSelections>({});
  const [selectedWordType, setSelectedWordType] = useState<WordType | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.LOADING);
  const [error, setError] = useState<string | null>(null);
  const [mistakeCount, setMistakeCount] = useState<Map<number, number>>(new Map());
  const [lockedWords, setLockedWords] = useState<Set<number>>(new Set());
  const [flowers, setFlowers] = useState<{ id: number; style: React.CSSProperties; color: string }[]>([]);


  // Fetches a new sentence from the Gemini service
  const fetchSentence = useCallback(async () => {
    setGameState(GameState.LOADING);
    setSentenceData(null);
    setUserSelections({});
    setSelectedWordType(null);
    setError(null);
    setMistakeCount(new Map());
    setLockedWords(new Set());
    try {
      const data = await generateSentence();
      setSentenceData(data);
      setGameState(GameState.PLAYING);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState(GameState.ERROR);
    }
  }, []);
  
  // Add a flower when a sentence is completed
  useEffect(() => {
    if (gameState === GameState.COMPLETED) {
      const petalColors = ['#f87171', '#fb923c', '#facc15', '#a78bfa', '#60a5fa'];
      const randomPetalColor = petalColors[Math.floor(Math.random() * petalColors.length)];
      const newFlower = {
        id: Date.now(),
        style: {
          left: `${Math.random() * 90 + 5}%`, // Position from 5% to 95%
          animationDelay: `${Math.random() * 0.5}s`,
        },
        color: randomPetalColor,
      };
      setFlowers(prevFlowers => [...prevFlowers, newFlower]);
    }
  }, [gameState]);


  // Fetch a sentence on initial component mount
  useEffect(() => {
    fetchSentence();
  }, [fetchSentence]);

  // Handles clicking on a word in the sentence
  const handleWordClick = (index: number) => {
    if (selectedWordType && gameState === GameState.PLAYING && !lockedWords.has(index)) {
      setUserSelections(prev => ({ ...prev, [index]: selectedWordType }));
    }
  };
  
  // Handles selecting a word type from the legend
  const handleLegendClick = (type: WordType) => {
    if (gameState === GameState.PLAYING) {
      setSelectedWordType(type === selectedWordType ? null : type);
    }
  };

  // Checks the user's answers against the correct ones
  const checkAnswers = () => {
    if (!sentenceData) return;

    // Fix: Explicitly type `newMistakeCount` to `Map<number, number>` to resolve a
    // TypeScript inference issue that caused the error on line 81.
    const newMistakeCount = new Map<number, number>(mistakeCount);
    const newLockedWords = new Set(lockedWords);
    let allCorrect = true;

    sentenceData.words.forEach((wordData, index) => {
        const isCorrect = userSelections[index] === wordData.type;
        if (isCorrect) {
            newLockedWords.add(index);
        } else {
            allCorrect = false;
            const currentMistakes = newMistakeCount.get(index) || 0;
            newMistakeCount.set(index, currentMistakes + 1);
        }
    });

    setMistakeCount(newMistakeCount);
    setLockedWords(newLockedWords);

    if (allCorrect) {
      setGameState(GameState.COMPLETED);
    } else {
      setGameState(GameState.CHECKED);
    }
  };
  
  // Allows the user to try again after checking
  const tryAgain = () => {
      setGameState(GameState.PLAYING);
  };

  // Renders the main content based on the game state
  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING:
        return <p className="text-xl">Een zin wordt geladen...</p>;
      case GameState.ERROR:
        return (
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">Fout: {error}</p>
            <button
              onClick={fetchSentence}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Probeer opnieuw
            </button>
          </div>
        );
      case GameState.PLAYING:
      case GameState.CHECKED:
      case GameState.COMPLETED:
        if (!sentenceData) return null;
        return (
          <>
            <div className="flex flex-wrap justify-center items-start gap-4 p-6 bg-white rounded-xl shadow-lg mb-8">
              {sentenceData.words.map((wordData, index) => {
                const userSelection = userSelections[index];
                const isLocked = lockedWords.has(index);
                let result: 'correct' | 'incorrect' | 'unanswered' = 'unanswered';
                
                if ((gameState === GameState.CHECKED || gameState === GameState.COMPLETED)) {
                    result = isLocked ? 'correct' : 'incorrect';
                } else if (isLocked) { // Keep correct words green during retry (PLAYING state)
                    result = 'correct';
                }

                const currentMistakes = mistakeCount.get(index) || 0;

                return (
                  <Word
                    key={index}
                    wordData={wordData}
                    userSelection={userSelection}
                    onClick={() => handleWordClick(index)}
                    result={result}
                    disabled={gameState !== GameState.PLAYING || isLocked}
                    hintAbbreviation={ (result === 'incorrect' && currentMistakes >= 2) ? WORD_TYPE_CONFIG[wordData.type].abbreviation : undefined}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {Object.entries(WORD_TYPE_CONFIG).map(([type, config]) => (
                <LegendItem
                  key={type}
                  type={type as WordType}
                  config={config}
                  onClick={() => handleLegendClick(type as WordType)}
                  disabled={gameState !== GameState.PLAYING}
                  isSelected={selectedWordType === type}
                />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Renders action buttons based on the game state
  const renderButtons = () => {
    switch(gameState) {
        case GameState.PLAYING:
            return (
                <button 
                    onClick={checkAnswers}
                    disabled={Object.keys(userSelections).length !== sentenceData?.words.length}
                    className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Controleer
                </button>
            );
        case GameState.CHECKED:
            return (
                <button 
                    onClick={tryAgain}
                    className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Probeer opnieuw
                </button>
            );
        case GameState.COMPLETED:
             return (
                <button 
                    onClick={fetchSentence}
                    className="px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-lg hover:bg-purple-700 transition-colors shadow-lg animate-pulse"
                >
                    Volgende zin!
                </button>
            );
        default:
            return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
       {gameState === GameState.COMPLETED && <Confetti />}
       <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-10">
        {flowers.map(flower => (
          <Flower key={flower.id} style={flower.style} color={flower.color} />
        ))}
      </div>
      <div className="w-full max-w-4xl mx-auto relative z-20">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#F5F5DC] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">Woordsoorten Oefenen</h1>
          <p className="text-lg text-[#F5F5DC] mt-2 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">Klik op een woordsoort en wijs het toe aan het juiste woord in de zin.</p>
        </header>
        
        <main className="flex flex-col items-center">
            {renderContent()}
            
            <div className="flex justify-center gap-4 mt-4">
               {renderButtons()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
