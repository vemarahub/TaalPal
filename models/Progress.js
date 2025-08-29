const mongoose = require('mongoose');

const lessonProgressSchema = new mongoose.Schema({
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in seconds
  completedAt: { type: Date },
  attempts: { type: Number, default: 0 }
});

const topicProgressSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  topicType: { type: String, enum: ['grammar', 'vocabulary'], required: true },
  lessonsProgress: [lessonProgressSchema],
  overallProgress: { type: Number, default: 0 }, // percentage
  totalTimeSpent: { type: Number, default: 0 }, // in seconds
  lastAccessedAt: { type: Date, default: Date.now }
});

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // can be session ID for anonymous users
  level: { type: String, enum: ['A1', 'A2', 'B1', 'B2'], default: 'A2' },
  grammarProgress: [topicProgressSchema],
  vocabularyProgress: [topicProgressSchema],
  testResults: [{
    testId: String,
    score: Number,
    percentage: Number,
    completedAt: Date
  }],
  streakDays: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  totalStudyTime: { type: Number, default: 0 }, // in seconds
  achievements: [{
    achievementId: String,
    title: String,
    description: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  preferences: {
    language: { type: String, default: 'en' }, // interface language
    notifications: { type: Boolean, default: true },
    studyReminders: { type: Boolean, default: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update progress calculations
progressSchema.methods.updateTopicProgress = function(topicId, topicType) {
  const topicProgress = this[`${topicType}Progress`].find(tp => tp.topicId === topicId);
  if (topicProgress) {
    const completedLessons = topicProgress.lessonsProgress.filter(lp => lp.completed).length;
    const totalLessons = topicProgress.lessonsProgress.length;
    topicProgress.overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    topicProgress.lastAccessedAt = new Date();
  }
  this.updatedAt = new Date();
};

// Update streak
progressSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastActive = new Date(this.lastActiveDate);
  const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    this.streakDays += 1;
  } else if (daysDiff > 1) {
    this.streakDays = 1;
  }
  
  this.lastActiveDate = today;
};

// Index for better query performance
progressSchema.index({ userId: 1 });
progressSchema.index({ level: 1 });
progressSchema.index({ lastActiveDate: -1 });

module.exports = mongoose.model('Progress', progressSchema);