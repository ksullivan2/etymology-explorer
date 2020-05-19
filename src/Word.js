import React from "react";

// The node rendered by the graph
class Word extends React.Component {

	render() {
	  	let word = this.props.node;
	  	let outlineColor = word.isSelected
    		? "black"
    		: "#adadeb";
	    return (
			<g onClick={word.onClick}>
				<circle r={40}  stroke={outlineColor} fill="white"/>
				<text textAnchor="middle" dy="0.3em">
					{word.prefix}
					<tspan fill="#ff00ff">{word.root}</tspan>
					{word.suffix}
				</text>
			</g>
	)}

  	


}

export default Word;