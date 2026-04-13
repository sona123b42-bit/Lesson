const params = new URLSearchParams(window.location.search);
const topic = (params.get("topic") || "python").toLowerCase();
const active = TOPICS[topic] || TOPICS.python;
const gameState = loadGameState();

const titleEl = document.getElementById("mission-title");
const scoreEl = document.getElementById("score-box");
const rewardEl = document.getElementById("reward-box");
const unlockNoteEl = document.getElementById("unlock-note");
const missionListEl = document.getElementById("mission-list");
const heroStripEl = document.getElementById("hero-strip");

const heroLines = [
  "Mission board online. Pick the next unlocked puzzle.",
  "Easy levels build the keys for harder puzzles.",
  "Clear every level in this track to earn $50.",
  "One level at a time. Momentum wins.",
];

bootstrap();
startHeroTicker();

function bootstrap() {
  const track = getTrackState();

  titleEl.textContent = active.title;
  scoreEl.textContent = `Score: ${track.score} | Streak: ${track.streak}`;
  rewardEl.textContent = `Reward Wallet: $${gameState.wallet}`;

  if (!track.unlocked) {
    unlockNoteEl.textContent =
      "This track is locked. Finish the previous track to open it.";
    missionListEl.innerHTML = "";
    return;
  }

  if (track.completed) {
    unlockNoteEl.textContent = `Track completed. ${active.levels.length}/${active.levels.length} levels cleared.`;
  } else {
    unlockNoteEl.textContent = `Clear levels in order. ${track.completedLevels}/${active.levels.length} levels done.`;
  }

  renderMissionList(track);
}

function getTrackState() {
  return gameState.tracks[topic] || gameState.tracks.python;
}

function renderMissionList(track) {
  missionListEl.innerHTML = "";

  active.levels.forEach((level, index) => {
    const isCompleted = index < track.completedLevels;
    const isCurrent = index === track.completedLevels && !track.completed;
    const isUnlocked = isCompleted || isCurrent || track.completed;

    const tile = document.createElement("div");
    tile.className = `mission-tile ${isCompleted ? "completed" : isCurrent ? "current" : "locked"}`;

    const info = document.createElement("div");
    const status = isCompleted
      ? "Completed"
      : isCurrent
        ? "Open now"
        : "Locked";
    info.innerHTML = `<strong>${level.name}</strong><div class="mission-meta">${level.difficulty} • ${status}</div>`;

    const action = document.createElement("button");
    action.textContent = isUnlocked ? "Open Level" : "Locked";
    action.disabled = !isUnlocked;
    action.addEventListener("click", () => {
      window.location.href = `level.html?topic=${topic}&level=${index}`;
    });

    tile.appendChild(info);
    tile.appendChild(action);
    missionListEl.appendChild(tile);
  });
}

function startHeroTicker() {
  let index = 0;
  heroStripEl.textContent = heroLines[index];
  setInterval(() => {
    index = (index + 1) % heroLines.length;
    heroStripEl.textContent = heroLines[index];
  }, 3500);
}
