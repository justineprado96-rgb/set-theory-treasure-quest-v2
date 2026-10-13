
const gameContainer = document.querySelector(".game-container");

let playerName = "";
let score = 0;
let currentTopic = null;
let questionIndex = 0;
let questions = [];
let timerId = null;
let timeLeft = 20;
let correctCount = 0;

const POINTS = 10;
const TIME_LIMIT = 20;

const topics = [
    {
        id: "sets",
        title: "📚 TYPES OF SETS",
        hint: "Finite = limited, infinite = unlimited, empty = no elements, singleton = one element.",
        questions: [
            ["Which set contains a limited number of elements?", ["Finite Set", "Infinite Set", "Empty Set"], "Finite Set", "A finite set has a limited number of elements.", "Think of a set whose elements can be counted."],
            ["Which set has no elements?", ["Singleton Set", "Empty Set", "Universal Set"], "Empty Set", "An empty set contains zero elements and is represented by ∅.", "It contains nothing."],
            ["Which set contains exactly one element?", ["Infinite Set", "Singleton Set", "Empty Set"], "Singleton Set", "A singleton set contains exactly one element.", "The word single means one."],
            ["Which set contains an unlimited number of elements?", ["Finite Set", "Empty Set", "Infinite Set"], "Infinite Set", "An infinite set has infinitely many elements.", "Its elements cannot be completely counted."],
            ["If A = {1, 2} and B = {1, 2}, what is their relationship?", ["Equal Sets", "Disjoint Sets", "Empty Sets"], "Equal Sets", "Equal sets contain exactly the same elements.", "Compare all elements in both sets."],
            ["If A = {1, 2} and B = {3, 4}, what are these sets?", ["Equal Sets", "Disjoint Sets", "Overlapping Sets"], "Disjoint Sets", "Disjoint sets have no elements in common.", "Do they share any elements?"],
            ["If A = {1, 2} and B = {2, 3}, what type of sets are they?", ["Disjoint Sets", "Overlapping Sets", "Empty Sets"], "Overlapping Sets", "They overlap because both sets contain 2.", "Look for a shared element."],
            ["Which symbol means 'is an element of'?", ["∈", "∪", "∩"], "∈", "The symbol ∈ means 'is an element of'.", "It describes membership in a set."],
            ["If A = {2, 4, 6}, is 4 an element of A?", ["Yes", "No", "A is empty"], "Yes", "4 appears in set A, so it is an element.", "Check the numbers inside the braces."],
            ["If A = {1, 2} and B = {1, 2, 3}, is A a subset of B?", ["Yes", "No", "They are disjoint"], "Yes", "Every element of A is also in B.", "Check whether both 1 and 2 appear in B."]
        ]
    },
    {
        id: "operations",
        title: "🔢 SET OPERATIONS",
        hint: "Union ∪ combines elements. Intersection ∩ finds common elements. Difference − removes elements found in the second set.",
        questions: [
            ["What is {1, 2} ∪ {2, 3}?", ["{2}", "{1, 2, 3}", "{1, 3}"], "{1, 2, 3}", "Union combines all distinct elements from both sets.", "Include every element without duplicates."],
            ["What is {1, 2} ∩ {2, 3}?", ["{1, 2, 3}", "{1}", "{2}"], "{2}", "Only 2 appears in both sets.", "Intersection means elements shared by both sets."],
            ["What is {1, 2} − {2, 3}?", ["{1}", "{2}", "{1, 2, 3}"], "{1}", "1 is in the first set but not the second.", "Remove from the first set anything found in the second."],
            ["If U = {1, 2, 3, 4} and A = {1, 2}, what is Aᶜ?", ["{1, 2}", "{3, 4}", "{1, 2, 3, 4}"], "{3, 4}", "The complement contains elements in U that are not in A.", "Choose elements in U outside A."],
            ["What is {a, b} ∪ {b, c}?", ["{b}", "{a, b, c}", "{a, c}"], "{a, b, c}", "The union includes a, b, and c once each.", "Combine the sets without repeating b."],
            ["What is {2, 4, 6} ∩ {4, 6, 8}?", ["{2, 8}", "{4, 6}", "{2, 4, 6, 8}"], "{4, 6}", "Both sets contain 4 and 6.", "Find the shared numbers."],
            ["What is {1, 2, 3} − {1, 3}?", ["{1, 3}", "{2}", "{1, 2, 3}"], "{2}", "Removing 1 and 3 leaves only 2.", "Cross out 1 and 3 from the first set."],
            ["What is {1, 2} ∩ ∅?", ["{1, 2}", "{1}", "∅"], "∅", "No elements can be shared with an empty set.", "The empty set contains no elements."],
            ["What does union combine?", ["All elements from both sets without duplicates", "Only common elements", "Only elements in the first set"], "All elements from both sets without duplicates", "Union combines distinct elements from the sets.", "Union uses the symbol ∪."],
            ["What does A − B contain?", ["Elements in A that are not in B", "Elements in B that are not in A", "All elements in A and B"], "Elements in A that are not in B", "Set difference keeps elements belonging to A but not B.", "Start with A and remove B's elements."]
        ]
    },
    {
        id: "binary",
        title: "💻 BINARY ADDITION",
        hint: "Binary uses 0 and 1. Remember: 0+0=0, 0+1=1, and 1+1=10.",
        questions: [
            ["What is 0 + 0 in binary?", ["0", "1", "10"], "0", "Adding zero and zero gives zero.", "Start with the basic binary addition rules."],
            ["What is 0 + 1 in binary?", ["0", "1", "10"], "1", "0 + 1 = 1.", "Adding zero does not change one."],
            ["What is 1 + 1 in binary?", ["0", "1", "10"], "10", "Decimal 2 is written as 10 in binary.", "Remember to carry when adding 1 and 1."],
            ["What is 1 + 1 + 1 in binary?", ["10", "11", "100"], "11", "Decimal 3 is written as 11 in binary.", "Convert the total of three into binary."],
            ["What is 10₂ + 1₂?", ["10₂", "11₂", "100₂"], "11₂", "10₂ is 2 and 2 + 1 = 3, which is 11₂.", "Convert to decimal, add, then convert back."],
            ["What is 11₂ + 1₂?", ["100₂", "101₂", "111₂"], "100₂", "11₂ is 3; 3 + 1 = 4, or 100₂.", "Think of decimal 3 plus 1."],
            ["What is 101₂ + 10₂?", ["110₂", "111₂", "1000₂"], "111₂", "101₂ is 5 and 10₂ is 2; 5 + 2 = 7 = 111₂.", "Convert both numbers to decimal to check."],
            ["What is 110₂ + 11₂?", ["1000₂", "1001₂", "1010₂"], "1001₂", "110₂ is 6 and 11₂ is 3; 9 is 1001₂.", "6 + 3 = 9 in decimal."]
        ]
    },
    {
        id: "conversion",
        title: "🔄 NUMBER SYSTEM CONVERSIONS",
        hint: "Binary place values are powers of 2. In hexadecimal, A=10, B=11, C=12, D=13, E=14, F=15.",
        questions: [
            ["What is decimal 5 in binary?", ["101", "110", "111"], "101", "Binary 101 represents 4 + 0 + 1 = 5.", "5 = 4 + 1."],
            ["What is binary 1010₂ in decimal?", ["8", "10", "12"], "10", "1010₂ = 8 + 2 = 10.", "Use place values 8, 4, 2, 1."],
            ["What is decimal 8 in binary?", ["1000", "1010", "1100"], "1000", "The binary place value for 8 is 1000₂.", "8 is 2³."],
            ["What is binary 111₂ in decimal?", ["5", "6", "7"], "7", "111₂ = 4 + 2 + 1 = 7.", "Add 4 + 2 + 1."],
            ["What is decimal 15 in hexadecimal?", ["E", "F", "10"], "F", "F represents decimal 15 in hexadecimal.", "Hexadecimal digits after 9 go A through F."],
            ["What is hexadecimal A in decimal?", ["8", "10", "12"], "10", "Hexadecimal A represents decimal 10.", "A is the first hexadecimal letter after 9."],
            ["What is decimal 16 in hexadecimal?", ["F", "10", "11"], "10", "Decimal 16 is written 10 in base 16.", "One full group of sixteen is 10 in hexadecimal."],
            ["What is binary 10000₂ in decimal?", ["8", "16", "32"], "16", "10000₂ has a 1 in the 2⁴ place, which is 16.", "The leftmost 1 represents 16."]
        ]
    },
    {
        id: "boolean",
        title: "⚡ BOOLEAN ALGEBRA",
        hint: "In Boolean algebra, + means OR, · means AND, and A′ means NOT A.",
        questions: [
            ["What values can a Boolean variable have?", ["True or False (1 or 0)", "Any integer", "Only positive numbers"], "True or False (1 or 0)", "A Boolean variable has two possible values: true/1 or false/0.", "Boolean logic has only two states."],
            ["What is the identity law for OR?", ["A + 0 = A", "A + 1 = A", "A · 0 = A"], "A + 0 = A", "OR with 0 leaves A unchanged.", "Look for the rule that leaves A as it is."],
            ["What is the identity law for AND?", ["A · 1 = A", "A · 0 = A", "A + 1 = A"], "A · 1 = A", "AND with 1 leaves A unchanged.", "For AND, use 1 as the identity value."],
            ["According to the complement law, A + A′ equals what?", ["A", "0", "1"], "1", "A OR NOT A is always true, so the result is 1.", "A or its opposite must be true."],
            ["According to the complement law, A · A′ equals what?", ["1", "0", "A"], "0", "A AND NOT A is always false, so the result is 0.", "A cannot be true and false at once."],
            ["Simplify A + A using the idempotent law.", ["0", "A", "1"], "A", "The idempotent law says A + A = A.", "A OR itself does not change A."],
            ["Simplify A · (A + B) using the absorption law.", ["A", "B", "A + B"], "A", "The absorption law simplifies A · (A + B) to A.", "Use the absorption rule."],
            ["Simplify AB + A′C + BC using the Consensus theorem.", ["AB + A′C", "AB + BC", "A′C + BC"], "AB + A′C", "The Consensus theorem removes the redundant BC term.", "BC is the redundant consensus term."]
        ]
    }
];

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

function shuffle(list) {
    const array = [...list];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// START SCREEN
function showWelcomeScreen() {
    stopTimer();

    gameContainer.innerHTML = `
        <div class="treasure-icon">💎 🗝️ 💰</div>
        <h1>THE SET THEORY<br>TREASURE QUEST</h1>
        <p class="subtitle">Choose a topic, solve questions, and collect treasure!</p>
        <div class="treasure-chest">🧰</div>
        <p class="description">Enter your player name to begin your adventure.</p>

        <input
            id="playerNameInput"
            type="text"
            maxlength="30"
            placeholder="Enter your player name"
            style="padding:12px;border-radius:8px;border:1px solid #d9aa48;max-width:90%;"
        >

        <br><br>
        <button id="startGameButton">START GAME</button>

        <p class="topics">Hints • Timer • Score • Correct answers and explanations</p>
    `;

    document.getElementById("startGameButton").onclick = function () {
        const name = document.getElementById("playerNameInput").value.trim();

        if (!name) {
            alert("Please enter your player name first!");
            return;
        }

        playerName = name;
        showTopicSelection();
    };
}

// TOPIC SELECTION
function showTopicSelection() {
    stopTimer();

    gameContainer.innerHTML = `
        <h1>🗺️ CHOOSE YOUR TOPIC</h1>
        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>
        <p class="description">Select one topic to practice, or play every topic.</p>

        <div id="topicChoices"></div>

        <button id="allTopicsButton">PLAY ALL TOPICS</button>
        <br>
        <button id="homeButton" class="secondary-button">HOME</button>
    `;

    const topicChoices = document.getElementById("topicChoices");

    topics.forEach(function (topic) {
        const button = document.createElement("button");
        button.textContent = topic.title;

        button.style.cssText = `
            display:block;
            width:min(100%, 440px);
            margin:10px auto;
            padding:14px;
            border:2px solid #d9aa48;
            border-radius:12px;
            background:#fff8e7;
            color:#17233a;
            font-size:17px;
            cursor:pointer;
        `;

        button.onclick = function () {
            startTopic(topic.id);
        };

        topicChoices.appendChild(button);
    });

    document.getElementById("allTopicsButton").onclick = function () {
        currentTopic = { id: "all", title: "ALL TOPICS" };
        questions = [];

        topics.forEach(function (topic) {
            shuffle(topic.questions).forEach(function (question) {
                questions.push({
                    data: question,
                    topic: topic
                });
            });
        });

        beginQuiz();
    };

    document.getElementById("homeButton").onclick = showWelcomeScreen;
}

function startTopic(id) {
    const topic = topics.find(function (item) {
        return item.id === id;
    });

    currentTopic = topic;

    questions = shuffle(topic.questions).map(function (question) {
        return {
            data: question,
            topic: topic
        };
    });

    beginQuiz();
}

function beginQuiz() {
    stopTimer();
    score = 0;
    correctCount = 0;
    questionIndex = 0;

    showQuestion();
}

// DISPLAY QUESTION
function showQuestion() {
    stopTimer();

    if (questionIndex >= questions.length) {
        showResults();
        return;
    }

    timeLeft = TIME_LIMIT;

    const item = questions[questionIndex];
    const question = item.data;
    const topic = item.topic;

    gameContainer.innerHTML = `
        <h1>${topic.title}</h1>

        <p class="subtitle">Player: ${escapeHTML(playerName)}</p>

        <p class="topics">
            Question ${questionIndex + 1} of ${questions.length}
            | Score: <strong id="scoreDisplay">${score}</strong>
        </p>

        <div class="progress-track">
            <div class="progress-fill" style="width:${((questionIndex + 1) / questions.length) * 100}%"></div>
        </div>

        <p class="topics">
            ⏱️ Time left: <strong id="timerDisplay">${timeLeft}</strong> seconds
        </p>

        <p class="description" style="font-size:19px;">
            ${question[0]}
        </p>

        <div id="answers"></div>

        <button id="hintButton" class="secondary-button">💡 SHOW HINT</button>

        <p id="hintText" class="description" hidden></p>

        <p id="feedback" class="description" aria-live="polite">
            Choose your answer.
        </p>

        <button id="continueButton" hidden>CONTINUE</button>

        <br>
        <button id="menuButton" class="secondary-button">TOPIC MENU</button>
    `;

    const answersContainer = document.getElementById("answers");
    const answerChoices = shuffle(question[1]);

    answerChoices.forEach(function (choice) {
        const button = document.createElement("button");
        button.textContent = choice;

        button.style.cssText = `
            display:block;
            width:min(100%, 440px);
            margin:10px auto;
            padding:12px 18px;
            border:2px solid #d9aa48;
            border-radius:10px;
            background:#fff8e7;
            color:#17233a;
            font-size:16px;
            cursor:pointer;
        `;

        button.onclick = function () {
            answerQuestion(choice, false);
        };

        answersContainer.appendChild(button);
    });

    // CHECK ANSWER
    function answerQuestion(choice, timedOut) {
        if (document.getElementById("continueButton").hidden === false) {
            return;
        }

        stopTimer();

        answersContainer.querySelectorAll("button").forEach(function (button) {
            button.disabled = true;

            if (button.textContent === question[2]) {
                button.style.background = "#c9f7d4";
            }

            if (choice !== question[2] && button.textContent === choice) {
                button.style.background = "#ffd3d3";
            }
        });

        const feedback = document.getElementById("feedback");

        if (choice === question[2]) {
            score += POINTS;
            correctCount++;

            feedback.innerHTML = `
                ✅ <strong>Correct!</strong> +${POINTS} points.
                <br>
                <strong>Explanation:</strong> ${escapeHTML(question[3])}
            `;
        } else {
            feedback.innerHTML = `
                ${timedOut ? "⏰ Time is up!" : "❌ Incorrect."}
                Correct answer: <strong>${escapeHTML(question[2])}</strong>.
                <br>
                <strong>Explanation:</strong> ${escapeHTML(question[3])}
            `;
        }

        document.getElementById("scoreDisplay").textContent = score;

        document.getElementById("hintButton").disabled = true;

        const continueButton = document.getElementById("continueButton");
        continueButton.hidden = false;
        continueButton.textContent =
            questionIndex === questions.length - 1
                ? "SEE RESULTS"
                : "CONTINUE";

        continueButton.onclick = function () {
            questionIndex++;
            showQuestion();
        };
    }

    // HINT BUTTON
    document.getElementById("hintButton").onclick = function () {
        const hintText = document.getElementById("hintText");

        hintText.textContent = "💡 Hint: " + (question[4] || topic.hint);
        hintText.hidden = false;
        document.getElementById("hintButton").disabled = true;
    };

    // RETURN TO TOPIC MENU
    document.getElementById("menuButton").onclick = showTopicSelection;

    // TIMER
    timerId = setInterval(function () {
        timeLeft--;

        const timerDisplay = document.getElementById("timerDisplay");

        if (timerDisplay) {
            timerDisplay.textContent = timeLeft;
        }

        if (timeLeft <= 0) {
            answerQuestion(null, true);
        }
    }, 1000);
}

// FINAL RESULTS
function showResults() {
    stopTimer();

    const percentage = Math.round((correctCount / questions.length) * 100);

    gameContainer.innerHTML = `
        <div class="treasure-icon">🏆 💎 🏆</div>

        <h1>QUEST COMPLETE!</h1>

        <p class="subtitle">
            Well done, ${escapeHTML(playerName)}!
        </p>

        <p class="description">
            Topic: ${escapeHTML(currentTopic.id === "all" ? "All Topics" : currentTopic.title)}
        </p>

        <h2>Final Score: ${score}</h2>

        <p class="description">
            Correct answers: ${correctCount} out of ${questions.length}
            (${percentage}%).
        </p>

        <p class="description">
            ${
                percentage >= 80
                    ? "Excellent work, treasure master!"
                    : percentage >= 50
                    ? "Good effort! Review the explanations and try again."
                    : "Keep practicing. Use the hints and explanations to improve."
            }
        </p>

        <button id="retryButton">PLAY AGAIN</button>
        <br>
        <button id="topicMenuButton">CHOOSE ANOTHER TOPIC</button>
        <br>
        <button id="homeButton" class="secondary-button">HOME</button>
    `;

    document.getElementById("retryButton").onclick = function () {
        if (currentTopic.id === "all") {
            showTopicSelection();
        } else {
            startTopic(currentTopic.id);
        }
    };

    document.getElementById("topicMenuButton").onclick = showTopicSelection;
    document.getElementById("homeButton").onclick = showWelcomeScreen;
}

// START GAME
showWelcomeScreen();
