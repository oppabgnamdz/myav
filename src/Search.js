import React, { Component } from 'react'

export default class Search extends Component {
    do = (e) => {
        const arr = this.props.data.map((data) => {
            if (e.target.value === data.name) {
                console.log('nam deptrai')
            }
        })
        console.log(e.target.value)
    }
    render() {
        return (
            <div>
                <input onChange={this.do} />
            </div>
        )
    }
}
