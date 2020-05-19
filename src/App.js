import React from "react";

import Network from "./Network";
import dictionary from "./dictionary.json"
import links from "./links.json"

  
function App() {

  return (
    <div className="App">
      <Network
        width={800}
        height={800}
        network={{
          nodes: dictionary.data,
          links: links.data
        }}
      />
    </div>
  );
}

export default App;