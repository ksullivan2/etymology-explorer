import React from "react";

// The node rendered by the graph
class Node extends React.Component {

	render() {
	  	let node = this.props.node;
	  	let outlineColor = node.isSelected
    		? "black"
    		: "#adadeb";
    	let fillColor = node.isRoot
    		? "#b6cdf2"
    		: "white";
	    return (
			<g onClick={node.onClick}>
				<circle r={40}  stroke={outlineColor} fill={fillColor}/>
				<text textAnchor="middle" dy="0.3em">
					{node.id}
				</text>
			</g>
	)}

  	


}

export default Node;