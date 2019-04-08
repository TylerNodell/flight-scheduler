import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    const styles = {
      position: 'absolute',
      height: '100vh',
      backgroundColor: 'black',
      width: '80vw'
    }
    return (
      <div style={styles}>
        <h1>
          {this.props.event.title}
        </h1>
      </div>
    )
  }
}
