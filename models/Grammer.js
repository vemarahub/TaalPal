const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  dutch: { type: String, required: true },
  english: { type: String, required: true },
  pronunciation: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  examples: [exampleSchema],
  exercises: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  order: { type: Number, required: true }
});

const grammarSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], default: 'A2' },
  category: { type: String, required: true }, // verbs, sentence-structure, tenses, adjectives
  lessons: [lessonSchema],
  totalLessons: { type: Number, default: 0 },
  estimatedTime: { type: Number }, // in minutes
  prerequisites: [{ type: String }], // other topic IDs
  tags: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update totalLessons before saving
grammarSchema.pre('save', function(next) {
  this.totalLessons = this.lessons.length;
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
grammarSchema.index({ topicId: 1 });
grammarSchema.index({ category: 1, level: 1 });
grammarSchema.index({ tags: 1 });

module.exports = mongoose.model('Grammar', grammarSchema);