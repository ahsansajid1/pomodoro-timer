// --- DOM Elements ---
const timerCard = document.getElementById('timerCard');
const modeText = document.getElementById('modeText');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressBar = document.getElementById('progressBar');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');

const focusInput = document.getElementById('focusInput');
const breakInput = document.getElementById('breakInput');

const historyList = document.getElementById('historyList');
const dingSound = document.getElementById('dingSound');

// --- State Variables ---
let timerInterval = null;
let isFocusMode = true;
let isPaused = false;
let timeRemaining = 25 * 60; // in seconds
let totalDuration = 25 * 60;

// --- Initialization ---
function init() {
    loadHistory();
    setInitialTime();
    updateUI();
    
    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resumeBtn.addEventListener('click', resumeTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    focusInput.addEventListener('change', handleInputChange);
    breakInput.addEventListener('change', handleInputChange);
}

// --- Timer Logic ---
function startTimer() {
    if (timerInterval) return;
    
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    resumeBtn.classList.add('hidden');
    
    isPaused = false;
    timerInterval = setInterval(tick, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
    
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
}

function resumeTimer() {
    startTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    
    setInitialTime();
    updateUI();
}

function tick() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateUI();
    } else {
        handleTimerComplete();
    }
}

function handleTimerComplete() {
    clearInterval(timerInterval);
    timerInterval = null;
    
    playDing();
    
    if (isFocusMode) {
        saveHistorySession(focusInput.value);
    }
    
    // Transition Mode
    isFocusMode = !isFocusMode;
    setInitialTime();
    updateUI();
    
    // Auto-start next session
    startTimer();
}

function setInitialTime() {
    const focusMins = parseInt(focusInput.value, 10) || 25;
    const breakMins = parseInt(breakInput.value, 10) || 5;
    
    totalDuration = isFocusMode ? focusMins * 60 : breakMins * 60;
    timeRemaining = totalDuration;
}

function handleInputChange() {
    if (!timerInterval && !isPaused) {
        setInitialTime();
        updateUI();
    }
}

// --- UI Updates ---
function updateUI() {
    // Update Time Display
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    
    minutesEl.textContent = mins.toString().padStart(2, '0');
    secondsEl.textContent = secs.toString().padStart(2, '0');
    
    // Update Title
    document.title = `${minutesEl.textContent}:${secondsEl.textContent} - Pomodoro`;
    
    // Update Progress Bar
    const progressPercentage = (timeRemaining / totalDuration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Update Mode Visuals
    if (isFocusMode) {
        timerCard.classList.add('focus-mode');
        timerCard.classList.remove('break-mode');
        modeText.textContent = 'Focus Mode';
    } else {
        timerCard.classList.add('break-mode');
        timerCard.classList.remove('focus-mode');
        modeText.textContent = 'Break Mode';
    }
}

// --- Audio ---
const dingSound = new Audio("ding.mp3");
let audioCtx = null;

function playDing() {
    // Try MP3 first
    dingSound.currentTime = 0;
    dingSound.play().catch(() => {
        // Fallback beep
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = "sine";
            osc.frequency.value = 800;

            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) {
            console.error("Audio failed:", e);
        }
    });
}
// --- History & LocalStorage ---
function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function loadHistory() {
    const todayStr = getTodayString();
    const storedDate = localStorage.getItem('pomodoroDate');
    
    if (storedDate !== todayStr) {
        // New calendar day, clear history
        localStorage.removeItem('pomodoroHistory');
        localStorage.setItem('pomodoroDate', todayStr);
    }
    
    renderHistory();
}

function saveHistorySession(minutes) {
    const history = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    history.push({
        minutes: minutes,
        time: timeString
    });
    
    localStorage.setItem('pomodoroHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
    
    if (history.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.style.color = 'var(--text-secondary)';
        emptyLi.style.fontSize = '0.875rem';
        emptyLi.style.textAlign = 'center';
        emptyLi.style.padding = '1rem 0';
        emptyLi.textContent = 'No sessions completed today.';
        historyList.appendChild(emptyLi);
        return;
    }
    
    // Display newest first
    [...history].reverse().forEach(session => {
        const li = document.createElement('li');
        li.className = 'history-item';
        
        li.innerHTML = `
            <span class="icon">✓</span>
            <span class="desc">${session.minutes}:00 focus</span>
            <span class="time">— ${session.time}</span>
        `;
        
        historyList.appendChild(li);
    });
}

// Start app
init();
