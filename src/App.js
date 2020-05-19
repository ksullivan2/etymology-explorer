import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"

  
class App extends Component {

  state = {
    selectedNode: dictionary.data[1]
  }

  onNodeClick(node) {
    this.setState({selectedNode: node});
  }

  render() {
    //"word" is the data that gets passed to the individual node
    let nodes = dictionary.data.map((node, i) => {
        node.isSelected = this.state.selectedNode && node.id === this.state.selectedNode.id 
        node.onClick = this.onNodeClick.bind(this, node)
        return node;
    });

    return (
      <div className="App">
        <DetailView word={this.state.selectedNode} />
        <Network
          width={800}
          height={600}
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