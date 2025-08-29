const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  dutch: { type: String, required: true },
  english: { type: String, required: true },
  pronunciation: { type: String },
  partOfSpeech: { 
    type: String, 
    enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection', 'article'],
    required: true 
  },
  gender: { type: String, enum: ['de', 'het', 'n/a'], default: 'n/a' }, // for nouns
  plural: { type: String }, // plural form for nouns
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  frequency: { type: Number, default: 1 }, // how common the word is (1-10)
  examples: [{
    dutch: String,
    english: String
  }],
  synonyms: [String],
  antonyms: [String],
  imageUrl: String,
  audioUrl: String
});

const vocabularySchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // daily-life, time-dates, directions, etc.
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], default: 'A2' },
  words: [wordSchema],
  totalWords: { type: Number, default: 0 },
  icon: { type: String }, // emoji or icon class
  color: { type: String, default: '#2563eb' },
  estimatedTime: { type: Number }, // in minutes to learn
  tags: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update totalWords before saving
vocabularySchema.pre('save', function(next) {
  this.totalWords = this.words.length;
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
vocabularySchema.index({ topicId: 1 });
vocabularySchema.index({ category: 1, level: 1 });
vocabularySchema.index({ 'words.dutch': 'text', 'words.english': 'text' });

module.exports = mongoose.model('Vocabulary', vocabularySchema);