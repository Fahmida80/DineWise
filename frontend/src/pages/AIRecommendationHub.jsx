import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AIRecommendationHub = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    weather: '',
    time: '',
    mood: ''
  });

  const weatherOptions = [
    { id: 'hot', label: '☀️ Hot Day', description: 'Light & Refreshing' },
    { id: 'cold', label: '❄️ Cold Day', description: 'Warm & Comforting' },
    { id: 'rainy', label: '🌧️ Rainy Day', description: 'Cozy & Hearty' }
  ];

  const timeOptions = [
    { id: 'breakfast', label: '🍳 Breakfast', description: 'Morning Boosters' },
    { id: 'lunch', label: '🍔 Lunch', description: 'Midday Specials' },
    { id: 'dinner', label: '🍽️ Dinner', description: 'Evening Delights' },
    { id: 'dessert', label: '🍰 Dessert', description: 'Sweet Endings' }
  ];

  const moodOptions = [
    { id: 'comfort', label: '💖 Comfort Food', description: 'Warm & Familiar' },
    { id: 'light', label: '🥗 Light Meal', description: 'Fresh & Healthy' },
    { id: 'spicy', label: '🌶️ Spicy', description: 'Bold & Adventurous' },
    { id: 'popular', label: '🔥 Popular', description: 'Customer Favorites' }
  ];

  const handleSelection = (type, value) => {
    setSelections(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  const getRecommendations = () => {
    const params = new URLSearchParams();
    if (selections.weather) params.append('weather', selections.weather);
    if (selections.time) params.append('time', selections.time);
    if (selections.mood) params.append('mood', selections.mood);

    navigate(`/ai-recommendations/results?${params.toString()}`);
  };

  const isAnySelected = selections.weather || selections.time || selections.mood;

  return (    
      <div className="min-h-screen p-6 bg-gradient-to-br from-rose-50 to-amber-50">
        <Navbar /> 
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">
              DineWise AI Chef 🤖
            </h1>
            <p className="text-lg text-gray-600">
              Discover your perfect meal match based on current conditions
            </p>
          </div>

          {/* Weather Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-rose-700 mb-6 text-center">WEATHER</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weatherOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelection('weather', option.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    selections.weather === option.id
                      ? 'border-rose-500 bg-rose-100 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-rose-300'
                  }`}
                >
                  <div className="text-3xl mb-3">{option.label.split(' ')[0]}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-700 mb-6 text-center">TIME OF DAY</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelection('time', option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    selections.time === option.id
                      ? 'border-amber-500 bg-amber-100 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.label.split(' ')[0]}</div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{option.label}</h3>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Mood Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">MOOD & PREFERENCE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moodOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSelection('mood', option.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    selections.mood === option.id
                      ? 'border-purple-500 bg-purple-100 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.label.split(' ')[0]}</div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{option.label}</h3>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={getRecommendations}
              disabled={!isAnySelected}
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                isAnySelected
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🎯 GET RECOMMENDATIONS
            </button>
            
            {!isAnySelected && (
              <p className="text-sm text-gray-500 mt-4">
                Select at least one option to get recommendations
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default AIRecommendationHub;