
import React from 'react';
import  * as Constants from '../constants.js';
import styles from '../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class SearchButton extends React.Component {
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
      <div className="search-button" id="search-button">
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

export default SearchButton;

//To use:

//<SearchButton onSearchTermChange={term => this.functionToSearch(term)} />
