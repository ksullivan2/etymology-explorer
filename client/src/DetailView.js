import React from "react";

// The node rendered by the graph
class DetailView extends React.Component {
	getStyle() {
		return {
			marginLeft: 2 + "em"
		}
	}

	render() {	  	
	    return (
			<div style={this.getStyle()}>
				<h1>{unescape(this.props.selected)}</h1>
				<p>Definition: {unescape(this.props.def)}</p>
				<p>Root: {this.props.isRoot ? "true" : "false"}</p>
			</div>
	)}

}

export default DetailView;