const data = [
  {
    name: "Spyro",
    element: "Magic",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Purple",
    health: 300,
    speed: 50,
    armor: 20
  },
  {
    name: "Stealth Elf",
    element: "Life",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Green",
    health: 250,
    speed: 70,
    armor: 15
  },
  {
    name: "Trigger Happy",
    element: "Tech",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Yellow",
    health: 220,
    speed: 55,
    armor: 10
  },
  {
    name: "Gill Grunt",
    element: "Water",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Blue",
    health: 280,
    speed: 45,
    armor: 25
  },
  {
    name: "Eruptor",
    element: "Fire",
    game: "Giants",
    attackForm: "N/A",
    color: "Red",
    health: 400,
    speed: 35,
    armor: 35
  },
  {
    name: "Pop Fizz",
    element: "Magic",
    game: "Swap Force",
    attackForm: "N/A",
    color: "Blue",
    health: 260,
    speed: 60,
    armor: 15
  },
  {
    name: "Wash Buckler",
    element: "Water",
    game: "Swap Force",
    attackForm: "N/A",
    color: "Blue",
    health: 380,
    speed: 40,
    armor: 40
  },
  {
    name: "Blast Zone",
    element: "Fire",
    game: "Swap Force",
    attackForm: "N/A",
    color: "Red",
    health: 350,
    speed: 45,
    armor: 35
  },
  {
    name: "Tree Rex",
    element: "Life",
    game: "Giants",
    attackForm: "N/A",
    color: "Green",
    health: 500,
    speed: 30,
    armor: 50
  },
  {
    name: "Kaos",
    element: "Dark",
    game: "Various",
    attackForm: "N/A",
    color: "Purple",
    health: 450,
    speed: 40,
    armor: 30
  },
  {
    name: "Bash",
    element: "Earth",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Orange",
    health: 360,
    speed: 35,
    armor: 35
  },
  {
    name: "Sonic Boom",
    element: "Air",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Blue",
    health: 280,
    speed: 55,
    armor: 20
  },
  {
    name: "Chop Chop",
    element: "Undead",
    game: "Spyro's Adventure",
    attackForm: "N/A",
    color: "Blue",
    health: 320,
    speed: 40,
    armor: 45
  },
  {
    name: "Spotlight",
    element: "Light",
    game: "Trap Team",
    attackForm: "N/A",
    color: "White",
    health: 300,
    speed: 55,
    armor: 25
  }
];


/* =========================
   ELEMENT RELATIONSHIPS
========================= */

const relatedElements = {
  Fire: ["Water", "Air"],
  Water: ["Fire", "Life"],
  Life: ["Undead", "Water"],
  Undead: ["Life", "Magic"],
  Magic: ["Tech", "Undead"],
  Tech: ["Magic", "Earth"],
  Earth: ["Air", "Tech"],
  Air: ["Earth", "Fire"],
  Light: ["Dark"],
  Dark: ["Light"]
};


/* =========================
   GAME VARIABLES
========================= */

let correctSkylander;


/* =========================
   START GAME
========================= */

function startGame() {
  correctSkylander =
    data[Math.floor(Math.random() * data.length)];

  document.getElementById("guessTableBody").innerHTML = "";
  document.getElementById("winMessage").textContent = "";
  document.getElementById("guessInput").value = "";
}


/* =========================
   CATEGORY CELLS
========================= */

function categoryCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}


/* =========================
   ELEMENT CELL
========================= */

function elementCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  if (
    relatedElements[correct] &&
    relatedElements[correct].includes(guess)
  ) {
    return `<div class="cell yellow">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}


/* =========================
   ATTACK FORM CELL
========================= */

function attackFormCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  return `<div class="cell gray">${guess}</div>`;
}


/* =========================
   STAT CELL
========================= */

function statCell(guess, correct) {
  if (guess === correct) {
    return `<div class="cell green">${guess}</div>`;
  }

  const difference =
    Math.abs(guess - correct) / correct;

  if (difference <= 0.15) {
    return `<div class="cell yellow">${guess}</div>`;
  }

  if (guess < correct) {
    return `<div class="cell gray">${guess} ↑</div>`;
  }

  return `<div class="cell gray">${guess} ↓</div>`;
}


/* =========================
   MAKE GUESS
========================= */

function makeGuess() {
  const input =
    document.getElementById("guessInput");

  const guessName =
    input.value.trim();

  const guess =
    data.find(
      skylander =>
        skylander.name.toLowerCase() ===
        guessName.toLowerCase()
    );

  if (!guess) {
    alert("Skylander not found!");
    return;
  }

  addGuessRow(guess);

  input.value = "";
  document.getElementById("autocomplete").innerHTML = "";

  if (guess.name === correctSkylander.name) {
    showWin();
  }
}


/* =========================
   ADD GUESS ROW
========================= */

function addGuessRow(guess) {
  const tableBody =
    document.getElementById("guessTableBody");

  const row =
    document.createElement("tr");

  row.innerHTML = `
    <td>
      ${categoryCell(
        guess.name,
        correctSkylander.name
      )}
    </td>

    <td>
      ${elementCell(
        guess.element,
        correctSkylander.element
      )}
    </td>

    <td>
      ${categoryCell(
        guess.game,
        correctSkylander.game
      )}
    </td>

    <td>
      ${attackFormCell(
        guess.attackForm,
        correctSkylander.attackForm
      )}
    </td>

    <td>
      ${categoryCell(
        guess.color,
        correctSkylander.color
      )}
    </td>

    <td>
      ${statCell(
        guess.health,
        correctSkylander.health
      )}
    </td>

    <td>
      ${statCell(
        guess.speed,
        correctSkylander.speed
      )}
    </td>

    <td>
      ${statCell(
        guess.armor,
        correctSkylander.armor
      )}
    </td>
  `;

  tableBody.prepend(row);
}


/* =========================
   WIN MESSAGE
========================= */

function showWin() {
  document.getElementById("winMessage").textContent =
    `🎉 Correct! The Skylander was ${correctSkylander.name}!`;
}


/* =========================
   AUTOCOMPLETE
========================= */

const guessInput =
  document.getElementById("guessInput");

const autocomplete =
  document.getElementById("autocomplete");

guessInput.addEventListener("input", () => {
  const value =
    guessInput.value.toLowerCase().trim();

  autocomplete.innerHTML = "";

  if (!value) {
    return;
  }

  const matches =
    data.filter(skylander =>
      skylander.name
        .toLowerCase()
        .includes(value)
    );

  matches.forEach(skylander => {
    const item =
      document.createElement("div");

    item.className =
      "autocomplete-item";

    item.textContent =
      skylander.name;

    item.addEventListener("click", () => {
      guessInput.value =
        skylander.name;

      autocomplete.innerHTML = "";
    });

    autocomplete.appendChild(item);
  });
});


/* =========================
   BUTTONS
========================= */

document
  .getElementById("guessButton")
  .addEventListener("click", makeGuess);

document
  .getElementById("newGameButton")
  .addEventListener("click", startGame);


/* =========================
   ENTER KEY
========================= */

guessInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    makeGuess();
  }
});


/* =========================
   START
========================= */

startGame();
