const quotes = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Dream big and dare to fail.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Sometimes later becomes never. Do it now.",
  "Great things never come from comfort zones.",
];

const quoteEl = document.getElementById("quote");
const btn = document.getElementById("newQuote");

function showQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = quotes[randomIndex];
}

// First quote
showQuote();

// Button click
btn.addEventListener("click", showQuote);

// Register Service Worker for offline
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker registered!"))
    .catch((err) => console.error("SW failed:", err));
}
