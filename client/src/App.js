import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"

class App extends Component {

  state = {
    startDatum: "funct",
    selectedNode: null,
    nodeData: null,
  }

  componentDidMount() {
    this.refreshData(this.state.startDatum, true)
  }

  
  refreshData = async (datum, isRoot) => {
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ datum: datum, isRoot: isRoot }),
    });
    const data = await response.text();
    
    //data is the output of findNDegreesOutFrom
    this.setState({ nodeData: JSON.parse(data) });
  }

  onNodeClick(datum, isRoot) {
    this.setState({
      selectedNode: datum,
    });
    this.refreshData(datum, isRoot)
  }


  render() {
    let nodeData = this.state.nodeData;
    if (!nodeData) return <div>WAIT</div>
      console.log(nodeData)


    let nodes = [
      {
        id: nodeData.datum,
        isSelected: true,
        onClick: this.onNodeClick.bind(this, nodeData.datum, nodeData.isRoot)
      }
    ], links = [];

    for (var i = 0; i < nodeData.children.length; i++) {
      let child = nodeData.children[i]
      nodes.push({
        id: child,
        isSelected: false,
        onClick: this.onNodeClick.bind(this, child, !nodeData.isRoot)
      })
      links.push({source: nodeData.datum, target: child})

    }
    

    return (
      <div className="App">
        <DetailView word={this.state.selectedNode} />
        <Network
          width={1200}
          height={600}
          network={{
            nodes: nodes,
            links: links,
          }}
        />
      </div>
    );
  }

  
}

export default App;