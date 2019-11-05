let options = document.getElementsByClassName("option")
let choices = ["rock", "paper", "scissors"]
let winState = { rock: "scissors", paper: "rock", scissors: "paper"}
let battleElement = document.getElementById("battle")
let aiMessageElement = document.getElementById("ai-message")
let messageElement = document.getElementById("message")

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

  aiMessageElement.innerHTML = "AI chooses:"
  battleElement.appendChild(choiceElement)
}

const battle = function (option) {
  // user
  let choice = option.dataset.choice

  // AI
  let aiChoice = choices[random(2, 0)]
  let draw = "It's a draw!"
  let win = "Player wins!"
  let lose = "AI wins!"

  if (choice === aiChoice) {
    option.classList.add("draw")
    messageElement.innerHTML = draw
  } else if (aiChoice === winState[choice]) {
    option.classList.add("winner")
    messageElement.innerHTML = win
  } else {
    option.classList.add("loser")
    messageElement.innerHTML = lose
  }
  displayChoices(choice, aiChoice)
}
