import React from "react";
import RootLi from "./RootLi";

// The node rendered by the graph
class RootsList extends React.Component {
	getStyle() {
		return {
			position:"absolute", 
			float:"right",
		}
	}

	render() {	
		if (!this.props.roots) return null	
	    return (
			<div style={this.getStyle()}>
				<ul>
					{this.props.roots.map(root => {
						return <RootLi root={root} />
					})}
				</ul>
			</div>
	)}

}

export default RootsList;