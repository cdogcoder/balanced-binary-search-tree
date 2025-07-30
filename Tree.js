import Node from "./Node.js";

export default class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array, start, end) {
        let noDupArr = new Set(array);
        noDupArr = Array.from(noDupArr);
        start = 0
        end = noDupArr.length-1;
        if (start > end) return null;
        else {
            const mid = Math.floor((start+end)/2);
            const lengthOfLeft = noDupArr.slice(start,mid).length;
            const lengthOfRight = noDupArr.slice(mid+1).length;
            let leftSubTree = this.buildTree(noDupArr.slice(start, mid), start, lengthOfLeft-1);
            let rightSubTree = this.buildTree(noDupArr.slice((mid+1)), start, lengthOfRight-1);
            const newNode = new Node(noDupArr[mid], leftSubTree, rightSubTree);
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
const arr = [1,3,4,3,4,3,4,2,1,3,1,2,3,4,2,5,29,12]
t.root = t.buildTree(arr, 0, arr.length-1);

console.log(t.root)
prettyPrint(t.root)
