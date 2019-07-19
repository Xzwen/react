import React from 'react';
import Routes from './router'
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {Routes}
      </div>
    );
  }
}

export default App;
