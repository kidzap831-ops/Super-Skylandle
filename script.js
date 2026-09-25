const data = [
  // KEEP ALL OF YOUR EXISTING SKYLANDER DATA HERE EXACTLY AS IT WAS
];

// Related elements
const relatedElements = {
  Fire: ["Water", "Air"],
  Water: ["Fire", "Life"],
  Life: ["Undead", "Water", "Light"],
  Undead: ["Life", "Magic", "Dark"],
  Magic: ["Tech", "Undead"],
  Tech: ["Magic", "Earth"],
  Earth: ["Air", "Tech"],
  Air: ["Earth", "Fire"],
  Light: ["Life", "Dark"],
  Dark: ["Light", "Undead"]
};

let correctSkylander;
let guessCount = 0;
let totalScore = 0;
let gameOver = false;

function getScore(guesses) {
  if (guesses === 1) return 100;
  if (guesses === 2) return 50;
  if (guesses === 3) return 28;
  if (guesses === 4) return 17;
  if (guesses === 5) return 10;
  if (guesses === 6) return 7;
  if (guesses === 7) return 5;
  if (guesses === 8) return 4;
  if (guesses === 9) return 3;
  return 2;
}

function updateScore() {
  document.getElementById("guessCount").textContent = guessCount;

  if (guessCount === 0) {
    document.getElementById("score").textContent = 100;
  } else {
    document.getElementById("score").textContent = getScore(guessCount);
  }

  document.getElementById("totalScore").textContent = totalScore;
}

function startGame() {
  correctSkylander = data[Math.floor(Math.random() * data.length)];

  guessCount = 0;
  gameOver = false;

  document.getElementById("guessTableBody").innerHTML = "";
  document.getElementById("winMessage").textContent = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("autocomplete").innerHTML = "";

  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessButton").disabled = false;

  updateScore();
}

function categoryCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}

function elementCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  if (relatedElements[correct]?.includes(guess)) {
    return `<div class="cell yellow">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}

function attackFormCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}

function statCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  if (guess < correct) {
    return `<div class="cell yellow">${guess} ↑</div>`;
  }

  return `<div class="cell yellow">${guess} ↓</div>`;
}

function makeGuess() {
  if (gameOver) {
    return;
  }

  const input = document.getElementById("guessInput");
  const guessName = input.value.trim();

  const guess = data.find(
    skylander => skylander.name.toLowerCase() === guessName.toLowerCase()
  );

  if (!guess) {
    alert("Skylander not found!");
    return;
  }

  guessCount++;
  updateScore();

  addGuessRow(guess);

  input.value = "";
  document.getElementById("autocomplete").innerHTML = "";

  if (guess.name === correctSkylander.name) {
    showWin();
  }
}

function addGuessRow(guess) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${categoryCell(guess.name, correctSkylander.name)}</td>
    <td>${elementCell(guess.element, correctSkylander.element)}</td>
    <td>${categoryCell(guess.game, correctSkylander.game)}</td>
    <td>${attackFormCell(guess.attackForm, correctSkylander.attackForm)}</td>
    <td>${categoryCell(guess.color, correctSkylander.color)}</td>
    <td>${statCell(guess.health, correctSkylander.health)}</td>
    <td>${statCell(guess.speed, correctSkylander.speed)}</td>
    <td>${statCell(guess.armor, correctSkylander.armor)}</td>
  `;

  document.getElementById("guessTableBody").prepend(row);
}

function showWin() {
  const score = getScore(guessCount);

  totalScore += score;
  gameOver = true;

  document.getElementById("winMessage").textContent =
    `🎉 Correct! The Skylander was ${correctSkylander.name}! You scored ${score} points!`;

  document.getElementById("totalScore").textContent = totalScore;

  document.getElementById("guessInput").disabled = true;
  document.getElementById("guessButton").disabled = true;
  document.getElementById("autocomplete").innerHTML = "";
}

document.getElementById("guessInput").addEventListener("input", function () {
  if (gameOver) {
    return;
  }

  const value = this.value.toLowerCase();
  const autocomplete = document.getElementById("autocomplete");

  autocomplete.innerHTML = "";

  if (!value) {
    return;
  }

  const matches = data
    .filter(skylander =>
      skylander.name.toLowerCase().includes(value)
    )
    .slice(0, 8);

  matches.forEach(skylander => {
    const item = document.createElement("div");

    item.className = "autocomplete-item";
    item.textContent = skylander.name;

    item.addEventListener("click", function () {
      document.getElementById("guessInput").value = skylander.name;
      autocomplete.innerHTML = "";
    });

    autocomplete.appendChild(item);
  });
});

document.getElementById("guessButton").addEventListener("click", makeGuess);

document.getElementById("newGameButton").addEventListener("click", startGame);

document.getElementById("guessInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    makeGuess();
  }
});

startGame();
