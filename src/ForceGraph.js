import React, { Component } from "react";
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from "react-force-graph";

class ForceGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphType: 0, //options: 2d, 3d, or vr
      amountOfNodes: 6,
      hoveredNode: null,
      lastNodeClick: {
        id: null,
        time: null
      },
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
            val: 3,
            selected: true
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
            val: 2,
            selected: true
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
    this.forceGraph = React.createRef();
    this.forceGraphSettings = {
      /***************
       *** STYLES ***
       ***************/
      backgroundColor: "#24272B",
      nodeCanvasObject: (node, ctx, globalScale) => {
        const { hoveredNode } = this.state;

        // create circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#636971";
        ctx.fill();
        if (node.selected || node.id === hoveredNode) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#FFF";
          ctx.stroke();
        }
        // create label
        if (globalScale < 2) return;
        const label = node.name;
        const labelOffsetY = -9;
        ctx.font = `5px Sans-Serif`;
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "#24272B";
        ctx.lineWidth = 0.5;
        ctx.strokeText(label, node.x, node.y - labelOffsetY);
        ctx.fillStyle = "#636971";
        ctx.fillText(label, node.x, node.y - labelOffsetY);
      },
      linkCanvasObject: (link, ctx, globalScale) => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        if (link.source.selected || link.target.selected) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#FFF";
        } else {
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = "#636971";
        }
        ctx.stroke();
      },
      /***************
       *** EVENTS ***
       ***************/
      onNodeClick: node => {
        const { lastNodeClick } = this.state;

        console.log("a node was clicked", node);
        if (
          lastNodeClick.id === node.id &&
          Date.now() - lastNodeClick.time < 500
        ) {
          console.log("a node was double-clicked");
        }

        this.setState({
          lastNodeClick: {
            id: node.id,
            time: Date.now()
          }
        });
      },
      onNodeRightClick: node => {
        console.log("a node was right-clicked", node);
      },
      onNodeHover: node => {
        if (node !== null) this.setState({ hoveredNode: node.id });
        else this.setState({ hoveredNode: null });
      },
      onNodeDrag: node => {
        console.log("a node is being dragged", node);
      },
      onNodeDragEnd: node => {
        console.log("node no longer being dragged", node);
      }
    };
  }

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

    const shouldMakeNewLink = Math.random() > 0.25;

    // make new node
    const newNode = {
      id: `${amountOfNodes + 1}`,
      name: `node ${amountOfNodes + 1}`,
      value: randomNodeVal
    };

    // make new links
    const newLink = {
      source: `${amountOfNodes + 1}`,
      target: `${Math.floor(Math.random() * (1 - amountOfNodes + 1)) +
        amountOfNodes}`
    };

    this.setState({
      amountOfNodes: amountOfNodes + 1,
      graphData: {
        ...graphData,
        nodes: [...graphData.nodes, newNode],
        links: shouldMakeNewLink
          ? [...graphData.links, newLink]
          : [...graphData.links]
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
          <ForceGraph2D
            ref={this.forceGraph}
            graphData={graphData}
            {...this.forceGraphSettings}
          />
        ) : (
          <ForceGraph3D
            ref={this.forceGraph}
            graphData={graphData}
            {...this.forceGraphSettings}
          />
        )}
      </div>
    );
  }
}

export default ForceGraph;
