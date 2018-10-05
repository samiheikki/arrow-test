import React, { Component } from 'react';
import './App.css';
import ArrowNavigation from './ArrowNavigation'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {previouslyFocusedIndex: 0}
  }

  moveFocus(delta, focusedIndex) {
    const arrowNavigations = Array.from(document.querySelectorAll('.arrow-navigation'))
    const activeElement = document.activeElement
    const activeIndex = arrowNavigations.indexOf(activeElement)
    if (arrowNavigations[activeIndex + delta]) {
      arrowNavigations[activeIndex + delta].focus()
      this.setState({
        previouslyFocusedIndex: focusedIndex
      })
    }
  }

  componentDidMount() {
    Array.from(document.querySelectorAll('.arrow-navigation'))[0].focus()
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <ArrowNavigation onMoveFocus={this.moveFocus.bind(this)} previouslyFocusedIndex={this.state.previouslyFocusedIndex}>
            <span>Browse</span>
            <span>Search</span>
            <span>Profile</span>
          </ArrowNavigation>
        </div>
        <div className="header">
          <ArrowNavigation onMoveFocus={this.moveFocus.bind(this)} previouslyFocusedIndex={this.state.previouslyFocusedIndex}>
            <span>Browse 2</span>
            <span>Search 2</span>
            <span>Profile 2</span>
          </ArrowNavigation>
        </div>
        <div className="header">
          <ArrowNavigation onMoveFocus={this.moveFocus.bind(this)} previouslyFocusedIndex={this.state.previouslyFocusedIndex}>
            <span>Browse 3</span>
            <span>Search 3</span>
            <span>Profile 3</span>
            <span>Ad 3</span>
          </ArrowNavigation>
        </div>
      </div>
    );
  }
}

export default App;
