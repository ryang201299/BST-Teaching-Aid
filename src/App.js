import React, { Component } from 'react';
import { BinarySearchTree } from './Functional/bst';
import "./Styles/head.css";
import "./Styles/side.css";
import "./Styles/body.css";
import "./Styles/bst.css";

// instantiating a BST object to access and call the private BST class methods
const bst = new BinarySearchTree();

function Tree(props) {
    const { data } = props; // defines props as Tree function parameters

    function renderTree(node) { // creates a "li" element for each node, as apart of the treeflex library, to trigger automatic styling
        return Object.entries(node).map(function ([key, value]) { // lists through the nodes
            if (key === 'left' && typeof value === 'object') { // traverses left for lower nodes
                if (value !== null) {
                    return (
                        <li key={value.data}>
                            <Tree data={value} />
                        </li>
                    );
                }
                if (value === null) {
                    return null;
                }
            } else if (key === 'right' && typeof value === 'object') { // traverses right for greater nodes
                if (value !== null) {
                    return (
                        <li key={value.data}>
                            <Tree data={value} />
                        </li>
                    );
                }
                if (value === null) {
                    return null;
                }
            }
        });
    }

    return data ? (
        <>
            <span className="tf-nc">{data.data}</span>
            <ul>{renderTree(data)}</ul>
        </>
    ) : (
        'EMPTY'
    );
}

function App() { // method calling the BST class methods

    const [number, setNumber] = React.useState(null);
    const [root, setRoot] = React.useState(null);

    React.useEffect(() => { // updates the page each time a node is added
        componentRender();
        bst.add(50);
        bst.add(45);
        bst.add(55);
        bst.add(35);
        bst.add(37);
        bst.add(48);
        bst.add(58);
        bst.add(56);
        bst.add(53);
        bst.add(36);
        bst.add(34);
        bst.add(60);

        setRoot((prev) => ({ ...prev, ...bst.root }));
    }, []);

    function changeNumber(e) { // updates the current state number //explain this more
        setNumber(Number(e.target.value));
    }

    function exists(e, number) { // checks the BST for any nodes with the user entered value to determine whether a node can be removed or added etc
        let n;
        let content = document.getElementById("treeID").textContent;

        if (content.includes(number)) {
            n = true;
        }
        else {
            n = false;
        }
        return n;
    }

    function addNumber(e) { // calls BST private class methods
        e.preventDefault(); // prevents the application refreshing before a new node is added to the tree

        let m = exists(e, number); // checks if node exists in tree before attempting to insert it again

        if (!m) {
            bst.add(number); // if the node does not already exist, BST add node method is called
            setRoot((prev) => ({ ...prev, ...bst.root })); // refresh tree contents to contain new node
            let n = exists(e, number); // checks if node has successfully been added to the tree for functional testing purposes.

            if (n) {
                console.log("Number ", number, " has not been added");
            }
            else {
                console.log("Number ", number, " has been added");
            }
        }
        else {
            console.log("Number ", number, " is already in the tree");
            alert('A node already exists with the value ' + number); // prevents node being added if it already exists.


        }
    }

    function removeNumber(e) { // Removes node with user specified value
        e.preventDefault();
        let m = exists(e, number); // checks if node exists before executing method

        if (m) { // if no exists, continue to remove. Else, alert user that this node does not exist and cannot be removed
            bst.remove(number);
            setRoot((prev) => ({ ...prev, ...bst.root }));

            let n = exists(e, number);

            if (n) {
                console.log("Number ", number, " has been removed"); // Outputs console log to verify the node has been removed
            }
            else {
                console.log("Number ", number, " has not been removed"); // Outputs console log to verify the node has not been removed
            }
        }
        else {
            console.log("Number ", number, " is not in the tree"); // Outputs console log to verify the node does not exist within the tree
            alert('No node exists with the value ' + number);

        }
              
    }

    function findMax() { // calls the bst find maximum method
        bst.findMax();
        document.getElementById('codeInput').innerHTML += '\n\nMaximum Value: ' + bst.findMax();
    }

    function findMin() { // calls the bst find minimum method
        document.getElementById('codeInput').innerHTML += '\n\nMinimum Value: ' + bst.findMin();
    }

    function inorder(e) { // calls the bst in-order traversal method
        e.preventDefault();
        bst.inorder(root);
    }

    function preorder(e) { // calls the bst pre-order traversal method
        e.preventDefault();
        bst.preorder(root);
    }

    function postorder(e) { // calls the bst post-order traversal method
        e.preventDefault();
        bst.postorder(root);
    }

    function testOutput(arg, name) { // required for automated functional testing
        if (typeof (arg) != 'undefined' && arg != null) {
            console.log(name + ' exists');
        } else {
            console.log(name + ' does not exist');
        }
    }

    function componentRender() { // method contains dictionary of each element within the page, to test for the elements existance
        
        console.log("Performing Unit Tests --\n")
        let elements = [{
            id: "addButton",
            name: "Add Node Button",
            },
            {
                id: "remButton",
                name: "Remove Node Button",
            },
            {
                id: "findMinButton",
                name: "Find Min Button"
            },
            {
                id: "findMaxButton",
                name: "Find Max Button"
            },
            {
                id: "inorder",
                name: "InOrder Button"
            },
            {
                id: "preorder",
                name: "PreOrder Button"
            },
            {
                id: "postorder",
                name: "PostOrder Button"
            },
            {
                id: "treeID",
                name: "Binary Search Tree"
            },
            {
                id: "header",
                name: "Page Header"
            },
            {
                id: "sideContainer",
                name: "Side Container"
            },
            {
                id: "dsl",
                name: "DSL Section"
            }
        ]

        for (var i = 0; i < Object.keys(elements).length; i++) {
            var elementExists = document.getElementById(elements[i].id);
            testOutput(elementExists, elements[i].name);
        }
    }

    return ( // react function return displays the HTML elements for the page.
        <div className="page-container">
            <div className="head-container" id="header">
                <h1>BST Visualisation</h1>
            </div>
            <div className="body-container">
                <div className="side-container" id="sideContainer">
                    <div className="sideButtons">
                        <form className="form-control">
                            <button type="button" onClick={findMin} className="input-button" id="findMinButton">
                                Find Min
                            </button>
                            <button type="button" onClick={findMax} className="find-max-button" id="findMaxButton">
                                Find Max
                            </button>
                        </form>
                        <form onSubmit={addNumber} className="form-control">
                            <input type="number" min="1" name="remove" id="inputID" onChange={changeNumber} required />
                            <button type="submit" className="input-button" id="addButton">
                                Add
                            </button>
                            <button type="button" onClick={removeNumber} className="input-button" id="remButton">
                                Remove
                            </button>
                        </form>
                        <form onSubmit={inorder} className="form-control">
                            <button type="submit" className="input-button" id="inorder">
                                Inorder
                            </button>
                            <button type="button" onClick={preorder} className="find-min-button" id="preorder">
                                Preorder
                            </button>
                            <button type="button" onClick={postorder} className="find-min-button" id="postorder">
                                Postorder
                            </button>
                        </form>

                    </div>
                    <div className="codeContainer">
                        <div className="codeDiv" id="dsl">
                            <div className="codeNav">
                                <ul>
                                    <li className="DLM"><a href="">DSL</a></li>
                                    <li className="Log"><a href="">Log</a></li>
                                </ul>
                            </div>
                            <div className="code">
                                <textarea rows="15" id="codeInput" className="codeInput" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bst-container">
                
                    <div className="tf-tree tf-custom" id="treeID">
                        <ul>
                            <li>
                                <Tree data={root} parent={bst.root} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
