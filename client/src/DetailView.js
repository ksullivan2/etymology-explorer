import React from "react";

// The node rendered by the graph
class DetailView extends React.Component {
	getStyle() {
		return {
			marginLeft: 2 + "em"
		}
	}

	render() {
	  	let word = this.props.word;
	  	if (!word) {
	  		return null;
	  	}
	  	
	    return (
			<div style={this.getStyle()}>
				<h1>{word.id}</h1>
				<p>Definition: {word.def}</p>
				<p>Root: {word.root}</p>
			</div>
	)}

}

export default DetailView;