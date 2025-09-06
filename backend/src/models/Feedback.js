// src/models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  sentimentScore: { 
    type: Number 
  },
  sentiment: { 
    type: String, 
    enum: ['positive', 'neutral', 'negative'] 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Feedback', feedbackSchema);