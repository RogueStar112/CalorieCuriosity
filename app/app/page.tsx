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
  { id: 30, name: "Granola Bar", emoji: "🍫", calories: 140, serving: "40g", caloriesPerGram: 3.5 }
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
      
      // Randomize serving sizes (50-150% of base)
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
      
      pairKey = [food1.id, food2.id].sort().join('-');
      attempts++;
      
      if (attempts > 50) {
        setGameOver(true);
        return;
      }
    } while (usedPairs.has(pairKey));
    
    setUsedPairs(prev => new Set([...prev, pairKey]));
    setFoodPair([food1, food2]);
    setShowResult(false);
  };

  useEffect(() => {
    generateNewPair();
  }, []);

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
    generateNewPair();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Great job!</h2>
          <p className="text-gray-600 mb-4">You completed all 10 rounds!</p>
          <p className="text-3xl font-bold text-green-600 mb-6">Final Score: {score}/{MAX_ROUNDS}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Calorie Curiosity</h1>
          <p className="text-gray-600">Learning about food, one guess at a time</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="text-gray-700">Round: <span className="font-semibold">{round}/{MAX_ROUNDS}</span></span>
            <span className="text-green-600">Score: <span className="font-semibold">{score}</span></span>
          </div>
          {round === 6 && (
            <div className="mt-3 px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg inline-block">
              <p className="text-sm text-blue-800 font-medium">🔄 Mode switched! Now guess which has FEWER calories</p>
            </div>
          )}
        </div>

        {/* Game Area */}
        {!showResult ? (
          <div>
            <p className="text-center text-gray-700 mb-6 text-lg">
              Which has {gameMode === 'more' ? 'more' : 'fewer'} calories?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodPair.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleGuess(food)}
                  className="bg-gradient-to-br from-white to-gray-50 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-400 rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <div className="text-6xl mb-3">{food.emoji}</div>
                  <div className="text-xl font-semibold text-gray-800">{food.name}</div>
                  <div className="text-md font-light text-gray-800">{food.displayServing}</div>
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
                const shouldShowGreen = wasSelected && isCorrect;
                
                return (
                  <div
                    key={food.id}
                    className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 flex-1 transition-all ${
                      shouldShowGreen ? 'border-4 border-green-500 shadow-lg shadow-green-200' : 'border-2 border-gray-200'
                    }`}
                    style={{ height: `${heightScale}px` }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-6xl mb-3">{food.emoji}</div>
                      <div className="text-xl font-semibold text-gray-800">{food.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{food.displayServing || food.serving}</div>
                      <div className="text-sm text-gray-600 mt-2">{foodCals} cal</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
              <p className="text-lg text-gray-700 mb-4">{resultMessage}</p>
              <p className="text-sm text-gray-500">Remember: All foods can be part of a balanced diet! 🌱</p>
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
