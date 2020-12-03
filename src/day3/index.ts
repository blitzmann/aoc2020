import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const matrix = input.split("\n").map(x=>x.trim().split(""))

const traverse = function(matrix, slope:[number, number]) {
  const initialWidth = matrix[0].length;
  const initialHeight = matrix.length;

  let x = 0, y = 0; // set initial starting point
  let treeCount = 0;
  while (true) {
    x += slope[0]
    y += slope[1]
    if (y >= initialHeight) {
      break
    }
    if (matrix[y][x % initialWidth] === "#"){
      treeCount +=1;
    }
  }
  return treeCount
}

const goA = (input) => {  
  return traverse(matrix, [3,1])
}

const goB = (input) => {
  let slopes: [number, number][] = [[1,1], [3,1],[5,1],[7,1],[1,2]]
  let trees = slopes.map(slope => traverse(matrix, slope))
  const reducer = (accumulator, currentValue) => accumulator * currentValue;
  return trees.reduce(reducer)
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
