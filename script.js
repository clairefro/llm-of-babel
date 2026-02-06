document.getElementById("funButton").addEventListener("click", function () {
  const messages = [
    "Aparadoy: The legend continues!",
    "You found the secret button!",
    "Aparadoy says: Stay silly!",
    "This is just a parody, enjoy!",
    "Aparadoy: GitHub Pages FTW!",
  ];
  const output = document.getElementById("output");
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  output.textContent = randomMsg;
});
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${sender}`;
  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.textContent = text;
  msgDiv.appendChild(bubble);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botReply(userText) {
  // Simple bot reply logic
  const responses = [
    "Aparadoy: That's interesting!",
    "Tell me more!",
    "Haha, good one!",
    "I'm just a parody bot.",
    "Let's keep chatting!",
  ];
  // Optionally, customize reply based on userText
  const reply = responses[Math.floor(Math.random() * responses.length)];
  setTimeout(() => addMessage(reply, "bot"), 700);
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (userText) {
    addMessage(userText, "user");
    chatInput.value = "";
    botReply(userText);
  }
});
