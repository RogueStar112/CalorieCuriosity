'use client';

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// Type definitions
interface Food {
  id: number;
  name: string;
  emoji: string;
  calories: number;
  serving?: string;
  caloriesPerGram?: number;
  displayCalories?: number;
  displayServing?: string;
}

// Sample food data - easy to expand!
const foodData: Food[] = [
  { id: 1, name: "Ranch Dip", emoji: "🥣", calories: 480, serving: "240ml", caloriesPerGram: 2.0 },
  { id: 2, name: "Cheese Pizza", emoji: "🍕", calories: 285, serving: "125g", caloriesPerGram: 2.28 },
  { id: 3, name: "Banana", emoji: "🍌", calories: 105, serving: "120g", caloriesPerGram: 0.88 },
  { id: 4, name: "Glazed Donut", emoji: "🍩", calories: 260, serving: "65g", caloriesPerGram: 4.0 },
  { id: 5, name: "Avocado", emoji: "🥑", calories: 240, serving: "200g", caloriesPerGram: 1.2 },
  { id: 6, name: "Soda", emoji: "🥤", calories: 140, serving: "355ml", caloriesPerGram: 0.39 },
  { id: 7, name: "French Fries", emoji: "🍟", calories: 320, serving: "100g", caloriesPerGram: 3.2 },
  { id: 8, name: "Grilled Chicken", emoji: "🍗", calories: 165, serving: "115g", caloriesPerGram: 1.43 },
  { id: 9, name: "Ice Cream", emoji: "🍨", calories: 270, serving: "240ml", caloriesPerGram: 1.13 },
  { id: 10, name: "Protein Bar", emoji: "🍫", calories: 200, serving: "60g", caloriesPerGram: 3.33 },
  { id: 11, name: "Caesar Salad", emoji: "🥗", calories: 390, serving: "300g", caloriesPerGram: 1.3 },
  { id: 12, name: "Bagel with Cream Cheese", emoji: "🥯", calories: 360, serving: "110g", caloriesPerGram: 3.27 },
  { id: 13, name: "Almonds", emoji: "🥜", calories: 170, serving: "28g", caloriesPerGram: 6.07 },
  { id: 14, name: "Smoothie Bowl", emoji: "🍓", calories: 310, serving: "350g", caloriesPerGram: 0.89 },
  { id: 15, name: "Burger", emoji: "🍔", calories: 540, serving: "220g", caloriesPerGram: 2.45 },
  { id: 16, name: "Apple", emoji: "🍎", calories: 95, serving: "180g", caloriesPerGram: 0.53 },
  { id: 17, name: "Chocolate Chip Cookie", emoji: "🍪", calories: 220, serving: "50g", caloriesPerGram: 4.4 },
  { id: 18, name: "Oatmeal", emoji: "🥣", calories: 150, serving: "240ml", caloriesPerGram: 0.63 },
  { id: 19, name: "Peanut Butter Sandwich", emoji: "🥪", calories: 380, serving: "100g", caloriesPerGram: 3.8 },
  { id: 20, name: "Energy Drink", emoji: "⚡", calories: 110, serving: "240ml", caloriesPerGram: 0.46 },
  { id: 21, name: "Cheesecake", emoji: "🍰", calories: 400, serving: "125g", caloriesPerGram: 3.2 },
  { id: 22, name: "Baked Potato", emoji: "🥔", calories: 160, serving: "150g", caloriesPerGram: 1.07 },
  { id: 23, name: "Taco", emoji: "🌮", calories: 210, serving: "100g", caloriesPerGram: 2.1 },
  { id: 24, name: "Brownie", emoji: "🧁", calories: 240, serving: "60g", caloriesPerGram: 4.0 },
  { id: 25, name: "Greek Yogurt", emoji: "🥛", calories: 130, serving: "170g", caloriesPerGram: 0.76 },
  { id: 26, name: "Sushi Roll", emoji: "🍣", calories: 290, serving: "180g", caloriesPerGram: 1.61 },
  { id: 27, name: "Potato Chips", emoji: "🥨", calories: 150, serving: "28g", caloriesPerGram: 5.36 },
  { id: 28, name: "Hot Dog", emoji: "🌭", calories: 290, serving: "140g", caloriesPerGram: 2.07 },
  { id: 29, name: "Pancakes with Syrup", emoji: "🥞", calories: 520, serving: "230g", caloriesPerGram: 2.26 },
  { id: 30, name: "Granola Bar", emoji: "🍫", calories: 140, serving: "40g", caloriesPerGram: 3.5 },
  { id: 31, name: "Orange", emoji: "🍊", calories: 62, serving: "130g", caloriesPerGram: 0.48 },
  { id: 32, name: "Croissant", emoji: "🥐", calories: 230, serving: "50g", caloriesPerGram: 4.6 },
  { id: 33, name: "Muffin", emoji: "🧁", calories: 425, serving: "115g", caloriesPerGram: 3.7 },
  { id: 34, name: "Chicken Wings", emoji: "🍗", calories: 430, serving: "140g", caloriesPerGram: 3.07 },
  { id: 35, name: "Quesadilla", emoji: "🫓", calories: 480, serving: "200g", caloriesPerGram: 2.4 },
  { id: 36, name: "Hummus", emoji: "🫘", calories: 180, serving: "100g", caloriesPerGram: 1.8 },
  { id: 37, name: "Steak", emoji: "🥩", calories: 270, serving: "115g", caloriesPerGram: 2.35 },
  { id: 38, name: "Fried Rice", emoji: "🍚", calories: 330, serving: "200g", caloriesPerGram: 1.65 },
  { id: 39, name: "Nachos", emoji: "🧀", calories: 560, serving: "200g", caloriesPerGram: 2.8 },
  { id: 40, name: "Strawberries", emoji: "🍓", calories: 50, serving: "150g", caloriesPerGram: 0.33 },
  { id: 41, name: "Salmon Fillet", emoji: "🐟", calories: 206, serving: "100g", caloriesPerGram: 2.06 },
  { id: 42, name: "Pasta Carbonara", emoji: "🍝", calories: 425, serving: "250g", caloriesPerGram: 1.7 },
  { id: 43, name: "Chocolate Bar", emoji: "🍫", calories: 235, serving: "45g", caloriesPerGram: 5.22 },
  { id: 44, name: "Waffles", emoji: "🧇", calories: 380, serving: "150g", caloriesPerGram: 2.53 },
  { id: 45, name: "Egg", emoji: "🥚", calories: 70, serving: "50g", caloriesPerGram: 1.4 },
  { id: 46, name: "Cottage Cheese", emoji: "🧈", calories: 98, serving: "100g", caloriesPerGram: 0.98 },
  { id: 47, name: "Pretzel", emoji: "🥨", calories: 380, serving: "100g", caloriesPerGram: 3.8 },
  { id: 48, name: "Burrito", emoji: "🌯", calories: 595, serving: "275g", caloriesPerGram: 2.16 },
  { id: 49, name: "Watermelon", emoji: "🍉", calories: 45, serving: "150g", caloriesPerGram: 0.3 },
  { id: 50, name: "Popcorn", emoji: "🍿", calories: 110, serving: "30g", caloriesPerGram: 3.67 }
];

export default function CalorieGame() {
  const MAX_ROUNDS = 10;
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [foodPair, setFoodPair] = useState<Food[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [usedPairs, setUsedPairs] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'more' | 'less'>('more');
  const [roundHistory, setRoundHistory] = useState<Array<{ 
    selectedFood: Food; 
    otherFood: Food;
    correct: boolean;
    selectedCalories: number;
    otherCalories: number;
  }>>([]);
  
  // Settings
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Generate a new random pair
  const generateNewPair = () => {
    let food1, food2;
    let pairKey;
    let attempts = 0;
    
    do {
      const index1 = Math.floor(Math.random() * foodData.length);
      let index2 = Math.floor(Math.random() * foodData.length);
      
      while (index2 === index1) {
        index2 = Math.floor(Math.random() * foodData.length);
      }
      
      food1 = { ...foodData[index1] };
      food2 = { ...foodData[index2] };
      
      // Handle portion sizes based on difficulty
      if (difficulty === 'easy') {
        // Easy mode: use base calories, no portion variation
        food1.displayCalories = food1.calories;
        food1.displayServing = food1.serving;
        food2.displayCalories = food2.calories;
        food2.displayServing = food2.serving;
      } else {
        // Medium and Hard: Randomize serving sizes (50-150% of base)
        if (food1.caloriesPerGram) {
          const multiplier = 0.5 + Math.random(); // 0.5 to 1.5
          const baseGrams = food1.calories / food1.caloriesPerGram;
          const newGrams = Math.round(baseGrams * multiplier);
          food1.displayCalories = Math.round(newGrams * food1.caloriesPerGram);
          food1.displayServing = `${newGrams}g`;
        } else {
          food1.displayCalories = food1.calories;
          food1.displayServing = food1.serving;
        }
        
        if (food2.caloriesPerGram) {
          const multiplier = 0.5 + Math.random(); // 0.5 to 1.5
          const baseGrams = food2.calories / food2.caloriesPerGram;
          const newGrams = Math.round(baseGrams * multiplier);
          food2.displayCalories = Math.round(newGrams * food2.caloriesPerGram);
          food2.displayServing = `${newGrams}g`;
        } else {
          food2.displayCalories = food2.calories;
          food2.displayServing = food2.serving;
        }
      }
      
      pairKey = [food1.id, food2.id].sort().join('-');
      attempts++;
      
      if (attempts > 100) {
        setGameOver(true);
        return;
      }
      
      const calorieDiff = Math.abs((food1.displayCalories || 0) - (food2.displayCalories || 0));
      
      // Hard mode: ensure calories are close (within 100 cal difference)
      const isValidForHard = difficulty === 'hard' ? calorieDiff <= 100 && calorieDiff > 0 : true;
      
      // Keep regenerating if: already used, equal calories, or invalid for hard mode
    } while (
      usedPairs.has(pairKey) || 
      food1.displayCalories === food2.displayCalories ||
      (difficulty === 'hard' && Math.abs((food1.displayCalories || 0) - (food2.displayCalories || 0)) > 100)
    );
    
    setUsedPairs(prev => new Set([...prev, pairKey]));
    setFoodPair([food1, food2]);
    setShowResult(false);
  };

  useEffect(() => {
    // Only generate pair when game starts
    if (gameStarted && foodPair.length === 0) {
      generateNewPair();
    }
  }, [gameStarted]);

  const handleGuess = (selectedFoodItem: Food) => {
    const otherFood = foodPair.find(f => f.id !== selectedFoodItem.id);
    
    if (!otherFood) return;
    
    const selectedCals = selectedFoodItem.displayCalories || selectedFoodItem.calories;
    const otherCals = otherFood.displayCalories || otherFood.calories;
    
    const correct = gameMode === 'more' 
      ? selectedCals > otherCals
      : selectedCals < otherCals;
    
    setSelectedFood(selectedFoodItem);
    setIsCorrect(correct);
    
    // Add to round history with both foods and calories
    setRoundHistory(prev => [...prev, { 
      selectedFood: selectedFoodItem, 
      otherFood: otherFood,
      correct,
      selectedCalories: selectedCals,
      otherCalories: otherCals
    }]);
    
    if (correct) {
      setScore(score + 1);
      const comparisonWord = gameMode === 'more' ? 'more' : 'fewer';
      setResultMessage(`Nice! ${selectedFoodItem.name} (${selectedFoodItem.displayServing}) has ${comparisonWord} calories: ${selectedCals} vs ${otherCals}`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      const comparisonWord = gameMode === 'more' ? 'more' : 'fewer';
      setResultMessage(`Actually, ${otherFood.name} (${otherFood.displayServing}) has ${comparisonWord} calories: ${otherCals} vs ${selectedCals}`);
    }
    
    setShowResult(true);
  };

  const nextRound = () => {
    if (round >= MAX_ROUNDS) {
      setGameOver(true);
      return;
    }
    
    const nextRoundNum = round + 1;
    setRound(nextRoundNum);
    
    // Switch to 'less' mode after round 5
    if (nextRoundNum === 6) {
      setGameMode('less');
    }
    
    setSelectedFood(null);
    setIsCorrect(false);
    generateNewPair();
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setUsedPairs(new Set());
    setGameOver(false);
    setGameMode('more');
    setRoundHistory([]);
    setGameStarted(false);
  };
  
  const startGame = () => {
    setGameStarted(true);
    generateNewPair();
  };

  // Title Screen
  if (!gameStarted) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
        darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-blue-50'
      }`}>
        <div className={`rounded-3xl shadow-xl p-8 max-w-md w-full ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Calorie Curiosity
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Test your food knowledge!
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Difficulty Level
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setDifficulty('easy')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  difficulty === 'easy'
                    ? darkMode
                      ? 'border-green-500 bg-green-900/30'
                      : 'border-green-500 bg-green-50'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🌱 Easy
                </div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Standard portions, no serving sizes shown
                </div>
              </button>

              <button
                onClick={() => setDifficulty('medium')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  difficulty === 'medium'
                    ? darkMode
                      ? 'border-green-500 bg-green-900/30'
                      : 'border-green-500 bg-green-50'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🔥 Medium
                </div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Random portion sizes shown
                </div>
              </button>

              <button
                onClick={() => setDifficulty('hard')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  difficulty === 'hard'
                    ? darkMode
                      ? 'border-green-500 bg-green-900/30'
                      : 'border-green-500 bg-green-50'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  💪 Hard
                </div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Random portions, close calorie counts
                </div>
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                  darkMode ? 'ml-6' : 'ml-0.5'
                }`}></div>
              </div>
            </button>
          </div>

          {/* Start Button */}
          <button
            onClick={startGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
        darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-blue-50'
      }`}>
        <div className={`rounded-3xl shadow-xl p-8 max-w-4xl w-full text-center ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Great job!
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You completed all 10 rounds!
          </p>
          <p className={`${darkMode ? 'text-gray-500' : 'text-black'} `}>Difficulty: {difficulty}</p>
          <p className="text-3xl font-bold text-green-600 mb-6">Final Score: {score}/{MAX_ROUNDS}</p>
          
          {/* Round History Grid */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Game Summary:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roundHistory.map((round, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border-2 ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <div className={`text-xs font-semibold mb-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Round {index + 1} {index < 5 ? '(More calories)' : '(Fewer calories)'}
                  </div>
                  <div className="flex gap-2 justify-center">
                    {/* Selected Food */}
                    <div
                      className={`flex-1 rounded-lg p-3 ${
                        round.correct 
                          ? 'bg-green-100 border-2 border-green-400' 
                          : 'bg-red-100 border-2 border-red-400'
                      }`}
                    >
                      <div className="text-3xl mb-1">{round.selectedFood.emoji}</div>
                      <div className="text-xs font-medium text-gray-700">{round.selectedFood.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{round.selectedFood.displayServing}</div>
                      <div className="text-sm font-bold text-gray-800 mt-1">{round.selectedCalories} cal</div>
                      <div className="text-xs font-semibold text-gray-600 mt-1">✓ Your pick</div>
                    </div>
                    
                    {/* Other Food */}
                    <div className={`flex-1 rounded-lg p-3 border-2 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="text-3xl mb-1">{round.otherFood.emoji}</div>
                      <div className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {round.otherFood.name}
                      </div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {round.otherFood.displayServing}
                      </div>
                      <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {round.otherCalories} cal
                      </div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Other option
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-blue-50'
    }`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <div className={`rounded-3xl shadow-xl p-8 max-w-2xl w-full ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Calorie Curiosity 🤔
          </h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Learning about food, one guess at a time
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Round: <span className="font-semibold">{round}/{MAX_ROUNDS}</span>
            </span>
            <span className="text-green-600">
              Score: <span className="font-semibold">{score}</span>
            </span>
          </div>
          {round === 6 && (
            <div className={`mt-3 px-4 py-2 rounded-lg inline-block border ${
              darkMode 
                ? 'bg-blue-900/30 border-blue-700' 
                : 'bg-blue-100 border-blue-300'
            }`}>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                🔄 Mode switched! Now guess which has FEWER calories
              </p>
            </div>
          )}
        </div>

        {/* Game Area */}
        {!showResult ? (
          <div>
            <p className={`text-center mb-6 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Which has {gameMode === 'more' ? <span className='font-extrabold text-green-600'>more</span> : <span className='font-black text-red-600 italic'>fewer</span>} calories?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodPair.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleGuess(food)}
                  className={`rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer border-2 ${
                    darkMode
                      ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600 hover:from-green-800 hover:to-green-700 hover:border-green-500'
                      : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:from-green-50 hover:to-green-100 hover:border-green-400'
                  }`}
                >
                  <div className="text-6xl mb-3">{food.emoji}</div>
                  <div className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {food.name}
                  </div>
                  {difficulty !== 'easy' && (
                    <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {food.displayServing}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex gap-4 items-end justify-center mb-6">
              {foodPair.map((food) => {
                const maxCalories = Math.max(...foodPair.map(f => f.displayCalories || f.calories));
                const minCalories = Math.min(...foodPair.map(f => f.displayCalories || f.calories));
                const calorieRange = maxCalories - minCalories;
                
                const minHeight = 200;
                const maxHeight = 350;
                const foodCals = food.displayCalories || food.calories;
                const heightScale = calorieRange > 0 
                  ? ((foodCals - minCalories) / calorieRange) * (maxHeight - minHeight) + minHeight
                  : minHeight;
                
                const wasSelected = selectedFood?.id === food.id;
                const isCorrectChoice = gameMode === 'more'
                  ? foodCals > (foodPair.find(f => f.id !== food.id)?.displayCalories || 0)
                  : foodCals < (foodPair.find(f => f.id !== food.id)?.displayCalories || 0);
                
                // Determine border styling
                let borderClass = '';
                if (isCorrect && wasSelected) {
                  // User was correct and this is their choice
                  borderClass = 'border-4 border-green-500 shadow-lg shadow-green-200';
                } else if (!isCorrect && wasSelected) {
                  // User was incorrect and this is their choice (wrong answer)
                  borderClass = 'border-4 border-red-500 shadow-lg shadow-red-200';
                } else if (!isCorrect && !wasSelected) {
                  // User was incorrect and this is the other choice (correct answer)
                  borderClass = 'border-4 border-green-500 shadow-lg shadow-green-200';
                } else {
                  // Default border
                  borderClass = darkMode 
                    ? 'border-2 border-gray-600' 
                    : 'border-2 border-gray-200';
                }
                
                return (
                  <div
                    key={food.id}
                    className={`rounded-2xl p-8 flex-1 transition-all ${borderClass} ${
                      darkMode && !borderClass.includes('green') && !borderClass.includes('red')
                        ? 'bg-gradient-to-br from-gray-700 to-gray-600'
                        : !borderClass.includes('green') && !borderClass.includes('red')
                        ? 'bg-gradient-to-br from-white to-gray-50'
                        : ''
                    }`}
                    style={{ height: `250px` }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-6xl mb-3">{food.emoji}</div>
                      <div className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {food.name}
                      </div>
                      <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {food.displayServing || food.serving}
                      </div>
                      <div className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {foodCals} cal
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`rounded-2xl p-6 mb-6 border-2 ${
              darkMode 
                ? 'bg-blue-900/30 border-blue-700'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {resultMessage}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Remember: All foods can be part of a balanced diet! 🌱
              </p>
            </div>
            <button
              onClick={nextRound}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Next Round →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
