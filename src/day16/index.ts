import { loadavg } from "os";
import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

//                   field    min     max
let fields = new Map<string, [number, number][]>()
let myTicket: number[];
let nearbyTickets: number[][]
//                                isValid
let numberCache = new Map<number, boolean>();

const goA = (input: string) => {
    let arr = input.split("\n\n")
    for (let line of arr[0].split("\n")) {
        let [field, rangesStr] = line.split(": ").map(x => x.trim())
        let ranges = [];
        fields.set(field, ranges)
        for (let rangeStr of rangesStr.split(" or ")) {
            ranges.push(rangeStr.split("-").map(Number))
        }
    }

    myTicket = arr[1].replace("your ticket:", "").trim().split(",").map(Number)
    nearbyTickets = arr[2].replace("nearby tickets:", "").trim().split("\n").map(x => x.split(",").map(Number))

    let errorRate = 0;
    let ranges = [...fields.values()].flat()


    for (let ticket of nearbyTickets) {
        for (let number of ticket) {
            if (numberCache.has(number)) {
                if (!numberCache.get(number)) { // if it's not valid
                    errorRate += number;
                }
                continue; // if number is cached, don't figure out range stuff
            }

            let valid = false;
            for (let [min, max] of ranges) {
                if (number >= min && number <= max) {
                    valid = true;
                    break
                }
            }

            numberCache.set(number, valid)
            if (!valid) {
                errorRate += number;
            }

        }
    }
    return errorRate
}

const goB = (input) => {
    let invalidNumbers = new Set([...numberCache.entries()].filter(([_, val])=>!val).map(([key, _])=>key))
    // need to filter down to valid numbers... wah wah
    let validTickets = nearbyTickets.filter(x=>new Set([...x].filter(i => invalidNumbers.has(i))).size === 0)
    
    let rotated = validTickets[0].map((val, index) => validTickets.map(row => row[index]))
    
    let answers = new Map();
    
    for (let [i, positionValues] of rotated.entries()) {
        
        let pendingFields = new Set([...fields.keys()])
        loop1: for (let value of positionValues) {
            // test for each of the fields
            for (let field of pendingFields) {
                if (pendingFields.size === 1) {
                    break loop1;
                }
                let ranges = fields.get(field);
                let thing = ranges.map(([min, max])=>value >= min && value <= max)
                // console.log(`Value ${i}-${value}  ${field} (thing: ${thing})`)
                if (!thing.some(Boolean)) {
                    // console.log(`Value ${value} doesn't match range of ${field} (thing: ${thing})`)
                    pendingFields.delete(field); // remove the field, and break out 
                }
            }
        }
        answers.set(i, pendingFields)
    }

    let answers2 = new Map<string, number>();
    
    let ordered = [...answers.entries()].sort((a, b)=>a[1].size-b[1].size)
    for (let [pos, set] of ordered) {
        for (let field of [...answers2.keys()]){
            set.delete(field)
        }
        if (set.size === 1){
            answers2.set([...set][0], pos)
        }            
    }

    return [...answers2.keys()]
        .filter(x=>x.startsWith("departure"))
        .map(x=>answers2.get(x))
        .map(x=>myTicket[x])
        .reduce((a,b)=>a*b, 1)
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
