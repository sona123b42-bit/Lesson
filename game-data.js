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

// 60 unique quiz items per topic — 4 items per level, indexed by levelIndex * 4
const EXTRA_QUIZ_BANK = {
  python: [
    // Level 1 – Variables (indices 0-3)
    {
      q: "What operator assigns a value to a variable in Python?",
      answers: ["="],
    },
    {
      q: "Which of these is a valid Python variable name?",
      answers: ["my_var", "myvar"],
    },
    {
      q: "What type does the value True belong to?",
      answers: ["bool", "boolean"],
    },
    {
      q: "What keyword stores in memory a data value with a name?",
      answers: ["variable"],
    },
    // Level 2 – Input (indices 4-7)
    { q: "What type does input() always return?", answers: ["str", "string"] },
    { q: "Which function converts a string to an integer?", answers: ["int"] },
    {
      q: "What does input() pause the program to wait for?",
      answers: ["keyboard input", "user input"],
    },
    { q: "Which function converts a value to a float?", answers: ["float"] },
    // Level 3 – Print (indices 8-11)
    {
      q: "Which print() argument changes the item separator?",
      answers: ["sep"],
    },
    { q: "Which print() argument changes the line ending?", answers: ["end"] },
    {
      q: "What does print() output when called with no arguments?",
      answers: ["blank line", "empty line", "newline"],
    },
    {
      q: "What feature lets you embed variables directly in a string using f?",
      answers: ["f-string", "fstring", "formatted string"],
    },
    // Level 4 – If Else (indices 12-15)
    { q: "What does 5 > 3 evaluate to in Python?", answers: ["true", "True"] },
    { q: "What operator checks equality without assigning?", answers: ["=="] },
    { q: "What does not True evaluate to?", answers: ["false", "False"] },
    {
      q: "What operator checks whether two values are not equal?",
      answers: ["!="],
    },
    // Level 5 – Elif (indices 16-19)
    { q: "What does elif stand for?", answers: ["else if"] },
    {
      q: "How many elif blocks can follow one if statement?",
      answers: ["unlimited", "any number", "as many as needed"],
    },
    {
      q: "What happens when no if or elif condition matches and there is no else?",
      answers: ["nothing executes", "block is skipped", "passes"],
    },
    { q: "Can elif appear without a final else?", answers: ["yes"] },
    // Level 6 – For Loop (indices 20-23)
    {
      q: "What does range(5) produce?",
      answers: ["0 to 4", "0 1 2 3 4", "five numbers starting from 0"],
    },
    {
      q: "What keyword skips the current loop iteration?",
      answers: ["continue"],
    },
    { q: "What keyword exits a loop immediately?", answers: ["break"] },
    {
      q: "What built-in function returns the number of items in a list?",
      answers: ["len"],
    },
    // Level 7 – While Loop (indices 24-27)
    {
      q: "What causes an infinite while loop?",
      answers: ["condition never becomes false", "always true condition"],
    },
    {
      q: "What keyword can stop a while loop before its condition is false?",
      answers: ["break"],
    },
    {
      q: "What does while True: mean?",
      answers: ["runs forever", "infinite loop", "always executes"],
    },
    {
      q: "What should you always update inside a while loop to avoid infinite loops?",
      answers: ["the loop variable", "the condition variable"],
    },
    // Level 8 – Functions (indices 28-31)
    {
      q: "What is a function in programming?",
      answers: ["reusable block of code", "named code block"],
    },
    {
      q: "What does calling a function mean?",
      answers: ["executing it", "running it", "invoking it"],
    },
    {
      q: "What are values passed to a function when calling it called?",
      answers: ["arguments", "args"],
    },
    {
      q: "What happens to a function's local variables after it finishes?",
      answers: ["they disappear", "they are gone", "they cease to exist"],
    },
    // Level 9 – Parameters (indices 32-35)
    {
      q: "What is the difference between a parameter and an argument?",
      answers: [
        "parameter is in definition argument is passed",
        "parameter defined argument used",
      ],
    },
    {
      q: "What is a default parameter value used for?",
      answers: ["when no argument is given", "fallback value"],
    },
    {
      q: "What syntax gives a parameter a default value?",
      answers: ["=", "param=default"],
    },
    {
      q: "What does *args allow a function to accept?",
      answers: ["variable number of arguments", "multiple arguments"],
    },
    // Level 10 – Lists (indices 36-39)
    { q: "What is the index of the first item in a list?", answers: ["0"] },
    {
      q: "Which list method removes and returns the last item?",
      answers: ["pop"],
    },
    {
      q: "How do you access the last item of a list using a negative index?",
      answers: ["-1", "list[-1]"],
    },
    { q: "Which list method sorts items in place?", answers: ["sort"] },
    // Level 11 – Dictionaries (indices 40-43)
    {
      q: "How do you access a dictionary value by its key?",
      answers: ["dict[key]", "bracket notation"],
    },
    { q: "Which method returns all keys of a dictionary?", answers: ["keys"] },
    {
      q: "What does dict.get(key) return when the key is missing?",
      answers: ["none", "None"],
    },
    {
      q: "Which method returns all values in a dictionary?",
      answers: ["values"],
    },
    // Level 12 – Comprehensions (indices 44-47)
    {
      q: "What does a list comprehension produce?",
      answers: ["list", "new list"],
    },
    {
      q: "Can you add an if condition inside a list comprehension?",
      answers: ["yes"],
    },
    {
      q: "What brackets are used for a dictionary comprehension?",
      answers: ["curly braces", "{}"],
    },
    {
      q: "What is the main benefit of list comprehension over a for loop?",
      answers: ["more concise", "one line", "compact"],
    },
    // Level 13 – Try Except (indices 48-51)
    {
      q: "What error is raised when dividing by zero in Python?",
      answers: ["zerodivisionerror", "ZeroDivisionError"],
    },
    {
      q: "What block always runs whether an error occurred or not?",
      answers: ["finally"],
    },
    { q: "What keyword re-raises the current exception?", answers: ["raise"] },
    {
      q: "What error is raised when indexing beyond a list length?",
      answers: ["indexerror", "IndexError"],
    },
    // Level 14 – Files (indices 52-55)
    {
      q: "What file mode opens for appending without deleting content?",
      answers: ["a"],
    },
    {
      q: "Which file method reads all lines into a list?",
      answers: ["readlines"],
    },
    {
      q: "Why is using with preferred when opening files?",
      answers: ["auto closes", "closes automatically", "no need to call close"],
    },
    {
      q: "Which file method reads the entire file as one string?",
      answers: ["read"],
    },
    // Level 15 – Boss Project (indices 56-59)
    {
      q: "What is self in a Python class method?",
      answers: ["reference to the instance", "refers to object"],
    },
    {
      q: "What special method runs automatically when an object is created?",
      answers: ["__init__"],
    },
    {
      q: "What is inheritance in object-oriented programming?",
      answers: ["child class gets parent behaviour", "extending another class"],
    },
    {
      q: "What does isinstance() check?",
      answers: ["if object is instance of class", "object type check"],
    },
  ],
  html: [
    // Level 1 – Headings (indices 0-3)
    { q: "Which heading tag is smallest in text size?", answers: ["h6"] },
    {
      q: "How many h1 tags should a webpage typically have?",
      answers: ["one", "1"],
    },
    {
      q: "Which element wraps all visible content on a page?",
      answers: ["body"],
    },
    { q: "What tag creates a second-level subheading?", answers: ["h2"] },
    // Level 2 – Links (indices 4-7)
    { q: "What does href stand for?", answers: ["hypertext reference"] },
    {
      q: "Which target attribute value opens a link in a new tab?",
      answers: ["_blank"],
    },
    {
      q: "What is the difference between an absolute and relative URL?",
      answers: [
        "absolute includes domain relative does not",
        "relative is from current location",
      ],
    },
    {
      q: "Which a tag attribute sets the link destination?",
      answers: ["href"],
    },
    // Level 3 – Images (indices 8-11)
    {
      q: "What happens when an image fails to load and has no alt text?",
      answers: ["broken icon shows", "nothing visible", "broken image shown"],
    },
    { q: "What element wraps an image with its caption?", answers: ["figure"] },
    {
      q: "What element provides a caption for a figure?",
      answers: ["figcaption"],
    },
    {
      q: "Which image format supports transparent backgrounds?",
      answers: ["png"],
    },
    // Level 4 – Lists (indices 12-15)
    { q: "What tag represents a single list item?", answers: ["li"] },
    { q: "Can you nest a list inside a list item?", answers: ["yes"] },
    {
      q: "Which CSS property changes the bullet style of a list?",
      answers: ["list-style-type", "list-style"],
    },
    {
      q: "Which list type displays Roman numerals by default with type='i'?",
      answers: ["ol"],
    },
    // Level 5 – Ordered Lists (indices 16-19)
    {
      q: "Which ol attribute changes the starting number?",
      answers: ["start"],
    },
    {
      q: "What type value makes an ordered list use letters a b c?",
      answers: ["a", "lower-alpha"],
    },
    {
      q: "What attribute reverses the counting order of an ol?",
      answers: ["reversed"],
    },
    {
      q: "Which li attribute overrides the item's number?",
      answers: ["value"],
    },
    // Level 6 – Tables (indices 20-23)
    { q: "What tag creates a table header cell?", answers: ["th"] },
    {
      q: "What attribute merges a cell across multiple columns?",
      answers: ["colspan"],
    },
    {
      q: "What attribute merges a cell across multiple rows?",
      answers: ["rowspan"],
    },
    { q: "What tag groups header rows inside a table?", answers: ["thead"] },
    // Level 7 – Forms (indices 24-27)
    {
      q: "What attribute prevents the browser autofill on a form?",
      answers: ["autocomplete='off'", "autocomplete off"],
    },
    { q: "Which form method sends data in the URL?", answers: ["get"] },
    { q: "Which form method hides data from the URL?", answers: ["post"] },
    {
      q: "Which attribute makes a form field mandatory?",
      answers: ["required"],
    },
    // Level 8 – Input Types (indices 28-31)
    { q: "Which input type creates a date picker?", answers: ["date"] },
    { q: "Which input type creates a yes/no tick box?", answers: ["checkbox"] },
    {
      q: "Which input type allows only one selection from a named group?",
      answers: ["radio"],
    },
    {
      q: "Which input type creates a sliding range control?",
      answers: ["range"],
    },
    // Level 9 – Semantic Layout (indices 32-35)
    { q: "Which semantic tag is best used for a sidebar?", answers: ["aside"] },
    {
      q: "What makes a tag semantic?",
      answers: ["it describes its meaning", "descriptive purpose"],
    },
    {
      q: "Which semantic tag typically wraps the banner at the top of a page?",
      answers: ["header"],
    },
    {
      q: "What is the purpose of the footer element?",
      answers: ["page footer content", "bottom page information"],
    },
    // Level 10 – Sections (indices 36-39)
    {
      q: "What is the key difference between div and section?",
      answers: ["section has semantic meaning", "section is descriptive"],
    },
    { q: "Can a page have more than one section element?", answers: ["yes"] },
    {
      q: "Which element groups content with no semantic meaning?",
      answers: ["div"],
    },
    {
      q: "Which tag is a generic inline container with no meaning?",
      answers: ["span"],
    },
    // Level 11 – Articles (indices 40-43)
    {
      q: "What type of content belongs inside an article element?",
      answers: ["self-contained content", "blog post", "news story"],
    },
    {
      q: "Can an article element contain its own header and footer?",
      answers: ["yes"],
    },
    {
      q: "Which semantic element marks tangential or sidebar content?",
      answers: ["aside"],
    },
    {
      q: "What element is commonly nested inside an article for the article heading?",
      answers: ["h2", "h3", "heading"],
    },
    // Level 12 – Labels (indices 44-47)
    {
      q: "What does the for attribute on a label element do?",
      answers: ["links label to input", "connects to input"],
    },
    {
      q: "What alternative method also connects a label to its input?",
      answers: ["wrap input inside label"],
    },
    {
      q: "Why are properly linked labels important?",
      answers: ["accessibility", "screen readers can read them"],
    },
    {
      q: "Which input attribute matches the label's for value?",
      answers: ["id"],
    },
    // Level 13 – Fieldsets (indices 48-51)
    {
      q: "What element provides a caption for a fieldset?",
      answers: ["legend"],
    },
    {
      q: "What default visual styling does fieldset add?",
      answers: ["border", "box border"],
    },
    {
      q: "When is grouping with fieldset especially helpful?",
      answers: ["radio buttons", "related form inputs"],
    },
    {
      q: "Which attribute disables all inputs inside a fieldset at once?",
      answers: ["disabled"],
    },
    // Level 14 – Navigation Menu (indices 52-55)
    {
      q: "What attribute gives a nav element an accessible label?",
      answers: ["aria-label"],
    },
    {
      q: "Where is the main nav element typically placed?",
      answers: ["header", "top of page"],
    },
    { q: "Can a page contain more than one nav element?", answers: ["yes"] },
    {
      q: "Which attribute marks the current page's link in navigation?",
      answers: ["aria-current", "aria-current=page"],
    },
    // Level 15 – Boss Page (indices 56-59)
    {
      q: "What is the purpose of the DOCTYPE declaration?",
      answers: ["tells browser html version", "document type declaration"],
    },
    {
      q: "Which meta tag sets character encoding for a page?",
      answers: ["meta charset", "charset"],
    },
    {
      q: "Which meta attribute improves mobile display?",
      answers: ["viewport", "name=viewport"],
    },
    {
      q: "Which tag links an external CSS file inside the head?",
      answers: ["link"],
    },
  ],
  css: [
    // Level 1 – Color (indices 0-3)
    {
      q: "Which CSS keyword makes an element's color fully transparent?",
      answers: ["transparent"],
    },
    {
      q: "Which color format uses hue, saturation, and lightness values?",
      answers: ["hsl"],
    },
    {
      q: "What is the hex code for the colour white?",
      answers: ["#ffffff", "#fff"],
    },
    {
      q: "Which color format uses red green blue values from 0 to 255?",
      answers: ["rgb"],
    },
    // Level 2 – Spacing (indices 4-7)
    {
      q: "How do you center a block element horizontally with margin?",
      answers: ["margin: 0 auto", "margin auto"],
    },
    {
      q: "What is the key difference between margin and padding?",
      answers: ["margin is outside padding is inside"],
    },
    {
      q: "What shorthand property sets all four padding sides at once?",
      answers: ["padding"],
    },
    { q: "What CSS value sets spacing to zero?", answers: ["0"] },
    // Level 3 – Borders (indices 8-11)
    {
      q: "What shorthand property sets border width style and colour together?",
      answers: ["border"],
    },
    { q: "Which border style creates a dotted line?", answers: ["dotted"] },
    { q: "Which border style creates a dashed line?", answers: ["dashed"] },
    {
      q: "Which property applies a border to one side only?",
      answers: ["border-top", "border-bottom", "border-left", "border-right"],
    },
    // Level 4 – Typography (indices 12-15)
    {
      q: "Which property controls letter spacing?",
      answers: ["letter-spacing"],
    },
    { q: "Which font-style value makes text italic?", answers: ["italic"] },
    {
      q: "Which property controls the space between lines of text?",
      answers: ["line-height"],
    },
    {
      q: "Which CSS property transforms text to uppercase?",
      answers: ["text-transform"],
    },
    // Level 5 – Width (indices 16-19)
    { q: "Which unit is relative to the viewport width?", answers: ["vw"] },
    {
      q: "What does 100% width mean for an element?",
      answers: ["full parent width", "fills its parent"],
    },
    {
      q: "What is min-width used for?",
      answers: ["prevents shrinking below minimum", "minimum element size"],
    },
    {
      q: "What does box-sizing: border-box cause?",
      answers: [
        "padding and border included in width",
        "border inside the width",
      ],
    },
    // Level 6 – Flex Display (indices 20-23)
    { q: "What is the default flex-direction value?", answers: ["row"] },
    {
      q: "Which property allows flex items to wrap to the next line?",
      answers: ["flex-wrap"],
    },
    {
      q: "What does flex-grow allow a flex item to do?",
      answers: ["expand to fill remaining space"],
    },
    {
      q: "Which flex value aligns items to the end of the container?",
      answers: ["flex-end"],
    },
    // Level 7 – Flex Alignment (indices 24-27)
    {
      q: "Which property aligns flex items on the cross axis?",
      answers: ["align-items"],
    },
    {
      q: "Which justify-content value puts maximum space between items?",
      answers: ["space-between"],
    },
    {
      q: "What does align-self do?",
      answers: [
        "aligns one individual item",
        "overrides align-items for that item",
      ],
    },
    {
      q: "Which value on justify-content puts equal space around each item?",
      answers: ["space-around"],
    },
    // Level 8 – Flex Direction (indices 28-31)
    {
      q: "What does flex-direction: row-reverse do?",
      answers: ["reverses the row order", "items go right to left"],
    },
    {
      q: "What does flex-direction: column-reverse do?",
      answers: ["reverses column order", "items go bottom to top"],
    },
    {
      q: "What shorthand combines flex-grow flex-shrink and flex-basis?",
      answers: ["flex"],
    },
    {
      q: "What does align-content control?",
      answers: ["alignment of multiple flex rows", "spacing of wrapped lines"],
    },
    // Level 9 – Grid (indices 32-35)
    {
      q: "What does 1fr mean inside grid-template-columns?",
      answers: ["one fraction of available space", "one equal part"],
    },
    {
      q: "Which property defines named rows in a grid?",
      answers: ["grid-template-rows"],
    },
    {
      q: "What property assigns an element to a named grid area?",
      answers: ["grid-area"],
    },
    {
      q: "What shorthand combines grid-template-rows and columns?",
      answers: ["grid-template"],
    },
    // Level 10 – Hover (indices 36-39)
    {
      q: "Which pseudo-class targets the moment an element is clicked?",
      answers: [":active"],
    },
    { q: "Which pseudo-class targets keyboard focus?", answers: [":focus"] },
    {
      q: "Which pseudo-class styles links that have been visited?",
      answers: [":visited"],
    },
    {
      q: "Which pseudo-class targets the first child of its parent?",
      answers: [":first-child"],
    },
    // Level 11 – Transition (indices 40-43)
    {
      q: "Which transition timing makes the animation start slow and end fast?",
      answers: ["ease-in"],
    },
    { q: "What is the default transition timing function?", answers: ["ease"] },
    {
      q: "What CSS transform function rotates an element?",
      answers: ["rotate"],
    },
    { q: "What CSS transform function scales an element?", answers: ["scale"] },
    // Level 12 – Positioning (indices 44-47)
    {
      q: "What position value removes an element entirely from document flow?",
      answers: ["absolute", "fixed"],
    },
    {
      q: "What is the difference between position fixed and absolute?",
      answers: ["fixed stays relative to viewport", "fixed does not scroll"],
    },
    {
      q: "Which property controls the stacking order of positioned elements?",
      answers: ["z-index"],
    },
    {
      q: "What does position: sticky do?",
      answers: [
        "sticks when scrolled to threshold",
        "scrolls then sticks in place",
      ],
    },
    // Level 13 – Media Query (indices 48-51)
    { q: "Which media type targets printed pages?", answers: ["print"] },
    { q: "Which media type targets screens?", answers: ["screen"] },
    {
      q: "Which media feature detects dark mode preference?",
      answers: ["prefers-color-scheme"],
    },
    {
      q: "What does min-width in a media query apply to?",
      answers: ["screens at or above that width", "larger than that size"],
    },
    // Level 14 – Animation (indices 52-55)
    {
      q: "Which property controls how many times an animation repeats?",
      answers: ["animation-iteration-count"],
    },
    { q: "What value loops an animation forever?", answers: ["infinite"] },
    {
      q: "What does animation-fill-mode: forwards do?",
      answers: ["keeps final state after animation", "stays at last keyframe"],
    },
    {
      q: "Which property delays the start of an animation?",
      answers: ["animation-delay"],
    },
    // Level 15 – Boss Layout (indices 56-59)
    {
      q: "What prefix do CSS custom properties (variables) start with?",
      answers: ["--"],
    },
    { q: "Which function reads a CSS variable value?", answers: ["var()"] },
    {
      q: "Which property controls an element's transparency level?",
      answers: ["opacity"],
    },
    {
      q: "What is the difference between visibility: hidden and display: none?",
      answers: [
        "hidden keeps space none removes it",
        "hidden still occupies space",
      ],
    },
  ],
  javascript: [
    // Level 1 – Variables (indices 0-3)
    {
      q: "What is the key difference between let and var?",
      answers: ["let is block scoped var is function scoped"],
    },
    {
      q: "Which keyword prevents a variable from being reassigned?",
      answers: ["const"],
    },
    {
      q: "What does undefined mean for a variable?",
      answers: ["declared but has no value", "no value assigned"],
    },
    {
      q: "What is hoisting in JavaScript?",
      answers: [
        "declarations moved to top of scope",
        "variable declarations lifted",
      ],
    },
    // Level 2 – Output (indices 4-7)
    { q: "Which console method logs an error?", answers: ["console.error"] },
    { q: "Which console method logs a warning?", answers: ["console.warn"] },
    { q: "Which browser function shows a popup message?", answers: ["alert"] },
    {
      q: "What does console.table() display?",
      answers: ["data as a table", "tabular output"],
    },
    // Level 3 – Functions (indices 8-11)
    {
      q: "What syntax does an arrow function use instead of the function keyword?",
      answers: ["=>", "arrow =>"],
    },
    {
      q: "What is a callback function?",
      answers: ["function passed to another function", "function as argument"],
    },
    {
      q: "What is a higher-order function?",
      answers: ["function that takes or returns a function"],
    },
    {
      q: "What defines a pure function?",
      answers: ["no side effects same output for same input"],
    },
    // Level 4 – Conditions (indices 12-15)
    {
      q: "What is the difference between == and ===?",
      answers: ["=== also checks type", "strict equality checks type"],
    },
    {
      q: "Which of these is a falsy value in JavaScript?",
      answers: ["0", "null", "undefined", "false", "NaN", "empty string"],
    },
    {
      q: "What does the ternary operator provide?",
      answers: ["shorthand if else", "condition with ? and :"],
    },
    {
      q: "What does the ?? operator return?",
      answers: [
        "right side when left is null or undefined",
        "nullish coalescing fallback",
      ],
    },
    // Level 5 – Loops (indices 16-19)
    {
      q: "Which loop iterates over an object's own keys?",
      answers: ["for...in", "for in"],
    },
    {
      q: "Which loop iterates over the values of an iterable?",
      answers: ["for...of", "for of"],
    },
    {
      q: "What does break do inside a loop?",
      answers: ["exits the loop immediately", "stops the loop"],
    },
    {
      q: "What does continue do inside a loop?",
      answers: ["skips current iteration", "jumps to next iteration"],
    },
    // Level 6 – Arrays (indices 20-23)
    {
      q: "Which array method removes and returns the first item?",
      answers: ["shift"],
    },
    {
      q: "Which array method joins all items into a string?",
      answers: ["join"],
    },
    {
      q: "Which array method checks that every element passes a test?",
      answers: ["every"],
    },
    {
      q: "Which array method checks whether at least one element passes a test?",
      answers: ["some"],
    },
    // Level 7 – Objects (indices 24-27)
    {
      q: "What does Object.keys() return?",
      answers: ["array of the object's keys"],
    },
    {
      q: "What does the spread operator do when used with objects?",
      answers: ["copies all properties into new object"],
    },
    {
      q: "What is destructuring in JavaScript?",
      answers: ["extracting values from objects or arrays", "unpacking values"],
    },
    {
      q: "What does hasOwnProperty() verify?",
      answers: ["if the object directly has that key", "own property exists"],
    },
    // Level 8 – DOM Select (indices 28-31)
    {
      q: "Which method selects all elements matching a CSS selector?",
      answers: ["querySelectorAll"],
    },
    {
      q: "Which method selects the first element matching a CSS selector?",
      answers: ["querySelector"],
    },
    {
      q: "What does classList.add() do?",
      answers: ["adds a CSS class to an element"],
    },
    {
      q: "What does classList.toggle() do?",
      answers: ["adds class if absent removes if present"],
    },
    // Level 9 – Events (indices 32-35)
    {
      q: "What is event bubbling?",
      answers: [
        "event travels up through parent elements",
        "event propagates up DOM",
      ],
    },
    {
      q: "What does event.preventDefault() do?",
      answers: [
        "stops the default browser behaviour",
        "prevents default action",
      ],
    },
    {
      q: "What does event.stopPropagation() do?",
      answers: ["stops event bubbling up", "prevents propagation"],
    },
    {
      q: "What is the event.target property?",
      answers: ["the element that triggered the event"],
    },
    // Level 10 – Input Value (indices 36-39)
    {
      q: "Which event fires on every keystroke inside an input?",
      answers: ["input", "oninput"],
    },
    { q: "Which event fires when an input loses focus?", answers: ["blur"] },
    {
      q: "Which event fires when input value changes and then loses focus?",
      answers: ["change"],
    },
    {
      q: "What does parseInt() do?",
      answers: ["converts string to integer", "parses string as whole number"],
    },
    // Level 11 – Map (indices 40-43)
    {
      q: "What is the key difference between map() and forEach()?",
      answers: ["map returns a new array forEach does not"],
    },
    {
      q: "What does reduce() do?",
      answers: ["combines all array items into one value"],
    },
    {
      q: "What does flat() do to a nested array?",
      answers: ["flattens nested arrays into one level"],
    },
    {
      q: "Which method returns the first array element that passes a test?",
      answers: ["find"],
    },
    // Level 12 – Filter (indices 44-47)
    {
      q: "What does findIndex() return?",
      answers: ["index of first matching element", "position of first match"],
    },
    {
      q: "What is the difference between filter() and find()?",
      answers: ["filter returns array find returns one item"],
    },
    {
      q: "How can you remove duplicates from an array efficiently?",
      answers: ["new Set(arr)", "Set"],
    },
    {
      q: "What does Array.from() do?",
      answers: ["creates an array from an iterable or array-like object"],
    },
    // Level 13 – Timeout (indices 48-51)
    {
      q: "What does setInterval() do?",
      answers: ["runs a function repeatedly at set intervals"],
    },
    {
      q: "What does clearTimeout() do?",
      answers: ["cancels a pending setTimeout", "stops a timeout"],
    },
    {
      q: "What is the JavaScript event loop responsible for?",
      answers: ["managing async code execution order"],
    },
    {
      q: "What does Promise.resolve() return?",
      answers: ["a promise that is already resolved"],
    },
    // Level 14 – Try Catch (indices 52-55)
    {
      q: "What does the throw keyword do?",
      answers: ["creates and throws an error", "raises an exception"],
    },
    {
      q: "What does the Error object's message property contain?",
      answers: ["description of the error", "error details"],
    },
    {
      q: "What does Promise.catch() handle?",
      answers: ["a rejected promise", "promise failures"],
    },
    {
      q: "What keyword pauses an async function until a promise resolves?",
      answers: ["await"],
    },
    // Level 15 – Boss App (indices 56-59)
    {
      q: "What does JSON.stringify() do?",
      answers: ["converts object to JSON string"],
    },
    {
      q: "What does JSON.parse() do?",
      answers: ["converts JSON string to object"],
    },
    { q: "What does fetch() return?", answers: ["a promise"] },
    {
      q: "What is async/await syntax used for?",
      answers: [
        "cleaner way to handle promises",
        "writing async code that looks synchronous",
      ],
    },
  ],
};

// 60 unique puzzle items per topic — 4 items per level, indexed by levelIndex * 4
const EXTRA_PUZZLE_BANK = {
  python: [
    // Level 1 – Variables (indices 0-3)
    {
      instruction: "Assign your favourite number to a variable and print it.",
      starter: "",
      hint: "Use a variable name like num = 7 then print(num).",
      validator: (code) => includesAll(code, ["=", "print"]),
    },
    {
      instruction:
        "Create two variables with different string values and print both.",
      starter: "",
      hint: "Assign two strings and call print() twice.",
      validator: (code) =>
        (String(code).match(/print\s*\(/gi) || []).length >= 2 &&
        (code.match(/"/g) || code.match(/'/g)),
    },
    {
      instruction: "Swap the values of two variables a and b, then print both.",
      starter: "a = 10\nb = 20\n",
      hint: "Use a temp variable or tuple swap: a, b = b, a.",
      validator: (code) =>
        includesAll(code, ["a", "b"]) && code.includes("print"),
    },
    {
      instruction:
        "Create a boolean variable is_active set to True and print it.",
      starter: "",
      hint: "Use is_active = True then print(is_active).",
      validator: (code) => includesAll(code, ["is_active", "True"]),
    },
    // Level 2 – Input (indices 4-7)
    {
      instruction:
        "Read a number from input(), convert it to int, and print it doubled.",
      starter: "",
      hint: "Use num = int(input(...)) then print(num * 2).",
      validator: (code) => includesAll(code, ["input", "int", "print"]),
    },
    {
      instruction:
        "Ask for first and last name separately and print them together.",
      starter: "",
      hint: "Store each in a variable then print(first + ' ' + last).",
      validator: (code) => (code.match(/input\s*\(/gi) || []).length >= 2,
    },
    {
      instruction: "Ask for a temperature and print it back with a label.",
      starter: "",
      hint: "Use temp = input('Temperature: ') then print.",
      validator: (code) => includesAll(code, ["input", "print"]),
    },
    {
      instruction:
        "Prompt the user for their birth year and calculate their age.",
      starter: "",
      hint: "Subtract the birth year from 2026 and print the result.",
      validator: (code) => includesAll(code, ["input", "int", "2026"]),
    },
    // Level 3 – Print (indices 8-11)
    {
      instruction:
        "Print your name and age on the same line using a comma in print().",
      starter: "name = 'Ada'\nage = 25\n",
      hint: "Use print(name, age).",
      validator: (code) => includesAll(code, ["print", "name", "age"]),
    },
    {
      instruction:
        "Print two items separated by a dash using the sep argument.",
      starter: "",
      hint: "Use print(a, b, sep='-').",
      validator: (code) => includesAll(code, ["print", "sep"]),
    },
    {
      instruction:
        "Print text without a newline at the end using the end argument.",
      starter: "",
      hint: "Use print('Hello', end='').",
      validator: (code) => includesAll(code, ["print", "end"]),
    },
    {
      instruction:
        "Use an f-string to print a greeting that includes a variable name.",
      starter: "person = 'Sam'\n",
      hint: "Use print(f'Hello {person}').",
      validator: (code) =>
        includesAll(code, ["f'", "{person}", "print"]) ||
        includesAll(code, ['f"', "{person}", "print"]),
    },
    // Level 4 – If Else (indices 12-15)
    {
      instruction:
        "Check if a number is positive or negative and print which it is.",
      starter: "number = -4\n",
      hint: "Use if number > 0 then else.",
      validator: (code) => includesAll(code, ["if", "else", "number"]),
    },
    {
      instruction:
        "Check if a string is empty and print a different message each case.",
      starter: "text = ''\n",
      hint: "Use if text: then else.",
      validator: (code) => includesAll(code, ["if", "else", "text"]),
    },
    {
      instruction:
        "Check if a number is even or odd using the modulo operator.",
      starter: "num = 7\n",
      hint: "Use if num % 2 == 0.",
      validator: (code) => includesAll(code, ["if", "%", "2"]),
    },
    {
      instruction: "Compare two numbers and print the larger one.",
      starter: "x = 14\ny = 9\n",
      hint: "Use if x > y: print(x) else: print(y).",
      validator: (code) => includesAll(code, ["if", "else", "x", "y"]),
    },
    // Level 5 – Elif (indices 16-19)
    {
      instruction:
        "Grade a score: print A for 90+, B for 80+, C for 70+, else F.",
      starter: "score = 85\n",
      hint: "Use if/elif/elif/else with score >= values.",
      validator: (code) => includesAll(code, ["if", "elif", "else", "score"]),
    },
    {
      instruction:
        "Check hour of day and print morning, afternoon, or evening.",
      starter: "hour = 14\n",
      hint: "Use if hour < 12 elif hour < 18 else.",
      validator: (code) => includesAll(code, ["if", "elif", "else", "hour"]),
    },
    {
      instruction:
        "Print small if under 10, medium if under 50, large otherwise.",
      starter: "value = 35\n",
      hint: "Use if value < 10 elif value < 50 else.",
      validator: (code) => includesAll(code, ["if", "elif", "else"]),
    },
    {
      instruction:
        "Write an if/elif/elif/else chain with four conditions on a variable.",
      starter: "level = 3\n",
      hint: "Use if level == 1: elif level == 2: elif level == 3: else:",
      validator: (code) =>
        (code.match(/elif/g) || []).length >= 2 && code.includes("else"),
    },
    // Level 6 – For Loop (indices 20-23)
    {
      instruction: "Loop through a list of names and print each one.",
      starter: "names = ['Alice', 'Bob', 'Carol']\n",
      hint: "Use for name in names: print(name).",
      validator: (code) => includesAll(code, ["for", "in names", "print"]),
    },
    {
      instruction:
        "Use a for loop to sum all numbers in a list and print the total.",
      starter: "numbers = [4, 7, 2, 9]\ntotal = 0\n",
      hint: "Use for n in numbers: total += n.",
      validator: (code) => includesAll(code, ["for", "total", "numbers"]),
    },
    {
      instruction:
        "Print only even numbers from a list using for and a condition.",
      starter: "nums = [1, 2, 3, 4, 5, 6]\n",
      hint: "Use if num % 2 == 0 inside the loop.",
      validator: (code) => includesAll(code, ["for", "%", "2"]),
    },
    {
      instruction:
        "Loop from 1 to 10 and stop the loop early when you reach 5.",
      starter: "",
      hint: "Use for i in range(1, 11) then if i == 5: break.",
      validator: (code) => includesAll(code, ["for", "range", "break"]),
    },
    // Level 7 – While Loop (indices 24-27)
    {
      instruction:
        "Count down from 10 to 1 using a while loop and print each number.",
      starter: "count = 10\n",
      hint: "Use while count > 0: print(count) count -= 1.",
      validator: (code) => includesAll(code, ["while", "count", "print"]),
    },
    {
      instruction:
        "Use a while loop to keep doubling a number until it exceeds 100.",
      starter: "num = 1\n",
      hint: "Use while num <= 100: num *= 2.",
      validator: (code) => includesAll(code, ["while", "num", "100"]),
    },
    {
      instruction:
        "Simulate a retry loop that prints attempt and runs up to 3 times.",
      starter: "attempts = 0\n",
      hint: "Use while attempts < 3: print then attempts += 1.",
      validator: (code) => includesAll(code, ["while", "attempts", "3"]),
    },
    {
      instruction:
        "Find the first number greater than 1 that is divisible by both 3 and 5.",
      starter: "n = 1\n",
      hint: "Use while True: check n % 3 == 0 and n % 5 == 0 then break.",
      validator: (code) => includesAll(code, ["while", "%", "break"]),
    },
    // Level 8 – Functions (indices 28-31)
    {
      instruction:
        "Write a function that takes two numbers and returns the larger one.",
      starter: "def larger(a, b):\n    pass",
      hint: "Use if a > b: return a else: return b.",
      validator: (code) => includesAll(code, ["def larger", "return"]),
    },
    {
      instruction:
        "Write a function is_palindrome(word) that returns True if reversed.",
      starter: "def is_palindrome(word):\n    pass",
      hint: "Compare word to word[::-1] and return the result.",
      validator: (code) => includesAll(code, ["def is_palindrome", "return"]),
    },
    {
      instruction:
        "Write a function count_vowels(text) that counts a e i o u in text.",
      starter: "def count_vowels(text):\n    pass",
      hint: "Loop through text and count characters in 'aeiou'.",
      validator: (code) => includesAll(code, ["def count_vowels", "return"]),
    },
    {
      instruction:
        "Write a function is_even(n) that returns True if n is even.",
      starter: "def is_even(n):\n    pass",
      hint: "Use return n % 2 == 0.",
      validator: (code) => includesAll(code, ["def is_even", "return", "%"]),
    },
    // Level 9 – Parameters (indices 32-35)
    {
      instruction:
        "Write a function greet(name, greeting='Hello') with a default param.",
      starter: "def greet(name, greeting='Hello'):\n    pass",
      hint: "Return greeting + ' ' + name.",
      validator: (code) =>
        includesAll(code, ["def greet", "greeting", "return"]),
    },
    {
      instruction:
        "Write a function power(base, exp=2) that returns base raised to exp.",
      starter: "def power(base, exp=2):\n    pass",
      hint: "Use return base ** exp.",
      validator: (code) => includesAll(code, ["def power", "return", "**"]),
    },
    {
      instruction:
        "Write a function full_name(first, last) that returns both names joined.",
      starter: "def full_name(first, last):\n    pass",
      hint: "Return first + ' ' + last.",
      validator: (code) =>
        includesAll(code, ["def full_name", "return", "first", "last"]),
    },
    {
      instruction:
        "Write a function total(*nums) that sums any number of arguments.",
      starter: "def total(*nums):\n    pass",
      hint: "Use return sum(nums).",
      validator: (code) => includesAll(code, ["def total", "*nums", "return"]),
    },
    // Level 10 – Lists (indices 36-39)
    {
      instruction: "Create a list of five animals and remove the last one.",
      starter: "animals = ['cat', 'dog', 'bird', 'fish', 'rabbit']\n",
      hint: "Use animals.pop().",
      validator: (code) => includesAll(code, ["animals", "pop"]),
    },
    {
      instruction: "Sort a list of numbers in ascending order and print it.",
      starter: "nums = [5, 2, 8, 1, 9]\n",
      hint: "Use nums.sort() then print(nums).",
      validator: (code) => includesAll(code, ["nums", "sort", "print"]),
    },
    {
      instruction: "Use slicing to get the first three items from a list.",
      starter: "items = ['a', 'b', 'c', 'd', 'e']\n",
      hint: "Use items[:3].",
      validator: (code) =>
        includesAll(code, ["items", "[:3]"]) ||
        includesAll(code, ["items", "[0:3]"]),
    },
    {
      instruction:
        "Find the largest number in a list without using the max() function.",
      starter: "nums = [3, 17, 5, 9, 2]\n",
      hint: "Set biggest = nums[0] then loop and compare each item.",
      validator: (code) => includesAll(code, ["for", "nums", "if"]),
    },
    // Level 11 – Dictionaries (indices 40-43)
    {
      instruction:
        "Create a dictionary of capitals for three countries and print each.",
      starter: "capitals = {}\n",
      hint: "Add keys like 'France': 'Paris' and loop to print.",
      validator: (code) => includesAll(code, ["capitals", ":", "print"]),
    },
    {
      instruction: "Update a value in a dictionary and add one new key.",
      starter: "person = {'name': 'Ada', 'age': 25}\n",
      hint: "Use person['age'] = 26 then person['city'] = 'London'.",
      validator: (code) => includesAll(code, ["person", "["]),
    },
    {
      instruction:
        "Loop through a dictionary and print each key and its value.",
      starter: "data = {'x': 10, 'y': 20, 'z': 30}\n",
      hint: "Use for key, value in data.items(): print(key, value).",
      validator: (code) => includesAll(code, ["for", "items", "print"]),
    },
    {
      instruction: "Check if a key exists in a dictionary before accessing it.",
      starter: "settings = {'theme': 'dark', 'lang': 'en'}\n",
      hint: "Use if 'theme' in settings: then access it.",
      validator: (code) => includesAll(code, ["if", "in settings"]),
    },
    // Level 12 – Comprehensions (indices 44-47)
    {
      instruction:
        "Use list comprehension to get the squares of numbers 1 through 10.",
      starter: "",
      hint: "Use [x**2 for x in range(1, 11)].",
      validator: (code) => includesAll(code, ["for", "range", "**"]),
    },
    {
      instruction:
        "Use list comprehension to filter only even numbers from a list.",
      starter: "nums = [1, 2, 3, 4, 5, 6, 7, 8]\n",
      hint: "Use [x for x in nums if x % 2 == 0].",
      validator: (code) => includesAll(code, ["for", "nums", "if", "%"]),
    },
    {
      instruction:
        "Use list comprehension to create uppercase versions of words.",
      starter: "words = ['hello', 'world', 'python']\n",
      hint: "Use [w.upper() for w in words].",
      validator: (code) => includesAll(code, ["for", "words", "upper"]),
    },
    {
      instruction: "Use dict comprehension to map each word to its length.",
      starter: "words = ['cat', 'elephant', 'ox']\n",
      hint: "Use {w: len(w) for w in words}.",
      validator: (code) => includesAll(code, ["for", "words", "len"]),
    },
    // Level 13 – Try Except (indices 48-51)
    {
      instruction:
        "Handle a ZeroDivisionError using try/except and print friendly message.",
      starter: "num = 0\n",
      hint: "Wrap 10 / num in try then except ZeroDivisionError.",
      validator: (code) =>
        includesAll(code, ["try", "except ZeroDivisionError"]),
    },
    {
      instruction:
        "Use try/except/finally so 'done' always prints regardless of errors.",
      starter: "",
      hint: "Add finally: print('done') after your except block.",
      validator: (code) => includesAll(code, ["try", "except", "finally"]),
    },
    {
      instruction:
        "Wrap int() conversion of user input in try/except for ValueError.",
      starter: "raw = 'abc'\n",
      hint: "Use try: int(raw) except ValueError: print error.",
      validator: (code) =>
        includesAll(code, ["try", "except ValueError", "int"]),
    },
    {
      instruction: "Catch both IndexError and KeyError in one except block.",
      starter: "",
      hint: "Use except (IndexError, KeyError).",
      validator: (code) =>
        includesAll(code, ["try", "except"]) &&
        includesAll(code, ["IndexError", "KeyError"]),
    },
    // Level 14 – Files (indices 52-55)
    {
      instruction: "Open and read all lines from data.txt using with open.",
      starter: "",
      hint: "Use with open('data.txt') as f: then f.readlines().",
      validator: (code) =>
        includesAll(code, ["with open", "data.txt", "readlines"]),
    },
    {
      instruction: "Write three different lines to output.txt in append mode.",
      starter: "",
      hint: "Use with open('output.txt', 'a') as f: then f.write() three times.",
      validator: (code) =>
        includesAll(code, ["with open", "'a'"]) &&
        (String(code).match(/\.write\s*\(/gi) || []).length >= 2,
    },
    {
      instruction:
        "Open any text file with with open, read its content, and print it.",
      starter: "",
      hint: "Use with open('file.txt') as f: text = f.read() print(text).",
      validator: (code) => includesAll(code, ["with open", "read", "print"]),
    },
    {
      instruction:
        "Write a person's name and score to a file as formatted text.",
      starter: "name = 'Ada'\nscore = 95\n",
      hint: "Open a file in write mode and use f.write(f'{name}: {score}').",
      validator: (code) =>
        includesAll(code, ["with open", "write", "name", "score"]),
    },
    // Level 15 – Boss Project (indices 56-59)
    {
      instruction:
        "Create a class Animal with name and a speak() method that prints a sound.",
      starter: "",
      hint: "Use class Animal: def __init__(self, name) and def speak(self).",
      validator: (code) =>
        includesAll(code, ["class Animal", "__init__", "def speak"]),
    },
    {
      instruction:
        "Create a Dog class that inherits from Animal and overrides speak().",
      starter: "",
      hint: "Use class Dog(Animal): and override def speak(self).",
      validator: (code) => includesAll(code, ["class Dog", "Animal"]),
    },
    {
      instruction:
        "Add a class method and a static method to any class you create.",
      starter: "",
      hint: "Use @classmethod and @staticmethod decorators.",
      validator: (code) => includesAll(code, ["classmethod", "staticmethod"]),
    },
    {
      instruction:
        "Create a Student class that stores name and grade, then print both.",
      starter: "",
      hint: "Use class Student with __init__(self, name, grade) and a method or print.",
      validator: (code) =>
        includesAll(code, ["class Student", "__init__", "name", "grade"]),
    },
  ],
  html: [
    // Level 1 – Headings (indices 0-3)
    {
      instruction: "Write h1 through h3 headings each with unique content.",
      starter: "",
      hint: "Use <h1>, <h2>, and <h3> with different text.",
      validator: (code) => includesAll(code, ["<h1", "<h2", "<h3"]),
    },
    {
      instruction:
        "Create a page title with h1 and add a subtitle below it using h2.",
      starter: "",
      hint: "Place h2 directly below h1 inside a container.",
      validator: (code) => includesAll(code, ["<h1", "<h2"]),
    },
    {
      instruction: "Add two paragraphs of text beneath an h2 heading.",
      starter: "",
      hint: "Use one h2 then two <p> tags with different content.",
      validator: (code) =>
        includesAll(code, ["<h2"]) && (code.match(/<p/gi) || []).length >= 2,
    },
    {
      instruction: "Build a section with a heading and three short paragraphs.",
      starter: "",
      hint: "Use a heading tag then three <p> tags inside a <div> or <section>.",
      validator: (code) =>
        (code.match(/<p/gi) || []).length >= 3 && code.includes("<h"),
    },
    // Level 2 – Links (indices 4-7)
    {
      instruction: "Create a link that opens in a new tab.",
      starter: "",
      hint: "Use <a href='...' target='_blank'>.</a>",
      validator: (code) => includesAll(code, ["<a", "href", "_blank"]),
    },
    {
      instruction:
        "Create a mailto link so clicking it opens the user's email app.",
      starter: "",
      hint: "Use href='mailto:someone@example.com'.",
      validator: (code) => includesAll(code, ["<a", "mailto:"]),
    },
    {
      instruction: "Build a list of three links pointing to different pages.",
      starter: "",
      hint: "Use ul, li, and a tags.",
      validator: (code) =>
        includesAll(code, ["<ul", "<li", "<a"]) &&
        (code.match(/<a/gi) || []).length >= 3,
    },
    {
      instruction: "Create an image that is also a clickable link.",
      starter: "",
      hint: "Wrap <img> inside an <a> tag.",
      validator: (code) => includesAll(code, ["<a", "<img", "href"]),
    },
    // Level 3 – Images (indices 8-11)
    {
      instruction:
        "Create an image with descriptive alt text explaining what it shows.",
      starter: "",
      hint: "Use <img src='path' alt='description'>.",
      validator: (code) => includesAll(code, ["<img", "src=", "alt="]),
    },
    {
      instruction:
        "Add width and height attributes directly on an img element.",
      starter: "",
      hint: "Use <img width='200' height='150'>.",
      validator: (code) => includesAll(code, ["<img", "width=", "height="]),
    },
    {
      instruction: "Create a figure element with an image and figcaption.",
      starter: "",
      hint: "Wrap img inside figure and add figcaption below.",
      validator: (code) =>
        includesAll(code, ["<figure", "<img", "<figcaption"]),
    },
    {
      instruction: "Create two images side by side, each with unique alt text.",
      starter: "",
      hint: "Place two img tags with different src and alt attributes.",
      validator: (code) => (code.match(/<img/gi) || []).length >= 2,
    },
    // Level 4 – Lists (indices 12-15)
    {
      instruction: "Create an unordered list of five favourite foods.",
      starter: "",
      hint: "Use <ul> and five <li> items.",
      validator: (code) =>
        includesAll(code, ["<ul"]) && (code.match(/<li/gi) || []).length >= 5,
    },
    {
      instruction: "Nest an unordered list inside one of your list items.",
      starter: "",
      hint: "Put another <ul> with <li> items inside a <li>.",
      validator: (code) =>
        (code.match(/<ul/gi) || []).length >= 2 && code.includes("<li"),
    },
    {
      instruction:
        "Create a nav menu by putting list items with links inside a ul.",
      starter: "",
      hint: "Use <nav><ul><li><a href='...'>. with three items.",
      validator: (code) => includesAll(code, ["<nav", "<ul", "<li", "<a"]),
    },
    {
      instruction: "Build a feature list with at least four items inside a ul.",
      starter: "",
      hint: "Use consistent content in each li.",
      validator: (code) =>
        includesAll(code, ["<ul"]) && (code.match(/<li/gi) || []).length >= 4,
    },
    // Level 5 – Ordered Lists (indices 16-19)
    {
      instruction:
        "Create a numbered recipe with at least four steps using ol.",
      starter: "",
      hint: "Use <ol> with four <li> steps.",
      validator: (code) =>
        includesAll(code, ["<ol"]) && (code.match(/<li/gi) || []).length >= 4,
    },
    {
      instruction: "Create an ordered list that starts counting from 5.",
      starter: "",
      hint: "Use <ol start='5'>.",
      validator: (code) => includesAll(code, ["<ol", "start=", "<li"]),
    },
    {
      instruction:
        "Use type='a' to create an ol showing list items with letters.",
      starter: "",
      hint: "Use <ol type='a'> with at least three <li> items.",
      validator: (code) => includesAll(code, ["<ol", "type=", "<li"]),
    },
    {
      instruction:
        "Create a reversed ordered list counting down using the reversed attribute.",
      starter: "",
      hint: "Use <ol reversed>.",
      validator: (code) => includesAll(code, ["<ol", "reversed", "<li"]),
    },
    // Level 6 – Tables (indices 20-23)
    {
      instruction: "Create a table with a header row and three data rows.",
      starter: "",
      hint: "Use table, tr, th for header, and td for data.",
      validator: (code) =>
        includesAll(code, ["<table", "<tr", "<th", "<td"]) &&
        (code.match(/<tr/gi) || []).length >= 4,
    },
    {
      instruction: "Add a caption element to describe your table.",
      starter: "",
      hint: "Place <caption> right after the opening <table> tag.",
      validator: (code) => includesAll(code, ["<table", "<caption", "<tr"]),
    },
    {
      instruction: "Use colspan to make a header cell span two columns.",
      starter: "",
      hint: "Add colspan='2' on a th element.",
      validator: (code) => includesAll(code, ["<table", "colspan", "<td"]),
    },
    {
      instruction: "Create a table using thead, tbody, and tfoot sections.",
      starter: "",
      hint: "Wrap header rows in thead, data rows in tbody, summary in tfoot.",
      validator: (code) => includesAll(code, ["<thead", "<tbody", "<tfoot"]),
    },
    // Level 7 – Forms (indices 24-27)
    {
      instruction:
        "Build a login form with username, password input, and a submit button.",
      starter: "",
      hint: "Use form, two inputs with type text/password, and a button.",
      validator: (code) =>
        includesAll(code, ["<form", "type='password'", "<button"]) ||
        includesAll(code, ["<form", 'type="password"', "<button"]),
    },
    {
      instruction: "Create a form with method='get' and a text input.",
      starter: "",
      hint: "Use <form method='get'> with an input and button.",
      validator: (code) =>
        includesAll(code, ["<form", "method", "get", "<input"]),
    },
    {
      instruction: "Add the required attribute to two inputs inside a form.",
      starter: "",
      hint: "Add the word required inside each input tag.",
      validator: (code) =>
        includesAll(code, ["<form", "<input"]) &&
        (code.match(/required/gi) || []).length >= 2,
    },
    {
      instruction: "Create a form with a textarea and a submit button.",
      starter: "",
      hint: "Use <form>, <textarea>, and <button type='submit'>.",
      validator: (code) => includesAll(code, ["<form", "<textarea", "<button"]),
    },
    // Level 8 – Input Types (indices 28-31)
    {
      instruction: "Create inputs for date, number, and range in one form.",
      starter: "",
      hint: "Use type='date', type='number', type='range'.",
      validator: (code) =>
        includesAll(code, ["type='date'", "type='number'"]) ||
        includesAll(code, ['type="date"', 'type="number"']),
    },
    {
      instruction: "Build a form with a group of at least two checkboxes.",
      starter: "",
      hint: "Use multiple <input type='checkbox'> elements with labels.",
      validator: (code) => (code.match(/checkbox/gi) || []).length >= 2,
    },
    {
      instruction:
        "Create a radio button group to let the user pick one colour.",
      starter: "",
      hint: "Use three inputs with type='radio' and the same name attribute.",
      validator: (code) =>
        (code.match(/radio/gi) || []).length >= 2 && code.includes("name="),
    },
    {
      instruction:
        "Use select and option tags to build a dropdown of countries.",
      starter: "",
      hint: "Use <select> with at least four <option> elements.",
      validator: (code) =>
        includesAll(code, ["<select", "<option"]) &&
        (code.match(/<option/gi) || []).length >= 3,
    },
    // Level 9 – Semantic Layout (indices 32-35)
    {
      instruction: "Build a page skeleton using only header, main, and footer.",
      starter: "",
      hint: "Each semantic tag should have some inner content.",
      validator: (code) => includesAll(code, ["<header", "<main", "<footer"]),
    },
    {
      instruction: "Add a nav element with three links inside the header.",
      starter: "",
      hint: "Place <nav> between the opening and closing <header> tags.",
      validator: (code) => includesAll(code, ["<header", "<nav", "<a"]),
    },
    {
      instruction:
        "Use aside to build a sidebar placed next to a main content area.",
      starter: "",
      hint: "Use <main> and <aside> as siblings inside a wrapper.",
      validator: (code) => includesAll(code, ["<main", "<aside"]),
    },
    {
      instruction:
        "Give the main element an aria-label to describe the page region.",
      starter: "",
      hint: "Use <main aria-label='Main content'>.",
      validator: (code) => includesAll(code, ["<main", "aria-label"]),
    },
    // Level 10 – Sections (indices 36-39)
    {
      instruction:
        "Create a main container with three independent section blocks.",
      starter: "",
      hint: "Nest three <section> elements inside <main>.",
      validator: (code) =>
        includesAll(code, ["<main", "<section"]) &&
        (code.match(/<section/gi) || []).length >= 3,
    },
    {
      instruction: "Add unique id attributes to each section for anchor links.",
      starter: "",
      hint: "Use id='intro', id='about', id='contact' on each section.",
      validator: (code) =>
        includesAll(code, ["<section", "id="]) &&
        (code.match(/<section/gi) || []).length >= 2,
    },
    {
      instruction:
        "Use div elements to create two visually grouped card containers.",
      starter: "",
      hint: "Use <div class='card'> with inner heading and paragraph.",
      validator: (code) =>
        (code.match(/<div/gi) || []).length >= 2 && code.includes("class="),
    },
    {
      instruction:
        "Create a section with a heading and an article nested inside.",
      starter: "",
      hint: "Use <section> containing <h2> and <article>.",
      validator: (code) => includesAll(code, ["<section", "<h2", "<article"]),
    },
    // Level 11 – Articles (indices 40-43)
    {
      instruction:
        "Write an article with an h2 heading, paragraph, and a read-more link.",
      starter: "",
      hint: "Use <article> containing h2, p, and a.",
      validator: (code) => includesAll(code, ["<article", "<h2", "<p", "<a"]),
    },
    {
      instruction:
        "Create three article card elements each with a heading and paragraph.",
      starter: "",
      hint: "Use three <article> elements each with unique h2 and p content.",
      validator: (code) => (code.match(/<article/gi) || []).length >= 3,
    },
    {
      instruction: "Add a header and footer inside a single article element.",
      starter: "",
      hint: "Nest <header> and <footer> directly inside <article>.",
      validator: (code) =>
        includesAll(code, ["<article", "<header", "<footer"]),
    },
    {
      instruction:
        "Create a blog post article with a time element showing the publish date.",
      starter: "",
      hint: "Use <article> containing <time datetime='2026-04-14'>.",
      validator: (code) => includesAll(code, ["<article", "<time"]),
    },
    // Level 12 – Labels (indices 44-47)
    {
      instruction:
        "Build a form that links three labels to their inputs using matching for and id.",
      starter: "",
      hint: "Each label's for value must match the input's id.",
      validator: (code) =>
        (code.match(/for=/gi) || []).length >= 3 &&
        (code.match(/id=/gi) || []).length >= 3,
    },
    {
      instruction: "Wrap an input element directly inside its label element.",
      starter: "",
      hint: "Place <input> between the opening and closing <label> tags.",
      validator: (code) =>
        code.includes("<label") &&
        code.includes("<input") &&
        code.indexOf("<input") > code.indexOf("<label"),
    },
    {
      instruction:
        "Create a search form with a label and an input of type search.",
      starter: "",
      hint: "Use <label for='q'>Search:</label> and <input type='search' id='q'>.",
      validator: (code) => includesAll(code, ["<label", "search"]),
    },
    {
      instruction:
        "Create a form with label, email input, and submit button all linked.",
      starter: "",
      hint: "Use for/id to link the label, use type='email' on input.",
      validator: (code) => includesAll(code, ["<label", "email", "<button"]),
    },
    // Level 13 – Fieldsets (indices 48-51)
    {
      instruction:
        "Create a fieldset with a legend and three radio inputs inside.",
      starter: "",
      hint: "Use <fieldset><legend>... then three radio inputs.",
      validator: (code) => includesAll(code, ["<fieldset", "<legend", "radio"]),
    },
    {
      instruction:
        "Create a form with two separate fieldsets for personal info and preferences.",
      starter: "",
      hint: "Use two <fieldset> elements each with their own <legend>.",
      validator: (code) => (code.match(/<fieldset/gi) || []).length >= 2,
    },
    {
      instruction:
        "Build a newsletter signup form using a fieldset with disabled attribute.",
      starter: "",
      hint: "Add disabled to the fieldset element.",
      validator: (code) =>
        includesAll(code, ["<fieldset", "disabled", "<input"]),
    },
    {
      instruction:
        "Create a colour picker group using radio buttons inside a fieldset.",
      starter: "",
      hint: "Use fieldset with legend 'Pick a colour' and three radio options.",
      validator: (code) =>
        includesAll(code, ["<fieldset", "radio"]) &&
        (code.match(/radio/gi) || []).length >= 3,
    },
    // Level 14 – Navigation Menu (indices 52-55)
    {
      instruction:
        "Build a nav element with an unordered list of three anchor links.",
      starter: "",
      hint: "Use <nav><ul><li><a> three times.",
      validator: (code) =>
        includesAll(code, ["<nav", "<ul", "<li", "<a"]) &&
        (code.match(/<a/gi) || []).length >= 3,
    },
    {
      instruction:
        "Add an aria-label attribute to a nav element for accessibility.",
      starter: "",
      hint: "Use <nav aria-label='Main navigation'>.",
      validator: (code) => includesAll(code, ["<nav", "aria-label"]),
    },
    {
      instruction:
        "Create a breadcrumb navigation with three levels using nav and links.",
      starter: "",
      hint: "Use <nav aria-label='breadcrumb'> with Home > Section > Page.",
      validator: (code) =>
        includesAll(code, ["<nav", "<a"]) &&
        (code.match(/<a/gi) || []).length >= 3,
    },
    {
      instruction: "Mark the active link in a nav with aria-current='page'.",
      starter: "",
      hint: "Add aria-current='page' on the link for the current page.",
      validator: (code) => includesAll(code, ["<nav", "aria-current"]),
    },
    // Level 15 – Boss Page (indices 56-59)
    {
      instruction: "Add a DOCTYPE declaration and meta charset to a page head.",
      starter: "",
      hint: "Use <!DOCTYPE html> and <meta charset='UTF-8'>.",
      validator: (code) => includesAll(code, ["DOCTYPE", "charset"]),
    },
    {
      instruction:
        "Add a viewport meta tag to make the page mobile responsive.",
      starter: "",
      hint: "Use <meta name='viewport' content='width=device-width, initial-scale=1'>.",
      validator: (code) => includesAll(code, ["meta", "viewport"]),
    },
    {
      instruction:
        "Link an external CSS file using a link tag inside the head.",
      starter: "",
      hint: "Use <link rel='stylesheet' href='styles.css'>.",
      validator: (code) => includesAll(code, ["<link", "stylesheet"]),
    },
    {
      instruction:
        "Create a full HTML boilerplate with doctype, head containing meta and title, and a body.",
      starter: "",
      hint: "Start with <!DOCTYPE html>, add head with meta and title, then body.",
      validator: (code) =>
        includesAll(code, ["DOCTYPE", "<head", "<title", "<body"]),
    },
  ],
  css: [
    // Level 1 – Color (indices 0-3)
    {
      instruction: "Style h1 using an rgb() colour value.",
      starter: "h1 {\n}\n",
      hint: "Use color: rgb(255, 100, 50) inside h1.",
      validator: (code) => includesAll(code, ["h1", "color", "rgb("]),
    },
    {
      instruction: "Style body with a linear-gradient as the background.",
      starter: "body {\n}\n",
      hint: "Use background: linear-gradient(to right, #color1, #color2).",
      validator: (code) => includesAll(code, ["body", "linear-gradient"]),
    },
    {
      instruction: "Style .highlight with a background colour using hsl().",
      starter: ".highlight {\n}\n",
      hint: "Use background: hsl(200, 80%, 60%).",
      validator: (code) => includesAll(code, [".highlight", "hsl("]),
    },
    {
      instruction: "Style links with a custom colour and remove the underline.",
      starter: "a {\n}\n",
      hint: "Use color and text-decoration: none.",
      validator: (code) => includesAll(code, ["color", "text-decoration"]),
    },
    // Level 2 – Spacing (indices 4-7)
    {
      instruction:
        "Style .box with different padding on each of the four sides.",
      starter: ".box {\n}\n",
      hint: "Use padding: top right bottom left with four values.",
      validator: (code) => includesAll(code, [".box", "padding"]),
    },
    {
      instruction:
        "Use margin: auto to horizontally center a .container with a width.",
      starter: ".container {\n  width: 800px;\n}\n",
      hint: "Add margin: 0 auto to the container.",
      validator: (code) => includesAll(code, [".container", "margin", "auto"]),
    },
    {
      instruction:
        "Remove the default margin and padding from body and all elements.",
      starter: "* {\n}\nbody {\n}\n",
      hint: "Set margin: 0 and padding: 0 on *.",
      validator: (code) => includesAll(code, ["margin", "0", "padding"]),
    },
    {
      instruction:
        "Style .card with padding inside and margin to separate it from others.",
      starter: ".card {\n}\n",
      hint: "Add distinct values for both padding and margin.",
      validator: (code) => includesAll(code, [".card", "padding", "margin"]),
    },
    // Level 3 – Borders (indices 8-11)
    {
      instruction:
        "Style .badge with a solid border, border-radius, and background colour.",
      starter: ".badge {\n}\n",
      hint: "Use border, border-radius, and background-color.",
      validator: (code) =>
        includesAll(code, [".badge", "border", "border-radius", "background"]),
    },
    {
      instruction: "Add only a bottom border to h2 elements.",
      starter: "h2 {\n}\n",
      hint: "Use border-bottom: 2px solid color.",
      validator: (code) => includesAll(code, ["h2", "border-bottom"]),
    },
    {
      instruction:
        "Create a circle by setting border-radius to 50% on a square element.",
      starter: ".circle {\n  width: 100px;\n  height: 100px;\n}\n",
      hint: "Add border-radius: 50%.",
      validator: (code) => includesAll(code, ["border-radius", "50%"]),
    },
    {
      instruction:
        "Style an input's border colour when it is focused using the :focus pseudo-class.",
      starter: "input {\n}\ninput:focus {\n}\n",
      hint: "Use input:focus { border-color: blue; }.",
      validator: (code) => includesAll(code, [":focus", "border"]),
    },
    // Level 4 – Typography (indices 12-15)
    {
      instruction:
        "Style p with font-size, line-height, and a custom text colour.",
      starter: "p {\n}\n",
      hint: "Use font-size, line-height, and color.",
      validator: (code) =>
        includesAll(code, ["font-size", "line-height", "color"]),
    },
    {
      instruction:
        "Use text-transform to make a heading appear in all uppercase letters.",
      starter: "h1 {\n}\n",
      hint: "Use text-transform: uppercase.",
      validator: (code) => includesAll(code, ["text-transform", "uppercase"]),
    },
    {
      instruction: "Add extra letter-spacing to a nav link style.",
      starter: "nav a {\n}\n",
      hint: "Use letter-spacing: 0.1em.",
      validator: (code) => includesAll(code, ["nav", "letter-spacing"]),
    },
    {
      instruction:
        "Style a blockquote with font-style italic and a left border.",
      starter: "blockquote {\n}\n",
      hint: "Use font-style: italic and border-left.",
      validator: (code) =>
        includesAll(code, ["blockquote", "italic", "border"]),
    },
    // Level 5 – Width (indices 16-19)
    {
      instruction:
        "Give .container a max-width and center it horizontally on the page.",
      starter: ".container {\n}\n",
      hint: "Use max-width and margin: 0 auto.",
      validator: (code) =>
        includesAll(code, [".container", "max-width", "auto"]),
    },
    {
      instruction:
        "Make .card fill full width on small screens but cap at 400px otherwise.",
      starter: ".card {\n}\n",
      hint: "Use width: 100% and max-width: 400px.",
      validator: (code) => includesAll(code, [".card", "width", "max-width"]),
    },
    {
      instruction:
        "Set a min-width on a button to prevent it from shrinking too small.",
      starter: ".btn {\n}\n",
      hint: "Add min-width: 120px to the button.",
      validator: (code) => includesAll(code, [".btn", "min-width"]),
    },
    {
      instruction:
        "Apply box-sizing: border-box to all elements using the universal selector.",
      starter: "",
      hint: "Use * { box-sizing: border-box; }.",
      validator: (code) => includesAll(code, ["*", "box-sizing", "border-box"]),
    },
    // Level 6 – Flex Display (indices 20-23)
    {
      instruction:
        "Create a flex nav with items spread apart using justify-content: space-between.",
      starter: "nav {\n  display: flex;\n}\n",
      hint: "Add justify-content: space-between to the nav.",
      validator: (code) =>
        includesAll(code, ["display: flex", "space-between"]),
    },
    {
      instruction:
        "Build a flex row of cards that wraps onto the next line using flex-wrap.",
      starter: ".cards {\n  display: flex;\n}\n",
      hint: "Add flex-wrap: wrap and a width on .card.",
      validator: (code) => includesAll(code, ["display: flex", "flex-wrap"]),
    },
    {
      instruction:
        "Make one flex item grow to take double the space of its siblings.",
      starter: ".wrap {\n  display: flex;\n}\n.main {\n}\n.side {\n}\n",
      hint: "Use flex-grow: 2 on the main item and flex-grow: 1 on others.",
      validator: (code) => includesAll(code, ["display: flex", "flex-grow"]),
    },
    {
      instruction:
        "Create a horizontal toolbar using flex and add gap between items.",
      starter: ".toolbar {\n}\n",
      hint: "Use display: flex and gap: 12px.",
      validator: (code) => includesAll(code, ["display: flex", "gap"]),
    },
    // Level 7 – Flex Alignment (indices 24-27)
    {
      instruction:
        "Vertically center text inside a div with a fixed height using flexbox.",
      starter: ".hero {\n  height: 300px;\n}\n",
      hint: "Use display: flex; align-items: center; justify-content: center.",
      validator: (code) =>
        includesAll(code, ["display: flex", "align-items", "justify-content"]),
    },
    {
      instruction:
        "Align one badge element to the end of a flex container using align-self.",
      starter: ".wrap {\n  display: flex;\n}\n.badge {\n}\n",
      hint: "Use align-self: flex-end on .badge.",
      validator: (code) => includesAll(code, ["display: flex", "align-self"]),
    },
    {
      instruction:
        "Create a centered hero section using flexbox with column direction.",
      starter: ".hero {\n}\n",
      hint: "Use display: flex; flex-direction: column; align-items: center.",
      validator: (code) =>
        includesAll(code, ["display: flex", "flex-direction", "column"]),
    },
    {
      instruction:
        "Use justify-content: space-around to give equal spacing around flex items.",
      starter: ".row {\n  display: flex;\n}\n",
      hint: "Add justify-content: space-around.",
      validator: (code) => includesAll(code, ["display: flex", "space-around"]),
    },
    // Level 8 – Flex Direction (indices 28-31)
    {
      instruction: "Stack nav items vertically using flex-direction: column.",
      starter: ".sidenav {\n  display: flex;\n}\n",
      hint: "Add flex-direction: column.",
      validator: (code) => includesAll(code, ["display: flex", "column"]),
    },
    {
      instruction:
        "Reverse the order of flex items using flex-direction: row-reverse.",
      starter: ".row {\n  display: flex;\n}\n",
      hint: "Add flex-direction: row-reverse.",
      validator: (code) => includesAll(code, ["display: flex", "row-reverse"]),
    },
    {
      instruction:
        "Build a two-panel sidebar layout using flex column with a growing main area.",
      starter: ".layout {\n  display: flex;\n}\n.sidebar {\n}\n.main {\n}\n",
      hint: "Use flex-direction: column on layout, flex-grow: 1 on main.",
      validator: (code) => includesAll(code, ["display: flex", "flex-grow"]),
    },
    {
      instruction:
        "Stack an icon, title, and body inside a card using flex column and gap.",
      starter: ".card {\n}\n",
      hint: "Use display: flex; flex-direction: column; gap: 8px.",
      validator: (code) =>
        includesAll(code, ["display: flex", "column", "gap"]),
    },
    // Level 9 – Grid (indices 32-35)
    {
      instruction:
        "Build a three-column equal grid using grid-template-columns: 1fr 1fr 1fr.",
      starter: ".grid {\n}\n",
      hint: "Use display: grid and grid-template-columns: 1fr 1fr 1fr.",
      validator: (code) =>
        includesAll(code, ["display: grid", "1fr", "1fr 1fr"]) ||
        includesAll(code, ["display: grid", "repeat(3", "1fr"]),
    },
    {
      instruction:
        "Use grid-template-areas to name header, main, sidebar, and footer areas.",
      starter: ".page {\n  display: grid;\n}\n",
      hint: "Define area names in grid-template-areas and assign elements with grid-area.",
      validator: (code) =>
        includesAll(code, ["grid-template-areas", "grid-area"]),
    },
    {
      instruction:
        "Create an auto-flowing grid with minmax columns so they fit the space.",
      starter: ".grid {\n}\n",
      hint: "Use grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)).",
      validator: (code) => includesAll(code, ["display: grid", "minmax"]),
    },
    {
      instruction:
        "Build a full page layout with grid areas for header, sidebar, main, and footer.",
      starter: ".page {\n  display: grid;\n}\n",
      hint: "Define four areas and use grid-area on each child.",
      validator: (code) =>
        includesAll(code, [
          "display: grid",
          "grid-template-areas",
          "grid-area",
        ]),
    },
    // Level 10 – Hover (indices 36-39)
    {
      instruction: "Change a link's colour and remove the underline on hover.",
      starter: "a {\n}\na:hover {\n}\n",
      hint: "Use :hover to change color and set text-decoration: none.",
      validator: (code) => includesAll(code, [":hover", "color"]),
    },
    {
      instruction:
        "Scale a card up slightly when hovered using transform: scale().",
      starter: ".card {\n}\n.card:hover {\n}\n",
      hint: "Use .card:hover { transform: scale(1.05); }.",
      validator: (code) => includesAll(code, [":hover", "transform", "scale"]),
    },
    {
      instruction: "Darken a button's background colour on hover.",
      starter: ".btn {\n  background: #4a90e2;\n}\n.btn:hover {\n}\n",
      hint: "Add a darker background colour inside .btn:hover.",
      validator: (code) => includesAll(code, [".btn:hover", "background"]),
    },
    {
      instruction:
        "Show a hidden tooltip paragraph when its parent div is hovered.",
      starter: ".tip {\n  display: none;\n}\n.parent:hover .tip {\n}\n",
      hint: "Use .parent:hover .tip { display: block; }.",
      validator: (code) => includesAll(code, [":hover", "display"]),
    },
    // Level 11 – Transition (indices 40-43)
    {
      instruction:
        "Add an ease-in-out transition to a button's background on hover.",
      starter: ".btn {\n}\n.btn:hover {\n}\n",
      hint: "Add transition: background 0.3s ease-in-out to .btn.",
      validator: (code) =>
        includesAll(code, ["transition", "ease-in-out", ":hover"]),
    },
    {
      instruction:
        "Animate card elevation with a box-shadow that appears on hover using transition.",
      starter: ".card {\n}\n.card:hover {\n}\n",
      hint: "Add transition on .card and box-shadow on .card:hover.",
      validator: (code) =>
        includesAll(code, ["transition", "box-shadow", ":hover"]),
    },
    {
      instruction:
        "Use transform: translateY() on hover with transition for a lift effect.",
      starter: ".card {\n}\n.card:hover {\n}\n",
      hint: "Use transition on .card and transform: translateY(-4px) on hover.",
      validator: (code) =>
        includesAll(code, ["transition", "translateY", ":hover"]),
    },
    {
      instruction:
        "Add staggered transition-delay so three items appear one after another.",
      starter:
        ".item:nth-child(1) {\n}\n.item:nth-child(2) {\n}\n.item:nth-child(3) {\n}\n",
      hint: "Use transition-delay with different values on each nth-child.",
      validator: (code) =>
        includesAll(code, ["transition", "transition-delay"]) ||
        includesAll(code, ["transition", "nth-child"]),
    },
    // Level 12 – Positioning (indices 44-47)
    {
      instruction:
        "Create a sticky header that stays at the top as the user scrolls.",
      starter: "header {\n}\n",
      hint: "Use position: sticky; top: 0;.",
      validator: (code) => includesAll(code, ["position: sticky", "top"]),
    },
    {
      instruction:
        "Place a badge in the top-right corner of its parent using absolute positioning.",
      starter: ".parent {\n  position: relative;\n}\n.badge {\n}\n",
      hint: "Use position: absolute; top: 0; right: 0; on .badge.",
      validator: (code) =>
        includesAll(code, ["position: absolute", "top", "right"]),
    },
    {
      instruction:
        "Overlay centred text on top of an image using absolute inside relative.",
      starter: ".wrapper {\n}\n.text {\n}\n",
      hint: "Use position: relative on .wrapper and position: absolute on .text.",
      validator: (code) =>
        includesAll(code, ["position: relative", "position: absolute"]),
    },
    {
      instruction:
        "Create a fixed back-to-top button pinned to the bottom-right corner.",
      starter: ".back-top {\n}\n",
      hint: "Use position: fixed; bottom: 20px; right: 20px;.",
      validator: (code) =>
        includesAll(code, ["position: fixed", "bottom", "right"]),
    },
    // Level 13 – Media Query (indices 48-51)
    {
      instruction:
        "Change a two-column grid to one column on screens below 600px.",
      starter:
        ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n",
      hint: "Use @media (max-width: 600px) and change grid-template-columns to 1fr.",
      validator: (code) =>
        includesAll(code, ["@media", "600px", "grid-template-columns", "1fr"]),
    },
    {
      instruction: "Hide a .sidebar element on screens smaller than 768px.",
      starter: ".sidebar {\n}\n",
      hint: "Use @media (max-width: 768px) { .sidebar { display: none; } }.",
      validator: (code) => includesAll(code, ["@media", "768px", "display"]),
    },
    {
      instruction:
        "Use media queries to set a larger font-size on desktop than mobile.",
      starter: "body {\n  font-size: 14px;\n}\n",
      hint: "Add @media (min-width: 768px) and increase font-size.",
      validator: (code) => includesAll(code, ["@media", "font-size"]),
    },
    {
      instruction:
        "Apply dark mode styles when the user's system prefers dark colour scheme.",
      starter: "body {\n  background: white;\n  color: black;\n}\n",
      hint: "Use @media (prefers-color-scheme: dark).",
      validator: (code) =>
        includesAll(code, ["@media", "prefers-color-scheme", "dark"]),
    },
    // Level 14 – Animation (indices 52-55)
    {
      instruction:
        "Create a pulsing animation using keyframes that scale an element in and out.",
      starter: "",
      hint: "Use @keyframes pulse with transform: scale from 1 to 1.1.",
      validator: (code) =>
        includesAll(code, ["@keyframes", "scale", "animation"]),
    },
    {
      instruction:
        "Write a slide-in animation from the left using translateX keyframes.",
      starter: "",
      hint: "Use @keyframes slideIn from translateX(-100%) to translateX(0).",
      validator: (code) =>
        includesAll(code, ["@keyframes", "translateX", "animation"]),
    },
    {
      instruction:
        "Add animation-delay to three elements so they appear one after another.",
      starter:
        ".item:nth-child(1) {\n}\n.item:nth-child(2) {\n}\n.item:nth-child(3) {\n}\n",
      hint: "Use animation-delay: 0s, 0.2s, 0.4s on each child.",
      validator: (code) => includesAll(code, ["animation", "animation-delay"]),
    },
    {
      instruction:
        "Create a spinning loader using rotation keyframes applied forever.",
      starter: ".loader {\n}\n",
      hint: "Use @keyframes spin with transform: rotate(360deg) and animation: spin infinite.",
      validator: (code) =>
        includesAll(code, ["@keyframes", "rotate", "infinite"]),
    },
    // Level 15 – Boss Layout (indices 56-59)
    {
      instruction:
        "Define two CSS variables for primary colour and spacing, then use them.",
      starter: ":root {\n}\n",
      hint: "Use --primary-color and --spacing then reference with var().",
      validator: (code) => includesAll(code, ["--", "var("]),
    },
    {
      instruction:
        "Create a full page layout combining grid, flexbox, and a media query.",
      starter: "",
      hint: "Use display: grid for layout, flex inside sections, @media for responsive.",
      validator: (code) =>
        includesAll(code, ["display: grid", "display: flex", "@media"]),
    },
    {
      instruction:
        "Style a dark mode theme using CSS variables and prefers-color-scheme.",
      starter: ":root {\n  --bg: white;\n  --text: black;\n}\n",
      hint: "Override variables inside @media (prefers-color-scheme: dark).",
      validator: (code) =>
        includesAll(code, ["--", "prefers-color-scheme", "dark", "var("]),
    },
    {
      instruction:
        "Build a component with hover effects, transition, and z-index layering.",
      starter: ".card {\n}\n.card:hover {\n}\n",
      hint: "Use transition on .card, transform on hover, and z-index for layering.",
      validator: (code) =>
        includesAll(code, ["transition", ":hover", "z-index"]),
    },
  ],
  javascript: [
    // Level 1 – Variables (indices 0-3)
    {
      instruction:
        "Declare three variables name, age, and isActive with values using let and const.",
      starter: "",
      hint: "Use const for name and let for age and isActive.",
      validator: (code) =>
        includesAll(code, ["name", "age", "isActive"]) &&
        (code.includes("let ") || code.includes("const ")),
    },
    {
      instruction:
        "Create a variable then reassign it with a new value and log both.",
      starter: "",
      hint: "Use let, assign value, log, then reassign and log again.",
      validator: (code) =>
        includesAll(code, ["let ", "console.log"]) &&
        (String(code).match(/console\.log/g) || []).length >= 2,
    },
    {
      instruction:
        "Use a template literal to log a full sentence using two variables.",
      starter: "",
      hint: "Use backticks with ${variable} inside the string.",
      validator: (code) =>
        code.includes("`") &&
        code.includes("${") &&
        code.includes("console.log"),
    },
    {
      instruction:
        "Use typeof to log the data type of a string, number, and boolean.",
      starter: "",
      hint: "Use console.log(typeof value) for each.",
      validator: (code) => includesAll(code, ["typeof", "console.log"]),
    },
    // Level 2 – Output (indices 4-7)
    {
      instruction:
        "Use console.error to log a custom error message to the console.",
      starter: "",
      hint: "Use console.error('Something went wrong').",
      validator: (code) => code.includes("console.error"),
    },
    {
      instruction: "Use console.warn to log a deprecation warning.",
      starter: "",
      hint: "Use console.warn('This feature is deprecated').",
      validator: (code) => code.includes("console.warn"),
    },
    {
      instruction: "Log an array of three items and an object with two keys.",
      starter: "",
      hint: "Use console.log([...]) and console.log({...}).",
      validator: (code) =>
        (String(code).match(/console\.log/g) || []).length >= 2 &&
        code.includes("[") &&
        code.includes("{"),
    },
    {
      instruction:
        "Log the type of a string, a number, and null and compare the results.",
      starter: "",
      hint: "Use typeof on each. Note typeof null returns 'object'.",
      validator: (code) => includesAll(code, ["typeof", "null", "console.log"]),
    },
    // Level 3 – Functions (indices 8-11)
    {
      instruction:
        "Write an arrow function that squares a number and returns the result.",
      starter: "",
      hint: "Use const square = (n) => n * n;",
      validator: (code) =>
        includesAll(code, ["=>", "return"]) ||
        (code.includes("=>") && code.includes("*")),
    },
    {
      instruction:
        "Write a function that accepts a callback and calls it with a value.",
      starter: "",
      hint: "Pass a function as argument and call it inside with callback(value).",
      validator: (code) =>
        code.includes("function") &&
        code.match(/\(\s*\w+\s*\)/) &&
        code.includes("("),
    },
    {
      instruction:
        "Write a function that returns another function (a closure).",
      starter: "",
      hint: "Return a function from inside a function.",
      validator: (code) =>
        (String(code).match(/function/g) || code.match(/=>/g) || []).length >=
          2 && code.includes("return"),
    },
    {
      instruction:
        "Write a function greet(name) that returns a personalised greeting string.",
      starter: "",
      hint: "Return 'Hello ' + name or use a template literal.",
      validator: (code) => includesAll(code, ["function", "name", "return"]),
    },
    // Level 4 – Conditions (indices 12-15)
    {
      instruction:
        "Use === to compare a string and a number and log whether they are equal.",
      starter: "",
      hint: "Compare '5' === 5 and log the result.",
      validator: (code) => includesAll(code, ["===", "console.log"]),
    },
    {
      instruction:
        "Write a condition that combines && and || logic and logs the result.",
      starter: "",
      hint: "Use if (a > 0 && b < 10 || c === true).",
      validator: (code) => includesAll(code, ["&&", "||"]),
    },
    {
      instruction:
        "Use a ternary operator to assign 'adult' or 'minor' based on age.",
      starter: "const age = 20;\n",
      hint: "Use const status = age >= 18 ? 'adult' : 'minor'.",
      validator: (code) => includesAll(code, ["?", ":", "age"]),
    },
    {
      instruction:
        "Use the ?? operator to provide a fallback value when a variable is null.",
      starter: "let username = null;\n",
      hint: "Use const display = username ?? 'Guest'.",
      validator: (code) => includesAll(code, ["??", "null"]),
    },
    // Level 5 – Loops (indices 16-19)
    {
      instruction:
        "Loop through an object's keys using for...in and log each key-value pair.",
      starter: "const config = { theme: 'dark', lang: 'en', size: 16 };\n",
      hint: "Use for (const key in config) { console.log(key, config[key]); }",
      validator: (code) =>
        includesAll(code, ["for", "in config", "console.log"]),
    },
    {
      instruction: "Use for...of to loop through an array and log each item.",
      starter: "const fruits = ['apple', 'banana', 'cherry'];\n",
      hint: "Use for (const fruit of fruits) { console.log(fruit); }",
      validator: (code) =>
        includesAll(code, ["for", "of fruits", "console.log"]),
    },
    {
      instruction:
        "Use a for loop to build an array of squared numbers from 1 to 10.",
      starter: "const squares = [];\n",
      hint: "Use for (let i = 1; i <= 10; i++) squares.push(i * i).",
      validator: (code) => includesAll(code, ["for", "push", "squares"]),
    },
    {
      instruction:
        "Calculate the sum of all integers from 1 to 100 using a loop.",
      starter: "let total = 0;\n",
      hint: "Use for or while to add each number to total.",
      validator: (code) => includesAll(code, ["total", "100", "+"]),
    },
    // Level 6 – Arrays (indices 20-23)
    {
      instruction:
        "Use shift() to remove the first item and unshift() to add one to the front.",
      starter: "const items = ['a', 'b', 'c'];\n",
      hint: "Call items.shift() then items.unshift('z').",
      validator: (code) => includesAll(code, ["shift", "unshift"]),
    },
    {
      instruction:
        "Join an array of words into a single sentence string using join().",
      starter: "const words = ['Hello', 'from', 'JavaScript'];\n",
      hint: "Use words.join(' ') to join with a space.",
      validator: (code) => includesAll(code, ["words", "join"]),
    },
    {
      instruction:
        "Use every() to check whether all numbers in an array are positive.",
      starter: "const nums = [3, 7, 2, 9, 1];\n",
      hint: "Use nums.every(n => n > 0).",
      validator: (code) => includesAll(code, ["nums", "every"]),
    },
    {
      instruction:
        "Use some() to check whether any number in an array is greater than 50.",
      starter: "const scores = [20, 45, 60, 10];\n",
      hint: "Use scores.some(s => s > 50).",
      validator: (code) => includesAll(code, ["some", "> 50"]),
    },
    // Level 7 – Objects (indices 24-27)
    {
      instruction:
        "Use Object.keys() to loop through an object and log each key.",
      starter: "const user = { name: 'Ada', role: 'dev', active: true };\n",
      hint: "Use Object.keys(user).forEach(key => console.log(key)).",
      validator: (code) => includesAll(code, ["Object.keys", "user"]),
    },
    {
      instruction:
        "Spread an object into a copy and add one new property to the copy.",
      starter: "const original = { x: 1, y: 2 };\n",
      hint: "Use const copy = { ...original, z: 3 }.",
      validator: (code) => includesAll(code, ["...", "original"]),
    },
    {
      instruction:
        "Destructure name and age from a user object into separate variables.",
      starter: "const user = { name: 'Sam', age: 28, city: 'London' };\n",
      hint: "Use const { name, age } = user.",
      validator: (code) =>
        includesAll(code, ["{ name", "age }", "user"]) ||
        includesAll(code, ["{name,", "} = user"]),
    },
    {
      instruction:
        "Use hasOwnProperty() to check if an object has a specific key before reading it.",
      starter: "const data = { title: 'Hello', views: 42 };\n",
      hint: "Use data.hasOwnProperty('title').",
      validator: (code) => includesAll(code, ["hasOwnProperty"]),
    },
    // Level 8 – DOM Select (indices 28-31)
    {
      instruction: "Select all p elements and log how many there are.",
      starter: "",
      hint: "Use document.querySelectorAll('p').length.",
      validator: (code) => includesAll(code, ["querySelectorAll", "length"]),
    },
    {
      instruction:
        "Select the first element with class .card and log its text content.",
      starter: "",
      hint: "Use document.querySelector('.card').textContent.",
      validator: (code) => includesAll(code, ["querySelector", ".card"]),
    },
    {
      instruction: "Add a class 'active' to a button element when clicked.",
      starter: "const btn = document.getElementById('btn');\n",
      hint: "Use btn.addEventListener('click', () => btn.classList.add('active')).",
      validator: (code) => includesAll(code, ["classList.add", "active"]),
    },
    {
      instruction:
        "Toggle a class on an element on every click using classList.toggle.",
      starter: "const el = document.querySelector('.toggle');\n",
      hint: "Use el.addEventListener('click', () => el.classList.toggle('on')).",
      validator: (code) => includesAll(code, ["classList.toggle", "click"]),
    },
    // Level 9 – Events (indices 32-35)
    {
      instruction: "Stop a form from submitting using event.preventDefault().",
      starter:
        "document.getElementById('form').addEventListener('submit', function(e) {\n});\n",
      hint: "Call e.preventDefault() inside the handler.",
      validator: (code) => includesAll(code, ["preventDefault", "submit"]),
    },
    {
      instruction:
        "Use event.target to log which element was clicked inside a container.",
      starter:
        "document.getElementById('container').addEventListener('click', function(e) {\n});\n",
      hint: "Log e.target inside the event handler.",
      validator: (code) =>
        includesAll(code, ["event.target", "click"]) ||
        includesAll(code, ["e.target", "click"]),
    },
    {
      instruction:
        "Add a click handler to a parent element that handles clicks on its children.",
      starter: "",
      hint: "Use addEventListener on the parent and check e.target inside.",
      validator: (code) =>
        includesAll(code, ["addEventListener", "click", "target"]),
    },
    {
      instruction:
        "Add a keydown event listener that logs when the Enter key is pressed.",
      starter: "",
      hint: "Use addEventListener('keydown', e => { if (e.key === 'Enter')... }).",
      validator: (code) => includesAll(code, ["keydown", "Enter"]),
    },
    // Level 10 – Input Value (indices 36-39)
    {
      instruction:
        "Update a paragraph's text on every keystroke from an input field.",
      starter:
        "const input = document.getElementById('input');\nconst output = document.getElementById('output');\n",
      hint: "Use input.addEventListener('input', () => output.textContent = input.value).",
      validator: (code) => includesAll(code, ["input", "textContent", "value"]),
    },
    {
      instruction:
        "Clear an input field's value when a clear button is clicked.",
      starter:
        "const input = document.getElementById('field');\nconst clearBtn = document.getElementById('clear');\n",
      hint: "Set input.value = '' inside click handler.",
      validator: (code) =>
        includesAll(code, ["value", "''", "click"]) ||
        includesAll(code, ["value", '""', "click"]),
    },
    {
      instruction:
        "Use the change event to detect and log when a select element value changes.",
      starter: "const sel = document.getElementById('select');\n",
      hint: "Use sel.addEventListener('change', () => console.log(sel.value)).",
      validator: (code) =>
        includesAll(code, ["change", "value", "console.log"]),
    },
    {
      instruction:
        "Read an input's value, parse it as an integer using parseInt, and display it.",
      starter: "const numInput = document.getElementById('num');\n",
      hint: "Use parseInt(numInput.value) to convert.",
      validator: (code) => includesAll(code, ["parseInt", "value"]),
    },
    // Level 11 – Map (indices 40-43)
    {
      instruction:
        "Use map() to extract just the name property from an array of user objects.",
      starter:
        "const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }];\n",
      hint: "Use users.map(u => u.name).",
      validator: (code) => includesAll(code, ["users", "map", "name"]),
    },
    {
      instruction:
        "Use reduce() to calculate the total price from an array of item objects.",
      starter: "const items = [{ price: 10 }, { price: 25 }, { price: 5 }];\n",
      hint: "Use items.reduce((sum, item) => sum + item.price, 0).",
      validator: (code) => includesAll(code, ["reduce", "price"]),
    },
    {
      instruction:
        "Use flat() to flatten a nested array into a single-level array.",
      starter: "const nested = [[1, 2], [3, 4], [5, 6]];\n",
      hint: "Use nested.flat().",
      validator: (code) => includesAll(code, ["nested", "flat"]),
    },
    {
      instruction:
        "Use find() to get the first item in an array where a value is over 100.",
      starter: "const values = [50, 80, 120, 200, 30];\n",
      hint: "Use values.find(v => v > 100).",
      validator: (code) => includesAll(code, ["find", "> 100"]),
    },
    // Level 12 – Filter (indices 44-47)
    {
      instruction:
        "Use findIndex() to locate the position of the first negative number.",
      starter: "const nums = [4, 7, -3, 10, -1];\n",
      hint: "Use nums.findIndex(n => n < 0).",
      validator: (code) => includesAll(code, ["findIndex", "< 0"]),
    },
    {
      instruction:
        "Remove duplicate values from an array using Set and spread it back.",
      starter: "const arr = [1, 2, 2, 3, 3, 4];\n",
      hint: "Use [...new Set(arr)].",
      validator: (code) => includesAll(code, ["Set", "arr"]),
    },
    {
      instruction:
        "Chain filter() and map() to double only the even numbers in an array.",
      starter: "const nums = [1, 2, 3, 4, 5, 6];\n",
      hint: "Filter evens first then map to double each.",
      validator: (code) => includesAll(code, ["filter", "map"]),
    },
    {
      instruction:
        "Use Array.from() to create an array from a string's characters.",
      starter: "const str = 'hello';\n",
      hint: "Use Array.from(str) to get each character.",
      validator: (code) => includesAll(code, ["Array.from", "str"]),
    },
    // Level 13 – Timeout (indices 48-51)
    {
      instruction:
        "Use setInterval to increment and log a counter every second.",
      starter: "let count = 0;\n",
      hint: "Use setInterval(() => { count++; console.log(count); }, 1000).",
      validator: (code) => includesAll(code, ["setInterval", "1000", "count"]),
    },
    {
      instruction:
        "Start a timeout then cancel it before it fires using clearTimeout.",
      starter: "",
      hint: "Assign setTimeout to a variable then call clearTimeout(id).",
      validator: (code) => includesAll(code, ["setTimeout", "clearTimeout"]),
    },
    {
      instruction:
        "Chain two setTimeout calls so one fires after the other completes.",
      starter: "",
      hint: "Place the second setTimeout inside the callback of the first.",
      validator: (code) =>
        (String(code).match(/setTimeout/g) || []).length >= 2,
    },
    {
      instruction:
        "Create and resolve a Promise that resolves after a short delay.",
      starter: "",
      hint: "Use new Promise(resolve => setTimeout(resolve, 500)).",
      validator: (code) => includesAll(code, ["Promise", "resolve"]),
    },
    // Level 14 – Try Catch (indices 52-55)
    {
      instruction:
        "Use throw to create a custom error with a specific message.",
      starter: "",
      hint: "Use throw new Error('Custom error message').",
      validator: (code) => includesAll(code, ["throw", "Error"]),
    },
    {
      instruction:
        "Catch an error and display its .message property in the console.",
      starter: "",
      hint: "Use try/catch and log error.message inside catch.",
      validator: (code) =>
        includesAll(code, ["catch", "error.message"]) ||
        includesAll(code, ["catch", ".message"]),
    },
    {
      instruction:
        "Write an async function that awaits a fetch call and logs the result.",
      starter: "",
      hint: "Use async function and await fetch(url) then .json().",
      validator: (code) => includesAll(code, ["async", "await", "fetch"]),
    },
    {
      instruction:
        "Chain .then() and .catch() on a fetch call to handle success and failure.",
      starter: "",
      hint: "Use fetch(url).then(res => res.json()).catch(err => console.error(err)).",
      validator: (code) => includesAll(code, ["fetch", ".then", ".catch"]),
    },
    // Level 15 – Boss App (indices 56-59)
    {
      instruction:
        "Store an object in localStorage by serialising it to JSON and retrieve it back.",
      starter: "const data = { name: 'Ada', score: 100 };\n",
      hint: "Use JSON.stringify to save and JSON.parse to retrieve.",
      validator: (code) =>
        includesAll(code, ["localStorage", "JSON.stringify", "JSON.parse"]),
    },
    {
      instruction:
        "Fetch data from a public API endpoint and log the first item.",
      starter: "",
      hint: "Use fetch(url).then(r => r.json()).then(data => console.log(data[0])).",
      validator: (code) => includesAll(code, ["fetch", "console.log"]),
    },
    {
      instruction:
        "Build a simple todo list that saves items to localStorage on add.",
      starter: "",
      hint: "Push to an array then JSON.stringify to localStorage.setItem.",
      validator: (code) => includesAll(code, ["localStorage", "push"]),
    },
    {
      instruction:
        "Write an async function that fetches data and handles errors with try/catch.",
      starter: "",
      hint: "Use async/await inside try/catch and log the error if it fails.",
      validator: (code) =>
        includesAll(code, ["async", "await", "try", "catch"]),
    },
  ],
};

function buildQuizSet(level, topicKey, levelIndex) {
  const bank = EXTRA_QUIZ_BANK[topicKey] || [];
  const set = [level.quiz];
  const start = levelIndex * 4;
  for (let offset = 0; offset < 4; offset += 1) {
    const item = bank[start + offset];
    if (item) set.push(item);
  }
  return set;
}

function buildPuzzleSet(level, topicKey, levelIndex) {
  const bank = EXTRA_PUZZLE_BANK[topicKey] || [];
  const set = [level.mission];
  const start = levelIndex * 4;
  for (let offset = 0; offset < 4; offset += 1) {
    const item = bank[start + offset];
    if (item) set.push(item);
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
