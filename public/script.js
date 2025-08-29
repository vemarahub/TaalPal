// script.js

// Initialize the application
function initializeApp() {
    console.log('Initializing TaalPal application');
    // Add initialization logic here, e.g., load user progress, set up UI
    // Example: fetch user progress for grammar topics
    // fetchUserProgress('testUser123');
}

// Fetch and display grammar topic in a modal
async function openGrammarTopic(topicId) {
    try {
        // Fetch topic data from the backend
        const response = await fetch(`/grammar/${topicId}`);
        const result = await response.json();

        if (!result.success || !result.data) {
            console.error('Error fetching topic:', result.error);
            alert('Failed to load grammar topic. Please try again.');
            return;
        }

        const topic = result.data;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${topic.title}</h2>
                <p>${topic.description}</p>
                <div class="lesson-list">
                    <h3>Lessons (${topic.lessons.length})</h3>
                    <ul>
                        ${topic.lessons.map((lesson, index) => `
                            <li>
                                <a href="#" class="lesson-link" data-lesson-index="${index}" data-topic-id="${topicId}">
                                    ${lesson.title} (${lesson.estimatedTime} min)
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <button class="close-btn">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners for lesson links
        const lessonLinks = modal.querySelectorAll('.lesson-link');
        lessonLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const lessonIndex = link.dataset.lessonIndex;
                const topicId = link.dataset.topicId;
                await openLesson(topicId, lessonIndex);
            });
        });
    } catch (error) {
        console.error('Error fetching grammar topic:', error);
        alert('An error occurred while loading the topic.');
    }
}

// Fetch and display a specific lesson
async function openLesson(topicId, lessonIndex) {
    try {
        const response = await fetch(`/grammar/${topicId}/lessons/${lessonIndex}`);
        const result = await response.json();

        if (!result.success || !result.data) {
            console.error('Error fetching lesson:', result.error);
            alert('Failed to load lesson. Please try again.');
            return;
        }

        const { lesson, topic, lessonIndex: index, totalLessons } = result.data;

        // Create lesson modal
        const modal = document.querySelector('.modal') || document.createElement('div');
        if (!modal.classList.contains('modal')) {
            modal.className = 'modal';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${topic.title} - Lesson ${parseInt(index) + 1}</h2>
                <h3>${lesson.title}</h3>
                <p>${lesson.content}</p>
                ${lesson.exercises ? `
                    <div class="exercises">
                        <h4>Exercises</h4>
                        ${lesson.exercises.map((exercise, exIndex) => `
                            <div class="exercise">
                                <p>${exercise.question}</p>
                                <input type="text" class="exercise-input" data-exercise-index="${exIndex}">
                            </div>
                        `).join('')}
                        <button class="submit-lesson-btn" data-topic-id="${topicId}" data-lesson-index="${index}">Submit</button>
                    </div>
                ` : ''}
                <div class="lesson-nav">
                    ${index > 0 ? `<button class="prev-lesson-btn" data-topic-id="${topicId}" data-lesson-index="${parseInt(index) - 1}">Previous</button>` : ''}
                    ${index < totalLessons - 1 ? `<button class="next-lesson-btn" data-topic-id="${topicId}" data-lesson-index="${parseInt(index) + 1}">Next</button>` : ''}
                    <button class="close-btn">Close</button>
                </div>
            </div>
        `;

        // Add event listeners for navigation and submission
        const prevBtn = modal.querySelector('.prev-lesson-btn');
        const nextBtn = modal.querySelector('.next-lesson-btn');
        const submitBtn = modal.querySelector('.submit-lesson-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => openLesson(topicId, prevBtn.dataset.lessonIndex));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => openLesson(topicId, nextBtn.dataset.lessonIndex));
        }
        if (submitBtn) {
            submitBtn.addEventListener('click', async () => {
                await submitLessonCompletion(topicId, index);
            });
        }
    } catch (error) {
        console.error('Error fetching lesson:', error);
        alert('An error occurred while loading the lesson.');
    }
}

// Submit lesson completion
async function submitLessonCompletion(topicId, lessonIndex) {
    try {
        const userId = 'testUser123'; // Replace with actual user ID from authentication
        const score = calculateScore(); // Implement score calculation based on exercises
        const timeSpent = 300; // Example: 5 minutes in seconds (replace with actual time tracking)

        const response = await fetch(`/grammar/${topicId}/lessons/${lessonIndex}/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, score, timeSpent })
        });
        const result = await response.json();

        if (result.success) {
            console.log('Lesson completion submitted:', result.data);
            alert('Lesson completed successfully!');
            // Optionally update progress bar in the UI
            updateProgressBar(topicId, result.data.topicProgress);
        } else {
            console.error('Error submitting lesson:', result.error);
            alert('Failed to submit lesson completion.');
        }
    } catch (error) {
        console.error('Error submitting lesson completion:', error);
        alert('An error occurred while submitting the lesson.');
    }
}

// Placeholder for score calculation
function calculateScore() {
    // Implement logic to calculate score based on exercise inputs
    const inputs = document.querySelectorAll('.exercise-input');
    let score = 0;
    inputs.forEach(input => {
        // Example: assume correct answer is stored in exercise data (not implemented here)
        score += input.value.trim() ? 10 : 0; // Simple scoring logic
    });
    return score;
}

// Update progress bar in the UI
function updateProgressBar(topicId, topicProgress) {
    const card = document.querySelector(`.card[data-topic-id="${topicId}"]`);
    if (card) {
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.card-progress span');
        const progressPercent = topicProgress.overallProgress * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressText.textContent = `${topicProgress.lessonsProgress.length}/${topicProgress.totalLessons} lessons`;
    }
}

// Placeholder for vocabulary topics
function openVocabTopic(topicId) {
    console.log(`Opening vocabulary topic: ${topicId}`);
    // Implement similar fetch logic for vocabulary if needed
    // Example: fetch(`/vocabulary/${topicId}`).then(...)
}

// Fetch user progress (optional)
async function fetchUserProgress(userId) {
    try {
        const response = await fetch(`/grammar/progress/${userId}`);
        const result = await response.json();
        if (result.success) {
            console.log('User progress:', result.data);
            // Update UI with progress (e.g., progress bars)
            result.data.grammarProgress.forEach(progress => {
                updateProgressBar(progress.topicId, progress);
            });
        }
    } catch (error) {
        console.error('Error fetching user progress:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Event delegation for grammar topic cards
    document.addEventListener('click', function(event) {
        const grammarCard = event.target.closest('.card');
        if (grammarCard && grammarCard.dataset.topicId) {
            openGrammarTopic(grammarCard.dataset.topicId);
        }
    });

    // Event delegation for vocab topic cards
    document.addEventListener('click', function(event) {
        const vocabCard = event.target.closest('.vocab-card');
        if (vocabCard && vocabCard.dataset.topicId) {
            openVocabTopic(vocabCard.dataset.topicId);
        }
    });

    // Event delegation for close modal buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-btn')) {
            closeModal();
        }
    });
});

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Placeholder functions for test modal
function selectAnswer(index) {
    console.log(`Selected answer: ${index}`);
}

function nextQuestion() {
    console.log('Moving to next question');
}

function previousQuestion() {
    console.log('Moving to previous question');
}

function retakeTest() {
    console.log('Retaking test');
}

function attachTestModalListeners() {
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            selectAnswer(index);
        });
    });

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextQuestion();
        });
    }

    const prevBtn = document.querySelector('.btn.btn-secondary');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousQuestion();
        });
    }

    const continueBtn = document.querySelector('.results-actions .btn-primary');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    const retakeBtn = document.querySelector('.results-actions .btn-secondary');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
            retakeTest();
        });
    }
}