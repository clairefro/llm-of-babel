document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.querySelector(".chat-form");
  const chatTextarea = document.querySelector(".chat-textarea");
  const greeterBanner = document.querySelector(".greeter-banner");
  const chatArea = document.querySelector(".container");

  // In-memory chat messages
  const chatMessages = [];

  // Create chat display area
  let chatDisplay = document.querySelector(".chat-display");
  if (!chatDisplay) {
    chatDisplay = document.createElement("div");
    chatDisplay.className = "chat-display";
    chatDisplay.style.display = "none";
    if (chatArea) chatArea.insertBefore(chatDisplay, chatArea.firstChild);
  }

  function renderMessages() {
    chatDisplay.innerHTML = "";
    chatMessages.forEach((msg) => {
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg " + msg.role;
      msgDiv.textContent = msg.content;
      chatDisplay.appendChild(msgDiv);
    });
    // Scroll to bottom after rendering
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Hide banner
    if (greeterBanner) greeterBanner.style.display = "none";
    // Move chat area to bottom
    if (chatArea) {
      chatArea.classList.add("bottom");
    }
    // Add user message to memory
    const userMsg = chatTextarea.value.trim();
    if (userMsg) {
      chatMessages.push({ role: "user", content: userMsg });
      // Spoof assistant reply
      chatMessages.push({
        role: "assistant",
        content: randomString300(),
      });
      chatDisplay.style.display = "flex";
      renderMessages();
    }
    // Clear textarea and update placeholder
    chatTextarea.value = "";
    chatTextarea.placeholder = "Reply...";
    chatTextarea.focus();
  });

  function randomString300() {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    let result = "";
    for (let i = 0; i < 300; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
});
