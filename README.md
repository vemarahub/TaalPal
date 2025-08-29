# TaalPal - Dutch Learning Platform

TaalPal is a comprehensive Dutch learning platform designed for A2 level students. It features interactive grammar lessons, vocabulary building, mock tests, and an AI chat assistant.

## 🚀 Features

- **Grammar Lessons**: Interactive lessons covering verbs, sentence structure, tenses, and adjectives
- **Vocabulary Builder**: Themed vocabulary with pronunciation and examples
- **Mock Tests**: Quick tests, full assessments, and topic-specific practice
- **AI Chat Assistant**: Conversational practice with bilingual responses
- **Progress Tracking**: Monitor learning progress and achievements
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Security**: Helmet, CORS, Rate limiting
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running TaalPal, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd taalpal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/taalpal

# Server
PORT=3000
NODE_ENV=development

# JWT Secret (generate a secure random string for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenAI API (optional - for enhanced AI chat)
OPENAI_API_KEY=your-openai-api-key-here
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Seed the Database

Populate the database with Dutch learning content:

```bash
npm run seed
```

This will create:
- Grammar topics with lessons and examples
- Vocabulary topics with words and translations
- Test questions and assessments
- Sample data based on the docs folder content

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 🗂️ Project Structure

```
taalpal/
├── docs/                    # Original Dutch learning materials
├── models/                  # MongoDB schemas
│   ├── Grammar.js          # Grammar topics and lessons
│   ├── Vocabulary.js       # Vocabulary words and categories
│   ├── Test.js             # Tests and results
│   └── Progress.js         # User progress tracking
├── routes/                  # API endpoints
│   ├── grammar.js          # Grammar-related routes
│   ├── vocabulary.js       # Vocabulary-related routes
│   ├── tests.js            # Test-related routes
│   ├── chat.js             # AI chat functionality
│   └── progress.js         # Progress tracking routes
├── scripts/                 # Utility scripts
│   └── seedDatabase.js     # Database seeding script
├── public/                  # Frontend files
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # Frontend JavaScript
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables
```

## 🔧 API Endpoints

### Grammar
- `GET /api/grammar` - Get all grammar topics
- `GET /api/grammar/:topicId` - Get specific grammar topic
- `GET /api/grammar/:topicId/lessons/:lessonIndex` - Get specific lesson
- `POST /api/grammar/:topicId/lessons/:lessonIndex/complete` - Mark lesson as complete

### Vocabulary
- `GET /api/vocabulary` - Get all vocabulary topics
- `GET /api/vocabulary/:topicId` - Get specific vocabulary topic
- `GET /api/vocabulary/search/:query` - Search vocabulary words
- `GET /api/vocabulary/practice/random` - Get random words for practice

### Tests
- `GET /api/tests` - Get all available tests
- `GET /api/tests/:testId` - Get specific test
- `POST /api/tests/:testId/submit` - Submit test answers
- `GET /api/tests/results/:userId` - Get user's test results

### Chat
- `POST /api/chat/message` - Send message to AI chat
- `GET /api/chat/history/:userId` - Get chat history
- `GET /api/chat/suggestions` - Get conversation suggestions

### Progress
- `GET /api/progress/:userId` - Get user progress overview
- `PUT /api/progress/:userId/preferences` - Update user preferences
- `POST /api/progress/:userId/achievements` - Add achievement

## 🌐 Production Deployment

### Using MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update your `.env` file:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taalpal
NODE_ENV=production
```

### Environment Variables for Production

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taalpal

# Server
PORT=3000
NODE_ENV=production

# Security
JWT_SECRET=your-very-secure-random-string-here

# Optional: OpenAI for enhanced AI chat
OPENAI_API_KEY=your-openai-api-key
```

### Deploy to Heroku

1. Install Heroku CLI
2. Create a new Heroku app:

```bash
heroku create your-app-name
```

3. Set environment variables:

```bash
heroku config:set MONGODB_URI=your-atlas-connection-string
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secure-secret
```

4. Deploy:

```bash
git push heroku main
```

## 🧪 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Adding New Content

1. **Grammar Topics**: Add new topics in `scripts/seedDatabase.js` in the `grammarData` array
2. **Vocabulary**: Add new vocabulary topics in the `vocabularyData` array
3. **Tests**: Add new test questions in the `testData` array

### Database Schema

The application uses the following main collections:

- **grammars**: Grammar topics with lessons and examples
- **vocabularies**: Vocabulary topics with words and translations
- **tests**: Test questions and metadata
- **testresults**: User test attempts and scores
- **progresses**: User learning progress and preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 Content Sources

The learning content is based on Dutch language materials found in the `docs/` folder, including:

- Grammar lessons on verbs, sentence structure, and tenses
- Vocabulary for daily life, time, directions, and greetings
- Practice exercises and assessments
- Real-world examples and usage patterns

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request limiting
- **Input Validation**: Request data validation
- **Environment Variables**: Secure configuration management

## 📱 Browser Support

TaalPal supports all modern browsers:
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes: `lsof -ti:3000 | xargs kill`

3. **Seeding Fails**
   - Ensure MongoDB is running
   - Check database permissions
   - Verify connection string

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Check environment variables are set correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Dutch language learning materials from the docs folder
- Font Awesome for icons
- Google Fonts for typography
- MongoDB for database solutions