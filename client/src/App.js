import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";

class App extends Component {

  state = {
    nodes: [{
        id: 'start_dummy',
        isSelected: false,
        onClick: this.onNodeClick.bind(this, 'start_dummy', true)
      }],
    links: [],
    nodeData: null,
  }

  componentDidMount() {
    //gotta start somewhere
    this.refreshData("funct", true)
  }
  
  refreshData = async (datum, isRoot) => {
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ datum: datum, isRoot: isRoot }),
    });
 
    //data is the output of findNDegreesOutFrom
    this.setUpNodesAndLinks(JSON.parse(await response.text()) )
  }

  setUpNodesAndLinks(output) {
    console.log('output', output)
    let nodes = [
      {
        id: output.datum,
        isSelected: true,
        isRoot: output.isRoot
      }
    ];

    for (var i = 0; i < output.nodes.length; i++) {
      let child = output.nodes[i]
      nodes.push({
        id: child.datum,
        isSelected: false,
        isRoot: child.isRoot,
        onClick: this.onNodeClick.bind(this, child.datum, child.isRoot)
      })
    }

    this.setState((prevState, props) => {
       return {
        nodeData: output,
        nodes:nodes,
        links: output.links
       }
     });
  }

  onNodeClick(datum, isRoot) {
    this.refreshData(datum, isRoot)
  }


  render() {
    return (
      <div className="App">
        <DetailView data={this.state.nodeData} />
        <Network
          width={1200}
          height={600}
          network={{
            nodes: this.state.nodes,
            links: this.state.links,
          }}
        />
      </div>
    );
  }
}

export default App;