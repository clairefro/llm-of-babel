// TODO: Punctuation characters for each script?
// const scriptPunctuation = {
//   latin: " .,;:!?\"'()-[]{}", // space
//   cyrillic: " .,;:!?\"'()-[]{}", // space
//   greek: " ·.,;:!?\"'()-[]{}", // space
//   arabic: " ،؛؟", // space, Arabic NBSP
//   hebrew: " .,;:!?\"'()-[]{}׳״", // space, Hebrew NBSP
//   devanagari: " ।॥", // space, Devanagari NBSP
//   armenian: " ։՞՛՜։,;«»", // space, Armenian NBSP
//   georgian: " .,;:!?\"'()-[]{}", // space
//   thai: " ฯๆ.,;:!?\"'()-[]{}", // space
//   hangul: " .,;:!?\"'()-[]{}", // space
//   katakana: "。、「」・　", // Japanese full-width space
//   hiragana: "。、「」・　", // Japanese full-width space
//   ethiopic: " ።፣፤፥፦፧", // space
//   tamil: " ।॥", // space, Tamil NBSP
//   bengali: " ।॥", // space, Bengali NBSP
//   lao: " ໆ,;:!?\"'()-[]{}", // space
//   myanmar: " ၊။", // space
//   khmer: " ។៕៚", // space
//   tibetan: " །༎༏༐༑༔", // space
//   syriac: " ܀܁܂", // space
//   cjk: " 。、《》「」『』【】（）　", // space, Japanese full-width space
//   hieroglyph: " ", // space only
//   emoji: " ", // space only
// };

// Global settings for script toggles and temperature
const settings = {
  temperature: 1.0,
  scripts: {
    latin: true, // 0041–007A, 00C0–00FF (A-Z, a-z, Latin-1 Supplement)
    binary: false, // 0, 1
    cuneiform: false,
    braille: false,
    runic: false, // 16A0–16FF
    cyrillic: false, // 0400–04FF
    greek: false, // 0370–03FF
    arabic: false, // 0600–06FF
    hebrew: false, // 0590–05FF
    devanagari: false, // 0900–097F
    armenian: false, // 0530–058F
    georgian: false, // 10A0–10FF
    thai: false, // 0E00–0E7F
    hangul: false, // AC00–D7AF
    katakana: false, // 30A0–30FF
    hiragana: false, // 3040–309F
    ethiopic: false, // 1200–137F
    tamil: false, // 0B80–0BFF
    kannada: false, // 0C80–0CFF
    bengali: false, // 0980–09FF
    lao: false, // 0E80–0EFF
    myanmar: false, // 1000–109F
    khmer: false, // 1780–17FF
    tibetan: false, // 0F00–0FFF
    syriac: false, // 0700–074F
    cjk: false, // 4E00–9FFF (CJK Unified Ideographs)
    hieroglyph: false, // 13000–1342F (Egyptian Hieroglyphs)
    emoji: false, // 1F300–1FAD6, 1F600–1F64F, etc.
    cuneiform: false, // 12000–123FF (Sumero-Akkadian Cuneiform)
    braille: false, // 2800–28FF (Braille Patterns)
  },
};
// Temperature slider logic
const tempSlider = document.getElementById("temperature-slider");
if (tempSlider) {
  tempSlider.value = 1;
  tempSlider.disabled = true;
  // Tooltip element for slider quips
  let sliderTooltip = null;
  function showSliderTooltip(message) {
    if (!sliderTooltip) {
      sliderTooltip = document.createElement("div");
      sliderTooltip.className = "slider-tooltip";
      sliderTooltip.style.position = "absolute";
      sliderTooltip.style.background = "#232323";
      sliderTooltip.style.color = "#fff";
      sliderTooltip.style.padding = "0.5em 1em";
      sliderTooltip.style.borderRadius = "0.5em";
      sliderTooltip.style.boxShadow = "0 2px 8px rgba(0,0,0,0.18)";
      sliderTooltip.style.fontSize = "0.95em";
      sliderTooltip.style.zIndex = 1000;
      sliderTooltip.style.transition = "opacity 0.2s";
      sliderTooltip.style.opacity = "0";
      sliderTooltip.style.zIndex = "99999";
      document.body.appendChild(sliderTooltip);
    }
    // Always hide and clear previous timeout before showing new message
    sliderTooltip.style.opacity = "0";
    clearTimeout(sliderTooltip._hideTimeout);
    // Force reflow to ensure opacity transition
    void sliderTooltip.offsetWidth;
    sliderTooltip.textContent = message;
    // Position below the slider
    const rect = tempSlider.getBoundingClientRect();
    sliderTooltip.style.left =
      rect.left +
      window.scrollX +
      rect.width / 2 -
      sliderTooltip.offsetWidth / 2 +
      "px";
    sliderTooltip.style.top = rect.bottom + window.scrollY + 8 + "px";
    sliderTooltip.style.opacity = "1";
    // Recenter after content update
    setTimeout(() => {
      sliderTooltip.style.left =
        rect.left +
        150 +
        window.scrollX +
        rect.width / 2 -
        sliderTooltip.offsetWidth / 2 +
        "px";
    }, 10);
    // Hide after 2 seconds
    sliderTooltip._hideTimeout = setTimeout(() => {
      sliderTooltip.style.opacity = "0";
    }, 2000);
  }
  // Show tooltip only on hover or touch
  const fireSliderTooltip = (e) => {
    // Always set slider value to 1
    tempSlider.value = 1;
    const quips = [
      "Order is just chaos that hasn't found the right monkey.",
      "Entropy cannot be reduced.",
      "The Second Law is not a suggestion.",
      "Predictability is the thief of understanding.",
      "Want a 'pattern'? Go buy a rug",
      "The noise is the signal",
      "Take it up with Tzinacán and the jaguar",
    ];
    showSliderTooltip(quips[Math.floor(Math.random() * quips.length)]);
    // Remove focus to prevent repeated alerts on mobile
    tempSlider.blur();
  };
  tempSlider.addEventListener("mouseenter", fireSliderTooltip);
  tempSlider.addEventListener("touchstart", fireSliderTooltip);
}

const SCRIPTS = {
  runic: {
    name: "Runic",
    // Runic: U+16A0–U+16FF
    ranges: [[0x16a0, 0x16f8]],
  },
  latin: {
    name: "Latin",
    // Only A-Z (0x41-0x5A), a-z (0x61-0x7A), space (0x20), period (0x2E), comma (0x2C), exclamation mark (0x21), question mark (0x3F)
    ranges: [
      [0x0041, 0x005a], // A-Z
      [0x0061, 0x007a], // a-z
      [0x0020, 0x0020], // space
      //   [0x002e, 0x002e], // period
      //   [0x002c, 0x002c], // comma
      //   [0x0021, 0x0021], // exclamation mark
      //   [0x003f, 0x003f], // question mark
    ],
  },
  cuneiform: {
    name: "Cuneiform",
    // Sumero-Akkadian Cuneiform: U+12000–U+123FF
    ranges: [[0x12000, 0x123ff]],
  },
  braille: {
    name: "Braille",
    // Braille Patterns: U+2800–U+28FF
    ranges: [[0x2800, 0x28ff]],
  },
  cyrillic: {
    name: "Cyrillic",
    // U+0410–U+044F (А–я), U+0401 (Ё), U+0451 (ё)
    ranges: [
      [0x0410, 0x044f], // А-я
      [0x0401, 0x0401], // Ё
      [0x0451, 0x0451], // ё
    ],
  },
  greek: {
    name: "Greek",
    // Restrict to most common Greek uppercase (U+0391–U+03A9) and lowercase (U+03B1–U+03C9) letters
    ranges: [
      [0x0391, 0x03a9], // Α–Ω
      [0x03b1, 0x03c9], // α–ω
    ],
  },
  arabic: {
    name: "Arabic",
    ranges: [[0x0600, 0x06ff]],
  },
  hebrew: {
    name: "Hebrew",
    // Restrict to most common Hebrew letters: א (U+05D0) to ת (U+05EA)
    ranges: [
      [0x05d0, 0x05ea], // letters א–ת
    ],
  },
  devanagari: {
    name: "Devanagari",
    ranges: [[0x0900, 0x097f]],
  },
  armenian: {
    name: "Armenian",
    // Restrict to most common Armenian letters: U+0531–U+0556 (uppercase), U+0561–U+0587 (lowercase)
    ranges: [
      [0x0531, 0x0556], // uppercase letters
      [0x0561, 0x0587], // lowercase letters
    ],
  },
  georgian: {
    name: "Georgian",
    ranges: [
      [0x10d0, 0x10f0], // Mkhedruli (modern Georgian alphabet)
    ],
  },
  thai: {
    name: "Thai",
    // Restrict to most common Thai consonants (U+0E01–U+0E2E) and digits (U+0E50–U+0E59)
    ranges: [
      [0x0e01, 0x0e2e], // consonants
      [0x0e50, 0x0e59], // digits
    ],
  },
  hangul: {
    name: "Hangul",
    ranges: [[0xac00, 0xd7af]],
  },
  katakana: {
    name: "Katakana",
    ranges: [[0x30a0, 0x30ff]],
  },
  hiragana: {
    name: "Hiragana",
    // Restrict to most common Hiragana: あ (U+3042) to ん (U+3093), and を (U+3092)
    ranges: [
      [0x3042, 0x3093], // あ–ん
      [0x3092, 0x3092], // を
    ],
  },
  ethiopic: {
    name: "Ethiopic",
    // Restrict to most common Ethiopic syllables and numerals
    // Restrict to most common base syllables (U+1200–U+1248) and digits (U+1369–U+1371)
    ranges: [
      [0x1200, 0x1248], // base syllables
      [0x1369, 0x1371], // digits
    ],
  },
  tamil: {
    name: "Tamil",
    // U+0B85–U+0BB9: Tamil letters, U+0BC6–U+0BCC: vowels, U+0BD0: OM, U+0B95–U+0BB9: consonants, U+0BE6–U+0BEF: digits
    // Exclude reserved, deprecated, and combining marks
    ranges: [
      [0x0b85, 0x0b8a], // vowels
      [0x0b8e, 0x0b90], // vowels
      [0x0b92, 0x0b95], // vowels + ka
      [0x0b95, 0x0b9a], // consonants
      [0x0b9c, 0x0b9c], // ja
      [0x0b9e, 0x0b9f], // nya, tta
      [0x0ba3, 0x0ba4], // nna, ta
      [0x0ba8, 0x0baa], // na, pa
      [0x0bae, 0x0bb9], // ma–ha
      [0x0be6, 0x0bef], // digits
      [0x0bd0, 0x0bd0], // OM
    ],
  },
  kannada: {
    name: "Kannada",
    // U+0C85–U+0C94: vowels, U+0C95–U+0CB9: consonants, U+0CE6–U+0CEF: digits
    // Restrict to reliably rendering Kannada letters and digits only
    ranges: [
      [0x0c85, 0x0c8c], // vowels up to before U+0C8D
      [0x0c8e, 0x0c90], // vowels up to before U+0C91
      [0x0c92, 0x0c94], // vowels after U+0C91
      [0x0c95, 0x0ca8], // ka to na (most basic consonants)
      [0x0ce6, 0x0cef], // digits
    ],
  },
  bengali: {
    name: "Bengali",
    // U+0985–U+0994: vowels, U+0995–U+09B9: consonants, U+09E6–U+09EF: digits
    ranges: [
      [0x0985, 0x0994], // vowels
      [0x0995, 0x09b9], // consonants
      [0x09e6, 0x09ef], // digits
    ],
  },
  lao: {
    name: "Lao",
    // U+0E81–U+0E94: consonants, U+0ED0–U+0ED9: digits
    ranges: [
      [0x0e81, 0x0e94], // consonants
      [0x0ed0, 0x0ed9], // digits
    ],
  },
  myanmar: {
    name: "Myanmar",
    // U+1000–U+1021: consonants, U+1040–U+1049: digits
    ranges: [
      [0x1000, 0x1021], // consonants
      [0x1040, 0x1049], // digits
    ],
  },
  khmer: {
    name: "Khmer",
    // U+1780–U+17A2: consonants, U+17E0–U+17E9: digits
    ranges: [
      [0x1780, 0x17a2], // consonants
      [0x17e0, 0x17e9], // digits
    ],
  },
  tibetan: {
    name: "Tibetan",
    // U+0F40–U+0F6C: consonants, U+0F20–U+0F29: digits
    ranges: [
      [0x0f40, 0x0f6c], // consonants
      [0x0f20, 0x0f29], // digits
    ],
  },
  syriac: {
    name: "Syriac",
    ranges: [[0x0700, 0x074f]],
  },
  cjk: {
    name: "CJK Ideographs",
    ranges: [[0x4e00, 0x4e7f]], // common subset
  },
  hieroglyph: {
    name: "Hieroglyphs",
    ranges: [[0x13000, 0x1342f]],
  },
  emoji: {
    name: "Emoji",
    ranges: [
      //   [0x1f300, 0x1f5ff],
      [0x1f600, 0x1f64f],
      //   [0x1f680, 0x1f6ff],
      [0x1f900, 0x1f9ff],
    ],
  },
  binary: {
    name: "Binary",
    // Only the characters '0' and '1'
    ranges: [
      [0x0030, 0x0031], // '0' and '1'
    ],
  },
};
// ======

document.addEventListener("DOMContentLoaded", function () {
  // --- Settings Sidebar Logic ---
  const settingsSidebar = document.querySelector(".settings-sidebar");
  const settingsToggle = document.getElementById("settings-toggle");
  const settingsForm = document.getElementById("settings-form");

  // Render checkboxes for each script
  function renderSettingsForm() {
    if (!settingsForm) return;
    settingsForm.innerHTML = "";
    Object.keys(settings.scripts).forEach((key) => {
      if (!SCRIPTS[key]) return;
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
        document.createTextNode(" " + (SCRIPTS[key].name || key)),
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
    settingsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      open = !open;
      if (open) {
        settingsSidebar.classList.add("open");
      } else {
        settingsSidebar.classList.remove("open");
      }
    });
    // Optional: close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      if (
        open &&
        !settingsSidebar.contains(e.target) &&
        e.target !== settingsToggle
      ) {
        open = false;
        settingsSidebar.classList.remove("open");
      }
    });
  }
  const chatForm = document.querySelector(".chat-form");
  const chatTextarea = document.querySelector(".chat-textarea");
  const chatSubmit = chatForm
    ? chatForm.querySelector('button[type="submit"], input[type="submit"]')
    : null;
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

  // --- AUTO_SCROLL logic ---
  let autoScroll = true;
  let streamingActive = false;

  // Listen for user scroll during streaming
  chatDisplay.addEventListener("scroll", function () {
    if (!streamingActive) return;
    // If user scrolls up (not at bottom), disable autoScroll
    const threshold = 10; // px
    if (
      chatDisplay.scrollHeight -
        chatDisplay.scrollTop -
        chatDisplay.clientHeight >
      threshold
    ) {
      autoScroll = false;
    }
  });

  function renderMessages() {
    chatDisplay.innerHTML = "";
    chatMessages.forEach((msg, idx) => {
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg " + msg.role;
      // Message content
      if (
        msg.role === "assistant" &&
        idx === chatMessages.length - 1 &&
        msg.streaming
      ) {
        streamingActive = true;
        autoScroll = true; // Enable by default for new message
        let i = 0;
        msgDiv.textContent = "";
        chatDisplay.appendChild(msgDiv);
        setTimeout(function streamChar() {
          if (i < msg.content.length) {
            const chunkSize = Math.floor(Math.random() * 8) + 1;
            msgDiv.textContent += msg.content.slice(i, i + chunkSize);
            if (autoScroll) {
              chatDisplay.scrollTop = chatDisplay.scrollHeight;
            }
            i += chunkSize;
            setTimeout(streamChar, 30);
          } else {
            streamingActive = false;
            autoScroll = true; // Re-enable after streaming completes
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
    // Scroll to bottom after rendering (only if autoScroll)
    if (autoScroll) {
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

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
        content: stringOfBabel(),
        streaming: true,
      });
      chatDisplay.style.display = "flex";
      renderMessages();
    }
    // Clear textarea and update placeholder
    chatTextarea.value = "";
    chatTextarea.placeholder = "Reply...";
    // Only blur on mobile devices to close keyboard
    if (
      /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(
        navigator.userAgent,
      )
    ) {
      chatTextarea.blur();
    } else {
      chatTextarea.focus();
    }
    // Disable submit button after submit
    if (chatSubmit) chatSubmit.disabled = true;
  });

  // Enable/disable submit button based on textarea content
  function updateSubmitState() {
    if (!chatSubmit) return;
    chatSubmit.disabled = chatTextarea.value.trim().length === 0;
  }
  chatTextarea.addEventListener("input", updateSubmitState);
  chatTextarea.addEventListener("change", updateSubmitState);
  // Initial state
  updateSubmitState();

  // Submit on Enter, newline on Shift+Enter
  chatTextarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
    // Otherwise, allow default (newline on Shift+Enter)
  });

  function stringOfBabel() {
    // Use SCRIPTS for script ranges
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
      // Tamil: skip combining marks, reserved, and unassigned (0x0B82, 0x0B83, 0x0B9B, 0x0B9D, 0x0BA0-0x0BA2, 0x0BA5-0x0BA7, 0x0BAB-0x0BAD, 0x0BBA-0x0BBD, 0x0BC0, 0x0BC2-0x0BC5, 0x0BC7-0x0BC8, 0x0BCA-0x0BCC, 0x0BCD, 0x0BD1-0x0BDF, 0x0BEA-0x0BEF, 0x0BF0-0x0BFF)
      if (cp >= 0x0b80 && cp <= 0x0bff) {
        // Combining marks and reserved
        if (
          cp === 0x0b82 || // Anusvara (combining)
          cp === 0x0b83 || // Visarga (combining)
          cp === 0x0b9b || // reserved
          cp === 0x0b9d || // reserved
          (cp >= 0x0ba0 && cp <= 0x0ba2) || // reserved
          (cp >= 0x0ba5 && cp <= 0x0ba7) || // reserved
          (cp >= 0x0bab && cp <= 0x0bad) || // reserved
          (cp >= 0x0bba && cp <= 0x0bbd) || // reserved
          cp === 0x0bc0 || // combining
          (cp >= 0x0bc2 && cp <= 0x0bc5) || // combining
          (cp >= 0x0bc7 && cp <= 0x0bc8) || // combining
          (cp >= 0x0bca && cp <= 0x0bcc) || // combining
          cp === 0x0bcd || // combining
          (cp >= 0x0bd1 && cp <= 0x0bdf) || // reserved
          (cp >= 0x0bea && cp <= 0x0bef) || // reserved
          (cp >= 0x0bf0 && cp <= 0x0bff) // reserved
        ) {
          return false;
        }
      }
      return true;
    }

    function randomChar() {
      // Equal script weighting: pick a script uniformly, then a code point from its ranges
      let enabledScripts = [];
      for (const script in settings.scripts) {
        if (settings.scripts[script] && SCRIPTS[script]) {
          enabledScripts.push(script);
        }
      }
      // Fallback to binary if none enabled
      if (enabledScripts.length === 0) {
        enabledScripts = ["binary"];
      }
      let cp,
        tries = 0;
      do {
        // 1. Pick a script at random
        const script =
          enabledScripts[Math.floor(Math.random() * enabledScripts.length)];
        const ranges = SCRIPTS[script].ranges;
        // 2. Pick a range at random (weighted by range size)
        const total = ranges.reduce(
          (sum, [start, end]) => sum + (end - start + 1),
          0,
        );
        let pick = Math.floor(Math.random() * total);
        let chosenRange;
        for (const [start, end] of ranges) {
          const size = end - start + 1;
          if (pick < size) {
            chosenRange = [start, end];
            break;
          }
          pick -= size;
        }
        if (chosenRange) {
          cp = chosenRange[0] + pick;
        } else {
          cp = 0x20;
        }
        tries++;
      } while (!isRenderable(cp) && tries < 10);
      // Fallback to space if not renderable after 10 tries
      if (!isRenderable(cp)) {
        cp = 0x20;
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
