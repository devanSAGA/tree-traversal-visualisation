/*This component renders the tree diagram on the screen using "react-tree-graph" library*/

import React from "react";
import Tree from "react-tree-graph";

const TreeDiagram = props => {
  return (
    <div>
      <Tree
        data={props.data}
        height={450}
        width={450}
        nodeRadius={15}
        svgProps={{
          transform: "rotate(90)", //rotates the tree to make it verticle
          viewBox: "-50 -10 400 400"
        }}
        textProps={{
          transform: "rotate(-90)", //rotates the text label
          x: "-20",
          y: "2"
        }}
      />
    </div>
  );
};

export default TreeDiagram;
