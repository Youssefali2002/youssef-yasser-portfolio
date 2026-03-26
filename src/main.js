// Audio Setup - Initialize the click sound
const clickSound = new Audio("../Minimal Click.wav");
clickSound.preload = "none";
clickSound.volume = 0.5;

// Background Music Setup
const backgroundMusic = document.getElementById("backgroundMusic");

// Music State
let musicState = {
  isPlaying: false,
  hasInteracted: false,
};

// Update Music UI
function updateMusicUI() {
  const musicToggle = document.getElementById("musicToggle");
  if (!musicToggle) return;

  const icon = musicToggle.querySelector(".music-icon");
  const text = musicToggle.querySelector(".music-text");

  if (musicState.isPlaying) {
    icon.textContent = "🎵";
    text.textContent = "Music ON";
    text.classList.remove("text-red-400");
    text.classList.add("text-green-400");
  } else {
    icon.textContent = "🔇";
    text.textContent = "Music OFF";
    text.classList.remove("text-green-400");
    text.classList.add("text-red-400");
  }
}

// Toggle Music
function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic
      .play()
      .then(() => {
        musicState.isPlaying = true;
        updateMusicUI();
      })
      .catch(() => {
        musicState.isPlaying = false;
        updateMusicUI();
      });
  } else {
    backgroundMusic.pause();
    musicState.isPlaying = false;
    updateMusicUI();
  }
}

// Start Music on First Interaction
function startMusicOnInteraction() {
  if (!musicState.hasInteracted) {
    backgroundMusic
      .play()
      .then(() => {
        musicState.isPlaying = true;
        musicState.hasInteracted = true;
        updateMusicUI();
      })
      .catch(() => {
        musicState.isPlaying = false;
        musicState.hasInteracted = true;
        updateMusicUI();
      });
  }
}

// Click Sound Function
function playClickSound() {
  try {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  } catch {}
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateMusicUI();

  let firstClick = true;

  // Document Click Handler
  document.addEventListener("click", function (event) {
    if (firstClick) {
      startMusicOnInteraction();
      firstClick = false;
    }

    const target = event.target;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a")
    ) {
      playClickSound();
    }
  });

  // Music Toggle Handler
  const musicToggle = document.getElementById("musicToggle");
  if (musicToggle) {
    musicToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleMusic();
      musicState.hasInteracted = true;
    });
  }

  clickSound.load();
});

// Export
window.clickSound = { play: playClickSound, audio: clickSound };



      // Audio starts only after user interaction (see startMusicOnInteraction / toggleMusic)