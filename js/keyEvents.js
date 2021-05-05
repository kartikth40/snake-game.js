let direction = "right"

function setKeyEvents() {
  document.addEventListener("keydown", (e) => {
    let key = e.code
    if (
      key !== "ArrowUp" &&
      key !== "ArrowDown" &&
      key !== "ArrowRight" &&
      key !== "ArrowLeft"
    )
      return
    direction = changeDirection(key)
  })
}

function changeDirection(key) {
  switch (key) {
    case "ArrowUp":
      return "up"

    case "ArrowRight":
      return "right"

    case "ArrowDown":
      return "down"

    case "ArrowLeft":
      return "left"

    default:
      console.log(`${key} is pressed.`)
      return
  }
}

export { setKeyEvents, direction }
