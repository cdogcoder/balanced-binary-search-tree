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
            if (isBeginningCall) {
                this.root = newNode;
            } return newNode;
        }
    }

    insert(value) {
        if (!value) {
            console.error("No valid was provided");
            return;
        }
        let currNode = this.root;
        while (currNode.data) {
            if (value > currNode.data) {
                if (currNode.right) currNode = currNode.right;
                else break; 
            } else if (value < currNode.data) {
                if (currNode.left) currNode = currNode.left;
                else break;
            } else if (value == currNode.data){
                console.error("Value already exists in tree.");
                return;
            } 
        }
        if (value > currNode.data) currNode.right = new Node(value, null, null);
        else if (value < currNode.data) currNode.left = new Node(value, null, null);
        else if (value == currNode.data) console.error("Value already exists in the tree.");
    }

    delete(value) {
        if (!value) {
            console.error("No value was provided");
            return;
        } else if (!this.find(value)) {
            console.error("The value does not exist in the tree.");
            return;
        }
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

    find(value) {
        let currNode = this.root;
        while (currNode.data) {
            if (value == currNode.data) {
                return currNode;
            } else if (value > currNode.data) {
                if (currNode.right) {
                    currNode = currNode.right;
                }
                else return null; 
            } else if (value < currNode.data) {
                if (currNode.left) {
                    currNode = currNode.left;
                }
                else return null;
            } 
        }
    }

    levelOrderForEachIter(callback, queue = [[this.root]], count = 0) {
        while (queue.length) {
            const nextLevel = [];
            for (let i = 0; i < queue[0].length; i++) {
                callback(queue[0][i]);
                if (queue[0][i].left) nextLevel.push(queue[0][i].left)
                if (queue[0][i].right) nextLevel.push(queue[0][i].right)
            }
            if (nextLevel.length) {
                count++;
                queue.push(nextLevel);
            }
            queue.shift();
        }
        return count;
    }

    levelOrderForEachRec(callback, queue = [this.root]) {
        if (!queue.length) return;
        else {
            callback(queue[0])
            if (queue[0].left) queue.push(queue[0].left)
            if (queue[0].right) queue.push(queue[0].right)
            queue.shift();
            this.levelOrderForEachIter(callback, queue)
        }
    }

    inOrderForEach(callback, currNode = this.root) {
        if (currNode && currNode.left) this.inOrderForEach(callback, currNode.left);
        if (currNode) callback(currNode.data);
        if (currNode && currNode.right) this.inOrderForEach(callback, currNode.right);
    }

    preOrderForEach(callback, currNode = this.root) {
        if (currNode) callback(currNode.data);
        if (currNode && currNode.left) this.preOrderForEach(callback, currNode.left);
        if (currNode && currNode.right) this.preOrderForEach(callback, currNode.right);
    }

    postOrderForEach(callback, currNode = this.root) {
        if (currNode && currNode.left) this.postOrderForEach(callback, currNode.left);
        if (currNode && currNode.right) this.postOrderForEach(callback, currNode.right);
        if (currNode) callback(currNode.data);
    }

    height(value) {
        if (this.find(value)) {
            return this.levelOrderForEachIter(() => {}, [[this.find(value)]])
        }
    }

    depth(value) {
        if (this.find(value)) {
            let currNode = this.root;
            let count = 0;
            while (currNode) {
                if (value < currNode.data) currNode = currNode.left;
                else if (value > currNode.data) currNode = currNode.right;
                else break;
                count++;
            }
            return count;
        }
        return null;
    }

    isBalanced(node = this.root) {
        if (node.left && node.right) {
            if (Math.abs(this.height(node.left.data) - this.height(node.right.data)) <= 1) {
                return this.isBalanced(node.left) && this.isBalanced(node.right);
            } else {
                return false;
            }
        } else if (node.left && !node.right) {
            if (this.height(node.left.data) == 0) return true;
            else return false;
        } else if (!node.left && node.right) {
            if (this.height(node.right.data) == 0) return true;
            else return false;
        } else {
            return true;
        }
    }

    rebalance(array = []) {
        this.inOrderForEach((node) => {
            array.push(node)
        })
        this.root = this.buildTree(array)
    }

    printTree(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}


function printNums(num) {
    console.log(num);
}

const t = new Tree();
const arr = [1,2,3,4,5,6,7,8]
t.buildTree(arr, 0, arr.length-1);
t.printTree(t.root)
// console.log(t.find(2))
// console.log(t.find(125))
// console.log(t.find(124))
// console.log(t.levelOrderForEachIter(printNums))
// console.log(t.height(100))
// console.log(t.height(200))
// console.log(t.depth(175))
// console.log(t.delete(5))
// console.log(t.delete(2))
// console.log(t.isBalanced())
// t.levelOrderForEachRec(printNums)
// t.inOrderForEach(printNums)
// t.preOrderForEach(printNums)
// t.postOrderForEach(printNums)
// t.rebalance()
// prettyPrint(t.root)
