import React from "react";

// The node rendered by the graph
class RootLi extends React.Component {
	getStyle() {
		return {
		// backgroundColor: #4CAF50; /* Green */
		  border: "none",
		  // color: "white",
		  padding: "4px",
		  // textAlign: "center",
		  textDecoration: "none",
		  fontSize: "16px",
		}
	}

	render() {	  	
	    return (
			<li 
				style={this.getStyle()}
				key={this.props.root.root}
				onClick={this.props.root.onClick}
			>
				{unescape(this.props.root.root)}
			</li>
	)}

}

export default RootLi;