import * as React from "react";
import * as home from "assets/home.png";
import "styles/App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-ts</h1>
        </header>
        <img src={home}/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
