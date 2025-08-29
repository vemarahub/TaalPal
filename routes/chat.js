const express = require('express');
const router = express.Router();

// Simple AI chat responses (can be enhanced with OpenAI API)
const chatResponses = {
  greetings: [
    {
      dutch: "Hallo! Ik ben je Nederlandse AI-tutor. Hoe kan ik je helpen?",
      english: "Hello! I'm your Dutch AI tutor. How can I help you?"
    },
    {
      dutch: "Goedemorgen! Klaar om Nederlands te leren?",
      english: "Good morning! Ready to learn Dutch?"
    },
    {
      dutch: "Hoi! Leuk je te ontmoeten. Wat wil je vandaag leren?",
      english: "Hi! Nice to meet you. What would you like to learn today?"
    }
  ],
  encouragement: [
    {
      dutch: "Heel goed! Je Nederlands wordt steeds beter.",
      english: "Very good! Your Dutch is getting better and better."
    },
    {
      dutch: "Uitstekend! Je maakt goede vooruitgang.",
      english: "Excellent! You're making good progress."
    },
    {
      dutch: "Goed gedaan! Blijf zo doorgaan.",
      english: "Well done! Keep it up."
    }
  ],
  help: [
    {
      dutch: "Natuurlijk help ik je! Wat is je vraag?",
      english: "Of course I'll help you! What's your question?"
    },
    {
      dutch: "Ik ben er om je te helpen. Vertel me waar je moeite mee hebt.",
      english: "I'm here to help you. Tell me what you're struggling with."
    }
  ],
  grammar: [
    {
      dutch: "Grammatica kan lastig zijn, maar met oefening wordt het makkelijker!",
      english: "Grammar can be difficult, but with practice it becomes easier!"
    },
    {
      dutch: "Laten we samen deze grammaticaregel bekijken.",
      english: "Let's look at this grammar rule together."
    }
  ],
  vocabulary: [
    {
      dutch: "Nieuwe woorden leren is leuk! Welk onderwerp interesseert je?",
      english: "Learning new words is fun! Which topic interests you?"
    },
    {
      dutch: "Woordenschat is heel belangrijk. Laten we samen oefenen!",
      english: "Vocabulary is very important. Let's practice together!"
    }
  ],
  farewell: [
    {
      dutch: "Tot ziens! Veel succes met je Nederlandse studie.",
      english: "Goodbye! Good luck with your Dutch studies."
    },
    {
      dutch: "Dag! Ik hoop dat ik je heb kunnen helpen.",
      english: "Bye! I hope I was able to help you."
    }
  ]
};

// Chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { message, userId, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Simple keyword-based response system
    const response = generateResponse(message.toLowerCase());

    // In a real implementation, you would:
    // 1. Save the conversation to database
    // 2. Use OpenAI API for more sophisticated responses
    // 3. Track user progress and adapt responses accordingly

    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date(),
        conversationId: conversationId || `conv-${Date.now()}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get conversation history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // In a real implementation, you would fetch from database
    // For now, return empty array
    res.json({
      success: true,
      data: [],
      pagination: {
        total: 0,
        offset: parseInt(offset),
        limit: parseInt(limit),
        hasMore: false
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get chat suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = [
      {
        dutch: "Hoe zeg je 'hello' in het Nederlands?",
        english: "How do you say 'hello' in Dutch?",
        category: "greetings"
      },
      {
        dutch: "Kun je me helpen met werkwoorden?",
        english: "Can you help me with verbs?",
        category: "grammar"
      },
      {
        dutch: "Wat betekent 'gezellig'?",
        english: "What does 'gezellig' mean?",
        category: "vocabulary"
      },
      {
        dutch: "Hoe maak je een vraag in het Nederlands?",
        english: "How do you make a question in Dutch?",
        category: "grammar"
      },
      {
        dutch: "Kun je me Nederlandse nummers leren?",
        english: "Can you teach me Dutch numbers?",
        category: "vocabulary"
      }
    ];

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function to generate responses
function generateResponse(message) {
  // Greeting detection
  if (message.includes('hallo') || message.includes('hello') || message.includes('hi') || message.includes('hoi')) {
    return getRandomResponse('greetings');
  }

  // Help detection
  if (message.includes('help') || message.includes('hulp') || message.includes('kun je')) {
    return getRandomResponse('help');
  }

  // Grammar detection
  if (message.includes('grammar') || message.includes('grammatica') || message.includes('werkwoord') || message.includes('verb')) {
    return getRandomResponse('grammar');
  }

  // Vocabulary detection
  if (message.includes('vocabulary') || message.includes('woordenschat') || message.includes('woord') || message.includes('betekent')) {
    return getRandomResponse('vocabulary');
  }

  // Farewell detection
  if (message.includes('bye') || message.includes('dag') || message.includes('tot ziens') || message.includes('goodbye')) {
    return getRandomResponse('farewell');
  }

  // Thank you detection
  if (message.includes('dank') || message.includes('thank') || message.includes('bedankt')) {
    return {
      dutch: "Graag gedaan! Ik help je graag met Nederlands leren.",
      english: "You're welcome! I'm happy to help you learn Dutch."
    };
  }

  // Default encouraging response
  return getRandomResponse('encouragement');
}

function getRandomResponse(category) {
  const responses = chatResponses[category] || chatResponses.encouragement;
  return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = router;