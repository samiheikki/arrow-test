import React, { Component } from 'react';

class ArrowNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedIndex: 0
    }
    this.ref = React.createRef();
  }
  moveFocus(delta) {
    const max = React.Children.count(this.props.children) - 1;
    this.setState(oldState => {
      const focusedIndex = Math.max(0, Math.min(max, oldState.focusedIndex + delta))
      Array.from(this.ref.current.childNodes)[focusedIndex].focus()
      return {
        focusedIndex
      }
    })
  }
  keydown(e) {
    switch(e.keyCode) {
      case 40: // arrow down
        this.props.onMoveFocus(1, this.state.focusedIndex)
        break;
      case 38: // arrow up
        this.props.onMoveFocus(-1, this.state.focusedIndex)
        break;
      case 37: // arrow left
        this.moveFocus(-1)
        break;
      case 39: // arrow right
        this.moveFocus(1)
        break;
      case 13: // enter
        // console.log('enter')
        break;
      default:
        // e.preventDefault();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const max = React.Children.count(nextProps.children) - 1;
    if (this.ref.current.contains(document.activeElement)) {
      this.setState({
        focusedIndex: Math.max(0, Math.min(max, nextProps.previouslyFocusedIndex))
      })
    }
  }
  render() {
    return (
      <div onKeyDown={this.keydown.bind(this)} className='arrow-navigation' ref={this.ref}>
        {React.Children.map(this.props.children, (child, index) => {
          return <div tabIndex="0" style={{display: 'inline-block'}}>
            {React.cloneElement(child, {
              key: index,
              className: index === this.state.focusedIndex ? 'focused' : ''
            })}
          </div>
        })}
      </div>
    );
  }
}

export default ArrowNavigation;
