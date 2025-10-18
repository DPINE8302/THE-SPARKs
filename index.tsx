/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from "@google/genai";

// DOM Elements
const topicInput = document.getElementById('topicInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const quoteDisplay = document.getElementById('quoteDisplay') as HTMLDivElement;
const loadingIndicator = document.getElementById('loadingIndicator') as HTMLDivElement;
const errorDisplay = document.getElementById('errorDisplay') as HTMLDivElement;
const langBtnEn = document.getElementById('langBtnEn') as HTMLButtonElement;
const langBtnTh = document.getElementById('langBtnTh') as HTMLButtonElement;

// API Key Modal Elements
const settingsBtn = document.getElementById('settingsBtn') as HTMLButtonElement;
const apiKeyModal = document.getElementById('apiKeyModal') as HTMLDivElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;
const apiKeyInput = document.getElementById('apiKeyInput') as HTMLInputElement;
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn') as HTMLButtonElement;

// State
let currentLanguage = 'en'; // Default language
let currentApiKey: string | null = null;
let ai: GoogleGenAI | null = null;


// --- API Key Management ---

function showApiKeyModal() {
    apiKeyModal.style.display = 'flex';
    setTimeout(() => apiKeyModal.classList.add('visible'), 10);
}

function hideApiKeyModal() {
    apiKeyModal.classList.remove('visible');
    setTimeout(() => {
        apiKeyModal.style.display = 'none';
    }, 300);
}

function saveApiKey() {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('gemini-api-key', key);
        currentApiKey = key;
        ai = new GoogleGenAI({ apiKey: currentApiKey });
        hideApiKeyModal();
        topicInput.disabled = false;
        generateBtn.disabled = false;
        errorDisplay.style.display = 'none';
    } else {
        alert('Please enter a valid API key.');
    }
}

function loadApiKey() {
    const savedKey = localStorage.getItem('gemini-api-key');
    if (savedKey) {
        currentApiKey = savedKey;
        apiKeyInput.value = currentApiKey;
        ai = new GoogleGenAI({ apiKey: currentApiKey });
        topicInput.disabled = false;
        generateBtn.disabled = false;
    } else {
        showApiKeyModal();
        topicInput.disabled = true;
        generateBtn.disabled = true;
    }
}

// --- UI & Language ---

function updatePlaceholder() {
    if (currentLanguage === 'en') {
        topicInput.placeholder = "What's on your mind? e.g., lost, stressed, dreaming...";
    } else if (currentLanguage === 'th') {
        topicInput.placeholder = "คุณกำลังรู้สึกอะไร? เช่น สับสน, เครียด, ฝันถึง...";
    }
}

function setLanguage(lang: 'en' | 'th') {
    if (currentLanguage !== lang) {
        currentLanguage = lang;
        langBtnEn.classList.toggle('active', lang === 'en');
        langBtnTh.classList.toggle('active', lang === 'th');
        updatePlaceholder();
        quoteDisplay.classList.remove('visible');
        quoteDisplay.innerHTML = '';
    }
}

// --- Quote Generation ---

async function generateQuote(topic: string) {
    if (!ai) {
        errorDisplay.textContent = 'API Key not configured. Please set it in the settings.';
        errorDisplay.style.display = 'block';
        showApiKeyModal();
        return;
    }

    quoteDisplay.classList.remove('visible');
    quoteDisplay.innerHTML = '';
    errorDisplay.style.display = 'none';
    errorDisplay.textContent = '';
    loadingIndicator.style.display = 'block';
    generateBtn.disabled = true;
    topicInput.disabled = true;

    const languageInstruction = currentLanguage === 'th' ? "in Thai language" : "in English language";
    const prompt = `
        A user is feeling or thinking about: "${topic}".
        Generate an extremely short, impactful phrase ${languageInstruction} (ideally 5-15 words in the target language).
        It should hit like a memorable movie line or a resonant song lyric.
        Make it easy to understand, potent, and highly quotable in the specified language.
        Offer a flash of insight, comfort, or a powerful perspective.
        No fluff, no explanation. Just the core line. Direct, clear, and strong.
        Think of something that sticks.
        DO NOT include any introductory phrases or your own quotation marks.
      `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                "temperature": 0.85,
                "maxOutputTokens": 80,
            }
        });

        const generatedText = response.text;

        if (generatedText) {
            const cleanText = generatedText.replace(/\*/g, '').replace(/^["“„']+|["””']$/g, '').trim();
            quoteDisplay.innerHTML = `<span class="quote-mark open">“</span>${cleanText}<span class="quote-mark close">”</span>`;
            quoteDisplay.classList.add('visible');
        } else {
            throw new Error('Model returned an empty response.');
        }

    } catch (error) {
        console.error('Error generating quote with Gemini API:', error);
        let errorMessage = 'An error occurred. Please try again.';
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                errorMessage = 'Your API Key is invalid. Please check it in the settings.';
                showApiKeyModal();
            } else {
                errorMessage = `Error: ${error.message}`;
            }
        }
        errorDisplay.textContent = errorMessage;
        errorDisplay.style.display = 'block';
        quoteDisplay.classList.remove('visible');
    } finally {
        loadingIndicator.style.display = 'none';
        generateBtn.disabled = false;
        topicInput.disabled = false;
    }
}

// --- Event Listeners ---

generateBtn.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    if (topic) {
        generateQuote(topic);
    } else {
        let emptyTopicMsg = "What's the scene? Give me a topic.";
        if (currentLanguage === 'th') {
            emptyTopicMsg = "กำลังคิดเรื่องอะไรอยู่? บอกหัวข้อมาหน่อย";
        }
        errorDisplay.textContent = emptyTopicMsg;
        errorDisplay.style.display = 'block';
        quoteDisplay.classList.remove('visible');
        quoteDisplay.innerHTML = '';
    }
});

topicInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        generateBtn.click();
    }
});

langBtnEn.addEventListener('click', () => setLanguage('en'));
langBtnTh.addEventListener('click', () => setLanguage('th'));

settingsBtn.addEventListener('click', showApiKeyModal);
closeModalBtn.addEventListener('click', hideApiKeyModal);
saveApiKeyBtn.addEventListener('click', saveApiKey);

apiKeyModal.addEventListener('click', (e) => {
    if (e.target === apiKeyModal) {
        hideApiKeyModal();
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updatePlaceholder();
    loadApiKey();
});