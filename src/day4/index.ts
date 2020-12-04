import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
let reqFields = new Set([
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
])
const goA = (input) => {
  let passports = input.split("\n\n");
  let valid = 0
  for (let passport of passports) {
    let data = passport.trim().split(/[\n\r ]/)
    let fields = new Set(data.map(x => x.split(":")[0]))

    let difference = new Set(
      [...reqFields].filter(x => !fields.has(x))).size;

    if (difference === 0) { valid += 1 }
  }

  return valid
}

let validation = new Map([
  ['byr', (value) => {
    return +value >= 1290 && +value <= 2002 && value.toString().length === 4
  }],
  ['iyr', (value) => {
    return +value >= 2010 && +value <= 2020 && value.toString().length === 4
  }],
  ['eyr', (value) => {
    return +value >= 2020 && +value <= 2030 && value.toString().length === 4
  }],
  ['hgt', (value) => {
    let data = value.split(/(\d+)(cm|in)/).filter(x => x !== "")
    if (data.length !== 2) {
      return false
    }
    let [num, unit] = data
    if (unit === "cm") {
      return +num >= 150 && +num <= 193
    }
    else if (unit === "in") {
      return +num >= 59 && +num <= 76
    }
  }],
  ['hcl', (value) => {
    return value.length === 7 && !!value.match(/#[\d|a-z]{6}/)
  }],
  ['ecl', (value) => {
    let valid = new Set([
      "amb",
      "blu",
      "brn",
      "gry",
      "grn",
      "hzl",
      "oth"])
    return valid.has(value)
  }],
  ['pid', (value) => {
    return value.length === 9 && !!value.match(/[\d]{9}/)
  }]])

const goB = (input) => {
  let passports = input.split("\n\n");
  let valid = 0
  for (let passport of passports) {
    let data = passport.trim().split(/[\n\r ]/)

    let fields = new Set(data.map(x => x.split(":")[0]))
    let validity = data.map(x => {
      let [key, value] = x.split(":")

      let func = validation.get(key)
      if (!func) {
        return null
      }

      return func(value)
    })
    let difference = new Set(
      [...reqFields].filter(x => !fields.has(x))).size;
    console.log(fields, validity)
    if (difference === 0 && validity.filter(x => x !== null).every(Boolean)) {
      // check values  
      valid += 1
    }
  }

  return valid
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
