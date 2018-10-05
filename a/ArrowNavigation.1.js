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
      return {
        focusedIndex: Math.max(0, Math.min(max, oldState.focusedIndex + delta))
      }
    })
  }
  keydown(e) {
    switch(e.keyCode) {
      case 40: // arrow down
        console.log('arrow down')
        // console.log(this)
        this.props.onMoveFocus(1, this.state.focusedIndex)
        // e.preventDefault();
        break;
      case 38: // arrow up
        console.log('arrow up')
        this.props.onMoveFocus(-1, this.state.focusedIndex)
        // e.preventDefault();
        break;
      case 37: // arrow left
        console.log('arrow left')
        this.moveFocus(-1)
        break;
      case 39: // arrow right
        console.log('arrow right')
        this.moveFocus(1)
        break;
      case 13: // enter
        console.log('enter')
        break;
      default:
        // e.preventDefault();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const max = React.Children.count(nextProps.children) - 1;
    if (this.ref.current === document.activeElement) {
      this.setState({
        focusedIndex: Math.max(0, Math.min(max, nextProps.previouslyFocusedIndex))
      })
    }
  }
  render() {
    console.log(React.Children.toArray(this.props.children)[this.state.focusedIndex].props.children)
    return (
      <div tabIndex="0" onKeyDown={this.keydown.bind(this)} className='arrow-navigation' ref={this.ref} aria-label={React.Children.toArray(this.props.children)[this.state.focusedIndex].props.children}>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            // tabIndex: 0,
            key: index,
            className: index === this.state.focusedIndex ? 'focused' : ''
          })
        })}
      </div>
    );
  }
}

export default ArrowNavigation;
