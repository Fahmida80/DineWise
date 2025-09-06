import MenuItem from '../models/MenuItem.js';

// Get intelligent dish recommendations based on multiple factors
export const getRecommendations = async (req, res) => {
  try {
    const { weather, time, mood, preference } = req.query;
    
    // Build the tag query array based on input
    const tagQuery = [];
    
    // Map weather to tags
    if (weather) {
      const weatherMap = {
        'hot': 'hot-weather',
        'cold': 'cold-weather', 
        'rainy': 'rainy-weather'
      };
      if (weatherMap[weather]) {
        tagQuery.push(weatherMap[weather]);
      }
    }
    
    // Map time of day to tags
    if (time) {
      const timeMap = {
        'morning': 'breakfast',
        'afternoon': 'lunch',
        'evening': 'dinner',
        'night': 'dessert'
      };
      if (timeMap[time]) {
        tagQuery.push(timeMap[time]);
      }
    }
    
    // Map mood/preference to tags
    if (mood) {
      const moodMap = {
        'comfort': 'comfort-food',
        'light': 'light-meal',
        'spicy': 'spicy',
        'popular': 'popular'
      };
      if (moodMap[mood]) {
        tagQuery.push(moodMap[mood]);
      }
    }
    
    // Add direct preference if provided
    if (preference) {
      tagQuery.push(preference);
    }
    
    // If no tags specified, return popular items
    if (tagQuery.length === 0) {
      tagQuery.push('popular');
    }
    
    // Query database for items matching ANY of the tags
    const recommendedItems = await MenuItem.find({
      tags: { $in: tagQuery }
    });
    
    res.status(200).json({
      success: true,
      count: recommendedItems.length,
      criteria: {
        weather,
        time, 
        mood,
        preference
      },
      data: recommendedItems
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
};

// Get all available tags for frontend
export const getAvailableTags = async (req, res) => {
  try {
    const tags = await MenuItem.distinct('tags');
    res.status(200).json({
      success: true,
      data: tags
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message
    });
  }
};