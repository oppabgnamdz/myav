import React, { Component } from 'react'
// import $ from 'jquery'

export default class Card extends Component {
    componentDidMount() {
        // console.log('nam dep troai')

        // for (let i = 0; i < this.props.number; i++) {
        //     $(`.video${i}`).on('mouseenter', () => {
        //         $(`.video${i}`).get(0).play();
        //     })
        //     $(`.video${i}`).on('mouseout', () => {
        //         $(`.video${i}`).get(0).pause();
        //     })
        // }
    }

    render() {

        let index = this.props.keys
        return (
            <div
                onClick={() => this.props.click(index)}
                href={this.props.href}
                className="bg-light-green dib  br3 pa3 ma2 grow bw2 shadow-5 mt5" style={{ width: '350px' }}>
                <h1 style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{this.props.name}</h1>
                <h1 style={{ color: 'orange' }}>{this.props.title}</h1>
                <div
                >
                    <video
                        title={this.props.title}
                        style={{ width: '300px', height: '200px', backgroundColor: 'black', }}
                        src={this.props.src} className={`video${this.props.keys}`} poster={this.props.poster}> Video
                        ảo
                        </video>
                </div>
            </div >
        )
    }



}
