import Node from "./Node.js";

export default class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array, start, end) {
        if (start > end) return null;
        else {
            const mid = Math.floor((start+end)/2);
            let leftSubTree = this.buildTree(Array.from(array).slice(start, mid), start, mid-1);
            let rightSubTree = this.buildTree(Array.from(array).slice((mid+1)), start, mid-1);
            const newNode = new Node(array[mid], leftSubTree, rightSubTree);
            return newNode
        }
    }

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

const t = new Tree();
const arr = [1,2,3,4,5,6,7]
t.root = t.buildTree(arr, 0, arr.length-1);

prettyPrint(t.root)
