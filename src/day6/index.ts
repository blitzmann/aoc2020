import { getgroups } from "process"
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input) => {
    let groups: string[] = input.split("\n\n")

    let groupAnswers = groups.map(group=>{
        // we will store all answers that have at least one 'yes' in an answers set
        let answers = new Set();
        for (let person of group.split("\n")) {
            for (let x of person.split("")) {
                answers.add(x)
            }
        }
        return answers.size
    })

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return groupAnswers.reduce(reducer)
}

const goB = (input) => {
    let groups: string[] = input.split("\n\n")
    let groupAnswers = groups.map(group => {
        // for part two, we want to only take the intersection of all people in the group.
        // Start with the full question list
        let answers = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
        for (let person of group.split("\n")) {
            // mutate answers as the intersection of this person and the previous answers
            answers = new Set(
                [...answers].filter(x => new Set(person.split("")).has(x)))
        }

        return answers.size
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return groupAnswers.reduce(reducer)
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
