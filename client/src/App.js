import React, {Component} from "react";
import DetailView from "./DetailView";
import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"
import logo from './logo.svg';
import './App.css';

let randomStartIndex = Math.floor(Math.random() * (dictionary.data.length -1));

class App extends Component {

  state = {
    selectedNode: dictionary.data[randomStartIndex],
    response: '',
    post: '',
    responseToPost: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

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
   return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>



    // let filteredWords = this.filterWords(this.state.selectedNode)
    // let filteredLinks = this.filterLinks(this.state.selectedNode)

    // //"word" is the data that gets passed to the individual node
    // let nodes = filteredWords.map((node, i) => {
    //     node.isSelected = this.state.selectedNode && node.id === this.state.selectedNode.id 
    //     node.onClick = this.onNodeClick.bind(this, node)
    //     return node;
    // });

    // return (
    //   <div className="App">
    //     <DetailView word={this.state.selectedNode} />
    //     <Network
    //       width={1200}
    //       height={600}
    //       network={{
    //         nodes: nodes,
    //         links: filteredLinks
    //       }}
    //     />
    //   </div>
    // );
  }

  
}

export default App;