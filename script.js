"use strict";

const gameContainer = document.querySelector(".game-container");

let playerName = "";
let difficulty = "Easy";
let score = 0;
let questionIndex = 0;
let activeQuestions = [];
let timerId = null;
let timeLeft = 30;
let answered = false;
let usedHint = false;
let treasureMoves = 5;
let targetSet = [];
let treasureBag = [];
let playerCards = [];
let multiplayerMode = false;
let multiplayerPlayers = [];
let multiplayerScores = [0, 0];
let currentPlayerIndex = 0;
let questionTurnCount = 0;

function getCurrentPlayerName() {
  return multiplayerMode
    ? multiplayerPlayers[currentPlayerIndex]
    : playerName;
}

function addPoints(points) {
  if (multiplayerMode) {
    multiplayerScores[currentPlayerIndex] += points;
  } else {
    score += points;
  }
}

function getScoreboardHTML() {
  if (!multiplayerMode) {
    return `<div class="stat">
      <strong>${score}</strong>
      <span>Score</span>
    </div>`;
  }

  return multiplayerPlayers
    .map((name, i) => `
      <div class="stat">
        <strong>${multiplayerScores[i]}</strong>
        <span>${escapeHTML(name)}</span>
      </div>
    `)
    .join("");
}

const difficultySettings = {
  Easy: { seconds: 30, points: 10, count: 5 },
  Medium: { seconds: 20, points: 20, count: 7 },
  Hard: { seconds: 12, points: 30, count: 8 }
};

const topics = [
  {
    title: "📚 TYPES OF SETS",
    questions: [
      {
        question: "Which set contains a limited number of elements?",
        choices: ["Finite Set", "Infinite Set", "Empty Set"],
        answer: "Finite Set",
        hint: "Its number of elements can be counted."
      },
      {
        question: "Which set has no elements?",
        choices: ["Singleton Set", "Empty Set", "Universal Set"],
        answer: "Empty Set",
        hint: "It is also called the null set."
      },
      {
        question: "Which set contains exactly one element?",
        choices: ["Infinite Set", "Singleton Set", "Empty Set"],
        answer: "Singleton Set",
        hint: "Think of a set with just one member."
      },
      {
        question: "Which set contains an unlimited number of elements?",
        choices: ["Finite Set", "Empty Set", "Infinite Set"],
        answer: "Infinite Set",
        hint: "Its elements never end."
      },
      {
        question: "If A = {1, 2} and B = {1, 2}, what is their relationship?",
        choices: ["Equal Sets", "Disjoint Sets", "Empty Sets"],
        answer: "Equal Sets",
        hint: "Both sets have the exact same elements."
      },
      {
        question: "If A = {1, 2} and B = {3, 4}, what are these sets?",
        choices: ["Equal Sets", "Disjoint Sets", "Overlapping Sets"],
        answer: "Disjoint Sets",
        hint: "They have no common elements."
      },
      {
        question: "If A = {1, 2} and B = {2, 3}, what type of sets are they?",
        choices: ["Disjoint Sets", "Overlapping Sets", "Empty Sets"],
        answer: "Overlapping Sets",
        hint: "They share one element."
      },
      {
        question: "If every element of A is also in B, what is A in relation to B?",
        choices: ["A subset of B", "A disjoint set", "An infinite set"],
        answer: "A subset of B",
        hint: "Use the subset relationship."
      },
      {
        question: "Which symbol means 'is an element of'?",
        choices: ["∈", "∪", "∩"],
        answer: "∈",
        hint: "This symbol indicates membership."
      },
      {
        question: "If A = {2, 4, 6}, is 4 an element of A?",
        choices: ["Yes", "No", "A is empty"],
        answer: "Yes",
        hint: "Check whether 4 appears in A."
      },
      {
        question: "Which symbol means 'is a subset of'?",
        choices: ["⊆", "∩", "∪"],
        answer: "⊆",
        hint: "It represents a subset."
      },
      {
        question: "If A = {1, 2} and B = {1, 2, 3}, is A a subset of B?",
        choices: ["Yes", "No", "They are disjoint"],
        answer: "Yes",
        hint: "Every element of A appears in B."
      },
      {
        question: "What is a proper subset?",
        choices: [
          "A subset that is not equal to the original set",
          "A set with no elements",
          "A set with infinite elements"
        ],
        answer: "A subset that is not equal to the original set",
        hint: "It is a subset but not the same set."
      },
      {
        question: "What makes two finite sets equivalent?",
        choices: [
          "They have the same number of elements",
          "They have exactly the same elements",
          "They have no elements"
        ],
        answer: "They have the same number of elements",
        hint: "Compare their cardinalities."
      },
      {
        question: "What is the universal set?",
        choices: [
          "The set of all elements being considered",
          "A set with one element only",
          "A set with no elements"
        ],
        answer: "The set of all elements being considered",
        hint: "It contains the elements under discussion."
      },
      {
        question: "Which symbol commonly represents the empty set?",
        choices: ["∅", "∪", "∈"],
        answer: "∅",
        hint: "It looks like a crossed-out circle."
      },
      {
        question: "If A = {a, b, c}, how many elements are in A?",
        choices: ["2", "3", "4"],
        answer: "3",
        hint: "Count each different element."
      },
      {
        question: "If A = {1, 2, 3}, which statement is true?",
        choices: ["2 ∈ A", "5 ∈ A", "4 ∈ A"],
        answer: "2 ∈ A",
        hint: "Check which number belongs to A."
      },
      {
        question: "If A = {1, 2} and B = {2, 3}, which element do they share?",
        choices: ["1", "2", "3"],
        answer: "2",
        hint: "Find the common element."
      }
    ]
  },

  {
    title: "🔢 SET OPERATIONS",
    questions: [
      {
        question: "What is {1, 2} ∪ {2, 3}?",
        choices: ["{2}", "{1, 2, 3}", "{1, 3}"],
        answer: "{1, 2, 3}",
        hint: "Union combines elements without duplicates."
      },
      {
        question: "What is {1, 2} ∩ {2, 3}?",
        choices: ["{1, 2, 3}", "{1}", "{2}"],
        answer: "{2}",
        hint: "Intersection means common elements."
      },
      {
        question: "What is {1, 2} − {2, 3}?",
        choices: ["{1}", "{2}", "{1, 2, 3}"],
        answer: "{1}",
        hint: "Keep elements in the first set only."
      },
      {
        question: "If U = {1, 2, 3, 4} and A = {1, 2}, what is Aᶜ?",
        choices: ["{1, 2}", "{3, 4}", "{1, 2, 3, 4}"],
        answer: "{3, 4}",
        hint: "Complement contains elements in U but not A."
      },
      {
        question: "What is {a, b} ∪ {b, c}?",
        choices: ["{b}", "{a, b, c}", "{a, c}"],
        answer: "{a, b, c}",
        hint: "Combine all unique elements."
      },
      {
        question: "What is {2, 4, 6} ∩ {4, 6, 8}?",
        choices: ["{2, 8}", "{4, 6}", "{2, 4, 6, 8}"],
        answer: "{4, 6}",
        hint: "Choose the elements in both sets."
      },
      {
        question: "What is {1, 2, 3} − {1, 3}?",
        choices: ["{1, 3}", "{2}", "{1, 2, 3}"],
        answer: "{2}",
        hint: "Remove 1 and 3 from the first set."
      },
      {
        question: "If U = {a, b, c, d} and A = {a, c}, what is Aᶜ?",
        choices: ["{a, c}", "{b, d}", "{a, b, c, d}"],
        answer: "{b, d}",
        hint: "Find the elements of U not in A."
      },
      {
        question: "What is {1, 2} ∪ ∅?",
        choices: ["∅", "{1, 2}", "{1}"],
        answer: "{1, 2}",
        hint: "Union with the empty set adds nothing."
      },
      {
        question: "What is {1, 2} ∩ ∅?",
        choices: ["{1, 2}", "{1}", "∅"],
        answer: "∅",
        hint: "There are no shared elements."
      },
      {
        question: "What is {3, 4, 5} − {4}?",
        choices: ["{4}", "{3, 5}", "{3, 4, 5}"],
        answer: "{3, 5}",
        hint: "Remove 4 from the first set."
      },
      {
        question: "What is {a, b, c} ∪ {c, d}?",
        choices: ["{c}", "{a, b, c, d}", "{a, b, d}"],
        answer: "{a, b, c, d}",
        hint: "List every element only once."
      },
      {
        question: "What is {2, 4, 6} ∩ {1, 3, 5}?",
        choices: ["{2, 4, 6}", "{1, 3, 5}", "∅"],
        answer: "∅",
        hint: "Do these sets share any elements?"
      },
      {
        question: "If A = {1, 3, 5} and B = {1, 2, 3}, what is A − B?",
        choices: ["{1, 3}", "{5}", "{1, 2, 3, 5}"],
        answer: "{5}",
        hint: "Keep elements in A that are not in B."
      },
      {
        question: "What does union combine?",
        choices: [
          "All elements from both sets without duplicates",
          "Only the common elements",
          "Only elements in the first set"
        ],
        answer: "All elements from both sets without duplicates",
        hint: "Union is the combined set."
      },
      {
        question: "What does intersection find?",
        choices: [
          "All elements from both sets",
          "Elements common to both sets",
          "Elements outside the universal set"
        ],
        answer: "Elements common to both sets",
        hint: "Think about overlap."
      },
      {
        question: "What does A − B contain?",
        choices: [
          "Elements in A that are not in B",
          "Elements in B that are not in A",
          "All elements in A and B"
        ],
        answer: "Elements in A that are not in B",
        hint: "The order of subtraction matters."
      },
      {
        question: "The complement of A is defined relative to which set?",
        choices: [
          "The universal set",
          "The empty set only",
          "Any unrelated set"
        ],
        answer: "The universal set",
        hint: "It establishes the full group of possible elements."
      }
    ]
  },
    {
    title: "💻 BINARY ADDITION",
    questions: [
      {
        question: "What is 1 + 1 in binary?",
        choices: ["10", "11", "01"],
        answer: "10",
        hint: "Write 0 and carry 1."
      },
      {
        question: "What is 1 + 0 in binary?",
        choices: ["0", "1", "10"],
        answer: "1",
        hint: "Adding zero leaves the number unchanged."
      },
      {
        question: "What is 10 + 1 in binary?",
        choices: ["11", "10", "100"],
        answer: "11",
        hint: "Binary 10 represents decimal 2."
      },
      {
        question: "What is 11 + 1 in binary?",
        choices: ["100", "111", "10"],
        answer: "100",
        hint: "1 + 1 produces 0 with a carry."
      },
      {
        question: "What is 10 + 10 in binary?",
        choices: ["100", "11", "101"],
        answer: "100",
        hint: "Decimal 2 + 2 = 4."
      },
      {
        question: "What is 101 + 1 in binary?",
        choices: ["110", "111", "100"],
        answer: "110",
        hint: "Decimal 5 + 1 = 6."
      },
      {
        question: "What is 101 + 10 in binary?",
        choices: ["111", "110", "100"],
        answer: "111",
        hint: "Decimal 5 + 2 = 7."
      },
      {
        question: "What is 111 + 1 in binary?",
        choices: ["1000", "1111", "110"],
        answer: "1000",
        hint: "Three 1s carry into a new leading digit."
      },
      {
        question: "What is 100 + 11 in binary?",
        choices: ["111", "110", "101"],
        answer: "111",
        hint: "Decimal 4 + 3 = 7."
      },
      {
        question: "What is 110 + 10 in binary?",
        choices: ["1000", "111", "101"],
        answer: "1000",
        hint: "Decimal 6 + 2 = 8."
      },
      {
        question: "What is 11 + 11 in binary?",
        choices: ["110", "101", "100"],
        answer: "110",
        hint: "Decimal 3 + 3 = 6."
      },
      {
        question: "What is 1001 + 1 in binary?",
        choices: ["1010", "1000", "1100"],
        answer: "1010",
        hint: "Decimal 9 + 1 = 10."
      },
      {
        question: "What is 1010 + 10 in binary?",
        choices: ["1100", "1011", "1000"],
        answer: "1100",
        hint: "Decimal 10 + 2 = 12."
      },
      {
        question: "In binary addition, what is 1 + 1 + carry 1?",
        choices: ["11", "10", "01"],
        answer: "11",
        hint: "The total is decimal 3."
      },
      {
        question: "What is 111 + 11 in binary?",
        choices: ["1010", "1001", "1110"],
        answer: "1010",
        hint: "Decimal 7 + 3 = 10."
      }
    ]
  },

  {
    title: "🔄 NUMBER SYSTEM CONVERSIONS",
    questions: [
      {
        question: "What is binary 10 in decimal?",
        choices: ["1", "2", "3"],
        answer: "2",
        hint: "The rightmost binary place is worth 1."
      },
      {
        question: "What is binary 11 in decimal?",
        choices: ["2", "3", "4"],
        answer: "3",
        hint: "Add 2 + 1."
      },
      {
        question: "What is decimal 5 in binary?",
        choices: ["101", "110", "100"],
        answer: "101",
        hint: "4 + 1 makes 5."
      },
      {
        question: "What is decimal 8 in binary?",
        choices: ["1000", "1001", "111"],
        answer: "1000",
        hint: "Eight is 2 raised to the third power."
      },
      {
        question: "What is hexadecimal A in decimal?",
        choices: ["10", "11", "12"],
        answer: "10",
        hint: "Hexadecimal digits A through F represent 10 through 15."
      },
      {
        question: "What is hexadecimal F in decimal?",
        choices: ["14", "15", "16"],
        answer: "15",
        hint: "F is the last hexadecimal digit."
      },
      {
        question: "What is decimal 10 in hexadecimal?",
        choices: ["A", "B", "C"],
        answer: "A",
        hint: "A represents decimal 10."
      },
      {
        question: "What is binary 100 in decimal?",
        choices: ["2", "4", "8"],
        answer: "4",
        hint: "The leftmost 1 is in the 2² place."
      },
      {
        question: "What is decimal 7 in binary?",
        choices: ["111", "101", "110"],
        answer: "111",
        hint: "4 + 2 + 1 = 7."
      },
      {
        question: "What is decimal 15 in binary?",
        choices: ["1111", "1010", "1000"],
        answer: "1111",
        hint: "8 + 4 + 2 + 1 = 15."
      },
      {
        question: "What is octal 10 in decimal?",
        choices: ["8", "10", "2"],
        answer: "8",
        hint: "Octal uses powers of 8."
      },
      {
        question: "What is decimal 9 in hexadecimal?",
        choices: ["9", "A", "B"],
        answer: "9",
        hint: "Decimal digits 0–9 remain the same in hexadecimal."
      },
      {
        question: "What is binary 1010 in decimal?",
        choices: ["8", "10", "12"],
        answer: "10",
        hint: "8 + 2 = 10."
      },
      {
        question: "What is decimal 12 in binary?",
        choices: ["1100", "1010", "1110"],
        answer: "1100",
        hint: "8 + 4 = 12."
      },
      {
        question: "What is hexadecimal B in decimal?",
        choices: ["10", "11", "12"],
        answer: "11",
        hint: "B comes after A in hexadecimal."
      }
    ]
  },

  {
    title: "⚡ BOOLEAN ALGEBRA",
    questions: [
      {
        question: "What is 1 AND 1?",
        choices: ["0", "1", "10"],
        answer: "1",
        hint: "AND is true when both inputs are true."
      },
      {
        question: "What is 1 AND 0?",
        choices: ["0", "1", "10"],
        answer: "0",
        hint: "Both inputs must be 1 for AND."
      },
      {
        question: "What is 1 OR 0?",
        choices: ["0", "1", "10"],
        answer: "1",
        hint: "OR is true if at least one input is true."
      },
      {
        question: "What is 0 OR 0?",
        choices: ["0", "1", "10"],
        answer: "0",
        hint: "Neither input is true."
      },
      {
        question: "What is NOT 1?",
        choices: ["0", "1", "10"],
        answer: "0",
        hint: "NOT reverses the input."
      },
      {
        question: "What is NOT 0?",
        choices: ["0", "1", "10"],
        answer: "1",
        hint: "NOT reverses the input."
      },
      {
        question: "What is 1 XOR 1?",
        choices: ["0", "1", "10"],
        answer: "0",
        hint: "XOR is 1 when the inputs differ."
      },
      {
        question: "What is 1 XOR 0?",
        choices: ["0", "1", "10"],
        answer: "1",
        hint: "The inputs are different."
      },
      {
        question: "According to the identity law, what is A OR 0?",
        choices: ["0", "1", "A"],
        answer: "A",
        hint: "OR with 0 leaves A unchanged."
      },
      {
        question: "According to the identity law, what is A AND 1?",
        choices: ["A", "0", "1"],
        answer: "A",
        hint: "AND with 1 leaves A unchanged."
      },
      {
        question: "What is A OR 1?",
        choices: ["A", "0", "1"],
        answer: "1",
        hint: "OR is true when one input is 1."
      },
      {
        question: "What is A AND 0?",
        choices: ["A", "0", "1"],
        answer: "0",
        hint: "AND requires both inputs to be 1."
      },
      {
        question: "What is A OR A?",
        choices: ["A", "0", "1"],
        answer: "A",
        hint: "The idempotent law applies."
      },
      {
        question: "What is A AND A?",
        choices: ["A", "0", "1"],
        answer: "A",
        hint: "The idempotent law applies."
      },
      {
        question: "What is NOT(NOT A)?",
        choices: ["A", "NOT A", "0"],
        answer: "A",
        hint: "Two inversions return the original value."
      },
      {
        question: "Which gate outputs 1 only when both inputs are 1?",
        choices: ["AND", "OR", "NOT"],
        answer: "AND",
        hint: "It requires both inputs to be true."
      },
      {
        question: "Which gate outputs 1 when at least one input is 1?",
        choices: ["AND", "OR", "NOT"],
        answer: "OR",
        hint: "It accepts either true input."
      },
      {
        question: "Which gate reverses its input?",
        choices: ["NOT", "AND", "OR"],
        answer: "NOT",
        hint: "It is also called an inverter."
      }
    ]
  }
  ];

// Escape HTML para ligtas ipakita ang pangalan ng player.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

// Ipakita ang welcome screen.
function showWelcome() {
  clearInterval(timerId);

  gameContainer.innerHTML = `
    <section class="welcome-screen">
      <h1>🏴‍☠️ THE SET THEORY TREASURE QUEST</h1>
      <p>Answer questions, earn points, and find the treasure!</p>

      <label for="playerName">Player Name</label>
      <input id="playerName" type="text" placeholder="Enter your name" maxlength="25">

      <label for="gameMode">Game Mode</label>
      <select id="gameMode">
        <option value="single">Single Player</option>
        <option value="multi">Local Multiplayer (2 Players)</option>
      </select>

      <div id="secondPlayerBox" hidden>
        <label for="playerTwoName">Player 2 Name</label>
        <input id="playerTwoName" type="text" placeholder="Enter Player 2 name" maxlength="25">
      </div>

      <label for="difficultySelect">Difficulty</label>
      <select id="difficultySelect">
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label for="topicSelect">Topic</label>
      <select id="topicSelect">
        <option value="all">All Topics</option>
        ${topics.map((topic, index) =>
          `<option value="${index}">${topic.title}</option>`
        ).join("")}
      </select>

      <button id="startGameBtn">Start Adventure 🚀</button>
    </section>
  `;

  const modeSelect = document.querySelector("#gameMode");
  const secondPlayerBox = document.querySelector("#secondPlayerBox");

  modeSelect.addEventListener("change", function () {
    secondPlayerBox.hidden = modeSelect.value !== "multi";
  });

  document.querySelector("#startGameBtn").addEventListener("click", startGame);
}

// Simulan ang game.
function startGame() {
  const nameInput = document.querySelector("#playerName");
  const playerTwoInput = document.querySelector("#playerTwoName");
  const mode = document.querySelector("#gameMode").value;
  const selectedDifficulty = document.querySelector("#difficultySelect").value;
  const selectedTopic = document.querySelector("#topicSelect").value;

  playerName = nameInput.value.trim() || "Player 1";
  difficulty = selectedDifficulty;
  multiplayerMode = mode === "multi";

  if (multiplayerMode) {
    const secondName = playerTwoInput.value.trim();

    if (!secondName) {
      alert("Pare, ilagay muna ang pangalan ng Player 2!");
      playerTwoInput.focus();
      return;
    }

    multiplayerPlayers = [playerName, secondName];
    multiplayerScores = [0, 0];
    currentPlayerIndex = 0;
    questionTurnCount = 0;
  } else {
    multiplayerPlayers = [];
    multiplayerScores = [0, 0];
  }

  score = 0;
  questionIndex = 0;
  treasureMoves = 5;
  treasureBag = [];
  usedHint = false;
  answered = false;

  const settings = difficultySettings[difficulty];

  if (selectedTopic === "all") {
    activeQuestions = topics.flatMap(topic =>
      topic.questions.map(question => ({
        ...question,
        topicTitle: topic.title
      }))
    );
  } else {
    const topic = topics[Number(selectedTopic)];

    if (!topic) {
      alert("Invalid topic selection.");
      return;
    }

    activeQuestions = topic.questions.map(question => ({
      ...question,
      topicTitle: topic.title
    }));
  }

  activeQuestions = activeQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(settings.count, activeQuestions.length));

  if (activeQuestions.length === 0) {
    alert("No questions available.");
    return;
  }

  showQuestion();
}

// Ipakita ang kasalukuyang tanong.
function showQuestion() {
  clearInterval(timerId);

  if (questionIndex >= activeQuestions.length) {
    showResults();
    return;
  }

  answered = false;
  usedHint = false;
  timeLeft = difficultySettings[difficulty].seconds;

  const question = activeQuestions[questionIndex];
  const settings = difficultySettings[difficulty];

  gameContainer.innerHTML = `
    <section class="game-screen">
      <header class="game-header">
        <h2>🏴‍☠️ Treasure Quest</h2>
        <p>${escapeHTML(question.topicTitle || "Math Challenge")}</p>
      </header>

      <div class="scoreboard">
        ${getScoreboardHTML()}
      </div>

      <div class="game-stats">
        <span>Question ${questionIndex + 1} / ${activeQuestions.length}</span>
        <span>Difficulty: ${escapeHTML(difficulty)}</span>
        <span>⏱️ <strong id="timer">${timeLeft}</strong>s</span>
      </div>

      <div class="question-card">
        <h3 id="turnLabel">
          ${multiplayerMode
            ? `Turn: ${escapeHTML(getCurrentPlayerName())}`
            : `Player: ${escapeHTML(playerName)}`}
        </h3>

        <h2>${escapeHTML(question.question)}</h2>

        <div id="answerChoices" class="answer-choices">
          ${question.choices.map((choice, index) => `
            <button class="answer-btn" data-choice="${index}">
              ${escapeHTML(choice)}
            </button>
          `).join("")}
        </div>

        <div id="feedback" aria-live="polite"></div>

        <button id="hintBtn" class="hint-btn">💡 Use Hint</button>
        <button id="nextBtn" hidden>Next Question ➡️</button>
      </div>

      <div class="treasure-info">
        <p>🎒 Treasure moves remaining: <strong>${treasureMoves}</strong></p>
      </div>
    </section>
  `;

  document.querySelectorAll(".answer-btn").forEach(button => {
    button.addEventListener("click", function () {
      checkAnswer(Number(button.dataset.choice));
    });
  });

  document.querySelector("#hintBtn").addEventListener("click", showHint);

  document.querySelector("#nextBtn").addEventListener("click", nextQuestion);

  startTimer(settings.seconds);
}

// Countdown timer.
function startTimer(seconds) {
  clearInterval(timerId);
  timeLeft = seconds;

  timerId = setInterval(function () {
    timeLeft--;

    const timerElement = document.querySelector("#timer");

    if (timerElement) {
      timerElement.textContent = timeLeft;
    }

    if (timeLeft <= 0) {
      clearInterval(timerId);

      if (!answered) {
        handleTimeout();
      }
    }
  }, 1000);
}

// Suriin ang sagot ng player.
function checkAnswer(choiceIndex) {
  if (answered) return;

  answered = true;
  clearInterval(timerId);

  const question = activeQuestions[questionIndex];
  const chosenAnswer = question.choices[choiceIndex];
  const isCorrect = chosenAnswer === question.answer;
  const feedback = document.querySelector("#feedback");

  document.querySelectorAll(".answer-btn").forEach(button => {
    button.disabled = true;

    const index = Number(button.dataset.choice);
    const choice = question.choices[index];

    if (choice === question.answer) {
      button.classList.add("correct");
    } else if (index === choiceIndex && !isCorrect) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    const points = difficultySettings[difficulty].points;
    addPoints(points);

    feedback.innerHTML = `
      <p class="correct-message">
        ✅ Correct, ${escapeHTML(getCurrentPlayerName())}!
        +${points} points!
      </p>
    `;

    treasureMoves = Math.min(treasureMoves + 1, 10);
  } else {
    feedback.innerHTML = `
      <p class="incorrect-message">
        ❌ Not quite! The correct answer is
        <strong>${escapeHTML(question.answer)}</strong>.
      </p>
    `;

    treasureMoves = Math.max(0, treasureMoves - 1);
  }

  questionTurnCount++;

  if (multiplayerMode && currentPlayerIndex === 0) {
    currentPlayerIndex = 1;

    feedback.innerHTML += `
      <p>Next turn: ${escapeHTML(getCurrentPlayerName())}</p>
    `;
  } else if (multiplayerMode) {
    currentPlayerIndex = 0;
  }

  document.querySelector("#hintBtn").disabled = true;
  document.querySelector("#nextBtn").hidden = false;

  // I-update ang score display.
  const scoreboard = document.querySelector(".scoreboard");

  if (scoreboard) {
    scoreboard.innerHTML = getScoreboardHTML();
  }
}

// Kapag naubos ang oras.
function handleTimeout() {
  if (answered) return;

  answered = true;

  const question = activeQuestions[questionIndex];
  const feedback = document.querySelector("#feedback");

  document.querySelectorAll(".answer-btn").forEach(button => {
    button.disabled = true;

    const index = Number(button.dataset.choice);

    if (question.choices[index] === question.answer) {
      button.classList.add("correct");
    }
  });

  feedback.innerHTML = `
    <p class="incorrect-message">
      ⏰ Time's up! Correct answer:
      <strong>${escapeHTML(question.answer)}</strong>
    </p>
  `;

  treasureMoves = Math.max(0, treasureMoves - 1);

  questionTurnCount++;

  if (multiplayerMode && currentPlayerIndex === 0) {
    currentPlayerIndex = 1;
    feedback.innerHTML += `
      <p>Next turn: ${escapeHTML(getCurrentPlayerName())}</p>
    `;
  } else if (multiplayerMode) {
    currentPlayerIndex = 0;
  }

  document.querySelector("#hintBtn").disabled = true;
  document.querySelector("#nextBtn").hidden = false;
}

// Hint button.
function showHint() {
  if (answered || usedHint) return;

  usedHint = true;

  const question = activeQuestions[questionIndex];
  const feedback = document.querySelector("#feedback");

  feedback.innerHTML = `
    <p class="hint-message">
      💡 Hint: ${escapeHTML(question.hint || "Review the topic carefully.")}
    </p>
  `;

  document.querySelector("#hintBtn").disabled = true;
}

// Susunod na tanong.
function nextQuestion() {
  clearInterval(timerId);

  questionIndex++;
  showQuestion();
}

// Ipakita ang final scores at winner.
function showResults() {
  clearInterval(timerId);

  let resultHTML = "";

  if (multiplayerMode) {
    const [scoreOne, scoreTwo] = multiplayerScores;

    let winnerMessage = "";

    if (scoreOne > scoreTwo) {
      winnerMessage = `🏆 ${escapeHTML(multiplayerPlayers[0])} wins!`;
    } else if (scoreTwo > scoreOne) {
      winnerMessage = `🏆 ${escapeHTML(multiplayerPlayers[1])} wins!`;
    } else {
      winnerMessage = "🤝 It's a tie!";
    }

    resultHTML = `
      <div class="final-scores">
        <h2>Final Scores</h2>
        <p>${escapeHTML(multiplayerPlayers[0])}: <strong>${scoreOne}</strong></p>
        <p>${escapeHTML(multiplayerPlayers[1])}: <strong>${scoreTwo}</strong></p>
        <h2>${winnerMessage}</h2>
      </div>
    `;
  } else {
    resultHTML = `
      <div class="final-scores">
        <p>Player: ${escapeHTML(playerName)}</p>
        <h2>Final Score: ${score}</h2>
      </div>
    `;
  }

  gameContainer.innerHTML = `
    <section class="results-screen">
      <h1>🎉 Adventure Complete!</h1>
      <p>You finished the ${escapeHTML(difficulty)} challenge.</p>

      ${resultHTML}

      <p>🎒 Treasure moves left: ${treasureMoves}</p>

      <button id="playAgainBtn">🔄 Play Again</button>
    </section>
  `;

  document.querySelector("#playAgainBtn").addEventListener("click", showWelcome);
}

// Simulan ang welcome screen sa pagbukas ng page.
showWelcome();
