import {
  board,
  boardSize,
  head,
  tail,
  snake_speed,
  delayStart,
  score,
  setValue,
  initial_speed,
} from "./app.js"

function draw() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      let node = board[row][col]
      const nodeClassList = document.getElementById(node.id).classList

      if (node.isFood === true) {
        document.getElementById(node.id).classList.add("food")
      } else {
        document.getElementById(node.id).classList.remove("food")
      }

      if (node === head) {
        node.isSnake = true
        nodeClassList.toggle("head", true)
        nodeClassList.toggle("tail", false)
      } else if (node.isSnake) {
        nodeClassList.toggle("snake-node", true)
        nodeClassList.toggle("tail", false)
        nodeClassList.toggle("head", false)
      } else {
        nodeClassList.toggle("head", false)
        nodeClassList.toggle("tail", false)
        nodeClassList.toggle("snake-node", false)
      }
    }
  }
}

function reset() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      let node = board[row][col]

      node.nextNode = null
      if (node.isSnake) node.isSnake = false
      else if (node.isFood) node.isFood = false
    }
  }
  setValue("head", [])
  setValue("tail", [])
  setValue("speed", initial_speed)
  setValue("score", -1)
  draw()
}

export { draw, reset }
