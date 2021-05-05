import { setKeyEvents, direction } from "./keyEvents.js"
import { update, randomFood } from "./update.js"
import { draw } from "./draw.js"
import { endGame } from "./endGame.js"

let initial_speed = 6
let snake_speed = initial_speed
const boardSize = 10
const board = []
let head = []
let tail = []
let firstTime = true

for (let row = 0; row < boardSize; row++) {
  let currentRow = []
  for (let col = 0; col < boardSize; col++) {
    let div = document.createElement("div")
    div.classList.add("node")
    div.id = row + "-" + col
    document.querySelector(".board").append(div)

    const currentNode = {
      row,
      col,
      id: row + "-" + col,
      isSnake: false,
      nextNode: null,
      isFood: false,
    }
    currentRow.push(currentNode)
  }
  board.push(currentRow)
}

document.querySelector(".start-btn").addEventListener("click", delayStart)
document.querySelector(".theme-btn-circle").addEventListener("click", changeTheme)

function changeTheme() {
  let body = document.body.classList
  if (body.contains("dark")) {
    body.replace("dark", "light")
    console.log("light")
    document.querySelector(".theme-btn-circle").classList.toggle("rotate")
  } else {
    console.log("dark")
    body.replace("light", "dark")
    document.querySelector(".theme-btn-circle").classList.toggle("rotate")
  }
}

function delayStart() {
  console.log(firstTime)
  document.querySelector(".popup-counter").style.setProperty("display", "block")
  for (let i = 0; i < 5; i++) {
    setCounter(i)
  }
  function setCounter(i) {
    setTimeout(() => {
      if (i === 4) {
        document.querySelector(".popup-counter").style.setProperty("display", "none")
        startTheGame()
      } else if (i === 3) document.querySelector(".counter").innerText = "GO"
      else document.querySelector(".counter").innerText = 3 - i
    }, 500 * i)
  }
}

function startTheGame() {
  randomFood()
  document.querySelector(".start-btn").removeEventListener("click", delayStart)
  document.querySelector(".start-btn").classList.add("disabled")
  document.getElementById("5-4").classList.add("snake-node")

  head = board[5][4]
  head.isSnake = true

  tail = head

  if (firstTime) setKeyEvents()
  window.requestAnimationFrame(main)
}

let lastRenderTime = 0
let stopId
let play = true
function main(currentTime) {
  stopId = window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snake_speed) return
  lastRenderTime = currentTime

  play = update(direction)

  if (!play || play === null) endGame(stopId, play)

  draw()
}

export let score = -1
export function setValue(name, value) {
  if (name === "head") {
    head = value
  } else if (name === "tail") {
    tail = value
  } else if (name === "speed") {
    snake_speed = value
  } else if (name === "score") {
    score = value
  } else if (name === "firstTime") {
    firstTime = false
  }
}

export { board, boardSize, head, tail, snake_speed, initial_speed, delayStart, firstTime }
