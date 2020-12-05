import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

class Passport {
    amb
    blu
    brn
    gry
    grn
    hzl
    oth
    cid

    private validEcl = new Set([
        "amb",
        "blu",
        "brn",
        "gry",
        "grn",
        "hzl",
        "oth"
    ])

    private hgtValidators = new Map([
        ['cm', (value) => +value >= 150 && +value <= 193],
        ["in", (value) => +value >= 59 && +value <= 76],
    ])

    private validators = new Map([
        ['byr', (value) => +value >= 1290 && +value <= 2002 && value.toString().length === 4],
        ['iyr', (value) => +value >= 2010 && +value <= 2020 && value.toString().length === 4],
        ['eyr', (value) => +value >= 2020 && +value <= 2030 && value.toString().length === 4],
        ['hgt', (value) => {
            let data = value.split(/^(\d+)(cm|in)$/).filter(x => x !== "")
            let func = this.hgtValidators.get(data[1])
            return data.length === 2 && func && func(data[0])
        }],
        ['hcl', (value) => !!value.match(/^#[\d|a-z]{6}$/)],
        ['ecl', (value) => this.validEcl.has(value)],
        ['pid', (value) => !!value.match(/^[\d]{9}$/)]
    ])

    constructor(rawString: string) {
        let data = rawString.trim().split(/[\n\r ]/)
        for (let [key, value] of data.map(x => x.split(":"))) {
            this[key] = value
        }
    }

    get hasAllReqFields() {
        for (let req of this.validators.keys()) {
            if (!this[req]) {
                return false
            }
        }
        return true
    }

    get allReqFieldsValid() {
        for (let key of this.validators.keys()) {
            if (!this.validators.get(key)(this[key])) {
                return false
            }
        }
        return true;
    }

    get isValid() {
        return this.hasAllReqFields && this.allReqFieldsValid
    }
}

const goA = (input) => {
    let passports = input.split("\n\n");
    return passports.map(x => new Passport(x)).filter(x => x.hasAllReqFields).length
}

const goB = (input) => {
    let passports = input.split("\n\n");
    return passports.map(x => new Passport(x)).filter(x => x.isValid).length
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
