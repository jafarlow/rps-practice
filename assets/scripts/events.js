let options = document.getElementsByClassName("option")
let choices = ["rock", "paper", "scissors"]
let winState = { rock: "scissors", paper: "rock", scissors: "paper"}
let battleElement = document.getElementById("battle")

for (let i = 0; i < options.length; i++) {
  let option = options[i]

  option.addEventListener("click", function () {
    this.classList.add("selected")
    disableOptions()
    battle(this)
  })
}

const disableOptions = function () {
  for (let i = 0; i < options.length; i++) {
    let option = options[i]

    if (!option.classList.contains("selected")) {
      option.classList.add("disabled")
    }
  }
}

const random = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const displayChoices = function (player, ai) {
  let choiceElement = document.createElement("div")
  choiceElement.classList.add("ai-choice", ai)

  let header = document.createElement("h3")
  let text = document.createTextNode("AI chooses: ")
  header.classList.add("h3")
  header.appendChild(text)

  battleElement.appendChild(header)
  battleElement.appendChild(choiceElement)
}

const battle = function (option) {
  // user
  let choice = option.dataset.choice

  // AI
  let aiChoice = choices[random(2, 0)]


  if (choice === aiChoice) {
    console.log("Draw!");
  } else if (aiChoice === winState[choice]) {
    console.log("Player wins!");
  } else {
    console.log("AI wins!");
  }
  displayChoices(choice, aiChoice)
}
