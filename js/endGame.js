import { delayStart, score, firstTime, setValue } from "./app.js"
import { reset } from "./draw.js"

export function endGame(stopId, play) {
  window.cancelAnimationFrame(stopId)
  addRefreshBTN()
  gameOver(play)
  if (firstTime) toggleGameOverWindow()
  showScore()
  setValue("firstTime")
}

function addRefreshBTN() {
  const startBTN = document.querySelector(".start-btn")
  startBTN.value = "Restart the Game"
  startBTN.classList.add("refresh")
  startBTN.onclick = () => {
    // location.reload()
    reset()
    delayStart()
  }
}

function gameOver(gameOverType) {
  console.log(score)
  document.querySelector(".popup").style.setProperty("display", "block")
  if (gameOverType === false) {
    document.querySelector(".boundry").style.setProperty("display", "block")
    document.querySelector(".eat-self").style.setProperty("display", "none")
  } else {
    document.querySelector(".eat-self").style.setProperty("display", "block")
    document.querySelector(".boundry").style.setProperty("display", "none")
  }
}

function toggleGameOverWindow() {
  document.querySelector(".popup").addEventListener("click", () => {
    document.querySelector(".popup").style.setProperty("display", "none")
  })
  document.querySelector(".start-btn").addEventListener("keydown", () => {
    document.querySelector(".popup").style.setProperty("display", "none")
  })
}

function showScore() {
  document.querySelector(".score-points").innerText = `${score} points`
}
