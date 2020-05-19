import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"

  
class App extends Component {

  state = {
    selectedNode: dictionary.data[dictionary.data.length - 1]
  }

  onNodeClick(node) {
    this.setState({selectedNode: node});
  }

  filterWords(selectedNode) {
    return dictionary.data.filter(word => {
      return word.root === selectedNode.root
    })
    
  }

  filterLinks(selectedNode) {
    return links.data.filter(link => {
      return link.source === selectedNode.root || link.target === selectedNode.root
    })
  }

  render() {
    let filteredWords = this.filterWords(this.state.selectedNode)
    let filteredLinks = this.filterLinks(this.state.selectedNode)

    //"word" is the data that gets passed to the individual node
    let nodes = filteredWords.map((node, i) => {
        node.isSelected = this.state.selectedNode && node.id === this.state.selectedNode.id 
        node.onClick = this.onNodeClick.bind(this, node)
        return node;
    });

    return (
      <div className="App">
        <DetailView word={this.state.selectedNode} />
        <Network
          width={1200}
          height={600}
          network={{
            nodes: nodes,
            links: filteredLinks
          }}
        />
      </div>
    );
  }

  
}

export default App;