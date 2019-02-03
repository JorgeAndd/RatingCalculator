'use strict';

var parameters = {
    numberOfRatings: 5,
    maxScore: 5
}

let walk = (node, sum, currentPossibilities = []) => {
    if(node.depth < parameters.numberOfRatings) {
        let score = 0;
        while(score <= parameters.maxScore) {
            
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
            console.log(node.currentPath.join(' + ') + ' = ' + sum);
            currentPossibilities.push(node.currentPath);
        }
    }   
}

let average = (5+5+5+5+4)/5;
let root = {
    children: [],
    depth: 0,
    sum: 0,
    value: 0,
    currentPath: []
}

let sum = average*parameters.numberOfRatings;

walk(root, sum);
console.log('done');