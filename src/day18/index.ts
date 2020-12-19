import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const traverse = (inner: string[], mode = false) => {
  let leftSide = ""
  let rightSide = ""
  let op
  for (let i = 0; i < inner.length; i++) {
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
        let [i2, result] = traverse(inner.slice(i + 1))
        i += i2 + 1
        if (leftSide) {
          rightSide = result.toString()
        } else {
          leftSide = result.toString()
        }
        break
      case ")":
        leftSide = op(Number(leftSide), Number(rightSide))
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
  return op(Number(leftSide), Number(rightSide))
}


const traverseGroup = (inner: string[], mode = false): [number, number] => {
  let i = 0
  let acc = ""
  loop: for (; i < inner.length; i++) {
    let char = inner[i]

    switch (char) {
      case "(":
        let [i2, result] = traverseGroup(inner.slice(i + 1))
        i += i2 + 1
        acc += result.toString()
        break
      case ")":
        break loop;
      default:
        acc += char
        break
    }
  }

  let result = acc
    .split("*")
    .map(x => x
            .split("+")
            .map(Number)
            .reduce((a, b) => a + b), 0
    )
    .reduce((a, b) => a * b, 1)
  return [i, result]
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
    .map(traverseGroup)
    .map(x=>x[1])
    .reduce((a, b) => a + b, 0)
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
