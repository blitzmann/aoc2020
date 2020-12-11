import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const directions = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
  NE: [-1, 1],
  NW: [-1, -1],
  SW: [1, -1],
  SE: [1, 1]
}

function printLayout(layout) {
  for (let x of layout) {
    console.log(x.join(''))
  }
}

function state(layout){
  return layout.map(x=>x.join('')).join('')
}

const goA = (input) => {
  let layout = input.trim().split("\n").map(x => x.split(""))

  printLayout(layout)

  function testOccupied(x, y) {
    let sum = 0;
    for (let mod in directions) {
      let modx = x + directions[mod][0]
      let mody = y + directions[mod][1]

      if (modx < 0 || modx > layout.length - 1) {
        continue
      }
      if (mody < 0 || mody > layout[0].length - 1) {
        continue
      }
      if (layout[modx][mody] === "#") {
        sum += 1
      }
    }
    return sum
  }


  function run() {
    debugger;
    let changes = []

    for (let [ix, row] of layout.entries()) {
      for (let [iy, cell] of row.entries()) {
        // check left
        let test = testOccupied(ix, iy)

        if ((cell === "L" && test === 0) || (cell === "#" && test >= 4)) {
          changes.push([ix, iy])
        }
      }
    }

    for (let change of changes) {
      let [x, y] = change
      let cell = layout[x][y]
      if (cell === "L") {
        layout[x][y] = "#"
      } else {
        layout[x][y] = "L"
      }
    }
  }

  let prevState
  let state
  do {
    prevState = state
    run()
    state = layout.map(x=>x.join('')).join('')
  }
  while (state!=prevState)
  
  return state.split("").filter(x=>x==="#").length
}

const goB = (input) => {
  let layout = input.trim().split("\n").map(x => x.split(""))

  printLayout(layout)

  function testOccupied(x, y) {
    let sum = 0;
    for (let mod in directions) {
      let modx=x, mody=y
      do {
        modx += directions[mod][0]
        mody += directions[mod][1]
        // keep adding until we find a seat
      } while (layout[modx] && layout[modx][mody] && layout[modx][mody] === ".")

      if (modx < 0 || modx > layout.length - 1) {
        continue
      }
      if (mody < 0 || mody > layout[0].length - 1) {
        continue
      }
      if (layout[modx][mody] === "#") {
        sum += 1
      }
    }
    return sum
  }


  function run() {
    debugger;
    let changes = []

    for (let [ix, row] of layout.entries()) {
      for (let [iy, cell] of row.entries()) {
        // check left
        let test = testOccupied(ix, iy)

        if ((cell === "L" && test === 0) || (cell === "#" && test >= 5)) {
          changes.push([ix, iy])
        }
      }
    }

    for (let change of changes) {
      let [x, y] = change
      let cell = layout[x][y]
      if (cell === "L") {
        layout[x][y] = "#"
      } else {
        layout[x][y] = "L"
      }
    }
  }

  let prevState
  let state
  do{
    prevState = state
    run()
    state = layout.map(x=>x.join('')).join('')
  }
  while (state!=prevState)
  
  
  return state.split("").filter(x=>x==="#").length
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
