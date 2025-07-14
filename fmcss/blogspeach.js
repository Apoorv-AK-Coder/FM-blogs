// ✅ Text-to-Speech setup
const synth = window.speechSynthesis;
let utterance = null;
let isPaused = false;

const volumeIcon = document.getElementById("volume-icon");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const blogContent = document.querySelector(".blog-content");

function clearActiveClasses() {
  volumeIcon.classList.remove("active");
  playIcon.classList.remove("active");
  pauseIcon.classList.remove("active");
}

if (blogContent && volumeIcon && playIcon && pauseIcon) {
  volumeIcon.addEventListener("click", () => {
    if (synth.speaking) {
      synth.cancel();
      console.log("Speech stopped (mute).");
    }
    clearActiveClasses();
    volumeIcon.classList.add("active");
  });

  playIcon.addEventListener("click", () => {
    const text = blogContent.innerText;
    if (!synth.speaking || isPaused) {
      if (isPaused) {
        synth.resume();
        isPaused = false;
        console.log("Speech resumed.");
      } else {
        utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        console.log("Speech started.");
      }
    }
    clearActiveClasses();
    playIcon.classList.add("active");
  });

  pauseIcon.addEventListener("click", () => {
    if (synth.speaking) {
      synth.pause();
      isPaused = true;
      console.log("Speech paused.");
    }
    clearActiveClasses();
    pauseIcon.classList.add("active");
  });
}

window.addEventListener("beforeunload", () => {
  window.speechSynthesis.cancel();
});