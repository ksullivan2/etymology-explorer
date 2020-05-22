import React from "react";

// The node rendered by the graph
class RootLi extends React.Component {
	getStyle() {
		return {
			// marginLeft: 2 + "em"
		}
	}

	render() {	  	
	    return (
			<li key={this.props.root.root}
				onClick={this.props.root.onClick}
			>
				{unescape(this.props.root.root)}
			</li>
	)}

}

export default RootLi;