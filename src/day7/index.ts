import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const regex = /(.+) bags contain (.+)./gm;

let req = new Map();

// prep the input
let m;
while ((m = regex.exec(input.trim())) !== null) {

  let [_, outerBag, innerBags] = m
  let value = []
  req.set(outerBag, value)
  if (innerBags === "no other bags") {
    continue;
  }
  for (let bag of innerBags.split(",")) {
    let matches = bag.trim().match(/(\d+) (.+) bag(.+)?/)
    value.push([+matches[1], matches[2]])
  }
}

const search = (bags) => {
  for (let bag of bags){
    if (bag[1] === "shiny gold") {
      return true;
    }
    if (search(req.get(bag[1]))){
      return true
    }
  }
}

const goA = (input) => {
  
  let answer = 0
  for  (let [outer, inner] of req) {    
    let ret = search(inner)
    if (ret){
      answer += 1
    }
  }

  return answer

}

const search2 = (outer) => {
  let innerBags = req.get(outer);

  let arr = innerBags.map(inner => {
    let [num, name] = inner;
    
    return num + (num * search2(name))
  })

   const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arr.reduce(reducer, 0)
}

const goB = (input) => {
  
  return search2("shiny gold")

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

