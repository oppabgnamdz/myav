import React, { Component } from 'react'
import $ from 'jquery'

export default class Card extends Component {
    componentDidMount() {
        for (let i = 0; i < this.props.number; i++) {
            $(`.video${i}`).on('mouseenter', () => {
                $(`.video${i}`).get(0).play();
            })
            $(`.video${i}`).on('mouseout', () => {
                $(`.video${i}`).get(0).pause();
            })
        }
    }

    render() {
        let index = this.props.keys
        return (
            <div className="bg-light-green dib  br3 pa3 ma2 grow bw2 shadow-5 mt5">
                <h1>Phim {this.props.name}</h1>
                <button
                    onClick={() => this.props.click(index)}
                    href={this.props.href}><video
                        style={{ width: '300px' }}
                        src={this.props.src} className={`video${this.props.keys}`} poster={this.props.poster}> Video
                        ảo</video></button>
            </div >
        )
    }
}
