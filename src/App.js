import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
  route = () => {
    let tenItem = this.state.data.length / 10
    let arr = []
    for (let i = 0; i < tenItem; i++) {
      let allItem = this.state.data.map((d) => {
        let preview = require(`./media/preview${d.id}.mp4`)
        let logo = require(`./media/${d.id}.jpg`)
        return (
          <Card number={this.state.data.length} src={preview} poster={logo} keys={i} key={i} name={d.name} href={d.href} click={this.clickme} />
        )
      })
      let newArrayItem = []
      for (let j = (i + 1) * 10; j < (i + 2) * 10; j++) {
        newArrayItem.push(allItem[j])
      }

      let s = `/${i + 2}`
      arr.push(
        <Route path={s} key={i}>
          <Scroll>
            {newArrayItem}
          </Scroll>
        </Route>
      )
    }
    return arr
  }

  button = () => {
    let item = this.state.data.length / 10
    let arr = []

    for (let i = 0; i < item; i++) {
      let s = `/${i + 1}`
      if (i === 0) {
        s = '/'
      }
      arr.push(
        <div style={{ marginRight: '7px', display: 'inline-block' }}>
          <Link to={s} key={i} >
            <button >
              {i + 1}
            </button>
          </Link >
        </div>

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
          <Card src={preview} poster={logo} keys={i} key={i} name={d.name} href={d.href} click={this.clickme} number={this.state.data.length} />
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
        <Router>
          <div className='tc '>
            <div className='pa2'>
              <input
                placeholder="Search video name"
                className='pa3 ba b--green bg-light-blue'
                onChange={this.do} />
            </div>
            <div className='page'>
              {this.button()}

              <Switch>
                {this.route()}
                <Route path='/'>
                  <Scroll>
                    {card()}
                  </Scroll>
                </Route>
              </Switch>
              {this.button()}
            </div>

            <h2 style={{ color: 'red' }}>Thanks for watching!</h2>

          </div>

        </Router >

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
