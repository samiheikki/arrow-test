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
    const activeElementParent = document.activeElement.parentNode
    const activeIndex = arrowNavigations.indexOf(activeElementParent)
    if (arrowNavigations[activeIndex + delta]) {
      const elementToFocus = arrowNavigations[activeIndex + delta].childNodes[focusedIndex] || arrowNavigations[activeIndex + delta].lastChild
      elementToFocus.focus()
      this.setState({
        previouslyFocusedIndex: focusedIndex
      })
    }
  }

  componentDidMount() {
    Array.from(Array.from(document.querySelectorAll('.arrow-navigation'))[0].childNodes)[0].focus()
  }

  render() {
    return (
      <div className="App">
        <div className="grid">
          <ArrowNavigation onMoveFocus={this.moveFocus.bind(this)} previouslyFocusedIndex={this.state.previouslyFocusedIndex}>
            <span>Browse</span>
            <span>Search</span>
            <span>Profile</span>
          </ArrowNavigation>
          <ArrowNavigation onMoveFocus={this.moveFocus.bind(this)} previouslyFocusedIndex={this.state.previouslyFocusedIndex}>
            <span>Browse 2</span>
            <span>Search 2</span>
            <span>Profile 2</span>
          </ArrowNavigation>
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
