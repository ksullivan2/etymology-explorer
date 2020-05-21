import React from "react";
import { Graph } from "@vx/network";
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation
} from "d3-force";
import Node from "./Node";

class Network extends React.Component {

  shouldComponentUpdate(newProps, newState) {
    return this.haveNodesUpdated(newProps)
      // || this.props.

    
  }

  haveNodesUpdated(newProps) {
    let oldNodes = this.props.network.nodes.map((node) => node.id),
      newNodes = newProps.network.nodes.map((node) => node.id);

    let difference = oldNodes
       .filter(x => !newNodes.includes(x))
       .concat(newNodes.filter(x => !oldNodes.includes(x)))

    return difference.length > 0
  }

// Update force if the width or height of the graph changes
  componentDidUpdate(newProps) {
    if (
      (!this.force && newProps.network.nodes.length > 0) //initial condition
      || this.haveNodesUpdated(newProps)
    ){
      this.setUpForceGraph()
      
    }
    this.updateForceGraph(newProps);
  }

  updateForceGraph(newProps) {
    this.force = this.force
      .force("center", forceCenter(
        newProps.width / 2,
        newProps.height / 2
      ))
      .restart();
  }

  // Setup D3 force
  setUpForceGraph() {
    this.force = forceSimulation(this.props.network.nodes)
      .force(
        "link",
        forceLink()
          .id(function(d) {
            return d.id;
          })
          .links(this.props.network.links)
      )
      .force("charge", forceManyBody().strength(-3000))
      .force(
        "center",
        forceCenter(this.props.width / 2, this.props.height / 2)
      );

    // Force-update the component on each force tick
    this.force.on("tick", () => this.forceUpdate());
  }


  render() {
    if (!this.force) {
      return null;
    }

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <svg width={this.props.width} height={this.props.height}>
          <rect
            width={this.props.width}
            height={this.props.height}
            fill="#f9fcff"
          />
          <Graph graph={this.props.network} nodeComponent={Node} />
        </svg>
      </div>
    );
  }
}


export default Network;