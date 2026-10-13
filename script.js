
const game = document.querySelector(".game-container");

const questions = {
  "Types of Sets": {
    Easy: [
      { q: "What is a set with no elements called?", choices: ["Universal set", "Empty set", "Finite set", "Equal set"], answer: 1, hint: "It contains zero elements.", explanation: "An empty set has no elements and is written as ∅ or {}." },
      { q: "Which symbol means 'belongs to'?", choices: ["∈", "∪", "∩", "⊆"], answer: 0, hint: "It shows that an element is inside a set.", explanation: "The symbol ∈ means 'is an element of' a set." },
      { q: "Which set contains {1, 2, 3} and has exactly three elements?", choices: ["Empty set", "Infinite set", "Finite set", "Universal set"], answer: 2, hint: "The number of elements can be counted.", explanation: "A finite set has a limited number of elements." }
    ],
    Medium: [
      { q: "If A = {2, 4, 6} and B = {2, 4, 6}, what is their relationship?", choices: ["Disjoint", "Equal", "Empty", "Infinite"], answer: 1, hint: "Compare all the elements in both sets.", explanation: "Equal sets contain exactly the same elements." },
      { q: "If A = {1, 2} and B = {1, 2, 3}, which statement is true?", choices: ["B ⊆ A", "A ⊆ B", "A = B", "A and B are disjoint"], answer: 1, hint: "Every element of A is also in B.", explanation: "A is a subset of B because every element of A belongs to B." },
      { q: "What kind of sets have no common elements?", choices: ["Equal sets", "Overlapping sets", "Disjoint sets", "Universal sets"], answer: 2, hint: "Their intersection is empty.", explanation: "Disjoint sets share no elements, so their intersection is ∅." }
    ],
    Hard: [
      { q: "If A = {1, 2, 3, 4}, how many subsets does A have?", choices: ["4", "8", "12", "16"], answer: 3, hint: "Use the formula 2ⁿ, where n is the number of elements.", explanation: "A set with 4 elements has 2⁴ = 16 subsets, including ∅ and A." },
      { q: "If a set has 5 elements, how many proper subsets does it have?", choices: ["32", "31", "25", "10"], answer: 1, hint: "Find 2⁵, then exclude the set itself.", explanation: "There are 2⁵ = 32 subsets. Excluding the set itself leaves 31 proper subsets." },
      { q: "If A ⊆ B and B ⊆ A, what must be true?", choices: ["A and B are disjoint", "A is empty", "A = B", "A has more elements"], answer: 2, hint: "Each set contains every element of the other.", explanation: "When each set is a subset of the other, the sets are equal." }
    ]
  },

  "Set Operations": {
    Easy: [
      { q: "If A = {1, 2} and B = {2, 3}, what is A ∪ B?", choices: ["{2}", "{1, 2, 3}", "{1, 3}", "{1, 2, 2, 3}"], answer: 1, hint: "Union combines elements without duplicates.", explanation: "A ∪ B = {1, 2, 3}. Repeated elements are written only once." },
      { q: "If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?", choices: ["{1, 4}", "{1, 2, 3, 4}", "{2, 3}", "∅"], answer: 2, hint: "Find the elements shared by both sets.", explanation: "The intersection contains common elements: {2, 3}." },
      { q: "If A = {1, 2, 3} and B = {2}, what is A − B?", choices: ["{2}", "{1, 3}", "{1, 2, 3}", "∅"], answer: 1, hint: "Remove the elements of B from A.", explanation: "A − B = {1, 3} because 2 is removed from A." }
    ],
    Medium: [
      { q: "A = {1, 2, 3, 4} and B = {3, 4, 5}. Find A ∪ B.", choices: ["{3, 4}", "{1, 2, 3, 4, 5}", "{1, 2, 5}", "{1, 2, 3, 4, 3, 4, 5}"], answer: 1, hint: "Combine all distinct elements.", explanation: "The union is {1, 2, 3, 4, 5}." },
      { q: "A = {a, b, c, d} and B = {b, d}. Find A − B.", choices: ["{b, d}", "{a, c}", "{a, b, c, d}", "∅"], answer: 1, hint: "Remove b and d from A.", explanation: "Removing B's elements from A leaves {a, c}." },
      { q: "If A = {1, 2} and B = {3, 4}, what is A ∩ B?", choices: ["{1, 2, 3, 4}", "{1, 3}", "∅", "{2, 4}"], answer: 2, hint: "Do the sets share any elements?", explanation: "There are no common elements, so the intersection is empty." }
    ],
    Hard: [
      { q: "If n(A) = 12, n(B) = 9, and n(A ∩ B) = 4, find n(A ∪ B).", choices: ["25", "21", "17", "13"], answer: 2, hint: "Use n(A ∪ B) = n(A) + n(B) − n(A ∩ B).", explanation: "12 + 9 − 4 = 17. Subtract the intersection to avoid counting it twice." },
      { q: "In a class of 30 students, 18 like Math, 15 like Science, and 8 like both. How many like at least one?", choices: ["33", "25", "23", "15"], answer: 1, hint: "Use the union formula.", explanation: "18 + 15 − 8 = 25 students like at least one subject." },
      { q: "If U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, find A′.", choices: ["{2, 4, 6}", "{1, 3, 5}", "{1, 2, 3}", "∅"], answer: 1, hint: "Find elements in U that are not in A.", explanation: "The complement of A is {1, 3, 5}, the elements of U outside A." }
    ]
  },

  "Binary Addition": {
    Easy: [
      { q: "What is 1 + 1 in binary?", choices: ["1", "10", "11", "0"], answer: 1, hint: "Two in decimal is written with two binary digits.", explanation: "1 + 1 = 10 in binary: write 0 and carry 1." },
      { q: "What is 1 + 0 in binary?", choices: ["0", "10", "1", "11"], answer: 2, hint: "Adding zero does not change the value.", explanation: "1 + 0 = 1." },
      { q: "What is 0 + 0 in binary?", choices: ["0", "1", "10", "11"], answer: 0, hint: "Neither digit contributes a value.", explanation: "0 + 0 = 0." }
    ],
    Medium: [
      { q: "Calculate 101 + 011 in binary.", choices: ["110", "100", "1000", "111"], answer: 2, hint: "Work from right to left and carry when needed.", explanation: "101₂ (5) + 011₂ (3) = 1000₂ (8)." },
      { q: "Calculate 110 + 010 in binary.", choices: ["100", "1000", "111", "1100"], answer: 1, hint: "110₂ is 6 and 010₂ is 2.", explanation: "6 + 2 = 8, which is 1000₂." },
      { q: "Calculate 111 + 001 in binary.", choices: ["111", "1000", "101", "110"], answer: 1, hint: "Adding one to 111 causes carries in every column.", explanation: "111₂ (7) + 001₂ (1) = 1000₂ (8)." }
    ],
    Hard: [
      { q: "Calculate 1011 + 1101 in binary.", choices: ["10100", "11000", "11010", "11100"], answer: 1, hint: "Convert them to decimal to check your result.", explanation: "1011₂ = 11 and 1101₂ = 13. Their sum is 24, or 11000₂." },
      { q: "Calculate 11101 + 10111 in binary.", choices: ["110100", "101100", "111000", "110000"], answer: 0, hint: "The decimal values are 29 and 23.", explanation: "29 + 23 = 52, which is 110100₂." },
      { q: "Calculate 101101 + 11101 in binary.", choices: ["1001010", "1101010", "1011010", "1111010"], answer: 0, hint: "Convert to decimal: 45 + 29.", explanation: "45 + 29 = 74, which is 1001010₂." }
    ]
  },

  "Number System Conversions": {
    Easy: [
      { q: "What is binary 10 in decimal?", choices: ["1", "2", "10", "3"], answer: 1, hint: "The rightmost digit represents 1; the next represents 2.", explanation: "10₂ = 2₁₀." },
      { q: "What is decimal 5 in binary?", choices: ["100", "101", "110", "111"], answer: 1, hint: "5 = 4 + 1.", explanation: "5₁₀ = 101₂." },
      { q: "What is decimal 8 in binary?", choices: ["1000", "1010", "1100", "1111"], answer: 0, hint: "8 is 2 raised to the third power.", explanation: "8₁₀ = 1000₂." }
    ],
    Medium: [
      { q: "Convert binary 1101 to decimal.", choices: ["11", "12", "13", "14"], answer: 2, hint: "Calculate 8 + 4 + 0 + 1.", explanation: "1101₂ = 8 + 4 + 0 + 1 = 13₁₀." },
      { q: "Convert decimal 18 to binary.", choices: ["10010", "10100", "11000", "10001"], answer: 0, hint: "18 = 16 + 2.", explanation: "18₁₀ = 10010₂." },
      { q: "What is hexadecimal A in decimal?", choices: ["8", "9", "10", "11"], answer: 2, hint: "Hexadecimal digits continue after 9.", explanation: "In hexadecimal, A represents decimal 10." }
    ],
    Hard: [
      { q: "Convert binary 101101 to decimal.", choices: ["43", "44", "45", "46"], answer: 2, hint: "Add the place values for the 1 digits: 32, 8, 4, and 1.", explanation: "101101₂ = 32 + 8 + 4 + 1 = 45₁₀." },
      { q: "Convert decimal 255 to hexadecimal.", choices: ["EF", "FE", "FF", "F0"], answer: 2, hint: "Each hexadecimal F represents 15.", explanation: "255₁₀ = FF₁₆ because 15 × 16 + 15 = 255." },
      { q: "Convert binary 11111111 to hexadecimal.", choices: ["EE", "FE", "FF", "1FF"], answer: 2, hint: "Split into two groups of four bits: 1111 and 1111.", explanation: "Each 1111 group equals F in hexadecimal, so the answer is FF₁₆." }
    ]
  },

  "Boolean Algebra": {
    Easy: [
      { q: "What is 1 AND 1?", choices: ["0", "1", "10", "Undefined"], answer: 1, hint: "AND is true only when both inputs are true.", explanation: "1 AND 1 = 1." },
      { q: "What is 1 OR 0?", choices: ["0", "1", "10", "Undefined"], answer: 1, hint: "OR is true when at least one input is true.", explanation: "1 OR 0 = 1." },
      { q: "What is NOT 1?", choices: ["1", "0", "10", "11"], answer: 1, hint: "NOT reverses the input.", explanation: "NOT 1 = 0." }
    ],
    Medium: [
      { q: "What is (1 AND 0) OR 1?", choices: ["0", "1", "10", "Undefined"], answer: 1, hint: "Evaluate the AND expression first.", explanation: "1 AND 0 = 0, then 0 OR 1 = 1." },
      { q: "According to the identity law, what is A OR 0?", choices: ["0", "1", "A", "NOT A"], answer: 2, hint: "OR with false leaves A unchanged.", explanation: "A OR 0 = A. This is the identity law for OR." },
      { q: "What is A AND 1 according to the identity law?", choices: ["1", "0", "A", "NOT A"], answer: 2, hint: "AND with true leaves A unchanged.", explanation: "A AND 1 = A. This is the identity law for AND." }
    ],
    Hard: [
      { q: "Simplify A OR (A AND B).", choices: ["A", "B", "A AND B", "A OR B"], answer: 0, hint: "Use the absorption law.", explanation: "By the absorption law, A OR (A AND B) = A." },
      { q: "Using De Morgan's law, NOT(A AND B) equals:", choices: ["NOT A AND NOT B", "NOT A OR NOT B", "A OR B", "A AND B"], answer: 1, hint: "Negating AND changes it to OR and negates both inputs.", explanation: "De Morgan's law states NOT(A AND B) = NOT A OR NOT B." },
      { q: "If A = 1 and B = 0, what is NOT(A OR B)?", choices: ["0", "1", "10", "Undefined"], answer: 0, hint: "Find A OR B first, then negate it.", explanation: "1 OR 0 = 1, and NOT 1 = 0." }
    ]
  }
};

const topicNames = Object.keys(questions);
let playerName = "";
let selectedTopic = "ALL";
let difficulty = "Easy";
let questionList = [];
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let timer = null;
let timeLeft = 30;
let answered = false;

const settings = {
  Easy: { time: 30, points: 10 },
  Medium: { time: 20, points: 20 },
  Hard: { time: 10, points: 30 }
};

const style = document.createElement("style");
style.textContent = `
.game-container { max-width: 850px; margin: 25px auto; padding: 20px; font-family: Arial, sans-serif; color: #24180f; }
.game-container * { box-sizing: border-box; }
.tq-card { background: #fffaf0; border: 2px solid #e8c982; border-radius: 18px; padding: 24px; box-shadow: 0 8px 24px #00000012; }
.tq-title { text-align: center; color: #7a350b; margin-top: 0; }
.tq-subtitle { text-align: center; color: #775e44; }
.tq-label { display: block; margin: 16px 0 7px; font-weight: bold; }
.tq-input, .tq-select { width: 100%; padding: 12px; border: 1px solid #c9b18b; border-radius: 9px; font-size: 16px; background: white; }
.tq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(135px, 1fr)); gap: 12px; margin: 12px 0; }
.tq-choice { background: white; border: 2px solid #e5d3ad; border-radius: 12px; padding: 15px 10px; cursor: pointer; font-weight: bold; }
.tq-choice:hover { border-color: #a45a12; background: #fff1ce; }
.tq-choice.active { border-color: #a45a12; background: #ffebbb; }
.tq-btn { display: inline-block; border: 0; border-radius: 9px; padding: 12px 18px; margin: 5px 5px 5px 0; cursor: pointer; font-size: 15px; font-weight: bold; background: #8a3e0c; color: white; }
.tq-btn.secondary { background: #5c6470; }
.tq-btn:disabled { opacity: .5; cursor: not-allowed; }
.tq-full { width: 100%; margin-top: 18px; }
.tq-meta { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-weight: bold; margin-bottom: 12px; }
.tq-bar { height: 10px; border-radius: 20px; background: #eadfce; overflow: hidden; margin: 10px 0 20px; }
.tq-bar-fill { height: 100%; width: 0; background: #c47b16; transition: width .25s; }
.tq-question { font-size: 22px; line-height: 1.4; }
.tq-answer { display: block; width: 100%; text-align: left; padding: 13px; margin: 9px 0; border: 1px solid #d7c4a2; border-radius: 10px; background: white; cursor: pointer; font-size: 16px; }
.tq-answer:hover:not(:disabled) { background: #fff0cc; }
.tq-answer.correct { background: #dcfce7; border-color: #16a34a; }
.tq-answer.wrong { background: #fee2e2; border-color: #dc2626; }
.tq-feedback { padding: 14px; border-radius: 10px; background: #f2eadb; line-height: 1.6; margin-top: 15px; }
.tq-small { color: #6b5b48; font-size: 14px; }
@media(max-width:500px) { .tq-card { padding: 16px; } .tq-question { font-size: 19px; } }
`;
document.head.appendChild(style);

function render(html) {
  game.innerHTML = html;
}

function showWelcome() {
  clearInterval(timer);
  render(`
    <div class="tq-card">
      <h1 class="tq-title">🏴‍☠️ The Set Theory Treasure Quest</h1>
      <p class="tq-subtitle">Answer questions, earn points, and find the treasure!</p>
      <label class="tq-label" for="playerName">Enter your name</label>
      <input class="tq-input" id="playerName" placeholder="Your name..." maxlength="30">
      <button class="tq-btn tq-full" id="continueBtn">Continue ➜</button>
    </div>
  `);

  document.getElementById("continueBtn").onclick = () => {
    const name = document.getElementById("playerName").value.trim();
    if (!name) {
      alert("Please enter your name first, pare!");
      return;
    }
    playerName = name;
    showTopicSelection();
  };
}

function showTopicSelection() {
  const topicButtons = topicNames.map(topic => `
    <button class="tq-choice" data-topic="${topic}">${topic}</button>
  `).join("");

  render(`
    <div class="tq-card">
      <h2 class="tq-title">Welcome, ${escapeHTML(playerName)}! 🗺️</h2>
      <p class="tq-subtitle">Step 1: Choose your topic</p>
      <div class="tq-grid">
        <button class="tq-choice active" data-topic="ALL">🌟 All Topics</button>
        ${topicButtons}
      </div>
      <p class="tq-subtitle">Step 2: Choose your difficulty</p>
      <div class="tq-grid">
        <button class="tq-choice active" data-difficulty="Easy">🟢 Easy</button>
        <button class="tq-choice" data-difficulty="Medium">🔵 Medium</button>
        <button class="tq-choice" data-difficulty="Hard">🔴 Hard</button>
      </div>
      <div class="tq-feedback" id="difficultyInfo">
        <b>🟢 Easy</b><br>30 seconds per question · 10 points per correct answer
      </div>
      <button class="tq-btn tq-full" id="startBtn">Start Treasure Hunt 🚀</button>
      <p class="tq-small">Hint: Hard mode gives more points, but you have less time!</p>
    </div>
  `);

  document.querySelectorAll("[data-topic]").forEach(button => {
    button.onclick = () => {
      document.querySelectorAll("[data-topic]").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      selectedTopic = button.dataset.topic;
    };
  });

  document.querySelectorAll("[data-difficulty]").forEach(button => {
    button.onclick = () => {
      document.querySelectorAll("[data-difficulty]").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      difficulty = button.dataset.difficulty;
      const s = settings[difficulty];
      const colors = { Easy: "🟢", Medium: "🔵", Hard: "🔴" };
      document.getElementById("difficultyInfo").innerHTML =
        `<b>${colors[difficulty]} ${difficulty}</b><br>${s.time} seconds per question · ${s.points} points per correct answer`;
    };
  });

  document.getElementById("startBtn").onclick = startGame;
}

function startGame() {
  questionList = [];

  const topics = selectedTopic === "ALL" ? topicNames : [selectedTopic];

  topics.forEach(topic => {
    questions[topic][difficulty].forEach(question => {
      questionList.push({ ...question, topic });
    });
  });

  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  answered = false;

  if (currentQuestion >= questionList.length) {
    showResults();
    return;
  }

  timeLeft = settings[difficulty].time;
  const item = questionList[currentQuestion];
  const progress = (currentQuestion / questionList.length) * 100;

  render(`
    <div class="tq-card">
      <h2 class="tq-title">🏴‍☠️ Treasure Quest</h2>
      <div class="tq-meta">
        <span>👤 ${escapeHTML(playerName)}</span>
        <span>⭐ Score: ${score}</span>
      </div>
      <div class="tq-meta">
        <span>Topic: ${escapeHTML(item.topic)}</span>
        <span>Difficulty: ${difficulty}</span>
      </div>
      <div class="tq-bar"><div class="tq-bar-fill" id="progressFill" style="width:${progress}%"></div></div>
      <div class="tq-meta">
        <span>Question ${currentQuestion + 1} of ${questionList.length}</span>
        <span>⏱️ Time: <span id="timerValue">${timeLeft}</span>s</span>
      </div>
      <h3 class="tq-question">${escapeHTML(item.q)}</h3>
      <div id="answerOptions">
        ${item.choices.map((choice, index) => `
          <button class="tq-answer" data-answer="${index}">${String.fromCharCode(65 + index)}. ${escapeHTML(choice)}</button>
        `).join("")}
      </div>
      <button class="tq-btn secondary" id="hintBtn">💡 Show Hint</button>
      <button class="tq-btn" id="nextBtn" disabled>Next Question ➜</button>
      <div id="feedback"></div>
    </div>
  `);

  document.querySelectorAll("[data-answer]").forEach(button => {
    button.onclick = () => checkAnswer(Number(button.dataset.answer));
  });

  document.getElementById("hintBtn").onclick = () => {
    document.getElementById("feedback").innerHTML =
      `<div class="tq-feedback">💡 <b>Hint:</b> ${escapeHTML(item.hint)}</div>`;
  };

  document.getElementById("nextBtn").onclick = () => {
    currentQuestion++;
    showQuestion();
  };

  timer = setInterval(() => {
    timeLeft--;
    const timerValue = document.getElementById("timerValue");
    if (timerValue) timerValue.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);
}

function checkAnswer(choiceIndex) {
  if (answered) return;

  answered = true;
  clearInterval(timer);

  const item = questionList[currentQuestion];
  const isCorrect = choiceIndex === item.answer;

  if (isCorrect) {
    score += settings[difficulty].points;
    correctAnswers++;
  }

  document.querySelectorAll("[data-answer]").forEach(button => {
    button.disabled = true;
    const index = Number(button.dataset.answer);

    if (index === item.answer) button.classList.add("correct");
    if (index === choiceIndex && !isCorrect) button.classList.add("wrong");
  });

  let feedback = isCorrect
    ? `✅ <b>Correct! +${settings[difficulty].points} points!</b>`
    : choiceIndex === -1
      ? "⏰ <b>Time's up!</b>"
      : "❌ <b>Not quite right.</b>";

  feedback += `<br><b>Correct answer:</b> ${escapeHTML(item.choices[item.answer])}`;
  feedback += `<br><b>Explanation:</b> ${escapeHTML(item.explanation)}`;

  document.getElementById("feedback").innerHTML = `<div class="tq-feedback">${feedback}</div>`;
  document.querySelector(".tq-meta span:last-child").textContent = `⭐ Score: ${score}`;
  document.getElementById("nextBtn").disabled = false;
  document.getElementById("nextBtn").textContent =
    currentQuestion === questionList.length - 1 ? "View Results 🏆" : "Next Question ➜";
}

function showResults() {
  clearInterval(timer);
  const total = questionList.length;
  const percentage = total ? Math.round((correctAnswers / total) * 100) : 0;

  let message = "Keep practicing, adventurer!";
  if (percentage >= 80) message = "Amazing! You're a treasure master! 🏆";
  else if (percentage >= 50) message = "Good job! You're getting stronger! 💪";

  render(`
    <div class="tq-card" style="text-align:center">
      <h1 class="tq-title">🏆 Treasure Hunt Complete!</h1>
      <h2>Well done, ${escapeHTML(playerName)}!</h2>
      <p class="tq-subtitle">${message}</p>
      <div class="tq-feedback">
        <p><b>Difficulty:</b> ${difficulty}</p>
        <p><b>Topic:</b> ${selectedTopic === "ALL" ? "All Topics" : escapeHTML(selectedTopic)}</p>
        <p><b>Final Score:</b> ${score} points</p>
        <p><b>Correct Answers:</b> ${correctAnswers} / ${total}</p>
        <p><b>Accuracy:</b> ${percentage}%</p>
      </div>
      <button class="tq-btn tq-full" id="playAgainBtn">🔁 Play Again</button>
      <button class="tq-btn secondary tq-full" id="changeSettingsBtn">🗺️ Choose Topic & Difficulty</button>
    </div>
  `);

  document.getElementById("playAgainBtn").onclick = startGame;
  document.getElementById("changeSettingsBtn").onclick = showTopicSelection;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

if (game) {
  showWelcome();
} else {
  console.error('Game container not found. Make sure your HTML has an element with class="game-container".');
}
