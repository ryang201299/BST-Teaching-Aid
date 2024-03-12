class Node { // Class containing constructor for each node within the BST
    constructor(data) { // Node constructor setting the value, left pointer and right pointer for each node.
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree { // BST class, containing the constructor and private class methods for the BST functions available to the user.
    constructor() { // Constructor setting root node to null and setting three flags to false to prevent multiple traversals appearing in code on call
        this.root = null;
        this.inorderFlag = false;
        this.postorderFlag = false;
        this.preorderFlag = false;
    }

    add(data) { // Adds new node into tree
        const node = this.root;
        if (node === null) { // Checks if a root node exists. If not, a new root node is created with the user entered value.
            this.root = new Node(data);
            return;
        } else { // searchTree function traverses the tree to determine where to insert the node.
            function searchTree(nodes) {
                //nodes equal this.root;
                if (data < nodes.data) { // If user value is less than current node, traverse left. If no left node exists, insert node
                    if (nodes.left === null) {
                        nodes.left = new Node(data);
                        return;
                    } else if (nodes.data !== null) {
                        return searchTree(nodes.left);
                    }
                } else if (data > nodes.data) { // If user value is greater than current node, traverse right. If no right node exists, insert node
                    if (nodes.right === null) {
                        nodes.right = new Node(data);
                        return;
                    } else if (nodes.data !== null) {
                        return searchTree(nodes.right);
                    }
                } else {
                    return null;
                }
            }
            searchTree(node);
        }
    }

    findMin() {
        let current = this.root;
        if (current === null) { // If no node exists in the tree, return null
            return null;
        }
        while (current.left !== null) { // Traverse left nodes until no nodes exist, then return last node
            current = current.left;
        }
        return current.data;
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    findMax() {
        let current = this.root;
        if (current === null) { // If no node exists in the tree, return null
            return null;
        }
        while (current.right !== null) { // Traverse right nodes until no nodes exist, then return last node
            current = current.right;
        }
        return current.data;
    }

    // helper method that calls the removeNode method
    remove(data) {
        // root is re-initialized with root of a modfified tree on change.
        this.root = this.removeNode(this.root, data);
    }

    
    removeNode(node, key) {
        // if tree is empty, return null
        if (node === null) {
            return null;
        }

        if (key < node.data) { // if user value is less than current node, traverse left
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if (key > node.data) { // if user value is greater than current node, traverse right
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else { // if node matches user value, remove node
            // deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // deleting node with one children
            if (node.left === null) {
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting node with two children
            // minimum node of the right subtree
            // is stored in aux
            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
        

    }

    inorder(node) {
        if (this.inorderFlag == false) { // prevents the recursive function outputting the title "in-order" more than once
            document.getElementById('codeInput').innerHTML += "\n\nIn-Order: ";
            this.inorderFlag = true;
        }


        if (node !== null) { // in-order traversal
            this.inorder(node.left);
            document.getElementById('codeInput').innerHTML += node.data + ", ";
            this.inorder(node.right);
        }
    }

    preorder(node) {
        if (this.preorderFlag == false) { // prevents the recursive function outputting the title "pre-order" more than once
            document.getElementById('codeInput').innerHTML += "\n\nPre-Order: ";
            this.preorderFlag = true;
        }

        if (node !== null) { // pre order traversal
            document.getElementById('codeInput').innerHTML += node.data + ", ";
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node) {
        if (this.postorderFlag == false) { // prevents the recursive function outputting the title "post-order" more than once
            document.getElementById('codeInput').innerHTML += "\n\nPost-Order: ";
            this.postorderFlag = true;
        }

        if (node !== null) { // post order traversal
            this.postorder(node.left);
            this.postorder(node.right);
            document.getElementById('codeInput').innerHTML += node.data + ", ";
        }
    }

}

export { Node, BinarySearchTree };

