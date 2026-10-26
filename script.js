
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
let currentPlayerIndex = 0;
let multiplayerScores = [0, 0];


const difficultySettings = {
  Easy: { seconds: 30, points: 10, count: 5 },
  Medium: { seconds: 20, points: 20, count: 7 },
  Hard: { seconds: 12, points: 30, count: 8 }
};

const topics = [
  {
    title: "📚 TYPES OF SETS",
    questions: [
      { question: "Which set contains a limited number of elements?", choices: ["Finite Set", "Infinite Set", "Empty Set"], answer: "Finite Set", hint: "Its number of elements can be counted." },
      { question: "Which set has no elements?", choices: ["Singleton Set", "Empty Set", "Universal Set"], answer: "Empty Set", hint: "It is also called the null set." },
      { question: "Which set contains exactly one element?", choices: ["Infinite Set", "Singleton Set", "Empty Set"], answer: "Singleton Set", hint: "Think of a set with just one member." },
      { question: "Which set contains an unlimited number of elements?", choices: ["Finite Set", "Empty Set", "Infinite Set"], answer: "Infinite Set", hint: "Its elements never end." },
      { question: "If A = {1, 2} and B = {1, 2}, what is their relationship?", choices: ["Equal Sets", "Disjoint Sets", "Empty Sets"], answer: "Equal Sets", hint: "Both sets have the exact same elements." },
      { question: "If A = {1, 2} and B = {3, 4}, what are these sets?", choices: ["Equal Sets", "Disjoint Sets", "Overlapping Sets"], answer: "Disjoint Sets", hint: "They have no common elements." },
      { question: "If A = {1, 2} and B = {2, 3}, what type of sets are they?", choices: ["Disjoint Sets", "Overlapping Sets", "Empty Sets"], answer: "Overlapping Sets", hint: "They share one element." },
      { question: "If every element of A is also in B, what is A in relation to B?", choices: ["A subset of B", "A disjoint set", "An infinite set"], answer: "A subset of B", hint: "Use the subset relationship." },
      { question: "Which symbol means 'is an element of'?", choices: ["∈", "∪", "∩"], answer: "∈", hint: "This symbol indicates membership." },
      { question: "If A = {2, 4, 6}, is 4 an element of A?", choices: ["Yes", "No", "A is empty"], answer: "Yes", hint: "Check whether 4 appears in A." },
      { question: "Which symbol means 'is a subset of'?", choices: ["⊆", "∩", "∪"], answer: "⊆", hint: "It represents a subset." },
      { question: "If A = {1, 2} and B = {1, 2, 3}, is A a subset of B?", choices: ["Yes", "No", "They are disjoint"], answer: "Yes", hint: "Every element of A appears in B." },
      { question: "What is a proper subset?", choices: ["A subset that is not equal to the original set", "A set with no elements", "A set with infinite elements"], answer: "A subset that is not equal to the original set", hint: "It is a subset but not the same set." },
      { question: "What makes two finite sets equivalent?", choices: ["They have the same number of elements", "They have exactly the same elements", "They have no elements"], answer: "They have the same number of elements", hint: "Compare their cardinalities." },
      { question: "What is the universal set?", choices: ["The set of all elements being considered", "A set with one element only", "A set with no elements"], answer: "The set of all elements being considered", hint: "It contains the elements under discussion." },
      { question: "Which symbol commonly represents the empty set?", choices: ["∅", "∪", "∈"], answer: "∅", hint: "It looks like a crossed-out circle." },
      { question: "If A = {a, b, c}, how many elements are in A?", choices: ["2", "3", "4"], answer: "3", hint: "Count each different element." },
      { question: "If A = {1, 2, 3}, which statement is true?", choices: ["2 ∈ A", "5 ∈ A", "4 ∈ A"], answer: "2 ∈ A", hint: "Check which number belongs to A." },
      { question: "If A = {1, 2} and B = {2, 3}, which element do they share?", choices: ["1", "2", "3"], answer: "2", hint: "Find the common element." }
    ]
  },
  {
    title: "🔢 SET OPERATIONS",
    questions: [
      { question: "What is {1, 2} ∪ {2, 3}?", choices: ["{2}", "{1, 2, 3}", "{1, 3}"], answer: "{1, 2, 3}", hint: "Union combines elements without duplicates." },
      { question: "What is {1, 2} ∩ {2, 3}?", choices: ["{1, 2, 3}", "{1}", "{2}"], answer: "{2}", hint: "Intersection means common elements." },
      { question: "What is {1, 2} − {2, 3}?", choices: ["{1}", "{2}", "{1, 2, 3}"], answer: "{1}", hint: "Keep elements in the first set only." },
      { question: "If U = {1, 2, 3, 4} and A = {1, 2}, what is Aᶜ?", choices: ["{1, 2}", "{3, 4}", "{1, 2, 3, 4}"], answer: "{3, 4}", hint: "Complement contains elements in U but not A." },
      { question: "What is {a, b} ∪ {b, c}?", choices: ["{b}", "{a, b, c}", "{a, c}"], answer: "{a, b, c}", hint: "Combine all unique elements." },
      { question: "What is {2, 4, 6} ∩ {4, 6, 8}?", choices: ["{2, 8}", "{4, 6}", "{2, 4, 6, 8}"], answer: "{4, 6}", hint: "Choose the elements in both sets." },
      { question: "What is {1, 2, 3} − {1, 3}?", choices: ["{1, 3}", "{2}", "{1, 2, 3}"], answer: "{2}", hint: "Remove 1 and 3 from the first set." },
      { question: "If U = {a, b, c, d} and A = {a, c}, what is Aᶜ?", choices: ["{a, c}", "{b, d}", "{a, b, c, d}"], answer: "{b, d}", hint: "Find the elements of U not in A." },
      { question: "What is {1, 2} ∪ ∅?", choices: ["∅", "{1, 2}", "{1}"], answer: "{1, 2}", hint: "Union with the empty set adds nothing." },
      { question: "What is {1, 2} ∩ ∅?", choices: ["{1, 2}", "{1}", "∅"], answer: "∅", hint: "There are no shared elements." },
      { question: "What is {3, 4, 5} − {4}?", choices: ["{4}", "{3, 5}", "{3, 4, 5}"], answer: "{3, 5}", hint: "Remove 4 from the first set." },
      { question: "What is {a, b, c} ∪ {c, d}?", choices: ["{c}", "{a, b, c, d}", "{a, b, d}"], answer: "{a, b, c, d}", hint: "List every element only once." },
      { question: "What is {2, 4, 6} ∩ {1, 3, 5}?", choices: ["{2, 4, 6}", "{1, 3, 5}", "∅"], answer: "∅", hint: "Do these sets share any elements?" },
      { question: "If A = {1, 3, 5} and B = {1, 2, 3}, what is A − B?", choices: ["{1, 3}", "{5}", "{1, 2, 3, 5}"], answer: "{5}", hint: "Keep elements in A that are not in B." },
      { question: "What does union combine?", choices: ["All elements from both sets without duplicates", "Only the common elements", "Only elements in the first set"], answer: "All elements from both sets without duplicates", hint: "Union is the combined set." },
      { question: "What does intersection find?", choices: ["All elements from both sets", "Elements common to both sets", "Elements outside the universal set"], answer: "Elements common to both sets", hint: "Think about overlap." },
      { question: "What does A − B contain?", choices: ["Elements in A that are not in B", "Elements in B that are not in A", "All elements in A and B"], answer: "Elements in A that are not in B", hint: "The order of subtraction matters." },
      { question: "The complement of A is defined relative to which set?", choices: ["The universal set", "The empty set only", "Any unrelated set"], answer: "The universal set", hint: "It establishes the full group of possible elements." }
    ]
  },
  {
    title: "💻 BINARY ADDITION",
    questions: [
      { question: "What is 0 + 0 in binary?", choices: ["0", "1", "10"], answer: "0", hint: "Adding two zeroes gives zero." },
      { question: "What is 0 + 1 in binary?", choices: ["0", "1", "10"], answer: "1", hint: "One plus zero is one." },
      { question: "What is 1 + 1 in binary?", choices: ["0", "1", "10"], answer: "10", hint: "Binary uses base two, so carry a one." },
      { question: "What is 1 + 1 + 1 in binary?", choices: ["10", "11", "100"], answer: "11", hint: "Three in decimal is 11 in binary." },
      { question: "What is 10₂ + 1₂?", choices: ["10₂", "11₂", "100₂"], answer: "11₂", hint: "Two plus one equals three." },
      { question: "What is 11₂ + 1₂?", choices: ["100₂", "101₂", "111₂"], answer: "100₂", hint: "Three plus one equals four." },
      { question: "What is 101₂ + 10₂?", choices: ["110₂", "111₂", "1000₂"], answer: "111₂", hint: "Five plus two equals seven." },
      { question: "What is 110₂ + 11₂?", choices: ["1000₂", "1001₂", "1010₂"], answer: "1001₂", hint: "Six plus three equals nine." }
    ]
  },
  {
    title: "🔄 NUMBER SYSTEM CONVERSIONS",
    questions: [
      { question: "What is decimal 5 in binary?", choices: ["101", "110", "111"], answer: "101", hint: "Four plus one equals five." },
      { question: "What is binary 1010₂ in decimal?", choices: ["8", "10", "12"], answer: "10", hint: "Eight plus two equals ten." },
      { question: "What is decimal 8 in binary?", choices: ["1000", "1010", "1100"], answer: "1000", hint: "Eight is 2³." },
      { question: "What is binary 111₂ in decimal?", choices: ["5", "6", "7"], answer: "7", hint: "Four plus two plus one." },
      { question: "What is decimal 15 in hexadecimal?", choices: ["E", "F", "10"], answer: "F", hint: "Hexadecimal digits A through F represent 10 through 15." },
      { question: "What is hexadecimal A in decimal?", choices: ["8", "10", "12"], answer: "10", hint: "A is the first letter used for a two-digit decimal value." },
      { question: "What is decimal 16 in hexadecimal?", choices: ["F", "10", "11"], answer: "10", hint: "A new hexadecimal place begins at sixteen." },
      { question: "What is binary 10000₂ in decimal?", choices: ["8", "16", "32"], answer: "16", hint: "The leftmost 1 represents 2 to the fourth power." }
    ]
  },
  {
    title: "⚡ BOOLEAN ALGEBRA",
    questions: [
      { question: "What values can a Boolean variable have?", choices: ["True or False (1 or 0)", "Any integer", "Only positive numbers"], answer: "True or False (1 or 0)", hint: "Boolean logic has two possible values." },
      { question: "What is the identity law for OR?", choices: ["A + 0 = A", "A + 1 = A", "A · 0 = A"], answer: "A + 0 = A", hint: "OR with zero does not change A." },
      { question: "What is the identity law for AND?", choices: ["A · 1 = A", "A · 0 = A", "A + 1 = A"], answer: "A · 1 = A", hint: "AND with one does not change A." },
      { question: "According to the complement law, A + A′ equals what?", choices: ["A", "0", "1"], answer: "1", hint: "A value OR its complement is always true." },
      { question: "According to the complement law, A · A′ equals what?", choices: ["1", "0", "A"], answer: "0", hint: "A value AND its opposite is always false." },
      { question: "Simplify A + A using the idempotent law.", choices: ["0", "A", "1"], answer: "A", hint: "Repeating the same value with OR changes nothing." },
      { question: "Simplify A · (A + B) using the absorption law.", choices: ["A", "B", "A + B"], answer: "A", hint: "Apply the absorption law." },
      { question: "Simplify AB + A′C + BC using the Consensus theorem.", choices: ["AB + A′C", "AB + BC", "A′C + BC"], answer: "AB + A′C", hint: "The consensus term BC is redundant." }
    ]
  }
];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[ch]);
}

function stopTimer() {
  if (timerId !== null) clearInterval(timerId);
  timerId = null;
}

function showWelcomeScreen() {
  stopTimer();
  gameContainer.innerHTML = `
    <div class="treasure-icon">💎 🗝️ 💰</div>
    <h1>THE SET THEORY<br>TREASURE QUEST</h1>
    <p class="subtitle">Collect numbers. Solve set challenges. Find the treasure!</p>
    <div class="treasure-chest">🧰</div>
    <p class="description">Enter your name to begin your mathematical treasure hunt.</p>
    
<form id="nameForm">
  <label for="playerNameInput">Player 1 Name</label>
  <input id="playerNameInput" maxlength="30"
    placeholder="Enter Player 1 name" required>

  <label for="player2NameInput">Player 2 Name (Multiplayer only)</label>
  <input id="player2NameInput" maxlength="30"
    placeholder="Enter Player 2 name">

  <label for="gameMode">Choose Game Mode</label>
  <select id="gameMode">
    <option value="single">Single Player</option>
    <option value="multi">Local Multiplayer (2 Players)</option>
  </select>

  <button type="submit">START GAME →</button>
</form>

    <p class="topics">Types of Sets · Set Operations · Binary Addition · Number Systems · Boolean Algebra</p>
  `;

 
document.getElementById("nameForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("playerNameInput").value.trim();
  const player2Name = document.getElementById("player2NameInput").value.trim();
  const selectedMode = document.getElementById("gameMode").value;

  if (!name) return;

  multiplayerMode = selectedMode === "multi";

  if (multiplayerMode && !player2Name) {
    alert("Please enter Player 2's name.");
    return;
  }

  playerName = name;
  score = 0;
  questionIndex = 0;

  if (multiplayerMode) {
    multiplayerPlayers = [name, player2Name];
    multiplayerScores = [0, 0];
    currentPlayerIndex = 0;
  } else {
    multiplayerPlayers = [name];
    multiplayerScores = [0, 0];
    currentPlayerIndex = 0;
  }

  showDifficultySelection();
});

}

function showDifficultySelection() {
  stopTimer();
  gameContainer.innerHTML = `
    <div class="treasure-icon">🗝️ 💎</div>
    <h1>CHOOSE YOUR DIFFICULTY</h1>
    <p class="subtitle">Welcome, ${escapeHTML(playerName)}!</p>
    <p class="description">Choose how challenging your treasure hunt should be.</p>
    <div class="selection-group">
      <h2>SELECT DIFFICULTY</h2>
      <div class="difficulty-options">
        <button class="${difficulty === "Easy" ? "selected" : "secondary"}" data-difficulty="Easy">🌱 EASY</button>
        <button class="${difficulty === "Medium" ? "selected" : "secondary"}" data-difficulty="Medium">⚔️ MEDIUM</button>
        <button class="${difficulty === "Hard" ? "selected" : "secondary"}" data-difficulty="Hard">🔥 HARD</button>
      </div>
      <p id="difficultyInfo" class="description"></p>
    </div>
    <button id="continueButton">CONTINUE TO TOPICS →</button>
  `;

  function updateDifficultyInfo() {
    const setting = difficultySettings[difficulty];
    document.getElementById("difficultyInfo").textContent =
      `${difficulty}: ${setting.seconds} seconds per question · ${setting.points} points for each correct answer · ${setting.count} questions per topic`;
  }

  gameContainer.querySelectorAll("[data-difficulty]").forEach(button => {
    button.addEventListener("click", () => {
      difficulty = button.dataset.difficulty;
      gameContainer.querySelectorAll("[data-difficulty]").forEach(item => {
        item.className = item.dataset.difficulty === difficulty ? "selected" : "secondary";
      });
      updateDifficultyInfo();
    });
  });

  updateDifficultyInfo();
  document.getElementById("continueButton").addEventListener("click", showTopicSelection);
}

function showTopicSelection() {
  stopTimer();
  gameContainer.innerHTML = `
    <div class="treasure-icon">🗺️</div>
    <h1>CHOOSE YOUR CHALLENGE</h1>
    <p class="subtitle">Player: ${escapeHTML(playerName)} · Difficulty: ${difficulty}</p>
    <div class="stats">
      <div class="stat"><strong>${score}</strong><span>Current Score</span></div>
      <div class="stat"><strong>${difficultySettings[difficulty].seconds}s</strong><span>Per Question</span></div>
      <div class="stat"><strong>5</strong><span>Topics</span></div>
    </div>
    <div class="selection-group">
      <h2>SELECT A TOPIC</h2>
      <div class="topic-grid">
        <button data-topic="treasure">💎 Treasure Bag Challenge</button>
        ${topics.map((topic, i) => `<button data-topic="${i}">${topic.title}</button>`).join("")}
      </div>
    </div>
    <button class="secondary" id="changeDifficulty">← Change Difficulty</button>
  `;

  gameContainer.querySelectorAll("[data-topic]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.topic === "treasure") {
        startTreasureChallenge();
      } else {
        startTopic(Number(button.dataset.topic));
      }
    });
  });

  document.getElementById("changeDifficulty").addEventListener("click", showDifficultySelection);
}

function startTreasureChallenge() {
  stopTimer();
  const numbers = shuffle([0,1,2,3,4,5,6,7,8,9]);
  targetSet = numbers.slice(0, Math.floor(Math.random() * 3) + 3).sort((a,b) => a-b);
  playerCards = shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,5);
  treasureBag = [];
  treasureMoves = 5;
  renderTreasureChallenge();
}

function renderTreasureChallenge() {
  gameContainer.innerHTML = `
    <h1>💎 TREASURE BAG</h1>
    <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
    <p class="description">Add only numbers that belong to the target set.</p>
    <h2>{${targetSet.join(", ")}}</h2>
    <p class="description">Choose from your cards. You have ${treasureMoves} moves left.</p>
    <div class="number-cards">
      ${playerCards.map(n => `<button class="number-card" data-number="${n}" ${treasureMoves === 0 ? "disabled" : ""}>${n}</button>`).join("")}
    </div>
    <h2>🎒 Your Treasure Bag</h2>
    <p>${treasureBag.length ? `{${treasureBag.join(", ")}}` : "Your bag is empty."}</p>
    <p class="feedback" id="treasureFeedback">Choose a card!</p>
    <p class="topics">Score: ${score} · Moves left: ${treasureMoves}</p>
    <button class="secondary" id="backTopics">← Topics</button>
    ${treasureMoves === 0 ? `<button id="treasureNext">CONTINUE TO TOPICS →</button>` : ""}
  `;

  gameContainer.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
      const number = Number(button.dataset.number);
      treasureMoves--;
      button.disabled = true;

      const feedback = document.getElementById("treasureFeedback");
      if (targetSet.includes(number)) {
        treasureBag.push(number);
        score += 10;
        feedback.textContent = `Correct! ${number} belongs to the target set. +10 points!`;
        feedback.className = "feedback good";
        window.__treasureRewardMessage = "🪙 +10";
      } else {
        feedback.textContent = `${number} does not belong to the target set.`;
        feedback.className = "feedback bad";
      }
      renderTreasureChallenge();
      document.getElementById("treasureFeedback").textContent = feedback.textContent;
      document.getElementById("treasureFeedback").className = feedback.className;
      if (window.__treasureRewardMessage) {
        const rewardMessage = window.__treasureRewardMessage;
        window.__treasureRewardMessage = "";
        spawnReward(rewardMessage);
      }
    });
  });

  document.getElementById("backTopics").addEventListener("click", showTopicSelection);
  const next = document.getElementById("treasureNext");
  if (next) next.addEventListener("click", showTopicSelection);
}

function startTopic(topicIndex) {
  stopTimer();
  const setting = difficultySettings[difficulty];
  activeQuestions = shuffle(topics[topicIndex].questions).slice(0, setting.count);
  questionIndex = 0;
  showQuestion(topicIndex);
}

function showQuestion(topicIndex) {
  stopTimer();

  if (questionIndex >= activeQuestions.length) {
    showTopicComplete(topicIndex);
    return;
  }

  answered = false;
  usedHint = false;
  timeLeft = difficultySettings[difficulty].seconds;
  const topic = topics[topicIndex];
  const current = activeQuestions[questionIndex];

  gameContainer.innerHTML = `
    <p class="subtitle">${topic.title}</p>
    <h1>QUESTION ${questionIndex + 1}</h1>
    <p class="topics">Player: ${escapeHTML(playerName)} · ${difficulty}</p>
    <div class="stats">
      <div class="stat"><strong id="timer">${timeLeft}</strong><span>Seconds Left</span></div>
      <div class="stat"><strong>${score}</strong><span>Score</span></div>
      <div class="stat"><strong>${questionIndex + 1}/${activeQuestions.length}</strong><span>Progress</span></div>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${(questionIndex / activeQuestions.length) * 100}%"></div></div>
    <div class="question-card">
      <p class="question-text">${escapeHTML(current.question)}</p>
      <div id="answers">
        ${shuffle(current.choices).map(choice => `<button class="answer" data-answer="${escapeHTML(choice)}">${escapeHTML(choice)}</button>`).join("")}
      </div>
      <p id="feedback" class="feedback">Choose your answer.</p>
      <div id="hintArea"></div>
    </div>
    <button class="secondary" id="hintButton">💡 SHOW HINT</button>
    <button class="secondary" id="quitTopic">← BACK TO TOPICS</button>
    <div id="continueArea"></div>
  `;

  gameContainer.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => checkAnswer(button, current, topicIndex));
  });

  document.getElementById("hintButton").addEventListener("click", () => {
    if (usedHint || answered) return;
    usedHint = true;
    document.getElementById("hintArea").innerHTML =
      `<p class="hint-box">💡 Hint: ${escapeHTML(current.hint || "Read the question carefully and eliminate incorrect choices.")}</p>`;
    document.getElementById("hintButton").disabled = true;
  });

  document.getElementById("quitTopic").addEventListener("click", () => {
    stopTimer();
    showTopicSelection();
  });

  timerId = setInterval(() => {
    timeLeft--;
    const timer = document.getElementById("timer");
    if (timer) timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      if (!answered) handleTimeout(current, topicIndex);
    }
  }, 1000);
}

function spawnReward(text = "💎", extraClass = "") {
  const reward = document.createElement("div");
  reward.className = `floating-reward ${extraClass}`.trim();
  reward.textContent = text;
  reward.setAttribute("aria-hidden", "true");
  gameContainer.appendChild(reward);
  reward.addEventListener("animationend", () => reward.remove(), { once: true });
  window.setTimeout(() => {
    if (reward.isConnected) reward.remove();
  }, 1600);
}

function checkAnswer(button, current, topicIndex) {
  if (answered) return;
  answered = true;
  stopTimer();

  const correct = button.dataset.answer === current.answer;
  const feedback = document.getElementById("feedback");

  gameContainer.querySelectorAll("[data-answer]").forEach(answerButton => {
    answerButton.disabled = true;
    if (answerButton.dataset.answer === current.answer) {
      answerButton.classList.add("correct");
    }
  });

  if (correct) {
    const earned = difficultySettings[difficulty].points;
    score += earned;
    feedback.innerHTML = `
      <span class="reward-icon" aria-hidden="true">💎</span>
      <span>Correct! +${earned} points!</span>
      <span class="reward-sparkle" aria-hidden="true">✨</span>
    `;
    feedback.className = "feedback good reward-feedback";
    spawnReward(`💎 +${earned}`);
  } else {
    button.classList.add("wrong");
    feedback.textContent = `Not quite. Correct answer: ${current.answer}`;
    feedback.className = "feedback bad";
  }

  showContinueButton(topicIndex);
}
function handleTimeout(current, topicIndex) {
  answered = true;
  gameContainer.querySelectorAll("[data-answer]").forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === current.answer) button.classList.add("correct");
  });
  const feedback = document.getElementById("feedback");
  feedback.textContent = `Time's up! Correct answer: ${current.answer}`;
  feedback.className = "feedback bad";
  spawnReward("⏳ TIME UP", "time-up-reward");
  showContinueButton(topicIndex);
}

function showContinueButton(topicIndex) {
  document.getElementById("continueArea").innerHTML = `<button id="continueQuestion">CONTINUE →</button>`;
  document.getElementById("continueQuestion").addEventListener("click", () => {
    questionIndex++;
    showQuestion(topicIndex);
  });
}

function showTopicComplete(topicIndex) {
  stopTimer();
  gameContainer.innerHTML = `
    <div class="treasure-icon">🏆</div>
    <h1>TOPIC COMPLETE!</h1>
    <p class="subtitle">${topics[topicIndex].title}</p>
    <p class="description">Nice work, ${escapeHTML(playerName)}! You finished this topic.</p>
    <div class="stats">
      <div class="stat"><strong>${score}</strong><span>Total Score</span></div>
      <div class="stat"><strong>${activeQuestions.length}</strong><span>Questions</span></div>
      <div class="stat"><strong>${difficulty}</strong><span>Difficulty</span></div>
    </div>
    <button id="anotherTopic">CHOOSE ANOTHER TOPIC</button>
    <button class="secondary" id="finishGame">VIEW FINAL RESULTS</button>
  `;
  document.getElementById("anotherTopic").addEventListener("click", showTopicSelection);
  document.getElementById("finishGame").addEventListener("click", showFinalResults);
}

function showFinalResults() {
  stopTimer();
  gameContainer.innerHTML = `
    <div class="treasure-icon">🏆 💎 🏆</div>
    <h1>TREASURE QUEST RESULTS</h1>
    <p class="subtitle">Congratulations, ${escapeHTML(playerName)}!</p>
    <p class="description">You earned a total of:</p>
    <h2 style="font-size:44px">${score} points</h2>
    <p class="description">Difficulty: ${difficulty}</p>
    <p class="topics">Keep practicing to improve your score!</p>
    <button id="playAgain">PLAY AGAIN</button>
    <button class="secondary" id="chooseTopicAgain">CHOOSE TOPIC</button>
  `;
  document.getElementById("playAgain").addEventListener("click", () => {
    score = 0;
    difficulty = "Easy";
    showWelcomeScreen();
  });
  document.getElementById("chooseTopicAgain").addEventListener("click", showTopicSelection);
}

showWelcomeScreen();
