
import React from 'react';
import  * as Constants from '../constants.js';
import styles from '../App.css';


class NavButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: '',
      BarStyling: {
        width:"20rem",
        background:'grey',
        border:"none",
        padding:"0.5rem",
        borderRadius: '8px'
      }, //initial
    };
  }

  render(){
    const focusedStyling = {
      width:"20rem",
      background:Constants.BRIGHT_BLUE,
      border:"none",
      padding:"0.5rem",
      borderRadius: '8px'
    };
    const unfocusedStyling = {
      width:"20rem",
      background:'white',
      border:"none",
      padding:"0.5rem",
      borderRadius: '8px'
    };


    return (
      <div className="nav-button" id="nav-button">
      <input
        style = {this.state.BarStyling}
        onFocus= {() => this.setState({BarStyling: focusedStyling})}
        onBlur = {() => this.setState({BarStyling: unfocusedStyling})}
        placeholder = 'Search'
        value = {this.state.term}
        onChange={event => this.onInputChange(event.target.value)}/>
      </div>
    );
  }

  //USER EVENT HANDLING
  onInputChange(term){
    this.setState({term}); //set term to inout value
    this.props.onSearchTermChange(term); //call onSearchTermChange function with new input
  }
  // onInputChange(event){
  //   console.log(event.target.value);
  //   term: event.target.value;
  // }
}

export default NavButton;

//To use:

//<NavButton onSearchTermChange={term => this.functionToSearch(term)} />
