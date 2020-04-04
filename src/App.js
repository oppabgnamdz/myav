import React, { Component } from 'react'
import Card from './Card';
import Data from './Data'
import Scroll from './Scroll';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      click: false,
      src: ''
    }
  }
  do = (e) => {
    const edit = e.target.value
    this.setState((state) => {
      console.log(state.data)
      let arr = Data.filter((d) => d.name.toLowerCase().includes(edit.toLowerCase()))
      return { data: arr }
    })
  }
  clickme = (i) => {
    const src = this.state.data[i].href
    this.setState({
      click: true,
      src: src
    })

  }
  click2 = () => {
    this.setState({
      click: false
    })
  }
  button = () => {
    let item = this.state.data.length / 10
    let arr = []
    for (let i = 0; i < item; i++) {
      arr.push(
        <button>{i + 1}</button>
      )
    }
    return arr;
  }


  render() {
    let card = () => {
      let arr = this.state.data.map((d, i) => {
        let preview = require(`./media/preview${d.id}.mp4`)
        let logo = require(`./media/${d.id}.jpg`)
        return (
          <Card src={preview} poster={logo} keys={i} name={d.name} href={d.href} click={(i) => this.clickme(i)} />
        )
      }
      )
      let arrpage1 = []
      for (let i = 0; i < arr.length && i < 10; i++) {
        arrpage1.push(arr[i])
      }
      return arrpage1
    }
    if (!this.state.click) {
      return (
        <div className='tc '>
          <div className='pa2'>
            <input
              placeholder="Search video name"
              className='pa3 ba b--green bg-light-blue'
              onChange={this.do} />
          </div>
          <div className='page'>
            {this.button()}
          </div>
          <Scroll>
            {card()}
          </Scroll>
          <h2 style={{ color: 'red' }}>Thanks for watching!</h2>

        </div>
      )
    } else {
      return (
        <div className='tc'>
          <div className='pa2'>
            <input
              placeholder="Search video name"
              className='pa3 ba b--green bg-light-blue'
              onChange={this.do} />
          </div>
          <Scroll >
            <div className='mt4'>
              <button className="br3 pa1 bg-light-green mh5 " style={{ display: 'block' }} onClick={this.click2}>
                Back
            </button>
              <iframe width="60%" height="600" src={this.state.src} title="av" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
picture-in-picture" allowFullScreen></iframe>
            </div>
          </Scroll>
          <h2 style={{ color: 'red' }}>Thanks for watching!</h2>

        </div>

      )
    }
  }
}
