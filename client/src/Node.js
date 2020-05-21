import React from "react";

// The node rendered by the graph
class Node extends React.Component {

	componentDidMount() {
		console.log(this.props.node)
	}

	render() {
		// console.log(this.props.node)
	  	let node = this.props.node;
	  	let outlineColor = node.isSelected
    		? "black"
    		: "#adadeb";
	    return (
			<g onClick={node.onClick}>
				<circle r={40}  stroke={outlineColor} fill="white"/>
				<text textAnchor="middle" dy="0.3em">
					{node.id}
				</text>
			</g>
	)}

  	


}

export default Node;