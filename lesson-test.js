const LESSON_TEST_PASS_KEY = "study-lesson-test-pass-v1";
const LESSON_TEST_PENDING_KEY = "study-lesson-test-pending-v1";

const params = new URLSearchParams(window.location.search);
const trackId = (params.get("track") || "python").toLowerCase();
const moduleTitle = params.get("module") || "Module";
const lessonTitle = params.get("lesson") || "Lesson";
const lessonKey =
  params.get("key") || `${trackId}::${moduleTitle}::${lessonTitle}`;
const returnTo = params.get("returnTo") || "index.html";

const trackLabelEl = document.getElementById("track-label");
const lessonTitleEl = document.getElementById("lesson-title");
const statePillEl = document.getElementById("state-pill");
const progressCountEl = document.getElementById("progress-count");
const progressFillEl = document.getElementById("progress-fill");
const backLinkEl = document.getElementById("back-link");
const doneLinkEl = document.getElementById("done-link");
const doneMessageEl = document.getElementById("done-message");
const quizRuleEl = document.getElementById("quiz-rule");

const quizPanelEl = document.getElementById("quiz-panel");
const quizListEl = document.getElementById("quiz-list");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const codePanelEl = document.getElementById("code-panel");
const codeInstructionEl = document.getElementById("code-instruction");
const codeInputEl = document.getElementById("code-input");
const codeFeedbackEl = document.getElementById("code-feedback");
const hintBoxEl = document.getElementById("hint-box");
const donePanelEl = document.getElementById("done-panel");

const submitQuizEl = document.getElementById("submit-quiz");
const checkCodeEl = document.getElementById("check-code");
const showHintEl = document.getElementById("show-hint");

const TESTS = {
  python: {
    label: "Python Verification",
    quiz: [
      {
        q: "Which keyword defines a function in Python?",
        options: ["func", "define", "def", "lambda"],
        correct: 2,
      },
      {
        q: "Which structure stores key-value pairs?",
        options: ["list", "tuple", "dict", "set"],
        correct: 2,
      },
      {
        q: "What is used to handle runtime errors?",
        options: ["switch", "try/except", "finally only", "assert"],
        correct: 1,
      },
      {
        q: "Which loop repeats while a condition is true?",
        options: ["for", "while", "repeat", "loop"],
        correct: 1,
      },
      {
        q: "Which method adds an item to a list?",
        options: ["insert", "append", "push", "add"],
        correct: 1,
      },
      {
        q: "What value is returned when no return is written?",
        options: ["0", "false", "None", "empty string"],
        correct: 2,
      },
    ],
    code: {
      instruction:
        "Write a function greet(name) that returns a message and print greet('Ada').",
      starter:
        "def greet(name):\n    # return message\n    pass\n\nprint(greet('Ada'))",
      hint: "Use return 'Hello ' + name and call print(greet('Ada')).",
      validator: (code) =>
        includesAll(code, ["def greet", "return", "print", "Ada"]),
    },
  },
  html: {
    label: "HTML Verification",
    quiz: [
      {
        q: "Which tag usually contains the main unique content?",
        options: ["main", "div", "section", "article"],
        correct: 0,
      },
      {
        q: "Which attribute improves image accessibility?",
        options: ["title", "href", "alt", "name"],
        correct: 2,
      },
      {
        q: "Which tag is used for navigation links?",
        options: ["footer", "header", "nav", "aside"],
        correct: 2,
      },
      {
        q: "Which attribute is required for a link destination?",
        options: ["src", "for", "href", "action"],
        correct: 2,
      },
      {
        q: "Which tag represents the largest heading?",
        options: ["h6", "header", "h1", "title"],
        correct: 2,
      },
      {
        q: "Which tag wraps form controls?",
        options: ["input", "fieldset", "label", "form"],
        correct: 3,
      },
    ],
    code: {
      instruction:
        "Build a semantic mini page with header, main, footer, and at least one link.",
      starter:
        "<header>\n  <h1>My Page</h1>\n</header>\n<main>\n  \n</main>\n<footer>\n  \n</footer>",
      hint: "Use <a href='...'> inside main or footer.",
      validator: (code) =>
        includesAll(code, ["<header", "<main", "<footer", "<a"]),
    },
  },
  css: {
    label: "CSS Verification",
    quiz: [
      {
        q: "Which layout system aligns items on one axis?",
        options: ["grid", "flexbox", "float", "position"],
        correct: 1,
      },
      {
        q: "What is used for responsive breakpoints?",
        options: ["@font-face", "@media", "@keyframes", "@import"],
        correct: 1,
      },
      {
        q: "Which property changes text size?",
        options: ["font-size", "line-height", "font-weight", "display"],
        correct: 0,
      },
      {
        q: "Which property adds inside spacing?",
        options: ["margin", "padding", "gap", "border"],
        correct: 1,
      },
      {
        q: "Which selector targets an element with class card?",
        options: ["#card", ".card", "card", "*card"],
        correct: 1,
      },
      {
        q: "Which property rounds corners?",
        options: ["border-style", "corner", "radius", "border-radius"],
        correct: 3,
      },
    ],
    code: {
      instruction:
        "Write CSS for a .card with padding, border-radius, and a hover state that changes transform.",
      starter: ".card {\n  \n}\n\n.card:hover {\n  \n}",
      hint: "Use padding, border-radius, and transform in :hover.",
      validator: (code) =>
        includesAll(code, [
          ".card",
          "padding",
          "border-radius",
          ":hover",
          "transform",
        ]),
    },
  },
  javascript: {
    label: "JavaScript Verification",
    quiz: [
      {
        q: "What does addEventListener attach?",
        options: ["A style", "A loop", "An event handler", "A class"],
        correct: 2,
      },
      {
        q: "Which method selects an element by id?",
        options: ["queryAll", "getElementById", "select", "find"],
        correct: 1,
      },
      {
        q: "What object logs messages to the browser console?",
        options: ["window", "document", "screen", "console"],
        correct: 3,
      },
      {
        q: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "const", "both let and const"],
        correct: 3,
      },
      {
        q: "Which method converts JSON text into an object?",
        options: ["JSON.read", "JSON.parse", "JSON.stringify", "JSON.object"],
        correct: 1,
      },
      {
        q: "Which method can iterate over array items?",
        options: ["forEach", "assign", "query", "split"],
        correct: 0,
      },
    ],
    code: {
      instruction:
        "Write JS that adds a click listener to a button with id run and logs 'done'.",
      starter: "const button = document.getElementById('run');\n\n",
      hint: "Use button.addEventListener('click', () => console.log('done')).",
      validator: (code) =>
        includesAll(code, [
          "getElementById",
          "addEventListener",
          "click",
          "console.log",
          "done",
        ]),
    },
  },
};

const LESSON_PROFILES = {
  python: [
    {
      keywords: ["variable", "data type", "input", "output", "operator"],
      test: {
        quiz: [
          {
            q: "What is a variable used for in Python?",
            options: [
              "Repeating loops",
              "Storing values",
              "Catching errors",
              "Styling pages",
            ],
            correct: 1,
          },
          {
            q: "Which function gets user input?",
            options: ["print", "range", "input", "type"],
            correct: 2,
          },
          {
            q: "Which function prints text to the screen?",
            options: ["echo", "show", "write", "print"],
            correct: 3,
          },
          {
            q: "Which operator is used for addition?",
            options: ["*", "+", "=", "%"],
            correct: 1,
          },
        ],
        code: {
          instruction:
            "Create variables name and age, set values, then print both in one sentence.",
          starter: "name = 'Ada'\nage = 18\n\n",
          hint: "Use print(name, age) or an f-string.",
          validator: (code) =>
            includesAll(code, ["name", "age", "print"]) &&
            (code.includes('f"') || code.includes("print(")),
        },
      },
    },
    {
      keywords: ["if else", "loop", "break", "continue", "control flow"],
      test: {
        quiz: [
          {
            q: "Which keyword handles another condition after if?",
            options: ["else if", "elif", "then", "case"],
            correct: 1,
          },
          {
            q: "Which loop is often used with range()?",
            options: ["while", "for", "repeat", "loop"],
            correct: 1,
          },
          {
            q: "What does break do in a loop?",
            options: [
              "Skips one step",
              "Ends the loop",
              "Restarts loop",
              "Pauses loop",
            ],
            correct: 1,
          },
          {
            q: "What does continue do in a loop?",
            options: [
              "Stops program",
              "Ends loop",
              "Skips current iteration",
              "Creates loop",
            ],
            correct: 2,
          },
        ],
        code: {
          instruction:
            "Write a for loop from 1 to 5 that prints odd numbers only using if.",
          starter: "for n in range(1, 6):\n    \n",
          hint: "Check n % 2 != 0 before print.",
          validator: (code) =>
            includesAll(code, ["for", "range", "if", "%", "print"]),
        },
      },
    },
    {
      keywords: ["function", "argument", "return", "scope"],
      test: {
        quiz: [
          {
            q: "Which keyword defines a function?",
            options: ["func", "def", "lambda", "return"],
            correct: 1,
          },
          {
            q: "What are values in function parentheses called?",
            options: ["indexes", "keys", "parameters", "methods"],
            correct: 2,
          },
          {
            q: "Which keyword sends a value back from a function?",
            options: ["yield", "back", "return", "pass"],
            correct: 2,
          },
          {
            q: "A variable created inside a function has what scope?",
            options: ["global", "file", "local", "module"],
            correct: 2,
          },
        ],
        code: {
          instruction:
            "Write a function add(a, b) that returns their sum, then print add(2, 3).",
          starter: "def add(a, b):\n    \n\n",
          hint: "Use return a + b and print(add(2, 3)).",
          validator: (code) =>
            includesAll(code, ["def add", "return", "a + b", "print"]) ||
            includesAll(code, ["def add", "return", "a+b", "print"]),
        },
      },
    },
  ],
  html: [
    {
      keywords: ["document structure", "semantic", "text", "link", "images"],
      test: {
        quiz: [
          {
            q: "Which tag creates the largest heading?",
            options: ["h6", "h1", "header", "title"],
            correct: 1,
          },
          {
            q: "Which attribute is required for image accessibility?",
            options: ["title", "src", "alt", "href"],
            correct: 2,
          },
          {
            q: "Which tag creates a hyperlink?",
            options: ["link", "a", "href", "nav"],
            correct: 1,
          },
          {
            q: "Which tag usually wraps the page's main unique content?",
            options: ["main", "div", "aside", "article"],
            correct: 0,
          },
        ],
        code: {
          instruction:
            "Build a small page with h1, paragraph, image (with alt), and a link.",
          starter: "<main>\n  \n</main>",
          hint: "Use <h1>, <p>, <img src='' alt=''>, and <a href='...'>.",
          validator: (code) =>
            includesAll(code, ["<h1", "<p", "<img", "alt=", "<a"]),
        },
      },
    },
  ],
  css: [
    {
      keywords: ["selector", "box model", "typography", "units", "fundamental"],
      test: {
        quiz: [
          {
            q: "Which selector targets class 'card'?",
            options: ["#card", ".card", "card", "*card"],
            correct: 1,
          },
          {
            q: "Which property controls inner spacing?",
            options: ["margin", "padding", "border", "gap"],
            correct: 1,
          },
          {
            q: "Which property controls outer spacing?",
            options: ["padding", "margin", "font-size", "display"],
            correct: 1,
          },
          {
            q: "Which property changes text size?",
            options: ["font-size", "font-style", "line-height", "display"],
            correct: 0,
          },
        ],
        code: {
          instruction:
            "Style .card with padding, margin, border, and font-size.",
          starter: ".card {\n  \n}",
          hint: "Use padding, margin, border, and font-size in .card.",
          validator: (code) =>
            includesAll(code, [
              ".card",
              "padding",
              "margin",
              "border",
              "font-size",
            ]),
        },
      },
    },
  ],
  javascript: [
    {
      keywords: ["variable", "condition", "loop", "function", "basics"],
      test: {
        quiz: [
          {
            q: "Which keywords declare variables in modern JS?",
            options: [
              "int and str",
              "let and const",
              "var only",
              "new and set",
            ],
            correct: 1,
          },
          {
            q: "Which statement runs code when a condition is true?",
            options: ["for", "if", "switch", "while"],
            correct: 1,
          },
          {
            q: "Which loop is commonly used for arrays?",
            options: ["forEach", "select", "query", "append"],
            correct: 0,
          },
          {
            q: "Which keyword creates a function expression?",
            options: ["func", "def", "function", "method"],
            correct: 2,
          },
        ],
        code: {
          instruction:
            "Create a function double(n) that returns n*2 and log double(4).",
          starter: "function double(n) {\n  \n}\n\n",
          hint: "Use return n * 2; then console.log(double(4));",
          validator: (code) =>
            includesAll(code, [
              "function double",
              "return",
              "console.log",
              "double(4)",
            ]),
        },
      },
    },
  ],
};

const activeTest = buildLessonAwareTest();
const totalQuizQuestions = activeTest.quiz.length;
const minQuizScore = Math.max(3, Math.ceil(totalQuizQuestions * 0.67));
let quizPassed = false;
let codeAttempts = 0;

init();

submitQuizEl.addEventListener("click", submitQuiz);
checkCodeEl.addEventListener("click", checkCode);
showHintEl.addEventListener("click", showHint);

function includesAll(code, parts) {
  const text = String(code).toLowerCase();
  return parts.every((part) => text.includes(String(part).toLowerCase()));
}

function normalizeLessonText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashSeed(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildLessonQuizSet(baseQuiz, fallbackQuiz, key, count) {
  const pool = [...baseQuiz, ...fallbackQuiz].filter(
    (item, index, list) =>
      list.findIndex(
        (q) => normalizeLessonText(q.q) === normalizeLessonText(item.q),
      ) === index,
  );

  if (!pool.length) return [];

  const pickCount = Math.max(1, Math.min(count, pool.length));
  const start = hashSeed(key) % pool.length;
  const picked = [];

  for (let i = 0; i < pickCount; i += 1) {
    picked.push(pool[(start + i) % pool.length]);
  }

  return picked;
}

function buildLessonAwareTest() {
  const fallback = TESTS[trackId] || TESTS.python;
  const profiles = LESSON_PROFILES[trackId] || [];
  const lessonText = `${normalizeLessonText(moduleTitle)} ${normalizeLessonText(lessonTitle)}`;

  const matched = profiles.find((profile) =>
    profile.keywords.some((word) =>
      lessonText.includes(normalizeLessonText(word)),
    ),
  );

  if (!matched) {
    return fallback;
  }

  const quizCount = matched.test.quiz.length;
  const lessonQuiz = buildLessonQuizSet(
    matched.test.quiz,
    fallback.quiz,
    lessonKey,
    quizCount,
  );

  return {
    ...fallback,
    label: `${fallback.label} - ${lessonTitle}`,
    quiz: lessonQuiz,
    code: matched.test.code,
  };
}

function init() {
  trackLabelEl.textContent = activeTest.label;
  lessonTitleEl.textContent = `${moduleTitle} - ${lessonTitle}`;
  backLinkEl.href = returnTo;
  doneLinkEl.href = returnTo;

  codeInstructionEl.textContent = activeTest.code.instruction;
  codeInputEl.value = activeTest.code.starter;
  quizRuleEl.textContent = `Get at least ${minQuizScore} out of ${totalQuizQuestions} correct to unlock the coding test.`;

  renderQuiz();
  updateProgress();
}

function renderQuiz() {
  quizListEl.innerHTML = "";

  activeTest.quiz.forEach((item, qIndex) => {
    const block = document.createElement("article");
    block.className = "quiz-item";

    const prompt = document.createElement("p");
    prompt.textContent = `${qIndex + 1}. ${item.q}`;
    block.appendChild(prompt);

    const options = document.createElement("div");
    options.className = "option-row";

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${qIndex}`;
      input.value = String(optionIndex);
      label.appendChild(input);
      label.append(option);
      options.appendChild(label);
    });

    block.appendChild(options);
    quizListEl.appendChild(block);
  });
}

function submitQuiz() {
  let score = 0;

  activeTest.quiz.forEach((question, qIndex) => {
    const selected = document.querySelector(
      `input[name='q-${qIndex}']:checked`,
    );
    if (!selected) return;
    if (Number(selected.value) === question.correct) {
      score += 1;
    }
  });

  if (score >= minQuizScore) {
    quizPassed = true;
    quizFeedbackEl.textContent = `Passed quiz: ${score}/${totalQuizQuestions}. Practical task unlocked.`;
    quizFeedbackEl.style.color = "#0c7a65";
    codePanelEl.classList.remove("is-hidden");
    statePillEl.textContent = "Quiz: Passed";
  } else {
    quizFeedbackEl.textContent = `Quiz not passed: ${score}/${totalQuizQuestions}. Review and try again.`;
    quizFeedbackEl.style.color = "#d96941";
  }

  updateProgress();
}

function checkCode() {
  if (!quizPassed) {
    codeFeedbackEl.textContent = "Pass the quiz first.";
    codeFeedbackEl.style.color = "#d96941";
    return;
  }

  const code = codeInputEl.value;
  const solved = activeTest.code.validator(code);

  if (solved) {
    codeFeedbackEl.textContent = "Code challenge passed.";
    codeFeedbackEl.style.color = "#0c7a65";
    finalizePass();
    return;
  }

  codeAttempts += 1;
  codeFeedbackEl.textContent = "Not solved yet. Keep trying.";
  codeFeedbackEl.style.color = "#d96941";
  if (codeAttempts >= 2) {
    showHint();
  }
}

function showHint() {
  hintBoxEl.hidden = false;
  hintBoxEl.textContent = `Hint: ${activeTest.code.hint}`;
}

function updateProgress() {
  const done = quizPassed ? 1 : 0;
  progressCountEl.textContent = `${done} / 2`;
  progressFillEl.style.width = `${done * 50}%`;
}

function finalizePass() {
  const passMap = loadPassMap();
  passMap[lessonKey] = {
    passed: true,
    passedAt: new Date().toISOString(),
    trackId,
    moduleTitle,
    lessonTitle,
  };
  localStorage.setItem(LESSON_TEST_PASS_KEY, JSON.stringify(passMap));

  localStorage.setItem(
    LESSON_TEST_PENDING_KEY,
    JSON.stringify({
      key: lessonKey,
      trackId,
      moduleTitle,
      lessonTitle,
      passedAt: new Date().toISOString(),
    }),
  );

  progressCountEl.textContent = "2 / 2";
  progressFillEl.style.width = "100%";
  statePillEl.textContent = "Verified";

  quizPanelEl.classList.add("is-hidden");
  codePanelEl.classList.add("is-hidden");
  donePanelEl.classList.remove("is-hidden");
  doneMessageEl.textContent =
    "Great work. The lesson is verified and will be marked as Done on return.";

  setTimeout(() => {
    window.location.href = returnTo;
  }, 800);
}

function loadPassMap() {
  try {
    return JSON.parse(localStorage.getItem(LESSON_TEST_PASS_KEY)) || {};
  } catch {
    return {};
  }
}
