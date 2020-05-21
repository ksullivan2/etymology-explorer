import React from "react";

// The node rendered by the graph
class Node extends React.Component {

	render() {
	  	let node = this.props.node;
	  	let outlineColor = node.isSelected
    		? "black"
    		: "#adadeb",
    		 fillColor = node.isRoot
    		? "#b6cdf2"
    		: "white",
    		outlineWidth = node.isSelected
    		? "3"
    		:  "1";
	    return (
			<g onClick={node.onClick}>
				<circle r={40}  stroke={outlineColor} fill={fillColor} strokeWidth={outlineWidth}/>
				<text textAnchor="middle" dy="0.3em">
					{node.id}
				</text>
			</g>
	)}

  	


}

export default Node;