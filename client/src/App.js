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
    selected: 'start_dummy',
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
    let nodes = output.nodes.map((node) => {
      return {
        id: node.datum,
        isSelected: (node.datum === output.selected),
        isRoot: node.isRoot,
        onClick: this.onNodeClick.bind(this, node.datum, node.isRoot)
      }
    })

    this.setState((prevState, props) => {
       return {
        selected: output.selected,
        def: output.def,
        isRoot: output.isRoot,
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
        <DetailView 
          selected={this.state.selected} 
          def={this.state.def}
          isRoot={this.state.isRoot}
        />
        <Network
          width={1200}
          height={600}
          selected={this.state.selected}
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