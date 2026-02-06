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
    chatMessages.forEach((msg, idx) => {
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg " + msg.role;
      // Message content
      let streaming = false;
      if (
        msg.role === "assistant" &&
        idx === chatMessages.length - 1 &&
        msg.streaming
      ) {
        streaming = true;
        let i = 0;
        msgDiv.textContent = "";
        chatDisplay.appendChild(msgDiv);
        setTimeout(function streamChar() {
          if (i < msg.content.length) {
            const chunkSize = Math.floor(Math.random() * 8) + 1;
            msgDiv.textContent += msg.content.slice(i, i + chunkSize);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
            i += chunkSize;
            setTimeout(streamChar, 30);
          } else {
            addCopyIcon(msgDiv, msg.content);
          }
        }, 400);
      } else {
        msgDiv.textContent = msg.content;
        chatDisplay.appendChild(msgDiv);
        addCopyIcon(msgDiv, msg.content);
      }
    });
    // Scroll to bottom after rendering
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    // Helper to add copy icon
    function addCopyIcon(parentDiv, text) {
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "copy-icon-wrapper";
      iconWrapper.style.display = "flex";
      iconWrapper.style.justifyContent = "center";
      iconWrapper.style.marginTop = "0.5em";
      iconWrapper.style.cursor = "pointer";
      iconWrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="transition-all opacity-100 scale-100" aria-hidden="true" style="flex-shrink: 0;"><path d="M12.5 3C13.3284 3 14 3.67157 14 4.5V6H15.5C16.3284 6 17 6.67157 17 7.5V15.5C17 16.3284 16.3284 17 15.5 17H7.5C6.67157 17 6 16.3284 6 15.5V14H4.5C3.67157 14 3 13.3284 3 12.5V4.5C3 3.67157 3.67157 3 4.5 3H12.5ZM14 12.5C14 13.3284 13.3284 14 12.5 14H7V15.5C7 15.7761 7.22386 16 7.5 16H15.5C15.7761 16 16 15.7761 16 15.5V7.5C16 7.22386 15.7761 7 15.5 7H14V12.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5V12.5C4 12.7761 4.22386 13 4.5 13H12.5C12.7761 13 13 12.7761 13 12.5V4.5C13 4.22386 12.7761 4 12.5 4H4.5Z"></path></svg>`;
      iconWrapper.title = "Copy message";
      iconWrapper.addEventListener("click", function (e) {
        e.stopPropagation();
        if (navigator && navigator.clipboard) {
          navigator.clipboard.writeText(text);
        }
        // Optionally, show feedback
        iconWrapper.style.opacity = "0.5";
        setTimeout(() => {
          iconWrapper.style.opacity = "1";
        }, 400);
      });
      parentDiv.appendChild(iconWrapper);
    }
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
      // Spoof streaming assistant reply
      chatMessages.push({
        role: "assistant",
        content: randomString300(),
        streaming: true,
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
    // Unicode ranges for various human scripts (printable blocks only, CJK subset for better font support)
    const ranges = [
      [0x0021, 0x007e], // Basic Latin (printable)
      [0x0400, 0x04ff], // Cyrillic
      [0x0370, 0x03ff], // Greek
      [0x0590, 0x05ff], // Hebrew
      [0x0600, 0x06ff], // Arabic
      [0x0900, 0x097f], // Devanagari
      [0x3040, 0x309f], // Hiragana
      [0x30a0, 0x30ff], // Katakana
      [0x4e00, 0x4e7f], // CJK Unified Ideographs (common subset)
      [0xac00, 0xd7af], // Hangul Syllables
      [0x1f300, 0x1f5ff], // Misc Symbols & Pictographs (emoji)
      [0x1f600, 0x1f64f], // Emoticons (emoji)
      [0x1f680, 0x1f6ff], // Transport & Map (emoji)
      [0x1f900, 0x1f9ff], // Supplemental Symbols & Pictographs (emoji)
      [0x13000, 0x1342f], // Egyptian Hieroglyphs
    ];
    // Helper: check if a code point is likely to render (skip surrogates, controls, private use, and filter CJK to common subset)
    function isRenderable(cp) {
      // Not surrogate, not private use, not control
      if (
        (cp >= 0xd800 && cp <= 0xdfff) ||
        (cp >= 0xe000 && cp <= 0xf8ff) ||
        (cp >= 0xf0000 && cp <= 0xffffd) ||
        (cp >= 0x100000 && cp <= 0x10fffd) ||
        (cp <= 0x1f && cp !== 0x20)
      ) {
        return false;
      }
      // CJK: only use a small, common subset (0x4E00-0x4E7F)
      if (cp >= 0x4e00 && cp <= 0x9fff && !(cp >= 0x4e00 && cp <= 0x4e7f)) {
        return false;
      }
      // Devanagari: skip code points that are not assigned (0x093A-0x093B, 0x094E-0x094F, 0x0955-0x0957, 0x0972-0x0977, 0x0979-0x097A, 0x0980+)
      if (cp >= 0x0900 && cp <= 0x097f) {
        if (
          (cp >= 0x093a && cp <= 0x093b) ||
          (cp >= 0x094e && cp <= 0x094f) ||
          (cp >= 0x0955 && cp <= 0x0957) ||
          (cp >= 0x0972 && cp <= 0x0977) ||
          (cp >= 0x0979 && cp <= 0x097a) ||
          cp >= 0x0980
        ) {
          return false;
        }
      }
      return true;
    }
    function randomChar() {
      let cp;
      let tries = 0;
      do {
        const [start, end] = ranges[Math.floor(Math.random() * ranges.length)];
        cp = start + Math.floor(Math.random() * (end - start + 1));
        tries++;
      } while (!isRenderable(cp) && tries < 10);
      // Fallback to Latin if not renderable after 10 tries
      if (!isRenderable(cp)) {
        cp = 0x0041 + Math.floor(Math.random() * 26); // A-Z
      }
      return String.fromCodePoint(cp);
    }
    let result = "";
    const minLen = 150;
    const maxLen = 660;
    const length = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
    for (let i = 0; i < length; i++) {
      result += randomChar();
    }
    return result;
  }
});
