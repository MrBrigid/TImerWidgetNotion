let timerMinutes = 0;
let timerSeconds = 0;
let timerInterval = null;

const timeInput = document.getElementById('time-display');
const addMinuteButton = document.getElementById('add-minute');
const subtractMinuteButton = document.getElementById('subtract-minute');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetIcon = document.getElementById('reset-icon');
const timerSound = document.getElementById('timer-sound');

// Play sound when the timer finishes
function playTimerSound() {
  timerSound.play();
}

// Update the time display
function updateTimeDisplay() {
  const minutes = String(timerMinutes).padStart(2, '0');
  const seconds = String(timerSeconds).padStart(2, '0');
  timeInput.value = `${minutes}:${seconds}`;
}

// Add 1 minute
addMinuteButton.addEventListener('click', () => {
  timerMinutes++;
  updateTimeDisplay();
});

// Subtract 1 minute
subtractMinuteButton.addEventListener('click', () => {
  if (timerMinutes > 0) {
    timerMinutes--;
  } else if (timerSeconds > 0) {
    timerSeconds = 0; // Reset seconds if no minutes left
  }
  updateTimeDisplay();
});

// Start the timer
startButton.addEventListener('click', () => {
  if (timerInterval) return; // Prevent multiple intervals

  startButton.disabled = true; // Disable start button while running
  pauseButton.disabled = false; // Enable pause button
  timerInterval = setInterval(() => {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        clearInterval(timerInterval); // Stop timer if time is up
        timerInterval = null;
        startButton.disabled = false; // Re-enable start button
        pauseButton.disabled = true; // Disable pause button
        playTimerSound(); // Play sound
        alert('Time is up!'); // Optional alert
      } else {
        timerMinutes--;
        timerSeconds = 59;
      }
    } else {
      timerSeconds--;
    }
    updateTimeDisplay();
  }, 1000);
});

// Pause the timer
pauseButton.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.disabled = false; // Re-enable start button
  }
});

// Reset the timer
resetIcon.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerMinutes = 0;
  timerSeconds = 0;
  startButton.disabled = false; // Re-enable start button
  pauseButton.disabled = true; // Disable pause button
  updateTimeDisplay();
});

// Allow editing of the timer
timeInput.addEventListener('blur', () => {
  const timeParts = timeInput.value.split(':');
  if (timeParts.length === 2) {
    const minutes = parseInt(timeParts[0], 10);
    const seconds = parseInt(timeParts[1], 10);

    if (!isNaN(minutes) && !isNaN(seconds) && seconds >= 0 && seconds < 60) {
      timerMinutes = minutes;
      timerSeconds = seconds;
      updateTimeDisplay();
    } else {
      alert('Invalid time format. Please enter as MM:SS.');
      updateTimeDisplay(); // Reset to current time
    }
  } else {
    alert('Invalid time format. Please enter as MM:SS.');
    updateTimeDisplay(); // Reset to current time
  }
});

// Initialize display
updateTimeDisplay();