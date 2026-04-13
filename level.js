const params = new URLSearchParams(window.location.search);
const topic = (params.get("topic") || "python").toLowerCase();
const levelIndex = Number(params.get("level") || 0);
const active = TOPICS[topic] || TOPICS.python;
const gameState = loadGameState();
const track = gameState.tracks[topic] || gameState.tracks.python;
const level = active.levels[levelIndex];

const titleEl = document.getElementById("level-title");
const levelTagEl = document.getElementById("level-tag");
const walletBoxEl = document.getElementById("wallet-box");
const backLinkEl = document.getElementById("back-link");
const ribbonEl = document.getElementById("level-ribbon");
const summaryEl = document.getElementById("level-summary");
const campaignLabelEl = document.getElementById("campaign-label");
const campaignCountEl = document.getElementById("campaign-count");
const campaignFillEl = document.getElementById("campaign-fill");
const stepQuizEl = document.getElementById("step-quiz");
const stepPuzzleEl = document.getElementById("step-puzzle");
const stepClearEl = document.getElementById("step-clear");
const quizPanelEl = document.getElementById("quiz-panel");
const puzzlePanelEl = document.getElementById("puzzle-panel");
const successPanelEl = document.getElementById("success-panel");
const previewPanelEl = document.getElementById("preview-panel");
const quizQuestionEl = document.getElementById("quiz-question");
const quizAnswerEl = document.getElementById("quiz-answer");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const quizHintBoxEl = document.getElementById("quiz-hint-box");
const missionInstructionEl = document.getElementById("mission-instruction");
const codeInputEl = document.getElementById("code-input");
const missionFeedbackEl = document.getElementById("mission-feedback");
const codeHintBoxEl = document.getElementById("code-hint-box");
const successMessageEl = document.getElementById("success-message");
const previewFrameEl = document.getElementById("preview-frame");
const nextLinkEl = document.getElementById("next-link");
const showQuizHintEl = document.getElementById("show-quiz-hint");
const showCodeHintEl = document.getElementById("show-code-hint");

const quizTasks = level?.quizSet?.length
  ? level.quizSet
  : level?.quiz
    ? [level.quiz]
    : [];
const puzzleTasks = level?.puzzleSet?.length
  ? level.puzzleSet
  : level?.mission
    ? [level.mission]
    : [];
const taskFlow = buildMixedFlow(quizTasks, puzzleTasks);

let currentStep = "quiz";
let currentTaskIndex = 0;
let completedQuizTasks = 0;
let completedPuzzleTasks = 0;
let failCount = 0;

bootstrap();

document.getElementById("check-quiz").addEventListener("click", checkQuiz);
document.getElementById("run-code").addEventListener("click", runMission);
showQuizHintEl.addEventListener("click", revealQuizHint);
showCodeHintEl.addEventListener("click", revealCodeHint);
nextLinkEl.addEventListener("click", goNext);
codeInputEl.addEventListener("input", renderPreview);

function buildMixedFlow(quizList, puzzleList) {
  const flow = [];
  let qi = 0;
  let pi = 0;
  let expect = "quiz";

  while (qi < quizList.length || pi < puzzleList.length) {
    if (expect === "quiz" && qi < quizList.length) {
      flow.push({ type: "quiz", data: quizList[qi], index: qi });
      qi += 1;
      expect = pi < puzzleList.length ? "puzzle" : "quiz";
      continue;
    }

    if (expect === "puzzle" && pi < puzzleList.length) {
      flow.push({ type: "puzzle", data: puzzleList[pi], index: pi });
      pi += 1;
      // Add occasional double-puzzle for extra challenge variety.
      if (pi % 3 === 0 && pi < puzzleList.length) {
        expect = "puzzle";
      } else {
        expect = qi < quizList.length ? "quiz" : "puzzle";
      }
      continue;
    }

    if (qi < quizList.length) {
      flow.push({ type: "quiz", data: quizList[qi], index: qi });
      qi += 1;
    } else if (pi < puzzleList.length) {
      flow.push({ type: "puzzle", data: puzzleList[pi], index: pi });
      pi += 1;
    }
  }

  return flow;
}

function bootstrap() {
  backLinkEl.href = `challenge.html?topic=${topic}`;
  walletBoxEl.textContent = `Wallet: $${gameState.wallet}`;
  campaignLabelEl.textContent = "Level Task Progress";

  if (!level || !taskFlow.length) {
    titleEl.textContent = "Level Not Found";
    ribbonEl.textContent = "This level does not exist.";
    summaryEl.textContent = "Return to the track hub.";
    lockEverything();
    return;
  }

  titleEl.textContent = level.name;
  levelTagEl.textContent = active.title;
  ribbonEl.textContent = `${level.difficulty} mission`;
  summaryEl.textContent = active.summary;
  nextLinkEl.textContent =
    levelIndex + 1 < active.levels.length ? "Next Level" : "Back to Track";

  if (!track.unlocked || levelIndex > track.completedLevels) {
    ribbonEl.textContent = "Locked mission";
    summaryEl.textContent = "Finish earlier missions to unlock this one.";
    lockEverything();
    return;
  }

  if (levelIndex < track.completedLevels) {
    summaryEl.textContent =
      "This level is already completed. Replay it for more practice.";
  }

  showCurrentTask();
}

function lockEverything() {
  quizPanelEl.classList.remove("is-hidden");
  puzzlePanelEl.classList.add("is-hidden");
  successPanelEl.classList.add("is-hidden");
  previewPanelEl.classList.add("is-hidden");
  quizAnswerEl.disabled = true;
  codeInputEl.disabled = true;
  document.getElementById("check-quiz").disabled = true;
  document.getElementById("run-code").disabled = true;
  showQuizHintEl.disabled = true;
  showCodeHintEl.disabled = true;
  nextLinkEl.disabled = false;
  nextLinkEl.textContent = "Back to Track";
  campaignCountEl.textContent = `0 / ${taskFlow.length || 10}`;
  campaignFillEl.style.width = "0%";
  updateStepChips();
}

function setStep(step) {
  currentStep = step;
  quizPanelEl.classList.toggle("is-hidden", step !== "quiz");
  puzzlePanelEl.classList.toggle("is-hidden", step !== "puzzle");
  successPanelEl.classList.toggle("is-hidden", step !== "success");
  previewPanelEl.classList.toggle("is-hidden", step !== "puzzle");
  updateStepChips();
  updateLevelProgress();
  if (step === "puzzle") {
    renderPreview();
  }
}

function updateStepChips() {
  const quizDone = completedQuizTasks >= quizTasks.length;
  const puzzleDone = completedPuzzleTasks >= puzzleTasks.length;

  stepQuizEl.classList.toggle("done", quizDone || currentStep !== "quiz");
  stepQuizEl.classList.toggle("active", currentStep === "quiz");

  stepPuzzleEl.classList.toggle(
    "done",
    puzzleDone || currentStep === "success",
  );
  stepPuzzleEl.classList.toggle("active", currentStep === "puzzle");

  stepClearEl.classList.toggle("done", currentStep === "success");
  stepClearEl.classList.toggle("active", currentStep === "success");
}

function updateLevelProgress() {
  const total = taskFlow.length;
  const completed = Math.min(currentTaskIndex, total);
  const display =
    currentStep === "success" ? total : Math.min(completed + 1, total);
  campaignCountEl.textContent = `${display} / ${total}`;
  const percent = currentStep === "success" ? 100 : (completed / total) * 100;
  campaignFillEl.style.width = `${Math.min(percent, 100)}%`;
}

function showCurrentTask() {
  const task = taskFlow[currentTaskIndex];
  if (!task) {
    completeLevel();
    return;
  }

  failCount = 0;

  if (task.type === "quiz") {
    setStep("quiz");
    const label = `Question ${task.index + 1}/${quizTasks.length}`;
    quizQuestionEl.textContent = `${label}: ${task.data.q}`;
    quizAnswerEl.value = "";
    quizFeedbackEl.textContent = "";
    quizHintBoxEl.hidden = true;
    showQuizHintEl.disabled = false;
  } else {
    setStep("puzzle");
    const label = `Puzzle ${task.index + 1}/${puzzleTasks.length}`;
    missionInstructionEl.textContent = `${label}: ${task.data.instruction}`;
    codeInputEl.value = task.data.starter;
    missionFeedbackEl.textContent = "";
    codeHintBoxEl.hidden = true;
    showCodeHintEl.disabled = false;
    renderPreview();
  }
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function checkQuiz() {
  const task = taskFlow[currentTaskIndex];
  if (!task || task.type !== "quiz") return;

  const user = normalize(quizAnswerEl.value);
  const ok = task.data.answers.some((answer) => {
    const target = normalize(answer);
    return user === target || user.includes(target);
  });

  if (ok) {
    completedQuizTasks += 1;
    quizFeedbackEl.textContent = "Correct. Next task unlocked.";
    quizFeedbackEl.style.color = "#0c7a65";
    currentTaskIndex += 1;
    showCurrentTask();
    return;
  }

  failCount += 1;
  quizFeedbackEl.textContent = "Wrong answer. Try again.";
  quizFeedbackEl.style.color = "#d96941";
  if (failCount >= 1) {
    showQuizHintEl.disabled = false;
  }
  if (failCount >= 2) {
    revealQuizHint();
  }
  track.streak = 0;
  saveGameState(gameState);
}

function revealQuizHint() {
  const task = taskFlow[currentTaskIndex];
  if (!task || task.type !== "quiz") return;
  const firstAnswer = task.data.answers?.[0] || "answer";
  const cleaned = String(firstAnswer).trim();
  quizHintBoxEl.hidden = false;
  quizHintBoxEl.textContent = `Hint: It starts with "${cleaned.charAt(0).toUpperCase()}" and has ${cleaned.length} characters.`;
}

function runMission() {
  const task = taskFlow[currentTaskIndex];
  if (!task || task.type !== "puzzle") return;

  const code = codeInputEl.value;
  const ok = task.data.validator(code);
  renderPreview();

  if (ok) {
    completedPuzzleTasks += 1;
    missionFeedbackEl.textContent = "Puzzle solved. Next task unlocked.";
    missionFeedbackEl.style.color = "#0c7a65";
    currentTaskIndex += 1;
    showCurrentTask();
    return;
  }

  failCount += 1;
  missionFeedbackEl.textContent = "Not solved yet. Try again.";
  missionFeedbackEl.style.color = "#d96941";
  if (failCount >= 1) {
    showCodeHintEl.disabled = false;
  }
  if (failCount >= 2) {
    revealCodeHint();
  }
  track.streak = 0;
  saveGameState(gameState);
}

function revealCodeHint() {
  const task = taskFlow[currentTaskIndex];
  if (!task || task.type !== "puzzle") return;
  codeHintBoxEl.hidden = false;
  codeHintBoxEl.textContent = `Hint: ${task.data.hint || "Read the instruction carefully and solve it step by step."}`;
}

function completeLevel() {
  if (levelIndex === track.completedLevels) {
    track.completedLevels += 1;
    track.score += 25;
    track.streak += 1;

    if (track.completedLevels >= active.levels.length) {
      track.completed = true;
      if (!track.rewardClaimed) {
        track.rewardClaimed = true;
        gameState.wallet += 50;
      }

      const currentTrackIndex = TRACK_ORDER.indexOf(topic);
      const nextTrack = TRACK_ORDER[currentTrackIndex + 1];
      if (nextTrack && gameState.tracks[nextTrack]) {
        gameState.tracks[nextTrack].unlocked = true;
      }

      ribbonEl.textContent = "Track complete +$50";
      successMessageEl.textContent =
        "You cleared all mixed tasks in this level and finished the track.";
    } else {
      ribbonEl.textContent = "Level cleared";
      successMessageEl.textContent = `Great work. You cleared ${taskFlow.length} mixed tasks and unlocked the next level.`;
    }

    saveGameState(gameState);
    walletBoxEl.textContent = `Wallet: $${gameState.wallet}`;
  } else {
    successMessageEl.textContent =
      "Replay complete. This level was already cleared before.";
  }

  setStep("success");
}

function goNext() {
  if (track.completed || levelIndex + 1 >= active.levels.length) {
    window.location.href = `challenge.html?topic=${topic}`;
    return;
  }

  if (levelIndex >= track.completedLevels) {
    return;
  }

  window.location.href = `level.html?topic=${topic}&level=${levelIndex + 1}`;
}

function renderPreview() {
  if (!level) return;
  const currentCode = codeInputEl.value;

  if (topic === "python") {
    previewFrameEl.srcdoc = `<body style="font-family:Arial;padding:16px"><h3>Python Preview</h3><p>The mission checker is validating the structure of the Python answer. Use hints if needed.</p></body>`;
    return;
  }

  if (topic === "html") {
    previewFrameEl.srcdoc = `<!doctype html><html><body>${currentCode}</body></html>`;
    return;
  }

  if (topic === "css") {
    previewFrameEl.srcdoc = `<!doctype html><html><head><style>${currentCode}</style></head><body><main class='card'>CSS Preview Card</main><button class='button'>Preview</button></body></html>`;
    return;
  }

  previewFrameEl.srcdoc = `<!doctype html><html><body><input id='name' value='Ada' /><button id='run'>Run</button><h3 id='message'>Preview</h3><script>${currentCode}</script></body></html>`;
}
