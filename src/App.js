import React, {Component} from "react";

import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"

  
class App extends Component {

  state = {
    selectedNode: null
  }

  onNodeClick(nodeID) {
    this.setState({selectedNode: nodeID});
  }

  render() {
    //"word" is the data that gets passed to the individual node
    let nodes = dictionary.data.map((node, i) => {
        node.isSelected = node.id === this.state.selectedNode
        node.onClick = this.onNodeClick.bind(this, node.id)
        return node;
    });

    return (
      <div className="App">
        <Network
          width={800}
          height={800}
          network={{
            nodes: nodes,
            links: links.data
          }}
        />
      </div>
    );
  }

  
}

export default App;