import React from "react";

// The node rendered by the graph
class DetailView extends React.Component {
	getStyle() {
		return {
			marginLeft: 2 + "em"
		}
	}

	render() {
	  	let data = this.props.data;
	  	if (!data) {
	  		return null;
	  	}
	  	
	    return (
			<div style={this.getStyle()}>
				<h1>{unescape(data.selected)}</h1>
				<p>Definition: {unescape(data.def)}</p>
				<p>Root: {data.isRoot ? "true" : "false"}</p>
			</div>
	)}

}

export default DetailView;