let options = document.getElementsByClassName("option")

for (let i = 0; i < options.length; i++) {
  let option = options[i]

  option.addEventListener("click", function () {
    this.classList.add("selected")
    disableOptions()
    battle()
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

const battle = function () {

}
