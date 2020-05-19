import React from "react";

// The node rendered by the graph
class Word extends React.Component {
  render() {
  	console.log(this.props)
    return (
		<g>
			<circle r={20}  fill={"#9280FF"} />
			<text text-anchor="middle" dy="0.3em">{this.props.node.id}</text>
		</g>
    
  )}
}

export default Word;