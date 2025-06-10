const dreamSeedInput = document.getElementById('dreamSeed');
const startDreamBtn = document.getElementById('startDreamBtn');
const initialInputSection = document.getElementById('initial-input');
const dreamDisplay = document.getElementById('dream-display');
const currentDreamText = document.getElementById('currentDreamText');
const choicesSection = document.getElementById('choices-section');
const dreamChoicesDiv = document.getElementById('dreamChoices');
const restartDreamBtn = document.getElementById('restartDreamBtn');
const loadingSpinner = document.getElementById('loading');
const errorMessageDiv = document.getElementById('error-message');

const API_BASE_URL = 'http://localhost:3000'; // Make sure this matches your backend port

async function callDreamAPI(prompt, reset = false) {
    loadingSpinner.classList.remove('hidden');
    errorMessageDiv.classList.add('error-hidden'); // Hide any previous error
    try {
        const response = await fetch(`${API_BASE_URL}/api/dream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, reset }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Call Failed:', error);
        errorMessageDiv.classList.remove('error-hidden');
        currentDreamText.textContent = "Could not connect to the dream realm. Please check your server.";
        throw error; // Re-throw to be caught by the calling function
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function displayDream(dreamText, choices) {
    currentDreamText.textContent += (currentDreamText.textContent ? '\n\n' : '') + dreamText; // Append new dream text
    dreamDisplay.scrollTop = dreamDisplay.scrollHeight; // Scroll to bottom

    dreamChoicesDiv.innerHTML = ''; // Clear previous choices
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => chooseDreamPath(choice));
        dreamChoicesDiv.appendChild(button);
    });

    initialInputSection.classList.add('hidden'); // Hide initial input
    choicesSection.classList.remove('hidden'); // Show choices
}

async function startDream() {
    const seed = dreamSeedInput.value.trim();
    if (!seed) {
        alert('Please enter a word or image to start your dream!');
        return;
    }
    currentDreamText.textContent = ''; // Clear previous dream text for a new dream
    try {
        const data = await callDreamAPI(seed, true); // Send true to reset chat history
        displayDream(data.dreamText, data.choices);
    } catch (error) {
        // Error already displayed by callDreamAPI
    }
}

async function chooseDreamPath(choice) {
    try {
        const data = await callDreamAPI(choice);
        displayDream(data.dreamText, data.choices);
    } catch (error) {
        // Error already displayed by callDreamAPI
    }
}

function restartDream() {
    currentDreamText.textContent = ''; // Clear the dream text display
    dreamSeedInput.value = ''; // Clear the input field
    initialInputSection.classList.remove('hidden'); // Show initial input section
    choicesSection.classList.add('hidden'); // Hide choices section
    errorMessageDiv.classList.add('error-hidden'); // Hide error message
    // The backend's chat history will be reset when the user starts a *new* dream using the initial input.
}

// Event Listeners
startDreamBtn.addEventListener('click', startDream);
dreamSeedInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startDream();
    }
});
restartDreamBtn.addEventListener('click', restartDream);
