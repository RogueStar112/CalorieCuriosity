'use client';

import React, { useState, useEffect } from 'react';

// Type definitions
interface Food {
  id: number;
  name: string;
  emoji: string;
  calories: number;
  serving?: string;
}

// Sample food data - easy to expand!
const foodData: Food[] = [
  { id: 1, name: "Pot of Ranch Dip", emoji: "🥣", calories: 480, serving: "1 cup" },
  { id: 2, name: "Slice of Cheese Pizza", emoji: "🍕", calories: 285, serving: "1 slice" },
  { id: 3, name: "Medium Banana", emoji: "🍌", calories: 105, serving: "1 medium" },
  { id: 4, name: "Glazed Donut", emoji: "🍩", calories: 260, serving: "1 donut" },
  { id: 5, name: "Avocado", emoji: "🥑", calories: 240, serving: "1 whole" },
  { id: 6, name: "Can of Soda", emoji: "🥤", calories: 140, serving: "12 oz" },
  { id: 7, name: "Small Fries", emoji: "🍟", calories: 320, serving: "small order" },
  { id: 8, name: "Grilled Chicken Breast", emoji: "🍗", calories: 165, serving: "4 oz" },
  { id: 9, name: "Cup of Ice Cream", emoji: "🍨", calories: 270, serving: "1 cup" },
  { id: 10, name: "Protein Bar", emoji: "🍫", calories: 200, serving: "1 bar" },
  { id: 11, name: "Caesar Salad", emoji: "🥗", calories: 390, serving: "1 bowl" },
  { id: 12, name: "Bagel with Cream Cheese", emoji: "🥯", calories: 360, serving: "1 bagel" },
  { id: 13, name: "Handful of Almonds", emoji: "🥜", calories: 170, serving: "1 oz" },
  { id: 14, name: "Smoothie Bowl", emoji: "🍓", calories: 310, serving: "1 bowl" },
  { id: 15, name: "Burger", emoji: "🍔", calories: 540, serving: "1 burger" },
  { id: 16, name: "Large Apple", emoji: "🍎", calories: 95, serving: "1 large" },
  { id: 17, name: "Chocolate Chip Cookie", emoji: "🍪", calories: 220, serving: "1 cookie" },
  { id: 18, name: "Bowl of Oatmeal", emoji: "🥣", calories: 150, serving: "1 cup" },
  { id: 19, name: "Peanut Butter Sandwich", emoji: "🥪", calories: 380, serving: "1 sandwich" },
  { id: 20, name: "Energy Drink", emoji: "⚡", calories: 110, serving: "8 oz" },
  { id: 21, name: "Slice of Cheesecake", emoji: "🍰", calories: 400, serving: "1 slice" },
  { id: 22, name: "Baked Potato", emoji: "🥔", calories: 160, serving: "1 medium" },
  { id: 23, name: "Taco", emoji: "🌮", calories: 210, serving: "1 taco" },
  { id: 24, name: "Brownie", emoji: "🧁", calories: 240, serving: "1 brownie" },
  { id: 25, name: "Greek Yogurt Cup", emoji: "🥛", calories: 130, serving: "6 oz" },
  { id: 26, name: "Sushi Roll", emoji: "🍣", calories: 290, serving: "6 pieces" },
  { id: 27, name: "Bag of Chips", emoji: "🥨", calories: 150, serving: "1 oz" },
  { id: 28, name: "Hot Dog", emoji: "🌭", calories: 290, serving: "1 hot dog" },
  { id: 29, name: "Pancakes with Syrup", emoji: "🥞", calories: 520, serving: "3 pancakes" },
  { id: 30, name: "Granola Bar", emoji: "🍫", calories: 140, serving: "1 bar" }
];

export default function CalorieGame() {
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [foodPair, setFoodPair] = useState<Food[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [usedPairs, setUsedPairs] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);

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
      
      food1 = foodData[index1];
      food2 = foodData[index2];
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

  const handleGuess = (selectedFood: Food) => {
    const otherFood = foodPair.find(f => f.id !== selectedFood.id);
    
    if (!otherFood) return;
    
    const isCorrect = selectedFood.calories > otherFood.calories;
    
    if (isCorrect) {
      setScore(score + 1);
      setResultMessage(`Nice! ${selectedFood.name} has ${selectedFood.calories} cal vs ${otherFood.name}'s ${otherFood.calories} cal`);
    } else {
      setResultMessage(`Actually, ${otherFood.name} has ${otherFood.calories} cal vs ${selectedFood.name}'s ${selectedFood.calories} cal`);
    }
    
    setShowResult(true);
  };

  const nextRound = () => {
    setRound(round + 1);
    generateNewPair();
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setUsedPairs(new Set());
    setGameOver(false);
    generateNewPair();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Great job!</h2>
          <p className="text-gray-600 mb-4">You've explored all the food combinations!</p>
          <p className="text-3xl font-bold text-green-600 mb-6">Final Score: {score}/{round - 1}</p>
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
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Calorie Curiosity 🤔</h1>
          <p className="text-gray-600">Learning about food, one guess at a time</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="text-gray-700">Round: <span className="font-semibold">{round}</span></span>
            <span className="text-green-600">Score: <span className="font-semibold">{score}</span></span>
          </div>
        </div>

        {/* Game Area */}
        {!showResult ? (
          <div>
            <p className="text-center text-gray-700 mb-6 text-lg">Which has more calories?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodPair.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleGuess(food)}
                  className="bg-gradient-to-br from-white to-gray-50 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-400 rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <div className="text-6xl mb-3">{food.emoji}</div>
                  <div className="text-xl font-semibold text-gray-800">{food.name}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
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
