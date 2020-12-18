import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const traverse = (inner: string[], mode = false) => {
  console.log("--- starting traverse")
  let leftSide = ""
  let rightSide = ""
  let op
  for (let i = 0; i < inner.length; i++) {
    console.log(`position: ${i}`, inner.slice(i).join(""))
    let char = inner[i]

    switch (char) {
      case "+":
      case "*":
        if (op) {
          leftSide = op(Number(leftSide), Number(rightSide))
          rightSide = ""
          op = null
        }

        if (char === "+") {
          op = (a, b) => (a + b);
        } else {
          op = (a, b) => (a * b);
        }
        break;
      case "(":
        console.log("starting parenths at i = ", i)
        let [i2, result] = traverse(inner.slice(i + 1))
        i += i2 + 1
        if (leftSide) {
          rightSide = result.toString()
        } else {
          leftSide = result.toString()
        }
        console.log(`pos: ${i} left: ${leftSide} right: ${rightSide}`)
        break
      case ")":
        leftSide = op(Number(leftSide), Number(rightSide))
        console.log("found a ) at i = ", i, leftSide)
        rightSide = ""
        op = null
        return [i, leftSide]
        break
      default:
        if (op) {
          rightSide += char
        } else { leftSide += char }
        break
    }
  }
  console.log("--- ending traverse")
  return op(Number(leftSide), Number(rightSide))
}


const traverse2 = (inner: string[], mode = false) => {
  console.log("--- starting traverse")
  let leftSide = ""
  let rightSide = ""
  let op
  let mulGroup = []
  for (let i = 0; i < inner.length; i++) {
    console.log(`position: ${i}`, inner.slice(i).join(""))
    let char = inner[i]

    switch (char) {
      case "+":
        if (op) {
          leftSide = op(Number(leftSide), Number(rightSide))
          rightSide = ""
          op = null
        }
        op = (a, b) => (a + b);
        break
      case "*":
        if (op) {
          leftSide = op(Number(leftSide), Number(rightSide))
          console.log("multiply hit, op: ", leftSide)
          rightSide = ""
          op = null
        }
        mulGroup.push(leftSide)
        leftSide = ""
        break;
      case "(":
        console.log("starting parenths at i = ", i)
        let [i2, result] = traverse2(inner.slice(i + 1))
        i += i2 + 1
        console.log (result)
          
          if (op) {
            rightSide = result.toString()
          } else { 
            mulGroup.push(result)
          }
        console.log(`pos: ${i} left: ${leftSide}, right: ${rightSide}`)
        break
      case ")":
        
        leftSide = op(Number(leftSide), Number(rightSide))
        mulGroup.push(leftSide)
        leftSide = ""
        console.log(mulGroup, leftSide, rightSide)
        console.log("found a ) at i = ", i, leftSide)
        rightSide = ""
        op = null
        return [i, mulGroup.reduce((a,b)=>a*b, 1)]
        break
      default:
        if (op) {
          rightSide += char
        } else { 
          leftSide += char 
        }
        break
    }
  }
  console.log("--- ending traverse")
  console.log(op)
  return op ? op(Number(leftSide), Number(rightSide)) : mulGroup.reduce((a,b)=>a*b, 1) : 
}

const goA = (input) => {
  return input
    .trim()
    .split("\n")
    .map(x => x.replace(/ /g, "").trim().split(""))
    .map(traverse)
    .reduce((a, b) => a + b, 0)
}

const goB = (input) => {
  return input
  .trim()
  .split("\n")
  .map(x => x.replace(/ /g, "").trim().split(""))
  .map(traverse2)
  .reduce((a, b) => a + b, 0)
}

/* Tests */

// test()

/* Results */

console.time("Time")
// const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

// console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
