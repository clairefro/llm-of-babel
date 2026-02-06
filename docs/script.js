// Punctuation characters for each script
const scriptPunctuation = {
  latin: " .,;:!?\"'()-[]{}", // space
  cyrillic: " .,;:!?\"'()-[]{}", // space
  greek: " ·.,;:!?\"'()-[]{}", // space
  arabic: " ،؛؟", // space, Arabic NBSP
  hebrew: " .,;:!?\"'()-[]{}׳״", // space, Hebrew NBSP
  devanagari: " ।॥", // space, Devanagari NBSP
  armenian: " ։՞՛՜։,;«»", // space, Armenian NBSP
  georgian: " .,;:!?\"'()-[]{}", // space
  thai: " ฯๆ.,;:!?\"'()-[]{}", // space
  hangul: " .,;:!?\"'()-[]{}", // space
  katakana: "。、「」・　", // Japanese full-width space
  hiragana: "。、「」・　", // Japanese full-width space
  ethiopic: " ።፣፤፥፦፧", // space
  tamil: " ।॥", // space, Tamil NBSP
  bengali: " ।॥", // space, Bengali NBSP
  lao: " ໆ,;:!?\"'()-[]{}", // space
  myanmar: " ၊။", // space
  khmer: " ។៕៚", // space
  tibetan: " །༎༏༐༑༔", // space
  syriac: " ܀܁܂", // space
  cjk: " 。、《》「」『』【】（）　", // space, Japanese full-width space
  hieroglyph: " ", // space only
  emoji: " ", // space only
};
// Global settings for script toggles
const settings = {
  scripts: {
    latin: true, // 0041–007A, 00C0–00FF (A-Z, a-z, Latin-1 Supplement)
    cyrillic: true, // 0400–04FF
    greek: true, // 0370–03FF
    arabic: true, // 0600–06FF
    hebrew: true, // 0590–05FF
    devanagari: true, // 0900–097F
    armenian: true, // 0530–058F
    georgian: true, // 10A0–10FF
    thai: true, // 0E00–0E7F
    hangul: true, // AC00–D7AF
    katakana: true, // 30A0–30FF
    hiragana: true, // 3040–309F
    ethiopic: true, // 1200–137F
    tamil: true, // 0B80–0BFF
    bengali: true, // 0980–09FF
    lao: true, // 0E80–0EFF
    myanmar: true, // 1000–109F
    khmer: true, // 1780–17FF
    tibetan: true, // 0F00–0FFF
    syriac: true, // 0700–074F
    cjk: true, // 4E00–9FFF (CJK Unified Ideographs)
    hieroglyph: true, // 13000–1342F (Egyptian Hieroglyphs)
    emoji: true, // 1F300–1FAD6, 1F600–1F64F, etc.
  },
};

// ======

document.addEventListener("DOMContentLoaded", function () {
  // --- Settings Sidebar Logic ---
  const settingsSidebar = document.querySelector(".settings-sidebar");
  const settingsToggle = document.getElementById("settings-toggle");
  const settingsForm = document.getElementById("settings-form");

  // Helper: pretty names for scripts
  const scriptNames = {
    latin: "Latin",
    cyrillic: "Cyrillic",
    greek: "Greek",
    arabic: "Arabic",
    hebrew: "Hebrew",
    devanagari: "Devanagari",
    armenian: "Armenian",
    georgian: "Georgian",
    thai: "Thai",
    hangul: "Hangul",
    katakana: "Katakana",
    hiragana: "Hiragana",
    ethiopic: "Ethiopic",
    tamil: "Tamil",
    bengali: "Bengali",
    lao: "Lao",
    myanmar: "Myanmar",
    khmer: "Khmer",
    tibetan: "Tibetan",
    syriac: "Syriac",
    cjk: "CJK Ideographs",
    hieroglyph: "Hieroglyphs",
    emoji: "Emoji",
  };

  // Render checkboxes for each script
  function renderSettingsForm() {
    if (!settingsForm) return;
    settingsForm.innerHTML = "";
    Object.keys(settings.scripts).forEach((key) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginBottom = "0.5em";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = key;
      checkbox.checked = !!settings.scripts[key];
      checkbox.addEventListener("change", (e) => {
        settings.scripts[key] = checkbox.checked;
      });
      label.appendChild(checkbox);
      label.appendChild(
        document.createTextNode(" " + (scriptNames[key] || key)),
      );
      settingsForm.appendChild(label);
    });
  }

  renderSettingsForm();

  // Select All / Deselect All logic
  const selectAllBtn = document.getElementById("select-all-btn");
  const deselectAllBtn = document.getElementById("deselect-all-btn");
  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", () => {
      Object.keys(settings.scripts).forEach(
        (key) => (settings.scripts[key] = true),
      );
      if (settingsForm) {
        const checkboxes = settingsForm.querySelectorAll(
          'input[type="checkbox"]',
        );
        checkboxes.forEach((cb) => {
          cb.checked = true;
        });
      }
    });
  }
  if (deselectAllBtn) {
    deselectAllBtn.addEventListener("click", () => {
      Object.keys(settings.scripts).forEach(
        (key) => (settings.scripts[key] = false),
      );
      if (settingsForm) {
        const checkboxes = settingsForm.querySelectorAll(
          'input[type="checkbox"]',
        );
        checkboxes.forEach((cb) => {
          cb.checked = false;
        });
      }
    });
  }

  // Sidebar toggle logic
  if (settingsToggle && settingsSidebar) {
    let open = false;
    settingsToggle.addEventListener("click", () => {
      open = !open;
      settingsSidebar.style.left = open ? "0" : "-260px";
    });
    // Optional: close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (
        open &&
        !settingsSidebar.contains(e.target) &&
        e.target !== settingsToggle
      ) {
        open = false;
        settingsSidebar.style.left = "-260px";
      }
    });
  }
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
            if (msg.role === "assistant") {
              addCopyIcon(msgDiv, msg.content);
            }
          }
        }, 400);
      } else {
        msgDiv.textContent = msg.content;
        chatDisplay.appendChild(msgDiv);
        if (msg.role === "assistant") {
          addCopyIcon(msgDiv, msg.content);
        }
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

  // Submit on Enter, newline on Shift+Enter
  chatTextarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
    // Otherwise, allow default (newline on Shift+Enter)
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
      // Map script keys to their Unicode ranges
      const scriptRanges = {
        latin: [[0x0021, 0x007e]],
        cyrillic: [[0x0400, 0x04ff]],
        greek: [[0x0370, 0x03ff]],
        hebrew: [[0x0590, 0x05ff]],
        arabic: [[0x0600, 0x06ff]],
        devanagari: [[0x0900, 0x097f]],
        hiragana: [[0x3040, 0x309f]],
        katakana: [[0x30a0, 0x30ff]],
        cjk: [[0x4e00, 0x4e7f]], // common subset
        hangul: [[0xac00, 0xd7af]],
        emoji: [
          [0x1f300, 0x1f5ff],
          [0x1f600, 0x1f64f],
          [0x1f680, 0x1f6ff],
          [0x1f900, 0x1f9ff],
        ],
        hieroglyph: [[0x13000, 0x1342f]],
        armenian: [[0x0530, 0x058f]],
        georgian: [[0x10a0, 0x10ff]],
        thai: [[0x0e00, 0x0e7f]],
        ethiopic: [[0x1200, 0x137f]],
        tamil: [[0x0b80, 0x0bff]],
        bengali: [[0x0980, 0x09ff]],
        lao: [[0x0e80, 0x0eff]],
        myanmar: [[0x1000, 0x109f]],
        khmer: [[0x1780, 0x17ff]],
        tibetan: [[0x0f00, 0x0fff]],
        syriac: [[0x0700, 0x074f]],
      };

      // Build a list of enabled script ranges
      let enabledRanges = [];
      for (const script in settings.scripts) {
        if (settings.scripts[script] && scriptRanges[script]) {
          enabledRanges = enabledRanges.concat(scriptRanges[script]);
        }
      }
      // Fallback to Latin if none enabled
      if (enabledRanges.length === 0) {
        enabledRanges = scriptRanges.latin;
      }

      let cp;
      let tries = 0;
      do {
        const [start, end] =
          enabledRanges[Math.floor(Math.random() * enabledRanges.length)];
        cp = start + Math.floor(Math.random() * (end - start + 1));
        tries++;
      } while (!isRenderable(cp) && tries < 10);
      // Fallback to space if not renderable after 10 tries
      if (!isRenderable(cp)) {
        cp = " ";
      }
      return String.fromCodePoint(cp);
    }
    let result = "";
    const minLen = 50;
    const maxLen = 750;
    const length = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
    for (let i = 0; i < length; i++) {
      result += randomChar();
    }
    return result;
  }
});
