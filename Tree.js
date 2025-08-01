import Node from "./Node.js";

export default class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array, start, end, isBeginningCall = true) {
        let noDupArr = array;
        if (isBeginningCall) {
            noDupArr = new Set(array);
            noDupArr = Array.from(noDupArr).sort((a,b) => a-b);
            start = 0;
            end = noDupArr.length-1;
        }
        if (start > end) return null;
        else {
            const mid = Math.floor((start+end)/2);
            const lengthOfLeft = noDupArr.slice(start,mid).length;
            const lengthOfRight = noDupArr.slice(mid+1).length;
            let leftSubTree = this.buildTree(noDupArr.slice(start, mid), start, lengthOfLeft-1, false);
            let rightSubTree = this.buildTree(noDupArr.slice((mid+1)), start, lengthOfRight-1, false);
            const newNode = new Node(noDupArr[mid], leftSubTree, rightSubTree);
            return newNode
        }
    }

    insert(value) {
        let nodeToCompare = this.root;
        while (nodeToCompare.data) {
            if (value > nodeToCompare.data) {
                if (nodeToCompare.right) nodeToCompare = nodeToCompare.right;
                else break; 
            } else if (value < nodeToCompare.data) {
                if (nodeToCompare.left) nodeToCompare = nodeToCompare.left;
                else break;
            } else if (value == nodeToCompare.data){
                console.error("Value already exists in tree.");
                return;
            } 
        }
        if (value > nodeToCompare.data) nodeToCompare.right = new Node(value, null, null);
        else if (value < nodeToCompare.data) nodeToCompare.left = new Node(value, null, null);
        else if (value == nodeToCompare.data) console.error("Value already exists in the tree.");
    }

    delete(value) {
        if (!value) return;
        let prevNode = null;
        let currNode = this.root;
        while (currNode.data) {
            if (value == currNode.data) {
                break;
            } else if (value > currNode.data) {
                if (currNode.right) {
                    prevNode = currNode;
                    currNode = currNode.right;
                }
                else break; 
            } else if (value < currNode.data) {
                if (currNode.left) {
                    prevNode = currNode;
                    currNode = currNode.left;
                }
                else break;
            } 
        }
      
        if (value == currNode.data) {
            if (currNode.left === null && currNode.right === null) {
                if (prevNode !== null) {
                    if (prevNode.left.data == value) prevNode.left = null;
                    else if (prevNode.right.data == value) prevNode.right = null;
                } else this.root = null;
            } else if (currNode.left === null && currNode.right) {
                if (prevNode !== null) {
                    if (prevNode.left.data == value) prevNode.left = currNode.right;
                    else if (prevNode.right.data == value) prevNode.right = currNode.right;
                } else this.root = currNode.right;
            } else if (currNode.left && currNode.right === null) {
                if (prevNode !== null) {
                    if (prevNode.left.data == value) prevNode.left = currNode.left;
                    else if (prevNode.right.data == value) prevNode.right = currNode.left;
                } else this.root = currNode.left;
            } else {
                let nodeToDelete = currNode;
                let max = currNode.left.data;
                prevNode = currNode;
                currNode = currNode.left;
                
                while (currNode.right) {
                    if (currNode.right.data > max) {
                        prevNode = currNode;
                        currNode = currNode.right;
                        max = currNode.data;
                    }
                }

                currNode.data = nodeToDelete.data;
                nodeToDelete.data = max;
                if (prevNode.left && prevNode.left.data == value) {
                    if (currNode.left) prevNode.left = currNode.left;
                    else if (currNode.right) prevNode.left = currNode.right;
                    else prevNode.left = null;
                }
                else if (prevNode.right && prevNode.right.data == value) {
                    if (currNode.left) prevNode.right = currNode.left;
                    else if (currNode.right) prevNode.right = currNode.right;
                    else prevNode.right = null;
                }
            }
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
const arr = [60,65,70,75,80,85,95,100,110,115,120,125,135,150,175]
t.root = t.buildTree(arr, 0, arr.length-1);



prettyPrint(t.root)
