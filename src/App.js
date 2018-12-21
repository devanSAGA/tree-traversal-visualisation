import React, { Component } from "react";

import TreeDiagram from "./components/TreeDiagram";

import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  render() {
    return (
      <div className="app">
        <TreeDiagram data={this.state.treeData} />
      </div>
    );
  }
}

export default App;
