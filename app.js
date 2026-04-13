const curriculum = [
  {
    id: "python",
    title: "Python Learning Path",
    modules: [
      {
        title: "Python Basics",
        lessons: ["Variables", "Data Types", "Input and Output", "Operators"],
      },
      {
        title: "Control Flow",
        lessons: ["If Else", "Loops", "Break Continue", "Practice Drills"],
      },
      {
        title: "Functions and Scope",
        lessons: ["Function Basics", "Arguments", "Return Values", "Scope"],
      },
      {
        title: "Core Data Structures",
        lessons: ["Lists", "Dictionaries", "Tuples and Sets", "Comprehensions"],
      },
      {
        title: "Files and Error Handling",
        lessons: [
          "Reading Files",
          "Writing Files",
          "Try Except",
          "Mini Project",
        ],
      },
    ],
  },
  {
    id: "html",
    title: "HTML Learning Path",
    modules: [
      {
        title: "HTML Foundations",
        lessons: [
          "Document Structure",
          "Semantic Tags",
          "Text and Links",
          "Images",
        ],
      },
      {
        title: "Page Building",
        lessons: [
          "Lists and Tables",
          "Forms",
          "Multi-page Navigation",
          "Accessibility Basics",
        ],
      },
      {
        title: "HTML Practice Projects",
        lessons: [
          "Profile Page",
          "Landing Structure",
          "Contact Form",
          "Review",
        ],
      },
    ],
  },
  {
    id: "css",
    title: "CSS Learning Path",
    modules: [
      {
        title: "CSS Fundamentals",
        lessons: ["Selectors", "Box Model", "Colors and Typography", "Units"],
      },
      {
        title: "Layout Systems",
        lessons: ["Display", "Positioning", "Flexbox", "Grid"],
      },
      {
        title: "Responsive and Effects",
        lessons: ["Media Queries", "Transitions", "Animations", "Mini Project"],
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Learning Path",
    modules: [
      {
        title: "JavaScript Basics",
        lessons: ["Variables", "Conditionals", "Loops", "Functions"],
      },
      {
        title: "Arrays Objects and Logic",
        lessons: ["Arrays", "Objects", "Methods", "Problem Solving"],
      },
      {
        title: "DOM and Events",
        lessons: [
          "DOM Selection",
          "Event Listeners",
          "Form Events",
          "Mini App",
        ],
      },
    ],
  },
];

const questionBank = {
  python: [
    {
      q: "What is the difference between a list and a tuple in Python?",
      a: "A list is mutable (can change), while a tuple is immutable (cannot change).",
    },
    {
      q: "What does a function return if there is no return statement?",
      a: "It returns None.",
    },
    {
      q: "When would you use a dictionary?",
      a: "When you need key-value pairs for fast lookup by key.",
    },
    {
      q: "Why do we use try/except?",
      a: "To catch and handle runtime errors without crashing the whole program.",
    },
  ],
  html: [
    {
      q: "What does semantic HTML improve?",
      a: "Accessibility and meaning of page structure for users and search engines.",
    },
    {
      q: "What is the purpose of the form tag?",
      a: "It groups input controls so users can submit data.",
    },
  ],
  css: [
    {
      q: "What is the main purpose of CSS Flexbox?",
      a: "To align and distribute elements in one dimension (row or column).",
    },
    {
      q: "What are media queries used for?",
      a: "To apply styles based on screen size or device conditions.",
    },
  ],
  javascript: [
    {
      q: "What is the DOM?",
      a: "A browser representation of the HTML document that JavaScript can read and modify.",
    },
    {
      q: "What does addEventListener do?",
      a: "It attaches a function that runs when a specified event happens.",
    },
  ],
};

const defaultQuizState = Object.fromEntries(
  curriculum.map((track) => [track.id, { correct: 0, review: 0 }]),
);

const APP_STATE_KEY = "study-confidence-state";

const initialState = {
  lessonProgress: {},
  sessions: [],
  reflections: [],
  quiz: defaultQuizState,
  lastQuestion: null,
};

const TRACK_ORDER = ["python", "html", "css", "javascript"];
const GAME_STORAGE_KEY = "study-game-progression-v1";
const LESSON_TEST_PASS_KEY = "study-lesson-test-pass-v1";
const LESSON_TEST_PENDING_KEY = "study-lesson-test-pending-v1";
const SHARE_STORAGE_KEYS = [
  APP_STATE_KEY,
  GAME_STORAGE_KEY,
  LESSON_TEST_PASS_KEY,
  LESSON_TEST_PENDING_KEY,
];

const state = loadState();
const gameState = loadGameState();

const statsEl = document.getElementById("stats");
const curriculumEl = document.getElementById("curriculum");
const updateOutputEl = document.getElementById("update-output");
const quizTrackEl = document.getElementById("quiz-track");
const logTrackEl = document.getElementById("log-track");
const reflectionTrackEl = document.getElementById("reflection-track");
const reflectionModuleEl = document.getElementById("reflection-module");
const motivationTextEl = document.getElementById("motivation-text");
const trackSwitchEl = document.getElementById("track-switch");
const shareOutputEl = document.getElementById("share-export-output");
const shareImportFileEl = document.getElementById("share-import-file");
const shareStatusEl = document.getElementById("share-status");

let activeCurriculumTrack = "python";

document.getElementById("build-update").addEventListener("click", buildUpdate);
document.getElementById("new-question").addEventListener("click", askQuestion);
document
  .getElementById("mark-correct")
  .addEventListener("click", () => markQuiz("correct"));
document
  .getElementById("mark-review")
  .addEventListener("click", () => markQuiz("review"));
document.getElementById("log-form").addEventListener("submit", addSession);
document
  .getElementById("reflection-form")
  .addEventListener("submit", addReflection);
reflectionTrackEl.addEventListener("change", renderReflectionModules);
document
  .getElementById("share-generate")
  ?.addEventListener("click", generateShareSnapshot);
document
  .getElementById("share-copy")
  ?.addEventListener("click", copyShareSnapshot);
document
  .getElementById("share-download")
  ?.addEventListener("click", downloadShareSnapshot);
document
  .getElementById("share-import")
  ?.addEventListener("click", importShareSnapshotFromFile);

const motivationLines = [
  "Momentum mode: small win, then one more.",
  "Today is for progress, not perfection.",
  "One module at a time, confidence compounds.",
  "Write code, break code, learn fast.",
  "Every bug fixed is a confidence level up.",
  "Python first, then HTML, CSS, and JavaScript.",
];

bootstrap();

function bootstrap() {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("log-date").value = today;
  document.getElementById("reflection-date").value = today;

  curriculum.forEach((track) => {
    const optQuiz = document.createElement("option");
    optQuiz.value = track.id;
    optQuiz.textContent = track.title;
    quizTrackEl.appendChild(optQuiz);

    const optLog = document.createElement("option");
    optLog.value = track.id;
    optLog.textContent = track.title;
    logTrackEl.appendChild(optLog);

    const optReflection = document.createElement("option");
    optReflection.value = track.id;
    optReflection.textContent = track.title;
    reflectionTrackEl.appendChild(optReflection);
  });

  renderReflectionModules();
  applyPendingLessonCompletion();
  enableButtonMotion();
  syncPathButtons();
  renderTrackSwitch();
  startMotivationTicker();
  renderCurriculum();
  renderSessions();
  renderReflections();
  renderStats();
}

function createDefaultGameState() {
  const tracks = {};
  TRACK_ORDER.forEach((topic, index) => {
    tracks[topic] = {
      unlocked: index === 0,
      completed: false,
      rewardClaimed: false,
      completedLevels: 0,
      score: 0,
    };
  });

  return { wallet: 0, tracks };
}

function loadGameState() {
  const base = createDefaultGameState();
  try {
    const saved = JSON.parse(localStorage.getItem(GAME_STORAGE_KEY));
    if (!saved) return base;

    TRACK_ORDER.forEach((topic) => {
      base.tracks[topic] = {
        ...base.tracks[topic],
        ...(saved.tracks?.[topic] || {}),
      };
    });

    base.wallet = Number(saved.wallet || 0);

    for (let i = 1; i < TRACK_ORDER.length; i += 1) {
      const prev = TRACK_ORDER[i - 1];
      const current = TRACK_ORDER[i];
      if (base.tracks[prev].completed) {
        base.tracks[current].unlocked = true;
      }
    }

    return base;
  } catch {
    return base;
  }
}

function syncPathButtons() {
  const walletEl = document.getElementById("reward-wallet");
  if (walletEl) {
    walletEl.textContent = `Reward Wallet: $${gameState.wallet}`;
  }

  document.querySelectorAll(".path-btn[data-topic]").forEach((btn) => {
    const topic = btn.dataset.topic;
    const track = gameState.tracks[topic];
    if (!track) return;

    const baseLabel = btn.dataset.baseLabel || btn.textContent.trim();
    btn.dataset.baseLabel = baseLabel;

    const status = track.completed
      ? " - Completed (+$50)"
      : track.unlocked
        ? " - Unlocked"
        : " - Locked";

    btn.textContent = `${baseLabel}${status}`;

    if (track.unlocked) {
      btn.classList.remove("locked");
      btn.href = `challenge.html?topic=${topic}`;
    } else {
      btn.classList.add("locked");
      btn.removeAttribute("href");
    }
  });
}

function saveGameState() {
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(gameState));
}

function renderTrackSwitch() {
  if (!trackSwitchEl) return;
  trackSwitchEl.innerHTML = "";

  curriculum.forEach((track) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "button track-filter-btn";
    if (track.id === activeCurriculumTrack) {
      btn.classList.add("active");
    }
    btn.textContent = track.title;
    btn.addEventListener("click", () => {
      activeCurriculumTrack = track.id;
      renderTrackSwitch();
      renderCurriculum();
    });
    trackSwitchEl.appendChild(btn);
  });
}

function enableButtonMotion() {
  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".button");
    if (!btn) return;
    btn.classList.remove("clicked-pop");
    void btn.offsetWidth;
    btn.classList.add("clicked-pop");
  });
}

function startMotivationTicker() {
  let index = 0;
  motivationTextEl.textContent = motivationLines[index];
  setInterval(() => {
    index = (index + 1) % motivationLines.length;
    motivationTextEl.textContent = motivationLines[index];
  }, 4500);
}

function celebrate() {
  document.body.classList.add("celebrate");
  setTimeout(() => {
    document.body.classList.remove("celebrate");
  }, 500);
}

function renderReflectionModules() {
  const trackId = reflectionTrackEl.value;
  const track = curriculum.find((item) => item.id === trackId) || curriculum[0];
  reflectionModuleEl.innerHTML = "";

  track.modules.forEach((mod) => {
    const opt = document.createElement("option");
    opt.value = mod.title;
    opt.textContent = mod.title;
    reflectionModuleEl.appendChild(opt);
  });
}

function lessonKey(trackId, moduleTitle, lessonTitle) {
  return `${trackId}::${moduleTitle}::${lessonTitle}`;
}

function loadLessonTestPassMap() {
  try {
    return JSON.parse(localStorage.getItem(LESSON_TEST_PASS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLessonTestPassMap(map) {
  localStorage.setItem(LESSON_TEST_PASS_KEY, JSON.stringify(map));
}

function hasPassedLessonTest(key) {
  const passMap = loadLessonTestPassMap();
  return Boolean(passMap[key]);
}

function goToLessonTest(trackId, moduleTitle, lessonTitle, key) {
  const params = new URLSearchParams({
    track: trackId,
    module: moduleTitle,
    lesson: lessonTitle,
    key,
    returnTo: "index.html",
  });
  window.location.href = `lesson-test.html?${params.toString()}`;
}

function applyPendingLessonCompletion() {
  let pending;
  try {
    pending = JSON.parse(localStorage.getItem(LESSON_TEST_PENDING_KEY));
  } catch {
    pending = null;
  }

  if (!pending || !pending.key || !pending.trackId) {
    return;
  }

  const current = state.lessonProgress[pending.key] || {
    status: "Not started",
    minutes: 0,
  };
  state.lessonProgress[pending.key] = {
    ...current,
    status: "Done",
  };

  const passMap = loadLessonTestPassMap();
  passMap[pending.key] = {
    passed: true,
    passedAt: pending.passedAt || new Date().toISOString(),
  };
  saveLessonTestPassMap(passMap);
  localStorage.removeItem(LESSON_TEST_PENDING_KEY);

  activeCurriculumTrack = pending.trackId;
  saveState();
  applyTrackCompletionRewards(pending.trackId);
  celebrate();
}

function renderCurriculum() {
  curriculumEl.innerHTML = "";

  const track =
    curriculum.find((item) => item.id === activeCurriculumTrack) ||
    curriculum[0];
  if (!track) return;

  const trackWrap = document.createElement("div");
  trackWrap.className = "track";

  const trackHeader = document.createElement("div");
  trackHeader.className = "track-header";
  trackHeader.innerHTML = `<strong>${track.title}</strong><span class="muted">${track.modules.length} modules</span>`;
  trackWrap.appendChild(trackHeader);

  track.modules.forEach((mod) => {
    const moduleDiv = document.createElement("div");
    moduleDiv.className = "module";
    const moduleTitle = document.createElement("h3");
    moduleTitle.textContent = mod.title;
    moduleDiv.appendChild(moduleTitle);

    mod.lessons.forEach((lesson) => {
      const key = lessonKey(track.id, mod.title, lesson);
      const record = state.lessonProgress[key] || {
        status: "Not started",
        minutes: 0,
      };

      const lessonRow = document.createElement("div");
      lessonRow.className = "lesson";

      const title = document.createElement("div");
      title.className = "lesson-title";
      title.textContent = lesson;

      const stateChip = document.createElement("span");
      const done = record.status === "Done";
      stateChip.className = `lesson-state ${done ? "done" : "pending"}`;
      stateChip.textContent = done ? "Done" : "Pending";

      const tickBtn = document.createElement("button");
      tickBtn.type = "button";
      tickBtn.className = `button ghost lesson-tick ${done ? "is-done" : ""}`;
      tickBtn.textContent = done ? "Done ✓" : "✓";
      tickBtn.disabled = done;
      tickBtn.title = done
        ? "Lesson already completed"
        : "Verify lesson with test";

      tickBtn.addEventListener("click", () => {
        if (hasPassedLessonTest(key)) {
          state.lessonProgress[key] = {
            ...(state.lessonProgress[key] || { minutes: 0 }),
            status: "Done",
          };
          saveState();
          applyTrackCompletionRewards(track.id);
          renderCurriculum();
          renderStats();
          return;
        }

        alert("Click OK to go to the test page for this lesson.");
        goToLessonTest(track.id, mod.title, lesson, key);
      });

      lessonRow.appendChild(title);
      lessonRow.appendChild(stateChip);
      lessonRow.appendChild(tickBtn);
      moduleDiv.appendChild(lessonRow);
    });

    trackWrap.appendChild(moduleDiv);
  });

  curriculumEl.appendChild(trackWrap);
}

function isTrackCompletedInCurriculum(trackId) {
  const track = curriculum.find((item) => item.id === trackId);
  if (!track) return false;

  return track.modules.every((mod) =>
    mod.lessons.every((lesson) => {
      const key = lessonKey(trackId, mod.title, lesson);
      return state.lessonProgress[key]?.status === "Done";
    }),
  );
}

function applyTrackCompletionRewards(trackId) {
  const trackProgress = gameState.tracks[trackId];
  if (!trackProgress) return;

  const completed = isTrackCompletedInCurriculum(trackId);
  if (!completed) return;

  trackProgress.completed = true;
  if (!trackProgress.rewardClaimed) {
    trackProgress.rewardClaimed = true;
    gameState.wallet += 50;
    alert(
      `Great job! ${trackId.toUpperCase()} track completed. You earned $50.`,
    );
  }

  const idx = TRACK_ORDER.indexOf(trackId);
  const nextTrack = TRACK_ORDER[idx + 1];
  if (nextTrack && gameState.tracks[nextTrack]) {
    gameState.tracks[nextTrack].unlocked = true;
  }

  saveGameState();
  syncPathButtons();
}

function renderStats() {
  const totalLessons = curriculum
    .flatMap((track) => track.modules)
    .flatMap((mod) => mod.lessons).length;

  const progressValues = Object.values(state.lessonProgress);
  const done = progressValues.filter((x) => x.status === "Done").length;
  const inProgress = progressValues.filter(
    (x) => x.status === "In progress",
  ).length;
  const minutes =
    progressValues.reduce((sum, x) => sum + (x.minutes || 0), 0) +
    state.sessions.reduce((sum, s) => sum + s.minutes, 0);

  statsEl.innerHTML = `
    <div class="stat"><span>Completed Lessons</span><strong>${done}/${totalLessons}</strong></div>
    <div class="stat"><span>In Progress</span><strong>${inProgress}</strong></div>
    <div class="stat"><span>Total Study Time</span><strong>${minutes} min</strong></div>
    <div class="stat"><span>Quiz Wins</span><strong>${Object.values(state.quiz).reduce((sum, item) => sum + item.correct, 0)}</strong></div>
  `;
}

function askQuestion() {
  const track = quizTrackEl.value;
  const list = questionBank[track] || [];
  if (!list.length) return;

  const idx = Math.floor(Math.random() * list.length);
  const picked = list[idx];
  state.lastQuestion = { track, idx };

  document.getElementById("question-text").textContent = picked.q;
  document.getElementById("answer-text").textContent = picked.a;
  saveState();
}

function markQuiz(type) {
  if (!state.lastQuestion) return;
  const track = state.lastQuestion.track;
  if (type === "correct") {
    state.quiz[track].correct += 1;
    celebrate();
  } else {
    state.quiz[track].review += 1;
  }
  saveState();
  renderStats();
}

function addSession(event) {
  event.preventDefault();

  const date = document.getElementById("log-date").value;
  const track = document.getElementById("log-track").value;
  const minutes = Number(document.getElementById("log-minutes").value || 0);
  const note = document.getElementById("log-note").value.trim();

  if (!date || !track || minutes <= 0) return;

  state.sessions.unshift({ date, track, minutes, note });
  state.sessions = state.sessions.slice(0, 40);
  saveState();
  celebrate();

  document.getElementById("log-minutes").value = "";
  document.getElementById("log-note").value = "";
  renderSessions();
  renderStats();
}

function addReflection(event) {
  event.preventDefault();

  const date = document.getElementById("reflection-date").value;
  const track = reflectionTrackEl.value;
  const module = reflectionModuleEl.value;
  const confidence = Number(
    document.getElementById("reflection-confidence").value || 3,
  );
  const learned = document.getElementById("reflection-learned").value.trim();
  const next = document.getElementById("reflection-next").value.trim();

  if (!date || !track || !module || !learned) return;

  state.reflections.unshift({ date, track, module, confidence, learned, next });
  state.reflections = state.reflections.slice(0, 60);
  saveState();
  celebrate();

  document.getElementById("reflection-learned").value = "";
  document.getElementById("reflection-next").value = "";
  document.getElementById("reflection-confidence").value = "3";
  renderReflections();
}

function renderReflections() {
  const list = document.getElementById("reflection-list");
  list.innerHTML = "";

  if (!state.reflections?.length) {
    const li = document.createElement("li");
    li.textContent = "No learning notes yet.";
    list.appendChild(li);
    return;
  }

  state.reflections.slice(0, 8).forEach((item) => {
    const li = document.createElement("li");
    li.className = "reflection-item";
    const trackTitle =
      curriculum.find((x) => x.id === item.track)?.title || item.track;
    li.innerHTML = `<strong>${item.date} | ${trackTitle}</strong><br/><span>${item.module}</span><p>${item.learned}</p><p>Confidence: ${item.confidence}/5${item.next ? ` | Next: ${item.next}` : ""}</p>`;
    list.appendChild(li);
  });
}

function renderSessions() {
  const list = document.getElementById("session-list");
  list.innerHTML = "";

  if (state.sessions.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No sessions yet.";
    list.appendChild(li);
    return;
  }

  state.sessions.slice(0, 10).forEach((session) => {
    const li = document.createElement("li");
    const trackTitle =
      curriculum.find((x) => x.id === session.track)?.title || session.track;
    li.textContent = `${session.date} - ${trackTitle}: ${session.minutes} min${session.note ? ` (${session.note})` : ""}`;
    list.appendChild(li);
  });
}

function buildUpdate() {
  const totalMin =
    Object.values(state.lessonProgress).reduce(
      (sum, x) => sum + (x.minutes || 0),
      0,
    ) + state.sessions.reduce((sum, s) => sum + s.minutes, 0);
  const done = Object.values(state.lessonProgress).filter(
    (x) => x.status === "Done",
  ).length;
  const quizWins = Object.values(state.quiz).reduce(
    (sum, item) => sum + item.correct,
    0,
  );
  const latestReflection = state.reflections[0];
  const reflectionLine = latestReflection
    ? `- Latest learning note: ${latestReflection.learned}`
    : "- Latest learning note: No reflection saved yet.";

  const text = [
    `Study update (${new Date().toLocaleDateString()}):`,
    `- Total focused time: ${totalMin} minutes`,
    `- Lessons completed: ${done}`,
    `- Quiz questions answered correctly: ${quizWins}`,
    reflectionLine,
    "- Next step: Continue Python modules, then move into HTML/CSS/JavaScript.",
  ].join("\n");

  updateOutputEl.value = text;
}

function setShareStatus(message, kind = "info") {
  if (!shareStatusEl) return;
  shareStatusEl.textContent = message;
  shareStatusEl.style.color =
    kind === "error" ? "#d1495b" : kind === "ok" ? "#0c7a65" : "";
}

function getSharePayload() {
  const storage = {};

  SHARE_STORAGE_KEYS.forEach((key) => {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      storage[key] = null;
      return;
    }

    try {
      storage[key] = JSON.parse(raw);
    } catch {
      storage[key] = raw;
    }
  });

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    storage,
  };
}

function generateShareSnapshot() {
  const payload = getSharePayload();
  const text = JSON.stringify(payload, null, 2);
  if (shareOutputEl) {
    shareOutputEl.value = text;
  }
  setShareStatus("Snapshot generated. Copy or download it.", "ok");
}

async function copyShareSnapshot() {
  if (!shareOutputEl || !shareOutputEl.value.trim()) {
    generateShareSnapshot();
  }

  const text = shareOutputEl?.value || "";
  if (!text) {
    setShareStatus("Could not generate snapshot.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    setShareStatus("Snapshot copied. Send it to the other device.", "ok");
  } catch {
    shareOutputEl.select();
    document.execCommand("copy");
    setShareStatus("Snapshot copied using fallback method.", "ok");
  }
}

function downloadShareSnapshot() {
  if (!shareOutputEl || !shareOutputEl.value.trim()) {
    generateShareSnapshot();
  }

  const text = shareOutputEl?.value || "";
  if (!text) {
    setShareStatus("Could not generate snapshot.", "error");
    return;
  }

  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `study-progress-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setShareStatus("Snapshot downloaded.", "ok");
}

async function importShareSnapshotFromFile() {
  const file = shareImportFileEl?.files?.[0];
  if (!file) {
    setShareStatus("Pick a JSON file first.", "error");
    return;
  }

  try {
    const text = await file.text();
    const payload = JSON.parse(text);

    if (!payload || typeof payload !== "object" || !payload.storage) {
      setShareStatus("Invalid snapshot file format.", "error");
      return;
    }

    SHARE_STORAGE_KEYS.forEach((key) => {
      const value = payload.storage[key];
      if (value === null || typeof value === "undefined") {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    setShareStatus("Snapshot imported. Reloading app...", "ok");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch {
    setShareStatus(
      "Could not read this file. Use a valid JSON snapshot.",
      "error",
    );
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_STATE_KEY));
    if (!saved) return { ...initialState };
    return {
      ...initialState,
      ...saved,
      quiz: {
        ...defaultQuizState,
        ...(saved.quiz || {}),
      },
    };
  } catch {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}
