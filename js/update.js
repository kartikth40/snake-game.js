import {
  board,
  boardSize,
  head,
  tail,
  snake_speed,
  setValue,
  score,
} from "./app.js"

let nextHead = {}
function update(direction) {
  switch (direction) {
    case "up":
      if (!board[head.row - 1]) return false
      if (board[head.row - 1][head.col].isSnake) return null
      nextHead = board[head.row - 1][head.col]
      break
    case "right":
      if (!board[head.col + 1]) return false
      if (board[head.row][head.col + 1].isSnake) return null
      nextHead = board[head.row][head.col + 1]
      break
    case "down":
      if (!board[head.row + 1]) return false
      if (board[head.row + 1][head.col].isSnake) return null
      nextHead = board[head.row + 1][head.col]
      break
    case "left":
      if (!board[head.col - 1]) return false
      if (board[head.row][head.col - 1].isSnake) return null
      nextHead = board[head.row][head.col - 1]
      break
    default:
      nextHead = board[head.row][head.col + 1]
      break
  }

  if (Object.keys(nextHead).length === 0)
    nextHead = board[head.row][head.col + 1]
  else {
    tail.isSnake = false
    let tempTail = tail

    if (nextHead === undefined) return false

    head.nextNode = nextHead
    setValue("head", nextHead)

    if (head.isFood) {
      removeCurrentFood(head)
      randomFood()
      increaseSpeed()
      return true
    }

    setValue("tail", tail.nextNode)
    tempTail.nextNode = null
  }
  return true
}

function increaseSpeed() {
  setValue("speed", snake_speed + 0.2)
}

function randomFood() {
  updateScore()
  while (true) {
    let randomRow = Math.floor(Math.random() * boardSize)
    let randomCol = Math.floor(Math.random() * boardSize)
    if (!board[randomRow][randomCol].isSnake) {
      setFood(randomRow, randomCol)
      break
    }
  }
}

function updateScore() {
  setValue("score", score + 1)
}

function setFood(row, col) {
  let node = board[row][col]
  node.isFood = true
}

function removeCurrentFood(node) {
  if (node.isFood) {
    node.isFood = false
  }
}

export { update, randomFood }
