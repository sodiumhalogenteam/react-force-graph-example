import React, { Component } from "react";
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from "react-force-graph";

class ForceGraph extends Component {
  state = {
    graphType: 0, //options: 2d, 3d, or vr
    amountOfNodes: 6,
    graphData: {
      nodes: [
        {
          id: "1",
          name: "node 1",
          val: 1
        },
        {
          id: "2",
          name: "node 2",
          val: 3
        },
        {
          id: "3",
          name: "node 3",
          val: 2
        },
        {
          id: "4",
          name: "node 4",
          val: 5
        },
        {
          id: "5",
          name: "node 5",
          val: 1
        },
        {
          id: "6",
          name: "node 6",
          val: 2
        }
      ],
      links: [
        {
          source: "1",
          target: "2"
        },
        {
          source: "3",
          target: "2"
        },
        {
          source: "4",
          target: "2"
        },
        {
          source: "5",
          target: "1"
        }
      ]
    }
  };

  toggleGraphType = () => {
    const { graphType } = this.state;

    let changeTo = 0;
    if (graphType === 0) changeTo = 1;

    this.setState({
      graphType: changeTo
    });
  };

  addNode = () => {
    const { amountOfNodes, graphData } = this.state;

    const randomNodeVal = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    const randomEdgeAmnt = Math.floor(Math.random() * (1 - 2 + 1)) + 2;

    // make new node
    const newNode = {
      id: `${amountOfNodes + 1}`,
      name: `node ${amountOfNodes + 1}`,
      value: randomNodeVal
    };

    // make new links
    const newLinks = [];
    for (let i = 0; i < 1; i++) {
      newLinks.push({
        source: `${amountOfNodes + 1}`,
        target: `${Math.floor(Math.random() * (1 - amountOfNodes + 1)) +
          amountOfNodes}`
      });
    }

    console.log(newLinks);

    this.setState({
      amountOfNodes: amountOfNodes + 1,
      graphData: {
        ...graphData,
        nodes: [...graphData.nodes, newNode],
        links: [...graphData.links, ...newLinks]
      }
    });
  };

  render() {
    const { graphType, graphData } = this.state;

    return (
      <div>
        <button onClick={this.toggleGraphType}>
          {graphType === 0 ? "2D" : "3D"}
        </button>
        <button onClick={this.addNode}>add node</button>
        {graphType === 0 ? (
          <ForceGraph2D graphData={graphData} />
        ) : (
          <ForceGraph3D graphData={graphData} />
        )}
      </div>
    );
  }
}

export default ForceGraph;
