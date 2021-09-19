import logo from './logo.svg';
import React from 'react';

import './App.css';
import NavButton from './components/navButton.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={} //add stateful items here
  }

  render(){
    return <div>
     <NavButton onSearchTermChange={(term)=>{}}/>
    </div>
  }
}

export default App;
