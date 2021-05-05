import { score } from "./app.js"

export function endGame(stopId, play) {
  window.cancelAnimationFrame(stopId)
  addRefreshBTN()
  gameOver(play)
  toggleGameOverWindow()
  showScore()
}

function addRefreshBTN() {
  const startBTN = document.querySelector(".start-btn")
  startBTN.value = "Restart the Game"
  startBTN.classList.add("refresh")
  startBTN.onclick = () => {
    location.reload()
  }
}

function gameOver(gameOverType) {
  console.log(score)
  document.querySelector(".game-over").style.setProperty("display", "block")
  if (gameOverType === false) {
    document.querySelector(".boundry").style.setProperty("display", "block")
  } else {
    document.querySelector(".eat-self").style.setProperty("display", "block")
  }
}

function toggleGameOverWindow() {
  document.querySelector(".game-over").addEventListener("click", () => {
    document.querySelector(".game-over").style.setProperty("display", "none")
  })
}

function showScore() {
  document.querySelector(".score-points").innerText = `${score} points`
}
