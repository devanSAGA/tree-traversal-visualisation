import React, { Component } from "react";

import TreeDiagram from "./components/TreeDiagram";

import Dropdown from "./components/util/Dropdown";
import Tree from "./components/util/Tree";

import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTraversal: "Select Traversal",
      traversalOrder: [], //it stores the expected sequence of node from tree structure
      dropdownOptions: [
        {
          id: 0,
          value: "Postorder",
          selected: false,
          key: "dropdownOptions"
        },
        {
          id: 1,
          value: "Preorder",
          selected: false,
          key: "dropdownOptions"
        },
        {
          id: 2,
          value: "Inorder",
          selected: false,
          key: "dropdownOptions"
        },
        {
          id: 3,
          value: "Levelorder",
          selected: false,
          key: "dropdownOptions"
        }
      ],
      treeData: {
        name: "1",
        children: [
          {
            name: "3"
          },
          {
            name: "2",
            children: [
              {
                name: "5",
                children: [
                  {
                    name: "7"
                  },
                  { name: "6" }
                ]
              },
              {
                name: "4"
              }
            ]
          }
        ]
      }
    };

    this.tree = new Tree("1");
  }
  //This will build the tree data-structure with these static values
  componentDidMount() {
    this.tree.add("2", "left");
    this.tree.add("3", "right");
    this.tree.add("4", "left", "2");
    this.tree.add("5", "right", "2");
    this.tree.add("6", "left", "5");
    this.tree.add("7", "right", "5");
  }

  /*This method gets the exepected order of nodes based on the tree as user selects the traversal and updates the state*/
  updateTraversalOrder = () => {
    const { selectedTraversal } = this.state;
    if (selectedTraversal === "Inorder") {
      this.tree.inorderTraversal();
    } else if (selectedTraversal === "Preorder") {
      this.tree.preorderTraversal();
    } else if (selectedTraversal === "Postorder") {
      this.tree.postorderTraversal();
    } else {
      this.tree.levelorderTraversal();
    }

    const traversalOrder = this.tree.getTraversalOrder();
    this.setState({ traversalOrder });
  };

  /*updates the state when user selectes new traversal and resets the tree and displayed list*/
  handleTraversalChange = (selectedTraversal, id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => (item.selected = false));
    temp[id].selected = true;
    this.setState(
      {
        [key]: temp,
        selectedTraversal
      },
      () => {
        this.resetTree();
      }
    );
  };

  resetTree = () => {
    this.setState(
      {
        list: [],
        traversalOrder: [],
        treeData: {
          name: "1",
          children: [
            {
              name: "3"
            },
            {
              name: "2",
              children: [
                {
                  name: "5",
                  children: [
                    {
                      name: "7"
                    },
                    { name: "6" }
                  ]
                },
                {
                  name: "4"
                }
              ]
            }
          ]
        }
      },
      () => {
        setTimeout(() => {
          this.updateTraversalOrder();
        }, 1500);
      }
    );
  };

  render() {
    return (
      <div className="app">
        <TreeDiagram data={this.state.treeData} />
        <Dropdown
          title={this.state.selectedTraversal}
          handleTraversalChange={this.handleTraversalChange}
          options={this.state.dropdownOptions}
        />
      </div>
    );
  }
}

export default App;
