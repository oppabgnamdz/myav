import React, { Component } from 'react'

export default class Scroll extends Component {
    render() {
        return (
            <div  style={{ overflowY: 'scroll', border: '1px solid black', height:'800px', }}>
                {this.props.children}
            </div>
        )
    }
}
