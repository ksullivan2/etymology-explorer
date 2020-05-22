import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";
import RootsList from "./RootsList";

class App extends Component {

  state = {
    nodes: [{
        id: 'start_dummy',
      }],
    links: [],
    selected: 'start_dummy',
    def: null,
    isRoot: false,
    all_roots: null
  }

  componentDidMount() {
    //gotta start somewhere
    this.refreshData("funct", true)

    this.getAllRoots()

  }

  getAllRoots = async() => {
    const response = await fetch('/api/roots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    var self = this;

    var all_roots =  JSON.parse(await response.text()).roots;
    all_roots = all_roots.map(root => {
      return {
        root: root,
        onClick: self.onNodeClick.bind(self, root, true)
      }
    })

     this.setState({all_roots: all_roots})

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
        <RootsList roots={this.state.all_roots} />
      </div>
    );
  }
}

export default App;