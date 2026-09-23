// ==========================================
// SKYLANDLE
// ==========================================

// Skylander database
// Stats are currently example game values.
// You can expand this list later.

const data = [

  {
    name: "Spyro",
    element: "Magic",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Purple",
    health: 300,
    speed: 50,
    armor: 20
  },

  {
    name: "Stealth Elf",
    element: "Life",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Green",
    health: 250,
    speed: 70,
    armor: 15
  },

  {
    name: "Trigger Happy",
    element: "Tech",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Yellow",
    health: 220,
    speed: 55,
    armor: 10
  },

  {
    name: "Gill Grunt",
    element: "Water",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Blue",
    health: 280,
    speed: 45,
    armor: 25
  },

  {
    name: "Eruptor",
    element: "Fire",
    game: "Giants",
    series: "Core",
    color: "Red",
    health: 400,
    speed: 35,
    armor: 35
  },

  {
    name: "Pop Fizz",
    element: "Magic",
    game: "Swap Force",
    series: "Core",
    color: "Blue",
    health: 260,
    speed: 60,
    armor: 15
  },

  {
    name: "Wash Buckler",
    element: "Water",
    game: "Swap Force",
    series: "Swap Force",
    color: "Blue",
    health: 380,
    speed: 40,
    armor: 40
  },

  {
    name: "Blast Zone",
    element: "Fire",
    game: "Swap Force",
    series: "Swap Force",
    color: "Red",
    health: 350,
    speed: 45,
    armor: 35
  },

  {
    name: "Tree Rex",
    element: "Life",
    game: "Giants",
    series: "Giant",
    color: "Green",
    health: 500,
    speed: 30,
    armor: 50
  },

  {
    name: "Kaos",
    element: "Dark",
    game: "Various",
    series: "Villain",
    color: "Purple",
    health: 450,
    speed: 40,
    armor: 30
  },

  {
    name: "Bash",
    element: "Earth",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Orange",
    health: 360,
    speed: 35,
    armor: 35
  },

  {
    name: "Sonic Boom",
    element: "Air",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Blue",
    health: 280,
    speed: 55,
    armor: 20
  },

  {
    name: "Chop Chop",
    element: "Undead",
    game: "Spyro's Adventure",
    series: "Core",
    color: "Blue",
    health: 320,
    speed: 40,
    armor: 45
  },

  {
    name: "Spotlight",
    element: "Light",
    game: "Trap Team",
    series: "Core",
    color: "White",
    health: 300,
    speed: 55,
    armor: 25
  }

];


// ==========================================
// ELEMENT RELATIONSHIPS
// ==========================================
//
// Exact match = GREEN
// Related element = YELLOW
// Unrelated element = GRAY
//
// Relationships:
//
// Fire  <-> Water
// Fire  <-> Air
// Water <-> Life
// Life  <-> Undead
// Undead <-> Magic
// Magic <-> Tech
// Tech  <-> Earth
// Earth <-> Air
// Light <-> Dark
//

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


// ==========================================
// GAME VARIABLES
// ==========================================

let answer;
let guessedNames = [];


// ==========================================
// START GAME
// ==========================================

function startGame() {

  answer = data[Math.floor(Math.random() * data.length)];

  guessedNames = [];

  document.getElementById("guessTable").innerHTML = "";

  document.getElementById("message").textContent = "";

  document.getElementById("winMessage").classList.add("hidden");

  document.getElementById("guessInput").value = "";

  document.getElementById("suggestions").innerHTML = "";

  console.log("Answer:", answer.name);

}


// ==========================================
// NORMAL CATEGORY COMPARISON
// ==========================================

function categoryCell(guess, correct) {

  if (guess === correct) {

    return `<div class="cell green">${guess}</div>`;

  }

  return `<div class="cell gray">${guess}</div>`;

}


// ==========================================
// ELEMENT COMPARISON
// ==========================================

function elementCell(guess, correct) {

  // Exact element
  if (guess === correct) {

    return `<div class="cell green">${guess}</div>`;

  }


  // Related element
  if (
    relatedElements[correct] &&
    relatedElements[correct].includes(guess)
  ) {

    return `<div class="cell yellow">${guess}</div>`;

  }


  // Completely unrelated
  return `<div class="cell gray">${guess}</div>`;

}


// ==========================================
// STAT COMPARISON
// ==========================================
//
// Exact = green
//
// Within 15% = yellow
//
// More than 15% away = gray
//
// Guess below answer = ↑
// Guess above answer = ↓
//

function statCell(guess, correct) {

  if (guess === correct) {

    return `
      <div class="cell green">
        ${guess}
      </div>
    `;

  }


  const difference = Math.abs(guess - correct) / correct;

  const close = difference <= 0.15;


  let arrow = "";

  if (guess < correct) {

    arrow = "↑";

  } else {

    arrow = "↓";

  }


  return `
    <div class="cell ${close ? "yellow" : "gray"}">
      ${guess} ${arrow}
    </div>
  `;

}


// ==========================================
// MAKE GUESS
// ==========================================

function makeGuess() {

  const input = document
    .getElementById("guessInput")
    .value
    .trim();


  if (!input) {

    showMessage("Enter a Skylander first.");

    return;

  }


  const guessed = data.find(
    skylander =>
      skylander.name.toLowerCase() === input.toLowerCase()
  );


  if (!guessed) {

    showMessage("That Skylander isn't in the current database.");

    return;

  }


  // Prevent duplicate guesses

  if (
    guessedNames.some(
      name => name.toLowerCase() === guessed.name.toLowerCase()
    )
  ) {

    showMessage("You already guessed that Skylander.");

    return;

  }


  guessedNames.push(guessed.name);


  addGuessRow(guessed);


  document.getElementById("guessInput").value = "";

  document.getElementById("suggestions").innerHTML = "";


  // Check win

  if (guessed.name === answer.name) {

    showWin();

  }

}


// ==========================================
// ADD GUESS ROW
// ==========================================

function addGuessRow(guess) {

  const row = document.createElement("tr");


  row.innerHTML = `

    <td>
      <div class="cell ${
        guess.name === answer.name
          ? "green"
          : "gray"
      }">
        ${guess.name}
      </div>
    </td>

    <td>
      ${elementCell(
        guess.element,
        answer.element
      )}
    </td>

    <td>
      ${categoryCell(
        guess.game,
        answer.game
      )}
    </td>

    <td>
      ${categoryCell(
        guess.series,
        answer.series
      )}
    </td>

    <td>
      ${categoryCell(
        guess.color,
        answer.color
      )}
    </td>

    <td>
      ${statCell(
        guess.health,
        answer.health
      )}
    </td>

    <td>
      ${statCell(
        guess.speed,
        answer.speed
      )}
    </td>

    <td>
      ${statCell(
        guess.armor,
        answer.armor
      )}
    </td>

  `;


  document
    .getElementById("guessTable")
    .prepend(row);

}


// ==========================================
// WIN
// ==========================================

function showWin() {

  document
    .getElementById("answerText")
    .textContent =
      `The Skylander was ${answer.name}!`;


  document
    .getElementById("winMessage")
    .classList.remove("hidden");


  showMessage(
    `You solved it in ${guessedNames.length} guess${
      guessedNames.length === 1 ? "" : "es"
    }!`
  );

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(message) {

  document.getElementById("message").textContent = message;

}


// ==========================================
// AUTOCOMPLETE
// ==========================================

const guessInput =
  document.getElementById("guessInput");

const suggestions =
  document.getElementById("suggestions");


guessInput.addEventListener(
  "input",
  function () {

    const search =
      this.value.trim().toLowerCase();


    suggestions.innerHTML = "";


    if (!search) {

      return;

    }


    const matches = data
      .filter(skylander =>
        skylander.name
          .toLowerCase()
          .includes(search)
      )
      .filter(skylander =>
        !guessedNames.includes(skylander.name)
      )
      .slice(0, 6);


    matches.forEach(skylander => {

      const div =
        document.createElement("div");


      div.className = "suggestion";

      div.textContent =
        skylander.name;


      div.addEventListener(
        "click",
        function () {

          guessInput.value =
            skylander.name;

          suggestions.innerHTML = "";

          guessInput.focus();

        }
      );


      suggestions.appendChild(div);

    });

  }
);


// ==========================================
// ENTER KEY
// ==========================================

guessInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      makeGuess();

    }

  }
);


// ==========================================
// BUTTONS
// ==========================================

document
  .getElementById("guessBtn")
  .addEventListener(
    "click",
    makeGuess
  );


document
  .getElementById("newGameBtn")
  .addEventListener(
    "click",
    startGame
  );


document
  .getElementById("playAgainBtn")
  .addEventListener(
    "click",
    startGame
  );


// ==========================================
// START
// ==========================================

startGame();
