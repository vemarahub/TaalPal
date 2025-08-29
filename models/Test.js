const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['multiple-choice', 'fill-blank', 'true-false', 'matching', 'ordering'],
    default: 'multiple-choice'
  },
  options: [String], // for multiple choice
  correctAnswer: mongoose.Schema.Types.Mixed, // can be number, string, or array
  explanation: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  points: { type: Number, default: 1 },
  category: String, // grammar, vocabulary, reading, etc.
  tags: [String],
  timeLimit: { type: Number, default: 60 }, // seconds
  hints: [String]
});

const testSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['quick', 'full', 'topic', 'practice'],
    required: true 
  },
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], default: 'A2' },
  questions: [questionSchema],
  totalQuestions: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  timeLimit: { type: Number, required: true }, // in minutes
  passingScore: { type: Number, default: 60 }, // percentage
  categories: [String], // topics covered
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate totals before saving
testSchema.pre('save', function(next) {
  this.totalQuestions = this.questions.length;
  this.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
  this.updatedAt = new Date();
  next();
});

// Test result schema for storing user attempts
const testResultSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // can be session ID for anonymous users
  testId: { type: String, required: true },
  answers: [{
    questionIndex: Number,
    userAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeSpent: Number // seconds
  }],
  score: { type: Number, required: true }, // points earned
  percentage: { type: Number, required: true },
  timeSpent: { type: Number, required: true }, // total time in seconds
  passed: { type: Boolean, required: true },
  completedAt: { type: Date, default: Date.now }
});

// Index for better query performance
testSchema.index({ testId: 1 });
testSchema.index({ type: 1, level: 1 });
testSchema.index({ categories: 1 });

testResultSchema.index({ userId: 1, testId: 1 });
testResultSchema.index({ completedAt: -1 });

const Test = mongoose.model('Test', testSchema);
const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = { Test, TestResult };