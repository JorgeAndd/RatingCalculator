'use strict';

var parameters = {
    numberOfRatings: 10,
    maxScore: 5,
    prune: false
}

var numberOfCalls = 0;

let isPossible = (node, sum) => {
    let maxPossible = (parameters.numberOfRatings - node.depth) * parameters.maxScore + node.sum;
    return maxPossible > sum;
}

let walk = (node, sum, currentPossibilities = []) => {
    numberOfCalls++;

    if(node.depth < parameters.numberOfRatings) {
        let score = 0;
        while(score <= parameters.maxScore) {
            if(parameters.prune && !isPossible(node, sum))
                return;

            let nextNode = {
                children: [],
                depth: node.depth+1,
                sum: node.sum + score,
                value: score,
                currentPath: node.currentPath.concat(score)
            }

            walk(nextNode, sum, currentPossibilities);
            score++;
        }
    } else {
        if(node.sum >= Math.floor(sum) && node.sum <= Math.ceil(sum)) {
            currentPossibilities.push(node.currentPath);
        }
    }
    
    return currentPossibilities;
}

let removeDuplicates = (list) => {
    let ordered = list.map(e => {
        return e.sort();
    });

    return Array.from(new Set(ordered.map(JSON.stringify)), JSON.parse);
}

let printList = (list) => {
    list.forEach(e => console.log(e.join(', ')));
}

let areEqual = (listA, listB) => {
    if(listA.length !== listB.length)
        return false;

    return listA.every(a => listB.some(b => JSON.stringify(b) === JSON.stringify(a)));
}

let average = (0+1+2+3+4+5+4+3+2+1)/10;
let root = {
    children: [],
    depth: 0,
    sum: 0,
    value: 0,
    currentPath: []
}

let execute = (prune) => {
    let iterations = 1;
    let totalTime = 0;
    
    parameters.prune = prune;

    let possibilities = [];    
    for(let i = 0; i < iterations; i++) {
        numberOfCalls = 0;
        let start = process.hrtime();
        possibilities = walk(root, sum);
        let diff = process.hrtime(start);
        let mili = (diff[0] * 1e9 + diff[1])/1e6;
        totalTime += mili;
    }
    
    let timeAvg = totalTime/iterations;
    console.log('Execution time: ' + timeAvg + ' ms' + (prune ? '(prunning)' : '(complete)'));
    console.log('Number of calls: ' + numberOfCalls + (prune ? '(prunning)' : '(complete) \n'));

    return possibilities;
}

let sum = average*parameters.numberOfRatings;
let possibilitiesComplete = execute(false);
let possibilitiesPrunned = execute(true);

let uniquesComplete = removeDuplicates(possibilitiesComplete);
let uniquesPrunned = removeDuplicates(possibilitiesPrunned);

if(areEqual(uniquesComplete, uniquesPrunned)) {
    console.log("Equal results");
    printList(uniquesComplete);
} else {
    console.log("DIFFERENT RESULTS !!!");
    
    console.log("Complete: \n");
    printList(uniquesComplete);

    console.log("\nPrunned: \n");
    printList(uniquesPrunned);
}


