import { readInput } from "../utils/index";
const prepareInput = (rawInput) => rawInput;
const input = prepareInput(readInput());
const goA = (input) => {
    let [time, busses] = input.split("\n");
    busses = busses.split(",").filter(x => x !== "x").map(Number);
    let highest = 0;
    let bus = 0;
    for (let x of busses) {
        let val = +time % x;
        if (val > highest) {
            highest = val;
            bus = x;
        }
    }
    return (bus - highest) * bus;
};
const goB = (input) => {
    let [_, buses] = input.split("\n");
    buses = buses.split(",").map((x, i) => [Number(x), i]).filter(x => !isNaN(x[0]));
    let t = 1;
    let t_increm = 1;
    for (let bus of buses) {
        let [busID, minOffset] = bus;
        while (true) {
            if ((t + minOffset) % busID === 0) {
                console.log(`Found bus ${busID}! t: ${t}, time increment: ${t_increm}, busMods: ${buses.map(x => (t + x[1]) % x[0])}`);
                t_increm *= busID;
                break;
            }
            t += t_increm;
        }
    }
    // while (currentTest < buses.length) {
    //   i++
    //   t = (i * mod)
    //   // test to see if the next bus is at their proper place.
    //   let [busID, minOffset] = buses[currentTest];
    //   if ((t + minOffset) % busID === 0) {
    //     console.log(`Found ${busID}! t: ${t}, mod: ${mod}, i: ${i}, busMods: ${buses.map(x => (t + x[1]) % x[0])}`)
    //     // bus was found, modify our mod to equal this new timestamp. Every incrementation of this will result in both busses being in their correct positions
    //     mod = t
    //     i = 1
    //     currentTest += 1 // next bus, plz
    //   }
    // }
    return t;
};
/* Tests */
// test()
/* Results */
console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");
console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
//# sourceMappingURL=index.js.map