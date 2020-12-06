import { getgroups } from "process"
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
  let groups: string[] = input.split("\n\n")
  let groupAnswers = [];
  for (let group of groups){
    let answers = new Set();
    let persons = group.split("\n");
    for (let person of persons){
      for (let x of person.split("")){
        answers.add(x)
      }
    }
    groupAnswers.push(answers.size);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return groupAnswers.reduce(reducer)
  return 
}

const goB = (input) => {
  let groups: string[] = input.split("\n\n")
  let groupAnswers = [];
  for (let group of groups){
    let answers = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
    let persons = group.split("\n");
    for (let person of persons){
      answers = new Set(
        [...answers].filter(x => new Set(person.split("")).has(x)))
    }

    groupAnswers.push(answers.size)

  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return groupAnswers.reduce(reducer)
  return 
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
