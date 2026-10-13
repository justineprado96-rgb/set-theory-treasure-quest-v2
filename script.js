
const gameContainer = document.querySelector(".game-container");

let score = 0;
let questionIndex = 0;
let operationIndex = 0;
let playerName = "";
let activeSetQuestions = [];
let activeOperationQuestions = [];
let activeExtraQuestions = [];
let extraTopicIndex = 0;
let extraQuestionIndex = 0;

// RANDOM QUESTIONS
function getRandomQuestions(questions, count) {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}

// TYPES OF SETS
const setQuestions = [
    { question: "Which set contains a limited number of elements?", choices: ["Finite Set", "Infinite Set", "Empty Set"], answer: "Finite Set" },
    { question: "Which set has no elements?", choices: ["Singleton Set", "Empty Set", "Universal Set"], answer: "Empty Set" },
    { question: "Which set contains exactly one element?", choices: ["Infinite Set", "Singleton Set", "Empty Set"], answer: "Singleton Set" },
    { question: "Which set contains an unlimited number of elements?", choices: ["Finite Set", "Empty Set", "Infinite Set"], answer: "Infinite Set" },
    { question: "If A = {1, 2} and B = {1, 2}, what is their relationship?", choices: ["Equal Sets", "Disjoint Sets", "Empty Sets"], answer: "Equal Sets" },
    { question: "If A = {1, 2} and B = {3, 4}, what are these sets?", choices: ["Equal Sets", "Disjoint Sets", "Overlapping Sets"], answer: "Disjoint Sets" },
    { question: "If A = {1, 2} and B = {2, 3}, what type of sets are they?", choices: ["Disjoint Sets", "Overlapping Sets", "Empty Sets"], answer: "Overlapping Sets" },
    { question: "If every element of A is also in B, what is A in relation to B?", choices: ["A subset of B", "A disjoint set", "An infinite set"], answer: "A subset of B" },
    { question: "Which symbol means 'is an element of'?", choices: ["∈", "∪", "∩"], answer: "∈" },
    { question: "If A = {2, 4, 6}, is 4 an element of A?", choices: ["Yes", "No", "A is empty"], answer: "Yes" },
    { question: "Which symbol means 'is a subset of'?", choices: ["⊆", "∩", "∪"], answer: "⊆" },
    { question: "If A = {1, 2} and B = {1, 2, 3}, is A a subset of B?", choices: ["Yes", "No", "They are disjoint"], answer: "Yes" },
    { question: "What is a proper subset?", choices: ["A subset that is not equal to the original set", "A set with no elements", "A set with infinite elements"], answer: "A subset that is not equal to the original set" },
    { question: "If A = {1, 2} and B = {1, 2}, are they equivalent sets?", choices: ["Yes", "No", "They are disjoint"], answer: "Yes" },
    { question: "What makes two finite sets equivalent?", choices: ["They have the same number of elements", "They have exactly the same elements", "They have no elements"], answer: "They have the same number of elements" },
    { question: "What is the universal set?", choices: ["The set of all elements being considered", "A set with one element only", "A set with no elements"], answer: "The set of all elements being considered" },
    { question: "Which symbol commonly represents the empty set?", choices: ["∅", "∪", "∈"], answer: "∅" },
    { question: "If A = {a, b, c}, how many elements are in A?", choices: ["2", "3", "4"], answer: "3" },
    { question: "If A = {1, 2, 3}, which statement is true?", choices: ["2 ∈ A", "5 ∈ A", "4 ∈ A"], answer: "2 ∈ A" },
    { question: "If A = {1, 2} and B = {2, 3}, which element do they share?", choices: ["1", "2", "3"], answer: "2" }
];

// SET OPERATIONS
const operationQuestions = [
    { question: "What is {1, 2} ∪ {2, 3}?", choices: ["{2}", "{1, 2, 3}", "{1, 3}"], answer: "{1, 2, 3}" },
    { question: "What is {1, 2} ∩ {2, 3}?", choices: ["{1, 2, 3}", "{1}", "{2}"], answer: "{2}" },
    { question: "What is {1, 2} − {2, 3}?", choices: ["{1}", "{2}", "{1, 2, 3}"], answer: "{1}" },
    { question: "If U = {1, 2, 3, 4} and A = {1, 2}, what is Aᶜ?", choices: ["{1, 2}", "{3, 4}", "{1, 2, 3, 4}"], answer: "{3, 4}" },
    { question: "What is {a, b} ∪ {b, c}?", choices: ["{b}", "{a, b, c}", "{a, c}"], answer: "{a, b, c}" },
    { question: "What is {2, 4, 6} ∩ {4, 6, 8}?", choices: ["{2, 8}", "{4, 6}", "{2, 4, 6, 8}"], answer: "{4, 6}" },
    { question: "What is {1, 2, 3} − {1, 3}?", choices: ["{1, 3}", "{2}", "{1, 2, 3}"], answer: "{2}" },
    { question: "If U = {a, b, c, d} and A = {a, c}, what is Aᶜ?", choices: ["{a, c}", "{b, d}", "{a, b, c, d}"], answer: "{b, d}" },
    { question: "What is {1, 2} ∪ ∅?", choices: ["∅", "{1, 2}", "{1}"], answer: "{1, 2}" },
    { question: "What is {1, 2} ∩ ∅?", choices: ["{1, 2}", "{1}", "∅"], answer: "∅" },
    { question: "What is {3, 4, 5} − {4}?", choices: ["{4}", "{3, 5}", "{3, 4, 5}"], answer: "{3, 5}" },
    { question: "What is {a, b, c} ∪ {c, d}?", choices: ["{c}", "{a, b, c, d}", "{a, b, d}"], answer: "{a, b, c, d}" },
    { question: "What is {2, 4, 6} ∩ {1, 3, 5}?", choices: ["{2, 4, 6}", "{1, 3, 5}", "∅"], answer: "∅" },
    { question: "If A = {1, 3, 5} and B = {1, 2, 3}, what is A − B?", choices: ["{1, 3}", "{5}", "{1, 2, 3, 5}"], answer: "{5}" },
    { question: "If U = {1, 2, 3, 4, 5} and A = {2, 4}, what is Aᶜ?", choices: ["{2, 4}", "{1, 3, 5}", "{1, 2, 3, 4, 5}"], answer: "{1, 3, 5}" },
    { question: "What does union combine?", choices: ["All elements from both sets without duplicates", "Only the common elements", "Only elements in the first set"], answer: "All elements from both sets without duplicates" },
    { question: "What does intersection find?", choices: ["All elements from both sets", "Elements common to both sets", "Elements outside the universal set"], answer: "Elements common to both sets" },
    { question: "What does A − B contain?", choices: ["Elements in A that are not in B", "Elements in B that are not in A", "All elements in A and B"], answer: "Elements in A that are not in B" },
    { question: "The complement of A is defined relative to which set?", choices: ["The universal set", "The empty set only", "Any unrelated set"], answer: "The universal set" },
    { question: "If A = {1, 2, 3} and B = {3, 4}, what is A ∪ B?", choices: ["{3}", "{1, 2, 3, 4}", "{1, 2, 4}"], answer: "{1, 2, 3, 4}" }
];

// NEW TOPICS: BINARY ADDITION, NUMBER SYSTEMS, BOOLEAN ALGEBRA
const extraTopics = [
    {
        title: "💻 BINARY ADDITION",
        questions: [
            { question: "What is 0 + 0 in binary?", choices: ["0", "1", "10"], answer: "0" },
            { question: "What is 0 + 1 in binary?", choices: ["0", "1", "10"], answer: "1" },
            { question: "What is 1 + 1 in binary?", choices: ["0", "1", "10"], answer: "10" },
            { question: "What is 1 + 1 + 1 in binary?", choices: ["10", "11", "100"], answer: "11" },
            { question: "What is 10₂ + 1₂?", choices: ["10₂", "11₂", "100₂"], answer: "11₂" },
            { question: "What is 11₂ + 1₂?", choices: ["100₂", "101₂", "111₂"], answer: "100₂" },
            { question: "What is 101₂ + 10₂?", choices: ["110₂", "111₂", "1000₂"], answer: "111₂" },
            { question: "What is 110₂ + 11₂?", choices: ["1000₂", "1001₂", "1010₂"], answer: "1001₂" }
        ]
    },
    {
        title: "🔄 NUMBER SYSTEM CONVERSIONS",
        questions: [
            { question: "What is decimal 5 in binary?", choices: ["101", "110", "111"], answer: "101" },
            { question: "What is binary 1010₂ in decimal?", choices: ["8", "10", "12"], answer: "10" },
            { question: "What is decimal 8 in binary?", choices: ["1000", "1010", "1100"], answer: "1000" },
            { question: "What is binary 111₂ in decimal?", choices: ["5", "6", "7"], answer: "7" },
            { question: "What is decimal 15 in hexadecimal?", choices: ["E", "F", "10"], answer: "F" },
            { question: "What is hexadecimal A in decimal?", choices: ["8", "10", "12"], answer: "10" },
            { question: "What is decimal 16 in hexadecimal?", choices: ["F", "10", "11"], answer: "10" },
            { question: "What is binary 10000₂ in decimal?", choices: ["8", "16", "32"], answer: "16" }
        ]
    },
    {
        title: "⚡ BOOLEAN ALGEBRA",
        questions: [
            { question: "What values can a Boolean variable have?", choices: ["True or False (1 or 0)", "Any integer", "Only positive numbers"], answer: "True or False (1 or 0)" },
            { question: "What is the identity law for OR?", choices: ["A + 0 = A", "A + 1 = A", "A · 0 = A"], answer: "A + 0 = A" },
            { question: "What is the identity law for AND?", choices: ["A · 1 = A", "A · 0 = A", "A + 1 = A"], answer: "A · 1 = A" },
            { question: "According to the complement law, A + A′ equals what?", choices: ["A", "0", "1"], answer: "1" },
            { question: "According to the complement law, A · A′ equals what?", choices: ["1", "0", "A"], answer: "0" },
            { question: "Simplify A + A using the idempotent law.", choices: ["0", "A", "1"], answer: "A" },
            { question: "Simplify A · (A + B) using the absorption law.", choices: ["A", "B", "A + B"], answer: "A" },
            { question: "Simplify AB + A′C + BC using the Consensus theorem.", choices: ["AB + A′C", "AB + BC", "A′C + BC"], answer: "AB + A′C" }
        ]
    }
];

// WELCOME SCREEN
function showWelcomeScreen() {
    gameContainer.innerHTML = `
        <div class="treasure-icon">💎 🗝️ 💰</div>
        <h1>THE SET THEORY<br>TREASURE QUEST</h1>
        <p class="subtitle">Collect numbers. Solve set challenges. Find the treasure!</p>
        <div class="treasure-chest">🧰</div>
        <p class="description">Enter your name and begin your mathematical treasure hunt!</p>
        <input id="playerNameInput" type="text" maxlength="30" placeholder="Enter your player name">
        <br>
        <button id="startGameButton">START GAME</button>
        <p class="topics">Set Membership • Types of Sets • Set Operations • Binary Addition • Number System Conversions • Boolean Algebra</p>
    `;

    document.getElementById("startGameButton").onclick = function () {
        const name = document.getElementById("playerNameInput").value.trim();

        if (!name) {
            alert("Please enter your player name first!");
            return;
        }

        playerName = name;
        score = 0;
        questionIndex = 0;
        operationIndex = 0;
        extraTopicIndex = 0;
        extraQuestionIndex = 0;

        activeSetQuestions = getRandomQuestions(setQuestions, 8);
        activeOperationQuestions = getRandomQuestions(operationQuestions, 8);

        showTreasureChallenge();
    };
}

// TREASURE BAG CHALLENGE
function showTreasureChallenge() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffledTarget = getRandomQuestions(numbers, numbers.length);
    const targetSize = Math.floor(Math.random() * 3) + 3;
    const targetSet = shuffledTarget.slice(0, targetSize).sort((a, b) => a - b);
    const playerCards = getRandomQuestions(numbers, 5);
    const treasureBag = [];
    let movesLeft = 5;

    gameContainer.innerHTML = `
        <h1>💎 TREASURE BAG</h1>
        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
        <p class="description">Target Set: Add only numbers that belong to this set.</p>
        <h2 style="color:#ffd36a;">{${targetSet.join(", ")}}</h2>
        <p class="description">Choose from your five cards. You have <strong>5 moves</strong>.</p>
        <div id="playerCards" class="number-cards"></div>
        <h2>🎒 Your Treasure Bag</h2>
        <p id="bagContents" class="description">Your bag is empty.</p>
        <p id="message" class="description">Choose your first card!</p>
        <p class="topics">Score: <span id="score">${score}</span> | Moves left: <span id="movesLeft">${movesLeft}</span></p>
    `;

    const cardsContainer = document.getElementById("playerCards");

    playerCards.forEach(function (number) {
        const button = document.createElement("button");
        button.className = "number-card";
        button.textContent = number;
        button.style.cssText = "padding:15px 22px;margin:5px;font-size:24px;cursor:pointer;border:2px solid #d9aa48;border-radius:10px;background:#fff8e7;color:#17233a;";

        button.onclick = function () {
            if (movesLeft <= 0 || button.disabled) return;

            movesLeft--;
            button.disabled = true;
            const message = document.getElementById("message");

            if (targetSet.includes(number)) {
                treasureBag.push(number);
                score += 10;
                message.textContent = `Correct! ${number} belongs to the target set. +10 points!`;
            } else {
                message.textContent = `${number} does not belong to the target set. No points this time.`;
            }

            document.getElementById("score").textContent = score;
            document.getElementById("movesLeft").textContent = movesLeft;
            document.getElementById("bagContents").textContent =
                treasureBag.length > 0 ? `{${treasureBag.join(", ")}}` : "Your bag is empty.";

            if (movesLeft === 0) {
                document.querySelectorAll(".number-card").forEach(card => card.disabled = true);

                const nextButton = document.createElement("button");
                nextButton.id = "nextButton";
                nextButton.textContent = "NEXT CHALLENGE";
                gameContainer.appendChild(nextButton);

                nextButton.onclick = function () {
                    questionIndex = 0;
                    showSetQuestion();
                };
            }
        };

        cardsContainer.appendChild(button);
    });
}

// TYPES OF SETS CHALLENGE
function showSetQuestion() {
    if (questionIndex >= activeSetQuestions.length) {
        gameContainer.innerHTML = `
            <h1>📚 TYPES OF SETS COMPLETE!</h1>
            <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
            <p class="description">You finished all 8 questions!</p>
            <h2>Score: ${score}</h2>
            <button id="nextOperations">NEXT: SET OPERATIONS</button>
        `;

        document.getElementById("nextOperations").onclick = function () {
            operationIndex = 0;
            showOperationQuestion();
        };

        return;
    }

    const current = activeSetQuestions[questionIndex];

    gameContainer.innerHTML = `
        <h1>📚 TYPES OF SETS</h1>
        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
        <p class="topics">Question ${questionIndex + 1} of ${activeSetQuestions.length}</p>
        <div class="progress-track">
            <div class="progress-fill" style="width:${((questionIndex + 1) / activeSetQuestions.length) * 100}%"></div>
        </div>
        <p class="description">${current.question}</p>
        <div id="answers"></div>
        <p id="result" class="description">Choose your answer.</p>
        <p class="topics">Score: <span id="score">${score}</span></p>
    `;

    const answersContainer = document.getElementById("answers");

    current.choices.forEach(function (choice) {
        const button = createAnswerButton(choice);

        button.onclick = function () {
            checkAnswer(choice, current.answer, "result", answersContainer, function () {
                questionIndex++;
                showSetQuestion();
            });
        };

        answersContainer.appendChild(button);
    });
}

// SET OPERATIONS CHALLENGE
function showOperationQuestion() {
    if (operationIndex >= activeOperationQuestions.length) {
        gameContainer.innerHTML = `
            <h1>🔢 SET OPERATIONS COMPLETE!</h1>
            <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
            <p class="description">Next, continue to the additional math topics.</p>
            <h2>Score: ${score}</h2>
            <button id="nextExtraTopic">NEXT: BINARY ADDITION</button>
        `;

        document.getElementById("nextExtraTopic").onclick = function () {
            extraTopicIndex = 0;
            startExtraTopic();
        };

        return;
    }

    const current = activeOperationQuestions[operationIndex];

    gameContainer.innerHTML = `
        <h1>🔢 SET OPERATIONS</h1>
        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
        <p class="topics">Question ${operationIndex + 1} of ${activeOperationQuestions.length}</p>
        <div class="progress-track">
            <div class="progress-fill" style="width:${((operationIndex + 1) / activeOperationQuestions.length) * 100}%"></div>
        </div>
        <p class="description">${current.question}</p>
        <div id="operationAnswers"></div>
        <p id="operationResult" class="description">Choose your answer.</p>
        <p class="topics">Score: <span id="score">${score}</span></p>
    `;

    const answersContainer = document.getElementById("operationAnswers");

    current.choices.forEach(function (choice) {
        const button = createAnswerButton(choice);

        button.onclick = function () {
            checkAnswer(choice, current.answer, "operationResult", answersContainer, function () {
                operationIndex++;
                showOperationQuestion();
            });
        };

        answersContainer.appendChild(button);
    });
}

// NEW TOPICS FLOW
function startExtraTopic() {
    if (extraTopicIndex >= extraTopics.length) {
        showFinalResults();
        return;
    }

    activeExtraQuestions = getRandomQuestions(
        extraTopics[extraTopicIndex].questions,
        extraTopics[extraTopicIndex].questions.length
    );

    extraQuestionIndex = 0;
    showExtraQuestion();
}

function showExtraQuestion() {
    const topic = extraTopics[extraTopicIndex];

    if (extraQuestionIndex >= activeExtraQuestions.length) {
        gameContainer.innerHTML = `
            <h1>${topic.title} COMPLETE!</h1>
            <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
            <p class="description">You finished all ${activeExtraQuestions.length} questions in this topic!</p>
            <h2>Score: ${score}</h2>
            <button id="nextExtraTopic">${extraTopicIndex < extraTopics.length - 1 ? "NEXT TOPIC" : "SEE FINAL RESULTS"}</button>
        `;

        document.getElementById("nextExtraTopic").onclick = function () {
            extraTopicIndex++;
            startExtraTopic();
        };

        return;
    }

    const current = activeExtraQuestions[extraQuestionIndex];

    gameContainer.innerHTML = `
        <h1>${topic.title}</h1>
        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
        <p class="topics">Question ${extraQuestionIndex + 1} of ${activeExtraQuestions.length}</p>
        <div class="progress-track">
            <div class="progress-fill" style="width:${((extraQuestionIndex + 1) / activeExtraQuestions.length) * 100}%"></div>
        </div>
        <p class="description">${current.question}</p>
        <div id="extraAnswers"></div>
        <p id="extraResult" class="description">Choose your answer.</p>
        <p class="topics">Score: <span id="score">${score}</span></p>
    `;

    const answersContainer = document.getElementById("extraAnswers");

    current.choices.forEach(function (choice) {
        const button = createAnswerButton(choice);

        button.onclick = function () {
            checkAnswer(choice, current.answer, "extraResult", answersContainer, function () {
                extraQuestionIndex++;
                showExtraQuestion();
            });
        };

        answersContainer.appendChild(button);
    });
}

// CREATE ANSWER BUTTON
function createAnswerButton(choice) {
    const button = document.createElement("button");
    button.textContent = choice;

    button.style.cssText = "display:block;margin:10px auto;padding:12px 20px;min-width:200px;cursor:pointer;border:2px solid #d9aa48;border-radius:10px;background:#fff8e7;color:#17233a;font-size:16px;";

    return button;
}

// CHECK ANSWER AND UPDATE SCORE
function checkAnswer(choice, correctAnswer, resultId, container, nextAction) {
    container.querySelectorAll("button").forEach(function (answerButton) {
        answerButton.disabled = true;
    });

    if (choice === correctAnswer) {
        score += 10;
        document.getElementById(resultId).textContent = "Correct! You earned 10 points!";
    } else {
        document.getElementById(resultId).textContent = "Incorrect. Correct answer: " + correctAnswer;
    }

    document.getElementById("score").textContent = score;

    const nextButton = document.createElement("button");
    nextButton.textContent = "CONTINUE";
    nextButton.onclick = nextAction;
    gameContainer.appendChild(nextButton);
}

// FINAL RESULTS
function showFinalResults() {
    gameContainer.innerHTML = `
        <div class="treasure-icon">🏆 💎 🏆</div>
        <h1>TREASURE QUEST COMPLETE!</h1>
        <p class="subtitle">Congratulations, ${escapeHTML(playerName)}!</p>
        <p class="description">
            You completed Treasure Bag, Types of Sets, Set Operations,
            Binary Addition, Number System Conversions, and Boolean Algebra.
        </p>
        <h2 style="font-size:32px;">Final Score: ${score}</h2>
        <p class="topics">Maximum possible score: 450 points</p>
        <button id="playAgainButton">PLAY AGAIN</button>
    `;

    document.getElementById("playAgainButton").onclick = showWelcomeScreen;
}

// SAFE PLAYER NAME DISPLAY
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// START GAME
showWelcomeScreen();
