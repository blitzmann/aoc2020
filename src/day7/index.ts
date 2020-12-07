import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const regex = /(.+) bags contain (.+)./gm;

type BagTuple = [number, string]
// tuples of number of bags
let req = new Map<string, BagTuple[]>();
const add = (accumulator, currentValue) => accumulator + currentValue;

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
        let matches = bag.trim().match(/(\d+) (.+) bag(s)?/)
        value.push([+matches[1], matches[2]])
    }
}

const goA = (input) => {
    const search = (bags: BagTuple[]) => {
        for (let bag of bags) {
            // we've found our shiny, shortcut 
            if (bag[1] === "shiny gold") {
                return true;
            }
            // if the inner search returns true, we return true. Otherwise we simply continue with the loop
            if (search(req.get(bag[1]))) {
                return true
            }
        }
    }

    let answer = 0
    for (let [_, inner] of req) {
        let ret = search(inner)
        if (ret) {
            answer += 1
        }
    }

    return answer
}

const goB = (input) => {
    const search2 = (outer) => {
        let innerBags = req.get(outer);

        let arr = innerBags.map(inner => {
            let [num, name] = inner;
            return num + (num * search2(name))
        })

        return arr.reduce(add, 0)
    }
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

