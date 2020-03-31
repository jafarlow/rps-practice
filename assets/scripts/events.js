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
let aiChoiceDescription = document.createElement("p")

let score = 0
let aiScore = 0
let store = window.localStorage

if (store.getItem("score")) {
  score = store.getItem("score")
}
if (store.getItem("aiScore")) {
  aiScore = store.getItem("aiScore")
}

scoreElement.innerText = score
aiScoreElement.innerText = aiScore

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
  aiChoiceDescription.classList.add("ai-choice-descr")

  aiMessageElement.innerText = "AI chooses:"
  battleElement.appendChild(choiceElement)
  battleElement.appendChild(aiChoiceDescription)
  aiChoiceDescription.innerText = ai
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
    messageElement.innerText = draw
  } else if (aiChoice === winState[choice]) {
    option.classList.add("winner")
    messageElement.innerText = win
    score++
    store.setItem("score", score)
    scoreElement.innerText = score
  } else {
    option.classList.add("loser")
    messageElement.innerText = lose
    aiScore++
    store.setItem("aiScore", aiScore)
    aiScoreElement.innerText = aiScore
  }

  displayChoices(choice, aiChoice)
  document.getElementById("reset").classList.remove("hide")
}

const reset = function () {
  // NOTE: this loop removes any classes from the user's choice
  for (let i = 0; i < options.length; i++) {
    let option = options[i]

    option.classList.remove("disabled", "selected", "winner", "loser", "draw")
  }

  // NOTE: this loop is what removes the classes for the ai choice
  // without this, the classes stack and the img will not change
  let aiClassList = choiceElement.classList
  while (aiClassList.length > 0) {
    aiClassList.remove(aiClassList.item(0))
  }

  // clear content
  battleElement.removeChild(choiceElement)
  battleElement.removeChild(aiChoiceDescription)
  aiMessageElement.innerText = ""
  messageElement.innerText = ""

  resetElement.classList.add("hide")
}

resetElement.addEventListener("click", reset)
