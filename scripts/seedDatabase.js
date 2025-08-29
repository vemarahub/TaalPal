const mongoose = require('mongoose');
const Grammar = require('../models/Grammar');
const Vocabulary = require('../models/Vocabulary');
const { Test } = require('../models/Test');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taalpal';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Grammar data based on the docs structure
const grammarData = [
  {
    topicId: 'werkwoorden-present',
    title: 'Werkwoorden - Present Tense',
    description: 'Learn how to conjugate Dutch verbs in the present tense',
    category: 'verbs',
    level: 'A2',
    estimatedTime: 45,
    lessons: [
      {
        title: 'Regular Verb Conjugation',
        content: 'Dutch regular verbs follow predictable patterns. Most verbs add -t for jij/hij/zij and -en for wij/jullie/zij.',
        examples: [
          { dutch: 'Ik werk', english: 'I work', pronunciation: 'ik verk' },
          { dutch: 'Jij werkt', english: 'You work', pronunciation: 'yay verkt' },
          { dutch: 'Hij werkt', english: 'He works', pronunciation: 'hay verkt' },
          { dutch: 'Wij werken', english: 'We work', pronunciation: 'vay verken' }
        ],
        exercises: [
          {
            question: 'Complete: Ik _____ elke dag. (werken)',
            options: ['werk', 'werkt', 'werken', 'gewerkt'],
            correctAnswer: 0,
            explanation: 'With "ik" (I), we use the stem of the verb: werk'
          }
        ],
        order: 1
      },
      {
        title: 'Irregular Verbs - Zijn, Hebben, Gaan',
        content: 'The most important irregular verbs in Dutch are zijn (to be), hebben (to have), and gaan (to go).',
        examples: [
          { dutch: 'Ik ben', english: 'I am', pronunciation: 'ik ben' },
          { dutch: 'Ik heb', english: 'I have', pronunciation: 'ik hep' },
          { dutch: 'Ik ga', english: 'I go', pronunciation: 'ik khah' },
          { dutch: 'Jij bent', english: 'You are', pronunciation: 'yay bent' }
        ],
        exercises: [
          {
            question: 'Choose the correct form: Jij _____ naar school.',
            options: ['ga', 'gaat', 'gaan', 'gegaan'],
            correctAnswer: 1,
            explanation: 'With "jij" (you), "gaan" becomes "gaat"'
          }
        ],
        order: 2
      }
    ],
    tags: ['verbs', 'conjugation', 'present-tense']
  },
  {
    topicId: 'scheidbare-werkwoorden',
    title: 'Scheidbare Werkwoorden (Separable Verbs)',
    description: 'Learn about Dutch separable verbs and how they work in sentences',
    category: 'verbs',
    level: 'A2',
    estimatedTime: 30,
    lessons: [
      {
        title: 'What are Separable Verbs?',
        content: 'Separable verbs consist of a prefix and a main verb. In main clauses, the prefix goes to the end.',
        examples: [
          { dutch: 'Ik sta op om 7 uur', english: 'I get up at 7 o\'clock', pronunciation: 'ik stah op om zeven uur' },
          { dutch: 'Hij belt zijn moeder op', english: 'He calls his mother', pronunciation: 'hay belt zayn moeder op' },
          { dutch: 'Wij gaan uit vanavond', english: 'We go out tonight', pronunciation: 'vay khahn oyt vanahvont' }
        ],
        exercises: [
          {
            question: 'Where does "op" go in: Ik _____ om 6 uur _____. (opstaan)',
            options: ['sta ... op', 'opstaan', 'op ... sta', 'staan ... op'],
            correctAnswer: 0,
            explanation: 'In main clauses, separable verbs split: "sta" stays with the subject, "op" goes to the end'
          }
        ],
        order: 1
      }
    ],
    tags: ['verbs', 'separable', 'word-order']
  },
  {
    topicId: 'hoofdzin',
    title: 'Hoofdzin (Main Clause Structure)',
    description: 'Master the basic word order in Dutch main clauses',
    category: 'sentence-structure',
    level: 'A2',
    estimatedTime: 40,
    lessons: [
      {
        title: 'Basic Word Order: Subject + Verb + Object',
        content: 'Dutch main clauses follow the pattern: Subject + Verb + Object. The verb is always in the second position.',
        examples: [
          { dutch: 'Ik lees een boek', english: 'I read a book', pronunciation: 'ik lays en book' },
          { dutch: 'Zij eet een appel', english: 'She eats an apple', pronunciation: 'zay ayt en ahpel' },
          { dutch: 'Wij kopen nieuwe schoenen', english: 'We buy new shoes', pronunciation: 'vay kopen neewe skhonen' }
        ],
        exercises: [
          {
            question: 'Put in correct order: een / ik / drink / koffie',
            options: ['Ik drink een koffie', 'Een koffie drink ik', 'Drink ik een koffie', 'Ik een koffie drink'],
            correctAnswer: 0,
            explanation: 'Main clause order: Subject (Ik) + Verb (drink) + Object (een koffie)'
          }
        ],
        order: 1
      }
    ],
    tags: ['sentence-structure', 'word-order', 'main-clause']
  },
  {
    topicId: 'inversie',
    title: 'Inversie (Inversion)',
    description: 'Learn when and how to use inversion in Dutch sentences',
    category: 'sentence-structure',
    level: 'A2',
    estimatedTime: 35,
    lessons: [
      {
        title: 'Time and Place at the Beginning',
        content: 'When a sentence starts with time or place, the subject and verb switch positions (inversion).',
        examples: [
          { dutch: 'Morgen ga ik naar school', english: 'Tomorrow I go to school', pronunciation: 'morgen khah ik nahr skhol' },
          { dutch: 'In Amsterdam wonen veel mensen', english: 'In Amsterdam live many people', pronunciation: 'in amsterdam vonen vayl mensen' },
          { dutch: 'Vandaag eet zij vis', english: 'Today she eats fish', pronunciation: 'vandahkh ayt zay vis' }
        ],
        exercises: [
          {
            question: 'Complete with inversion: Vanavond _____ wij naar de bioscoop.',
            options: ['gaan', 'wij gaan', 'gaan wij', 'naar gaan'],
            correctAnswer: 0,
            explanation: 'After "vanavond" (tonight), we use inversion: verb (gaan) comes before subject (wij)'
          }
        ],
        order: 1
      }
    ],
    tags: ['sentence-structure', 'inversion', 'word-order']
  },
  {
    topicId: 'ovt-imperfectum',
    title: 'OVT (Imperfectum) - Past Tense',
    description: 'Learn how to form and use the simple past tense in Dutch',
    category: 'tenses',
    level: 'A2',
    estimatedTime: 50,
    lessons: [
      {
        title: 'Regular Verbs in Past Tense',
        content: 'Regular verbs form the past tense by adding -de or -te to the stem, depending on the last letter.',
        examples: [
          { dutch: 'Ik werkte gisteren', english: 'I worked yesterday', pronunciation: 'ik verkte khisteren' },
          { dutch: 'Hij woonde in Amsterdam', english: 'He lived in Amsterdam', pronunciation: 'hay vonde in amsterdam' },
          { dutch: 'Wij maakten het huiswerk', english: 'We made the homework', pronunciation: 'vay mahkten het hoysverk' }
        ],
        exercises: [
          {
            question: 'What is the past tense of "maken" for "ik"?',
            options: ['maakte', 'maakde', 'gemaakt', 'maken'],
            correctAnswer: 0,
            explanation: 'Maken ends in -k, so we add -te: maakte'
          }
        ],
        order: 1
      }
    ],
    tags: ['tenses', 'past-tense', 'ovt', 'imperfectum']
  },
  {
    topicId: 'perfectum',
    title: 'Perfectum (Present Perfect)',
    description: 'Master the present perfect tense with hebben and zijn',
    category: 'tenses',
    level: 'A2',
    estimatedTime: 45,
    lessons: [
      {
        title: 'Present Perfect with Hebben',
        content: 'Most verbs use "hebben" + past participle to form the present perfect.',
        examples: [
          { dutch: 'Ik heb gewerkt', english: 'I have worked', pronunciation: 'ik hep khewerkt' },
          { dutch: 'Zij heeft gegeten', english: 'She has eaten', pronunciation: 'zay hayft khekhaythen' },
          { dutch: 'Wij hebben geleerd', english: 'We have learned', pronunciation: 'vay heben khelayrt' }
        ],
        exercises: [
          {
            question: 'Complete: Ik _____ mijn huiswerk _____. (maken)',
            options: ['heb ... gemaakt', 'ben ... gemaakt', 'heb ... maken', 'hebben ... gemaakt'],
            correctAnswer: 0,
            explanation: 'Use "hebben" + past participle "gemaakt" for the verb "maken"'
          }
        ],
        order: 1
      }
    ],
    tags: ['tenses', 'present-perfect', 'perfectum', 'hebben', 'zijn']
  }
];

// Vocabulary data based on the docs structure
const vocabularyData = [
  {
    topicId: 'dagen-van-de-week',
    title: 'De dagen van de week (Days of the week)',
    description: 'Learn the seven days of the week in Dutch',
    category: 'time-dates',
    level: 'A2',
    icon: '📅',
    color: '#3b82f6',
    estimatedTime: 15,
    words: [
      {
        dutch: 'maandag',
        english: 'Monday',
        pronunciation: 'mahndakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Maandag ga ik naar school', english: 'Monday I go to school' }
        ]
      },
      {
        dutch: 'dinsdag',
        english: 'Tuesday',
        pronunciation: 'dinsdakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Dinsdag heb ik vrij', english: 'Tuesday I have off' }
        ]
      },
      {
        dutch: 'woensdag',
        english: 'Wednesday',
        pronunciation: 'vunsdakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Woensdag is het druk', english: 'Wednesday it is busy' }
        ]
      },
      {
        dutch: 'donderdag',
        english: 'Thursday',
        pronunciation: 'donderdakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Donderdag kom ik laat thuis', english: 'Thursday I come home late' }
        ]
      },
      {
        dutch: 'vrijdag',
        english: 'Friday',
        pronunciation: 'vraydakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Vrijdag gaan we uit', english: 'Friday we go out' }
        ]
      },
      {
        dutch: 'zaterdag',
        english: 'Saturday',
        pronunciation: 'zahterdakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Zaterdag slaap ik uit', english: 'Saturday I sleep in' }
        ]
      },
      {
        dutch: 'zondag',
        english: 'Sunday',
        pronunciation: 'zondakh',
        partOfSpeech: 'noun',
        gender: 'de',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Zondag bezoek ik mijn familie', english: 'Sunday I visit my family' }
        ]
      }
    ],
    tags: ['time', 'days', 'calendar', 'basic']
  },
  {
    topicId: 'klokkijken',
    title: 'Klokkijken (Telling Time)',
    description: 'Learn how to tell time in Dutch',
    category: 'time-dates',
    level: 'A2',
    icon: '🕐',
    color: '#10b981',
    estimatedTime: 25,
    words: [
      {
        dutch: 'het uur',
        english: 'hour',
        pronunciation: 'het uur',
        partOfSpeech: 'noun',
        gender: 'het',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Het is één uur', english: 'It is one o\'clock' }
        ]
      },
      {
        dutch: 'de minuut',
        english: 'minute',
        pronunciation: 'de minuut',
        partOfSpeech: 'noun',
        gender: 'de',
        plural: 'minuten',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Vijf minuten over drie', english: 'Five minutes past three' }
        ]
      },
      {
        dutch: 'half',
        english: 'half',
        pronunciation: 'half',
        partOfSpeech: 'adjective',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Het is half drie', english: 'It is half past two (2:30)' }
        ]
      },
      {
        dutch: 'kwart',
        english: 'quarter',
        pronunciation: 'kvart',
        partOfSpeech: 'noun',
        gender: 'het',
        difficulty: 'beginner',
        frequency: 7,
        examples: [
          { dutch: 'Kwart over vier', english: 'Quarter past four' }
        ]
      }
    ],
    tags: ['time', 'clock', 'numbers']
  },
  {
    topicId: 'groeten',
    title: 'Groeten (Greetings)',
    description: 'Essential Dutch greetings for daily conversation',
    category: 'greetings',
    level: 'A2',
    icon: '👋',
    color: '#f59e0b',
    estimatedTime: 20,
    words: [
      {
        dutch: 'hallo',
        english: 'hello',
        pronunciation: 'halo',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 10,
        examples: [
          { dutch: 'Hallo, hoe gaat het?', english: 'Hello, how are you?' }
        ]
      },
      {
        dutch: 'goedemorgen',
        english: 'good morning',
        pronunciation: 'khude-morgen',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Goedemorgen allemaal!', english: 'Good morning everyone!' }
        ]
      },
      {
        dutch: 'goedemiddag',
        english: 'good afternoon',
        pronunciation: 'khude-midakh',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Goedemiddag meneer', english: 'Good afternoon sir' }
        ]
      },
      {
        dutch: 'goedenavond',
        english: 'good evening',
        pronunciation: 'khude-nahvont',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Goedenavond iedereen', english: 'Good evening everyone' }
        ]
      },
      {
        dutch: 'tot ziens',
        english: 'goodbye',
        pronunciation: 'tot zins',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Tot ziens en bedankt!', english: 'Goodbye and thank you!' }
        ]
      },
      {
        dutch: 'dag',
        english: 'bye',
        pronunciation: 'dakh',
        partOfSpeech: 'interjection',
        difficulty: 'beginner',
        frequency: 10,
        examples: [
          { dutch: 'Dag, tot morgen!', english: 'Bye, see you tomorrow!' }
        ]
      }
    ],
    tags: ['greetings', 'social', 'basic', 'conversation']
  },
  {
    topicId: 'de-weg-wijzen',
    title: 'De weg wijzen (Giving Directions)',
    description: 'Learn vocabulary for asking and giving directions',
    category: 'directions',
    level: 'A2',
    icon: '🗺️',
    color: '#8b5cf6',
    estimatedTime: 30,
    words: [
      {
        dutch: 'links',
        english: 'left',
        pronunciation: 'links',
        partOfSpeech: 'adverb',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Ga naar links', english: 'Go to the left' }
        ]
      },
      {
        dutch: 'rechts',
        english: 'right',
        pronunciation: 'rekhts',
        partOfSpeech: 'adverb',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Sla rechts af', english: 'Turn right' }
        ]
      },
      {
        dutch: 'rechtdoor',
        english: 'straight ahead',
        pronunciation: 'rekht-dor',
        partOfSpeech: 'adverb',
        difficulty: 'beginner',
        frequency: 7,
        examples: [
          { dutch: 'Ga rechtdoor', english: 'Go straight ahead' }
        ]
      },
      {
        dutch: 'de straat',
        english: 'street',
        pronunciation: 'de straht',
        partOfSpeech: 'noun',
        gender: 'de',
        plural: 'straten',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'De winkel is in deze straat', english: 'The shop is on this street' }
        ]
      },
      {
        dutch: 'het plein',
        english: 'square',
        pronunciation: 'het playn',
        partOfSpeech: 'noun',
        gender: 'het',
        plural: 'pleinen',
        difficulty: 'intermediate',
        frequency: 6,
        examples: [
          { dutch: 'Het museum staat aan het plein', english: 'The museum is on the square' }
        ]
      }
    ],
    tags: ['directions', 'navigation', 'places', 'travel']
  },
  {
    topicId: 'dagelijks-leven',
    title: 'Dagelijks leven (Daily Life)',
    description: 'Essential vocabulary for daily activities and routines',
    category: 'daily-life',
    level: 'A2',
    icon: '🏠',
    color: '#ef4444',
    estimatedTime: 40,
    words: [
      {
        dutch: 'het huis',
        english: 'house',
        pronunciation: 'het hoys',
        partOfSpeech: 'noun',
        gender: 'het',
        plural: 'huizen',
        difficulty: 'beginner',
        frequency: 9,
        examples: [
          { dutch: 'Ik woon in een groot huis', english: 'I live in a big house' }
        ]
      },
      {
        dutch: 'de keuken',
        english: 'kitchen',
        pronunciation: 'de køken',
        partOfSpeech: 'noun',
        gender: 'de',
        plural: 'keukens',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Ik kook in de keuken', english: 'I cook in the kitchen' }
        ]
      },
      {
        dutch: 'de slaapkamer',
        english: 'bedroom',
        pronunciation: 'de slahp-kahmer',
        partOfSpeech: 'noun',
        gender: 'de',
        plural: 'slaapkamers',
        difficulty: 'beginner',
        frequency: 7,
        examples: [
          { dutch: 'Mijn slaapkamer is klein', english: 'My bedroom is small' }
        ]
      },
      {
        dutch: 'opstaan',
        english: 'to get up',
        pronunciation: 'op-stahn',
        partOfSpeech: 'verb',
        difficulty: 'beginner',
        frequency: 8,
        examples: [
          { dutch: 'Ik sta om 7 uur op', english: 'I get up at 7 o\'clock' }
        ]
      },
      {
        dutch: 'ontbijten',
        english: 'to have breakfast',
        pronunciation: 'ont-bayten',
        partOfSpeech: 'verb',
        difficulty: 'beginner',
        frequency: 7,
        examples: [
          { dutch: 'Wij ontbijten samen', english: 'We have breakfast together' }
        ]
      }
    ],
    tags: ['daily-life', 'home', 'routine', 'family']
  }
];

// Test data
const testData = [
  {
    testId: 'quick-test-a2',
    title: 'Quick A2 Test',
    description: 'A quick assessment of your A2 Dutch skills',
    type: 'quick',
    level: 'A2',
    timeLimit: 10,
    passingScore: 60,
    categories: ['grammar', 'vocabulary'],
    difficulty: 'medium',
    questions: [
      {
        question: 'What is the correct conjugation of "zijn" for "ik"?',
        type: 'multiple-choice',
        options: ['ben', 'bent', 'is', 'zijn'],
        correctAnswer: 0,
        explanation: '"Ik ben" is the correct form of "zijn" (to be) for first person singular.',
        difficulty: 'easy',
        points: 1,
        category: 'grammar',
        tags: ['verbs', 'conjugation'],
        timeLimit: 30
      },
      {
        question: 'Choose the correct word order:',
        type: 'multiple-choice',
        options: [
          'Ik ga morgen naar school',
          'Morgen ik ga naar school',
          'Naar school ik ga morgen',
          'Ga ik morgen naar school'
        ],
        correctAnswer: 0,
        explanation: 'In a main clause, the verb comes second: Subject + Verb + rest.',
        difficulty: 'medium',
        points: 1,
        category: 'grammar',
        tags: ['word-order', 'sentence-structure'],
        timeLimit: 45
      },
      {
        question: 'What does "goedemorgen" mean?',
        type: 'multiple-choice',
        options: ['good evening', 'good afternoon', 'good morning', 'good night'],
        correctAnswer: 2,
        explanation: '"Goedemorgen" means "good morning" in Dutch.',
        difficulty: 'easy',
        points: 1,
        category: 'vocabulary',
        tags: ['greetings', 'basic'],
        timeLimit: 20
      },
      {
        question: 'Complete: "Ik _____ naar de winkel." (gaan)',
        type: 'multiple-choice',
        options: ['ga', 'gaat', 'gaan', 'gegaan'],
        correctAnswer: 0,
        explanation: 'With "ik" (I), we use "ga" - the first person singular form of "gaan".',
        difficulty: 'easy',
        points: 1,
        category: 'grammar',
        tags: ['verbs', 'conjugation'],
        timeLimit: 30
      },
      {
        question: 'Which day comes after "dinsdag"?',
        type: 'multiple-choice',
        options: ['maandag', 'woensdag', 'donderdag', 'vrijdag'],
        correctAnswer: 1,
        explanation: 'After Tuesday (dinsdag) comes Wednesday (woensdag).',
        difficulty: 'easy',
        points: 1,
        category: 'vocabulary',
        tags: ['days', 'time'],
        timeLimit: 25
      }
    ]
  },
  {
    testId: 'full-test-a2',
    title: 'Complete A2 Assessment',
    description: 'Comprehensive test covering all A2 Dutch topics',
    type: 'full',
    level: 'A2',
    timeLimit: 45,
    passingScore: 70,
    categories: ['grammar', 'vocabulary', 'reading'],
    difficulty: 'medium',
    questions: [
      // This would contain 50 questions - showing a few examples
      {
        question: 'What is the past tense of "maken" for "ik"?',
        type: 'multiple-choice',
        options: ['maakte', 'maakde', 'gemaakt', 'maken'],
        correctAnswer: 0,
        explanation: 'Maken ends in -k, so we add -te: maakte',
        difficulty: 'medium',
        points: 2,
        category: 'grammar',
        tags: ['past-tense', 'ovt'],
        timeLimit: 60
      },
      {
        question: 'Complete with the correct separable verb: "Ik _____ om 7 uur _____." (opstaan)',
        type: 'multiple-choice',
        options: ['sta ... op', 'opstaan', 'op ... sta', 'staan ... op'],
        correctAnswer: 0,
        explanation: 'In main clauses, separable verbs split: "sta" stays with the subject, "op" goes to the end',
        difficulty: 'medium',
        points: 2,
        category: 'grammar',
        tags: ['separable-verbs', 'word-order'],
        timeLimit: 60
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Grammar.deleteMany({});
    await Vocabulary.deleteMany({});
    await Test.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Grammar data
    console.log('📚 Seeding grammar topics...');
    for (const grammarTopic of grammarData) {
      const grammar = new Grammar(grammarTopic);
      await grammar.save();
      console.log(`✅ Created grammar topic: ${grammarTopic.title}`);
    }

    // Seed Vocabulary data
    console.log('📝 Seeding vocabulary topics...');
    for (const vocabTopic of vocabularyData) {
      const vocabulary = new Vocabulary(vocabTopic);
      await vocabulary.save();
      console.log(`✅ Created vocabulary topic: ${vocabTopic.title}`);
    }

    // Seed Test data
    console.log('📋 Seeding tests...');
    for (const testItem of testData) {
      const test = new Test(testItem);
      await test.save();
      console.log(`✅ Created test: ${testItem.title}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Grammar topics: ${grammarData.length}`);
    console.log(`   - Vocabulary topics: ${vocabularyData.length}`);
    console.log(`   - Tests: ${testData.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding
if (require.main === module) {
  connectDB().then(seedDatabase);
}

module.exports = { seedDatabase };