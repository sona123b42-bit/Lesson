const TRACK_ORDER = ["python", "html", "css", "javascript"];
const GAME_STORAGE_KEY = "study-game-progression-v1";

function makeLevel(
  name,
  difficulty,
  question,
  answers,
  instruction,
  starter,
  hint,
  validator,
) {
  return {
    name,
    difficulty,
    quiz: { q: question, answers },
    mission: { instruction, starter, hint, validator },
  };
}

function includesAll(code, parts) {
  const text = String(code).toLowerCase();
  return parts.every((part) => text.includes(String(part).toLowerCase()));
}

const TOPICS = {
  python: {
    title: "Python Mission Board",
    summary:
      "Build confidence with variables, conditions, loops, functions, data structures, and errors.",
    levels: [
      makeLevel(
        "Level 1 - Variables",
        "Easy",
        "What word is used to store a value in code?",
        ["variable"],
        "Create a variable called name and store Ada inside it.",
        "name = ''",
        "You need a variable named name and a string value.",
        (code) => includesAll(code, ["name", "Ada"]),
      ),
      makeLevel(
        "Level 2 - Input",
        "Easy",
        "Which function gets keyboard input in Python?",
        ["input"],
        "Ask for a user's age using input().",
        "age = ",
        "Use input('...') and assign it to age.",
        (code) => includesAll(code, ["age", "input"]),
      ),
      makeLevel(
        "Level 3 - Print",
        "Easy",
        "Which function writes text to the screen in Python?",
        ["print"],
        "Print the text Hello learner.",
        "",
        "Use print('Hello learner').",
        (code) => includesAll(code, ["print", "Hello learner"]),
      ),
      makeLevel(
        "Level 4 - If Else",
        "Easy",
        "Which keyword handles the false branch in Python?",
        ["else"],
        "Write an if/else block that prints big if score is greater than 10.",
        "score = 12\n",
        "You need both if and else, plus > 10.",
        (code) => includesAll(code, ["if", "else", "> 10"]),
      ),
      makeLevel(
        "Level 5 - Elif",
        "Medium",
        "Which keyword adds another condition in Python?",
        ["elif"],
        "Write an if/elif/else chain using score.",
        "score = 80\n",
        "Add elif between if and else.",
        (code) => includesAll(code, ["if", "elif", "else"]),
      ),
      makeLevel(
        "Level 6 - For Loop",
        "Medium",
        "Which function is commonly used with a counting for-loop?",
        ["range"],
        "Write a for-loop that prints numbers 1 through 5.",
        "",
        "Use for with range(1, 6).",
        (code) => includesAll(code, ["for", "range(1, 6)"]),
      ),
      makeLevel(
        "Level 7 - While Loop",
        "Medium",
        "Which loop runs while a condition stays true?",
        ["while"],
        "Write a while-loop that runs while count is less than 3.",
        "count = 0\n",
        "Use while count < 3 and update count.",
        (code) => includesAll(code, ["while", "count < 3", "count"]),
      ),
      makeLevel(
        "Level 8 - Functions",
        "Medium",
        "What keyword defines a function in Python?",
        ["def"],
        "Create a function named greet that returns Hello.",
        "def greet():\n    pass",
        "Use return inside the function.",
        (code) => includesAll(code, ["def greet", "return", "Hello"]),
      ),
      makeLevel(
        "Level 9 - Parameters",
        "Hard",
        "What do we call values accepted by a function definition?",
        ["parameters", "parameter"],
        "Write a function greet(name) that returns Hello plus the name.",
        "def greet(name):\n    pass",
        "Use the name parameter in the return statement.",
        (code) => includesAll(code, ["def greet(name)", "return", "name"]),
      ),
      makeLevel(
        "Level 10 - Lists",
        "Hard",
        "Which method adds an item to a list?",
        ["append"],
        "Create a list named colors and append blue to it.",
        "colors = []\n",
        "Use colors.append('blue').",
        (code) => includesAll(code, ["colors", "append", "blue"]),
      ),
      makeLevel(
        "Level 11 - Dictionaries",
        "Hard",
        "Which structure stores key and value pairs in Python?",
        ["dictionary", "dict"],
        "Create a dictionary called student with name and score keys.",
        "student = {}",
        "Use a dictionary with name and score keys.",
        (code) => includesAll(code, ["student", "name", "score"]),
      ),
      makeLevel(
        "Level 12 - Comprehensions",
        "Hard",
        "What compact syntax builds a list from a loop on one line?",
        ["list comprehension", "comprehension"],
        "Write a list comprehension that doubles numbers in nums.",
        "nums = [1, 2, 3]\n",
        "Use square brackets with for inside.",
        (code) => includesAll(code, ["[", "for", "nums", "]"]),
      ),
      makeLevel(
        "Level 13 - Try Except",
        "Expert",
        "Which block catches errors in Python?",
        ["except"],
        "Write try/except around int conversion of text.",
        "text = '42'\n",
        "Use try then except ValueError.",
        (code) => includesAll(code, ["try", "except", "int("]),
      ),
      makeLevel(
        "Level 14 - Files",
        "Expert",
        "Which function opens a file in Python?",
        ["open"],
        "Write code that opens notes.txt in write mode using with.",
        "",
        "Use with open('notes.txt', 'w') as file:.",
        (code) => includesAll(code, ["with open", "notes.txt", "'w'"]),
      ),
      makeLevel(
        "Level 15 - Boss Project",
        "Boss",
        "Which keyword creates a class in Python?",
        ["class"],
        "Create a class Student with __init__ that stores name and score.",
        "",
        "Use class Student and def __init__(self, name, score).",
        (code) =>
          includesAll(code, ["class Student", "__init__", "name", "score"]),
      ),
    ],
  },
  html: {
    title: "HTML Mission Board",
    summary:
      "Learn structure, content, forms, semantic layout, and accessible markup.",
    levels: [
      makeLevel(
        "Level 1 - Headings",
        "Easy",
        "Which tag is the main heading?",
        ["h1"],
        "Write an h1 and a paragraph below it.",
        "",
        "You need both <h1> and <p> tags.",
        (code) => includesAll(code, ["<h1", "<p"]),
      ),
      makeLevel(
        "Level 2 - Links",
        "Easy",
        "Which tag creates a link?",
        ["a"],
        "Create a link to https://example.com.",
        "",
        "Use an anchor tag with href.",
        (code) => includesAll(code, ["<a", "href"]),
      ),
      makeLevel(
        "Level 3 - Images",
        "Easy",
        "Which attribute describes an image for accessibility?",
        ["alt"],
        "Create an image tag with src and alt attributes.",
        "",
        "Use <img src='...' alt='...'>.",
        (code) => includesAll(code, ["<img", "src=", "alt="]),
      ),
      makeLevel(
        "Level 4 - Lists",
        "Easy",
        "Which tag makes an unordered list?",
        ["ul"],
        "Create an unordered list with three list items.",
        "",
        "Use one ul and three li tags.",
        (code) =>
          includesAll(code, ["<ul"]) && (code.match(/<li/gi) || []).length >= 3,
      ),
      makeLevel(
        "Level 5 - Ordered Lists",
        "Medium",
        "Which tag makes a numbered list?",
        ["ol"],
        "Create an ordered list with three steps.",
        "",
        "Use one ol and three li tags.",
        (code) =>
          includesAll(code, ["<ol"]) && (code.match(/<li/gi) || []).length >= 3,
      ),
      makeLevel(
        "Level 6 - Tables",
        "Medium",
        "Which tag makes a table row?",
        ["tr"],
        "Create a table with one row and two cells.",
        "",
        "Use table, tr, and td tags.",
        (code) => includesAll(code, ["<table", "<tr", "<td"]),
      ),
      makeLevel(
        "Level 7 - Forms",
        "Medium",
        "Which tag wraps a form?",
        ["form"],
        "Create a form with label, input, and button.",
        "",
        "Use label + input + button inside form.",
        (code) => includesAll(code, ["<form", "<label", "<input", "<button"]),
      ),
      makeLevel(
        "Level 8 - Input Types",
        "Medium",
        "Which input type hides typed characters?",
        ["password"],
        "Create email and password inputs.",
        "",
        "Use type='email' and type='password'.",
        (code) =>
          includesAll(code, ["type='email'", "type='password'"]) ||
          includesAll(code, ['type="email"', 'type="password"']),
      ),
      makeLevel(
        "Level 9 - Semantic Layout",
        "Hard",
        "Which tag is commonly used for page navigation?",
        ["nav"],
        "Create header, nav, main, and footer tags.",
        "",
        "Use all four semantic tags.",
        (code) => includesAll(code, ["<header", "<nav", "<main", "<footer"]),
      ),
      makeLevel(
        "Level 10 - Sections",
        "Hard",
        "Which tag groups related page content into a standalone block?",
        ["section"],
        "Create two section tags inside main.",
        "",
        "Use main and two section tags.",
        (code) =>
          includesAll(code, ["<main", "<section"]) &&
          (code.match(/<section/gi) || []).length >= 2,
      ),
      makeLevel(
        "Level 11 - Articles",
        "Hard",
        "Which semantic tag is good for a blog post or card item?",
        ["article"],
        "Create an article with h2 and paragraph.",
        "",
        "Use article with heading content.",
        (code) => includesAll(code, ["<article", "<h2", "<p"]),
      ),
      makeLevel(
        "Level 12 - Labels",
        "Expert",
        "What attribute connects a label to an input?",
        ["for"],
        "Build a label and input using matching for and id.",
        "",
        "The label for value must match the input id.",
        (code) => includesAll(code, ["<label", "for=", "id="]),
      ),
      makeLevel(
        "Level 13 - Fieldsets",
        "Expert",
        "Which tag groups related form controls with a border?",
        ["fieldset"],
        "Create fieldset and legend around two radio buttons.",
        "",
        "Use fieldset, legend, and radio inputs.",
        (code) => includesAll(code, ["<fieldset", "<legend", "radio"]),
      ),
      makeLevel(
        "Level 14 - Navigation Menu",
        "Expert",
        "Which tag often contains a list of links for navigation?",
        ["nav"],
        "Create a nav with an unordered list of three links.",
        "",
        "Combine nav, ul, li, and a tags.",
        (code) => includesAll(code, ["<nav", "<ul", "<li", "<a"]),
      ),
      makeLevel(
        "Level 15 - Boss Page",
        "Boss",
        "Which semantic tag usually holds the main unique page content?",
        ["main"],
        "Create a mini portfolio layout using header, nav, main, section, article, footer, and a contact form.",
        "",
        "Use all required semantic tags together.",
        (code) =>
          includesAll(code, [
            "<header",
            "<nav",
            "<main",
            "<section",
            "<article",
            "<footer",
            "<form",
          ]),
      ),
    ],
  },
  css: {
    title: "CSS Mission Board",
    summary:
      "Practice colors, spacing, box model, flexbox, grid, and responsive behavior.",
    levels: [
      makeLevel(
        "Level 1 - Color",
        "Easy",
        "Which CSS property changes text color?",
        ["color"],
        "Style body text color and background color.",
        "body {\n}\n",
        "Use color and background or background-color.",
        (code) =>
          includesAll(code, ["color"]) &&
          (code.includes("background") || code.includes("background-color")),
      ),
      makeLevel(
        "Level 2 - Spacing",
        "Easy",
        "Which property adds inner space inside a box?",
        ["padding"],
        "Style .card with padding and margin.",
        ".card {\n}\n",
        "You need both padding and margin.",
        (code) => includesAll(code, ["padding", "margin"]),
      ),
      makeLevel(
        "Level 3 - Borders",
        "Easy",
        "Which property rounds corners?",
        ["border radius", "border-radius"],
        "Style .button with border-radius and border.",
        ".button {\n}\n",
        "Use border-radius and border together.",
        (code) => includesAll(code, ["border-radius", "border"]),
      ),
      makeLevel(
        "Level 4 - Typography",
        "Easy",
        "Which property changes text size?",
        ["font size", "font-size"],
        "Style h1 with font-size and font-weight.",
        "h1 {\n}\n",
        "Use font-size and font-weight.",
        (code) => includesAll(code, ["font-size", "font-weight"]),
      ),
      makeLevel(
        "Level 5 - Width",
        "Medium",
        "Which property limits an element from getting too wide?",
        ["max width", "max-width"],
        "Style .container with width and max-width.",
        ".container {\n}\n",
        "Use width and max-width together.",
        (code) => includesAll(code, ["width", "max-width"]),
      ),
      makeLevel(
        "Level 6 - Flex Display",
        "Medium",
        "Which display value enables flex layout?",
        ["flex"],
        "Turn .wrap into a flex container.",
        ".wrap {\n}\n",
        "Use display: flex.",
        (code) => includesAll(code, ["display: flex"]),
      ),
      makeLevel(
        "Level 7 - Flex Alignment",
        "Medium",
        "Which property aligns flex items on the main axis?",
        ["justify content", "justify-content"],
        "Center items with flexbox using justify-content and align-items.",
        ".wrap {\n  display: flex;\n}\n",
        "Add justify-content and align-items.",
        (code) =>
          includesAll(code, [
            "display: flex",
            "justify-content",
            "align-items",
          ]),
      ),
      makeLevel(
        "Level 8 - Flex Direction",
        "Medium",
        "Which property changes flex items from row to column?",
        ["flex direction", "flex-direction"],
        "Stack .menu items vertically with flex-direction and gap.",
        ".menu {\n  display: flex;\n}\n",
        "Use flex-direction: column and gap.",
        (code) => includesAll(code, ["display: flex", "flex-direction", "gap"]),
      ),
      makeLevel(
        "Level 9 - Grid",
        "Hard",
        "Which display value enables grid layout?",
        ["grid"],
        "Create a two-column grid with gap.",
        ".grid {\n}\n",
        "Use display: grid and grid-template-columns.",
        (code) =>
          includesAll(code, ["display: grid", "grid-template-columns", "gap"]),
      ),
      makeLevel(
        "Level 10 - Hover",
        "Hard",
        "Which pseudo-class targets hover state?",
        ["hover"],
        "Add a hover style for .btn that changes background.",
        ".btn:hover {\n}\n",
        "Use .btn:hover and background.",
        (code) => includesAll(code, [":hover", "background"]),
      ),
      makeLevel(
        "Level 11 - Transition",
        "Hard",
        "Which property creates smooth CSS change over time?",
        ["transition"],
        "Add transition and transform to .card hover.",
        ".card {\n}\n.card:hover {\n}\n",
        "Use transition in default state and transform on hover.",
        (code) => includesAll(code, ["transition", "transform", ":hover"]),
      ),
      makeLevel(
        "Level 12 - Positioning",
        "Expert",
        "Which position value lets a child use top and left relative to a parent?",
        ["absolute"],
        "Use position relative on .box and absolute on .badge.",
        ".box {\n}\n.badge {\n}\n",
        "Use relative on parent and absolute on child.",
        (code) =>
          includesAll(code, ["position: relative", "position: absolute"]),
      ),
      makeLevel(
        "Level 13 - Media Query",
        "Expert",
        "What rule starts a responsive media block?",
        ["media"],
        "Write a media query for screens below 700px.",
        "",
        "Use @media (max-width: 700px).",
        (code) => includesAll(code, ["@media", "700px"]),
      ),
      makeLevel(
        "Level 14 - Animation",
        "Expert",
        "Which rule defines keyframe animation steps?",
        ["keyframes"],
        "Create keyframes named float and apply animation to .card.",
        "",
        "Use @keyframes float and animation on .card.",
        (code) => includesAll(code, ["@keyframes", "animation", "float"]),
      ),
      makeLevel(
        "Level 15 - Boss Layout",
        "Boss",
        "Which CSS feature is best for two-dimensional layout?",
        ["grid"],
        "Build a landing page style using grid, media query, hover, and transition.",
        "",
        "Use grid + media query + hover + transition in one answer.",
        (code) =>
          includesAll(code, [
            "display: grid",
            "@media",
            ":hover",
            "transition",
          ]),
      ),
    ],
  },
  javascript: {
    title: "JavaScript Mission Board",
    summary:
      "Cover variables, functions, arrays, DOM events, conditions, and error handling.",
    levels: [
      makeLevel(
        "Level 1 - Variables",
        "Easy",
        "Which keyword declares a block-scoped variable?",
        ["let", "const"],
        "Create a variable called score with value 10.",
        "",
        "Use let or const with score.",
        (code) =>
          (code.includes("let score") || code.includes("const score")) &&
          code.includes("10"),
      ),
      makeLevel(
        "Level 2 - Output",
        "Easy",
        "Which object writes text to the browser console?",
        ["console"],
        "Log Hello JS to the console.",
        "",
        "Use console.log('Hello JS').",
        (code) => includesAll(code, ["console.log", "Hello JS"]),
      ),
      makeLevel(
        "Level 3 - Functions",
        "Easy",
        "Which keyword starts a function declaration?",
        ["function"],
        "Write a function add(a, b) that returns a + b.",
        "function add(a, b) {\n}\n",
        "You need function add and a return statement.",
        (code) => includesAll(code, ["function add", "return"]),
      ),
      makeLevel(
        "Level 4 - Conditions",
        "Easy",
        "Which keyword handles the false branch?",
        ["else"],
        "Write if/else to check if age >= 18.",
        "const age = 20;\n",
        "Use if (age >= 18) and else.",
        (code) => includesAll(code, ["if", "else", ">= 18"]),
      ),
      makeLevel(
        "Level 5 - Loops",
        "Medium",
        "Which loop keyword is used to repeat with a counter?",
        ["for"],
        "Write a for-loop that logs 1 to 5.",
        "",
        "Use for with i < 6.",
        (code) => includesAll(code, ["for", "console.log"]),
      ),
      makeLevel(
        "Level 6 - Arrays",
        "Medium",
        "Which method adds an item to the end of an array?",
        ["push"],
        "Create an array and push one new value into it.",
        "const items = [];\n",
        "Use items.push(...).",
        (code) =>
          includesAll(code, ["[]", "push"]) ||
          (code.includes("[") && code.includes("]") && code.includes("push")),
      ),
      makeLevel(
        "Level 7 - Objects",
        "Medium",
        "Which punctuation wraps object literal properties in JavaScript?",
        ["curly braces", "object"],
        "Create an object named user with name and age properties.",
        "",
        "Use curly braces with key-value pairs.",
        (code) =>
          includesAll(code, ["user", "name", "age"]) && code.includes("{"),
      ),
      makeLevel(
        "Level 8 - DOM Select",
        "Medium",
        "Which method finds an element by id?",
        ["getelementbyid"],
        "Select #message and change its textContent.",
        "const el = document.getElementById('message');\n",
        "Use textContent after selecting the element.",
        (code) => includesAll(code, ["getElementById", "textContent"]),
      ),
      makeLevel(
        "Level 9 - Events",
        "Hard",
        "Which method attaches a click event listener?",
        ["addeventlistener"],
        "Add a click event listener to #run and log clicked.",
        "document.getElementById('run')",
        "Use addEventListener('click', ...).",
        (code) => includesAll(code, ["addEventListener", "click", "clicked"]),
      ),
      makeLevel(
        "Level 10 - Input Value",
        "Hard",
        "Which property reads text from an input element?",
        ["value"],
        "Read value from #name and log it.",
        "const nameInput = document.getElementById('name');\n",
        "Use .value after selecting the input.",
        (code) => includesAll(code, ["getElementById", "value", "console.log"]),
      ),
      makeLevel(
        "Level 11 - Map",
        "Hard",
        "Which array method transforms every item into a new array?",
        ["map"],
        "Use map() to double numbers in nums.",
        "const nums = [1, 2, 3];\n",
        "Create a new array with nums.map(...).",
        (code) => includesAll(code, ["nums", "map"]),
      ),
      makeLevel(
        "Level 12 - Filter",
        "Expert",
        "Which array method keeps only matching items?",
        ["filter"],
        "Use filter() to keep numbers greater than 10.",
        "const nums = [4, 12, 18];\n",
        "Use nums.filter(... > 10).",
        (code) => includesAll(code, ["filter", "> 10"]),
      ),
      makeLevel(
        "Level 13 - Timeout",
        "Expert",
        "Which function runs code later after a delay?",
        ["settimeout"],
        "Use setTimeout to log done after 1000 milliseconds.",
        "",
        "Use setTimeout(() => ..., 1000).",
        (code) => includesAll(code, ["setTimeout", "1000"]),
      ),
      makeLevel(
        "Level 14 - Try Catch",
        "Expert",
        "Which keyword catches a thrown error in JavaScript?",
        ["catch"],
        "Write try/catch block and console.error in catch.",
        "",
        "Use try, catch, and console.error.",
        (code) => includesAll(code, ["try", "catch", "console.error"]),
      ),
      makeLevel(
        "Level 15 - Boss App",
        "Boss",
        "Which browser storage API saves data between page reloads?",
        ["localstorage", "local storage"],
        "Build a mini interaction that reads input, adds click handling, updates textContent, and saves a value in localStorage.",
        "",
        "Use addEventListener, textContent, and localStorage.setItem.",
        (code) =>
          includesAll(code, [
            "addEventListener",
            "textContent",
            "localStorage",
          ]),
      ),
    ],
  },
};

const EXTRA_QUIZ_BANK = {
  python: [
    {
      q: "What keyword creates a loop that repeats over a sequence?",
      answers: ["for"],
    },
    { q: "What keyword exits a loop early?", answers: ["break"] },
    {
      q: "What built-in type stores key-value pairs?",
      answers: ["dict", "dictionary"],
    },
    { q: "What value means a function returned nothing?", answers: ["none"] },
    { q: "What keyword is used to handle an error case?", answers: ["except"] },
    {
      q: "What keyword sends a value back from a function?",
      answers: ["return"],
    },
    {
      q: "What method adds an item to the end of a list?",
      answers: ["append"],
    },
    { q: "What symbol starts a comment in Python?", answers: ["#"] },
  ],
  html: [
    { q: "Which tag makes the main heading on a page?", answers: ["h1"] },
    { q: "Which tag creates a clickable hyperlink?", answers: ["a"] },
    {
      q: "Which tag contains the main unique page content?",
      answers: ["main"],
    },
    {
      q: "Which attribute is important for image accessibility?",
      answers: ["alt"],
    },
    { q: "Which tag groups navigation links semantically?", answers: ["nav"] },
    { q: "Which tag wraps an input form?", answers: ["form"] },
    { q: "Which tag creates a table row?", answers: ["tr"] },
    { q: "Which attribute links a label to an input?", answers: ["for"] },
  ],
  css: [
    { q: "Which property changes text color?", answers: ["color"] },
    { q: "Which property adds inner space?", answers: ["padding"] },
    { q: "Which property adds outer space?", answers: ["margin"] },
    { q: "Which property rounds corners?", answers: ["border-radius"] },
    { q: "Which display value enables flex layout?", answers: ["flex"] },
    { q: "Which display value enables grid layout?", answers: ["grid"] },
    { q: "What rule starts a responsive query?", answers: ["@media", "media"] },
    { q: "Which property animates changes smoothly?", answers: ["transition"] },
  ],
  javascript: [
    {
      q: "Which keyword declares a block-scoped variable?",
      answers: ["let", "const"],
    },
    {
      q: "Which keyword starts a function declaration?",
      answers: ["function"],
    },
    {
      q: "Which method adds an item to the end of an array?",
      answers: ["push"],
    },
    {
      q: "Which method transforms every array item into a new array?",
      answers: ["map"],
    },
    { q: "Which method finds an element by id?", answers: ["getelementbyid"] },
    {
      q: "Which method attaches an event listener?",
      answers: ["addeventlistener"],
    },
    {
      q: "Which object stores data between page reloads?",
      answers: ["localstorage"],
    },
    { q: "Which keyword catches an error?", answers: ["catch"] },
  ],
};

const EXTRA_PUZZLE_BANK = {
  python: [
    {
      instruction: "Print two different lines of text.",
      starter: "",
      hint: "Use print() twice.",
      validator: (code) =>
        (String(code).match(/print\s*\(/gi) || []).length >= 2,
    },
    {
      instruction:
        "Create a variable total with value 0 and then increase it by 1.",
      starter: "total = 0\n",
      hint: "Use total = total + 1 or total += 1.",
      validator: (code) =>
        includesAll(code, ["total", "0"]) &&
        (code.includes("+= 1") || code.includes("total = total + 1")),
    },
    {
      instruction:
        "Write an if statement that checks if score is greater than 50.",
      starter: "score = 75\n",
      hint: "Use if score > 50:.",
      validator: (code) => includesAll(code, ["if", "score", "> 50"]),
    },
    {
      instruction: "Create a list numbers and loop through it with for.",
      starter: "numbers = [1, 2, 3]\n",
      hint: "Use for item in numbers:.",
      validator: (code) => includesAll(code, ["numbers", "for", "in numbers"]),
    },
    {
      instruction: "Write a function square(n) that returns n * n.",
      starter: "def square(n):\n    pass",
      hint: "Use return n * n.",
      validator: (code) => includesAll(code, ["def square", "return", "n * n"]),
    },
    {
      instruction: "Create a dictionary user with keys name and role.",
      starter: "user = {}",
      hint: "Use a dictionary literal with name and role keys.",
      validator: (code) => includesAll(code, ["user", "name", "role"]),
    },
    {
      instruction: "Write a try/except block that catches ValueError.",
      starter: "",
      hint: "Use try then except ValueError:.",
      validator: (code) => includesAll(code, ["try", "except ValueError"]),
    },
    {
      instruction: "Use with open to read from notes.txt.",
      starter: "",
      hint: "Use with open('notes.txt') as file:.",
      validator: (code) =>
        includesAll(code, ["with open", "notes.txt", "as file"]),
    },
  ],
  html: [
    {
      instruction: "Create a heading, paragraph, and button inside main.",
      starter: "",
      hint: "Use main, h1, p, and button tags.",
      validator: (code) => includesAll(code, ["<main", "<h1", "<p", "<button"]),
    },
    {
      instruction: "Build an unordered list with three links.",
      starter: "",
      hint: "Use ul, li, and a tags.",
      validator: (code) =>
        includesAll(code, ["<ul", "<li", "<a"]) &&
        (code.match(/<li/gi) || []).length >= 3,
    },
    {
      instruction: "Create a card section with h2, image, and paragraph.",
      starter: "",
      hint: "Use section, h2, img, and p tags.",
      validator: (code) => includesAll(code, ["<section", "<h2", "<img", "<p"]),
    },
    {
      instruction: "Build a form with label, input, and submit button.",
      starter: "",
      hint: "Keep all controls inside form.",
      validator: (code) =>
        includesAll(code, ["<form", "<label", "<input", "<button"]),
    },
    {
      instruction: "Create a table with a header row and one data row.",
      starter: "",
      hint: "Use table, tr, th, and td.",
      validator: (code) => includesAll(code, ["<table", "<tr", "<th", "<td"]),
    },
    {
      instruction:
        "Create semantic layout using header, nav, main, aside, and footer.",
      starter: "",
      hint: "Use all five semantic tags.",
      validator: (code) =>
        includesAll(code, ["<header", "<nav", "<main", "<aside", "<footer"]),
    },
    {
      instruction: "Create a fieldset with legend and two radio inputs.",
      starter: "",
      hint: "Use fieldset, legend, and radio type inputs.",
      validator: (code) => includesAll(code, ["<fieldset", "<legend", "radio"]),
    },
    {
      instruction:
        "Build a mini article card with title, meta paragraph, and read more link.",
      starter: "",
      hint: "Use article, h3, p, and a.",
      validator: (code) => includesAll(code, ["<article", "<h3", "<p", "<a"]),
    },
  ],
  css: [
    {
      instruction: "Style .card with padding, border-radius, and box-shadow.",
      starter: ".card {\n}\n",
      hint: "Use all three properties.",
      validator: (code) =>
        includesAll(code, ["padding", "border-radius", "box-shadow"]),
    },
    {
      instruction: "Center content using flexbox and add gap.",
      starter: ".wrap {\n  display: flex;\n}\n",
      hint: "Use justify-content, align-items, and gap.",
      validator: (code) =>
        includesAll(code, [
          "display: flex",
          "justify-content",
          "align-items",
          "gap",
        ]),
    },
    {
      instruction: "Build a two-column grid with gap and max-width.",
      starter: ".grid {\n}\n",
      hint: "Use display grid, grid-template-columns, gap, and max-width.",
      validator: (code) =>
        includesAll(code, [
          "display: grid",
          "grid-template-columns",
          "gap",
          "max-width",
        ]),
    },
    {
      instruction:
        "Add hover effect that changes background and transforms the card.",
      starter: ".card:hover {\n}\n",
      hint: "Use :hover, background, and transform.",
      validator: (code) =>
        includesAll(code, [":hover", "background", "transform"]),
    },
    {
      instruction:
        "Create a button style with transition, border, and font-weight.",
      starter: ".btn {\n}\n",
      hint: "Use transition, border, and font-weight.",
      validator: (code) =>
        includesAll(code, ["transition", "border", "font-weight"]),
    },
    {
      instruction:
        "Write a media query that changes grid to one column below 700px.",
      starter: "",
      hint: "Use @media (max-width: 700px) and grid-template-columns: 1fr.",
      validator: (code) =>
        includesAll(code, ["@media", "700px", "grid-template-columns", "1fr"]),
    },
    {
      instruction: "Create keyframes named float and apply animation to .card.",
      starter: "",
      hint: "Use @keyframes float and animation on .card.",
      validator: (code) =>
        includesAll(code, ["@keyframes", "float", "animation"]),
    },
    {
      instruction:
        "Use position relative on .box and absolute on .badge with top and right.",
      starter: ".box {\n}\n.badge {\n}\n",
      hint: "Use relative on parent and absolute plus top/right on child.",
      validator: (code) =>
        includesAll(code, [
          "position: relative",
          "position: absolute",
          "top",
          "right",
        ]),
    },
  ],
  javascript: [
    {
      instruction: "Log a message and store a number in a variable.",
      starter: "",
      hint: "Use console.log and let or const.",
      validator: (code) =>
        includesAll(code, ["console.log"]) &&
        (code.includes("let ") || code.includes("const ")),
    },
    {
      instruction: "Create a function multiply(a, b) that returns a * b.",
      starter: "function multiply(a, b) {\n}\n",
      hint: "Use return a * b.",
      validator: (code) =>
        includesAll(code, ["function multiply", "return", "a * b"]),
    },
    {
      instruction: "Write an if/else that checks if score is at least 80.",
      starter: "const score = 84;\n",
      hint: "Use if (score >= 80) and else.",
      validator: (code) => includesAll(code, ["if", "else", ">= 80"]),
    },
    {
      instruction: "Create an array and use map() to double each number.",
      starter: "const nums = [1, 2, 3];\n",
      hint: "Use nums.map(...).",
      validator: (code) => includesAll(code, ["nums", "map"]),
    },
    {
      instruction: "Create an object user and log user.name.",
      starter: "",
      hint: "Use object literal with a name property.",
      validator: (code) => includesAll(code, ["user", "name", "console.log"]),
    },
    {
      instruction: "Select #message and update its textContent.",
      starter: "const el = document.getElementById('message');\n",
      hint: "Use textContent after getElementById.",
      validator: (code) => includesAll(code, ["getElementById", "textContent"]),
    },
    {
      instruction:
        "Add a click event listener to #run and save a value in localStorage.",
      starter: "",
      hint: "Use addEventListener and localStorage.setItem.",
      validator: (code) =>
        includesAll(code, ["addEventListener", "click", "localStorage"]),
    },
    {
      instruction: "Write try/catch and log the error message in catch.",
      starter: "",
      hint: "Use try, catch, and console.error(error.message).",
      validator: (code) => includesAll(code, ["try", "catch", "console.error"]),
    },
  ],
};

function buildQuizSet(level, topicKey, levelIndex) {
  const bank = EXTRA_QUIZ_BANK[topicKey] || [];
  const set = [level.quiz];
  for (let offset = 0; offset < 4; offset += 1) {
    set.push(bank[(levelIndex + offset) % bank.length]);
  }
  return set;
}

function buildPuzzleSet(level, topicKey, levelIndex) {
  const bank = EXTRA_PUZZLE_BANK[topicKey] || [];
  const set = [level.mission];
  for (let offset = 0; offset < 4; offset += 1) {
    set.push(bank[(levelIndex + offset) % bank.length]);
  }
  return set;
}

Object.entries(TOPICS).forEach(([topicKey, topic]) => {
  topic.levels = topic.levels.map((level, levelIndex) => ({
    ...level,
    quizSet: buildQuizSet(level, topicKey, levelIndex),
    puzzleSet: buildPuzzleSet(level, topicKey, levelIndex),
  }));
});

function createDefaultGameState() {
  const tracks = {};
  TRACK_ORDER.forEach((key, index) => {
    tracks[key] = {
      unlocked: index === 0,
      completed: false,
      rewardClaimed: false,
      completedLevels: 0,
      score: 0,
      streak: 0,
    };
  });
  return { wallet: 0, tracks };
}

function loadGameState() {
  const base = createDefaultGameState();
  try {
    const saved = JSON.parse(localStorage.getItem(GAME_STORAGE_KEY));
    if (!saved) return base;
    TRACK_ORDER.forEach((key) => {
      base.tracks[key] = {
        ...base.tracks[key],
        ...(saved.tracks?.[key] || {}),
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

function saveGameState(state) {
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
}
