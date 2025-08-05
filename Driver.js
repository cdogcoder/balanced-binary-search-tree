import Tree from "./Tree.js";


function generateRandomIntArray(length, min, max) {
  return Array.from({ length: length }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });
}

function printNums(num) {
    console.log(num);
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};


const randomNumbers = [1,2,32,1,1212,12,312,312,12,]

const t = new Tree();
t.buildTree(randomNumbers)
console.log(t.isBalanced())
t.levelOrderForEachIter(printNums)
t.preOrderForEach(printNums)
console.log("-----------------")
t.inOrderForEach(printNums)
console.log("-----------------")
t.postOrderForEach(printNums)
console.log("-----------------")
t.insert(150)
t.insert(112010)
t.insert(1250)
t.insert(1500)
t.insert(1700)
console.log(t.isBalanced())
t.rebalance()
console.log(t.isBalanced())
t.preOrderForEach(printNums)
console.log("-----------------")
t.inOrderForEach(printNums)
console.log("-----------------")
t.postOrderForEach(printNums)
console.log("-----------------")
prettyPrint(t.root)
