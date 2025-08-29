#!/bin/bash

# TaalPal Installation Script
echo "🚀 Welcome to TaalPal - Dutch Learning Platform"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB:"
    echo "   Visit: https://www.mongodb.com/try/download/community"
    echo "   Or use Homebrew: brew install mongodb-community"
    echo ""
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOL
# Database
MONGODB_URI=mongodb://localhost:27017/taalpal

# Server
PORT=3000
NODE_ENV=development

# JWT Secret (generate a secure random string for production)
JWT_SECRET=taalpal-secret-key-$(date +%s)-$(shuf -i 1000-9999 -n 1)

# OpenAI API (optional - for enhanced AI chat)
OPENAI_API_KEY=your-openai-api-key-here
EOL
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo "🗄️  Starting MongoDB (if installed)..."
if command -v brew &> /dev/null; then
    # macOS with Homebrew
    brew services start mongodb-community 2>/dev/null || echo "⚠️  Could not start MongoDB with brew"
elif command -v systemctl &> /dev/null; then
    # Linux with systemd
    sudo systemctl start mongod 2>/dev/null || echo "⚠️  Could not start MongoDB with systemctl"
else
    echo "⚠️  Please start MongoDB manually"
fi

echo "🌱 Seeding database with Dutch learning content..."
npm run seed

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "To start TaalPal:"
echo "  npm run dev    # Development mode with auto-reload"
echo "  npm start      # Production mode"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "📚 Features available:"
echo "  • Grammar lessons with interactive examples"
echo "  • Vocabulary builder with pronunciation"
echo "  • Mock tests and assessments"
echo "  • AI chat assistant for conversation practice"
echo ""
echo "Happy learning! 🇳🇱"