let choices = ["rock", "paper", "scissors"]
let winState = { rock: "scissors", paper: "rock", scissors: "paper"}

//ELEMENTS
let options = document.getElementsByClassName("option")
let battleElement = document.getElementById("battle")
let aiMessageElement = document.getElementById("ai-message")
let messageElement = document.getElementById("message")
let resetElement = document.getElementById("reset")
let scoreElement = document.getElementById("score")
let aiScoreElement = document.getElementById("ai-score")
let choiceElement = document.createElement("div")

let score = 0
let aiScore = 0
let store = window.localStorage

if (store.getItem("score")) {
  score = store.getItem("score")
}
if (store.getItem("aiScore")) {
  aiScore = store.getItem("aiScore")
}

scoreElement.innerHTML = score
aiScoreElement.innerHTML = aiScore

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
    score++
    store.setItem("score", score)
    scoreElement.innerHTML = score
  } else {
    option.classList.add("loser")
    messageElement.innerHTML = lose
    aiScore++
    store.setItem("aiScore", aiScore)
    aiScoreElement.innerHTML = aiScore
  }

  displayChoices(choice, aiChoice)
  document.getElementById("reset").classList.remove("hide")
}

const reset = function () {
  for (let i = 0; i < options.length; i++) {
    let option = options[i]

    option.classList.remove("disabled")
    option.classList.remove("selected")
    option.classList.remove("winner")
    option.classList.remove("loser")
    option.classList.remove("draw")
  }
  battleElement.removeChild(choiceElement)
  aiMessageElement.innerHTML = ""
  messageElement.innerHTML = ""
  resetElement.classList.add("hide")
}

resetElement.addEventListener("click", reset)
