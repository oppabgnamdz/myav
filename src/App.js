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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: Data,
      click: false,
      src: '',
      number: 1
    }
  }
  do = (e) => {
    const edit = e.target.value
    this.setState((state) => {
      let arr = Data.filter((d) => d.title.toLowerCase().includes(edit.toLowerCase()))
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
    let tenItem = parseInt(this.state.data.length / 10)
    let arr = []
    for (let i = 0; i < tenItem; i++) {
      let allItem = this.state.data.map((d, i) => {

        let logo = require(`./media/${d.id}.jpg`)
        return (
          <Card title={d.title} number={this.state.data.length} poster={logo} keys={i} key={i} name={d.name} href={d.href} click={(i) => this.clickme(i)} />
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
  homeClick = (e) => {
    if (e === 0) {
      this.setState({
        data: Data
      })
    }
  }
  merge = () => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    let data2 = this.state.data
    shuffleArray(data2);
    this.setState({
      data: data2
    })
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
        <div className="btnRoute" style={{ marginRight: '7px', display: 'inline-block' }} key={i}>
          <Link to={s}  >
            <button style={{ color: 'red', padding: 10, borderWidth: '2px', borderRadius: 5, borderColor: '#1f7cf4', backgroundColor: '#f4efef' }} onClick={() => { this.homeClick(i) }}  >
              {i + 1}
            </button>
          </Link >
        </div>

      )
    }



    return arr;
  }
  next = () => {
    let item = parseInt(this.state.data.length / 10 + 1);
    if (this.state.number >= item - 1) {
      this.setState({
        number: 0
      })
    } else {
      this.setState({
        number: this.state.number + 1
      })
    }



  }
  previous = () => {

    this.setState({
      number: this.state.number - 1
    })
    if (this.state.number <= 1) {
      this.setState({
        number: 1
      })
    }

  }
  componentWillMount(){
    this.merge()

  }
  //merge before render22


  render() {
    let card = () => {
      let arr = this.state.data.map((d, i) => {

        let logo = require(`./media/${d.id}.jpg`)
        return (
          <Card title={d.title} poster={logo} keys={i} key={i} name={d.name} href={d.href} click={this.clickme} number={this.state.data.length} />
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
            <div className='pa2 input' >
              <button className="br3 pa1 bg-light-red mh2 " onClick={this.merge}>Random Film</button>
              <input
                placeholder="Search video name"
                className='pa3 ba b--green bg-light-blue put'
                onChange={this.do} />
              <select style={{ borderRadius: '5px', borderWidth: '2px' }} onChange={this.do} className='mh2'>
                <option value="porn">Porn</option>
                <option value="avgle">Avgle</option>
                <option value="javcl">Javcl</option>
                <option value="javsub">Javsub</option>
                <option value="fake">Fake</option>
                <option value="xxphim">XXPhim</option>

              </select>
            </div>
            <div className='font-icon'>
              <Link to={`/${this.state.number - 1}`} onClick={this.previous}>
                <FontAwesomeIcon icon={faChevronCircleLeft} className='previous' />
              </Link>
              <Link to={`/${this.state.number + 1}`} onClick={this.next}>
                <FontAwesomeIcon icon={faChevronCircleRight} className='next' />
              </Link>
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


            <h2 className='thanks' style={{ color: 'red' }}>Thanks for watching!   </h2>
            <div className='font-icon'>
              <Link to={`/${this.state.number - 1}`} onClick={this.previous}>
                <FontAwesomeIcon icon={faChevronCircleLeft} className='previous' />
              </Link>
              <h2 style={{ color: 'red' }}>Thanks for watching!   </h2>

              <Link to={`/${this.state.number + 1}`} onClick={this.next}>
                <FontAwesomeIcon icon={faChevronCircleRight} className='next' />
              </Link>
            </div>


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
              <div className="btn" style={{ marginBottom: '20px' }}>
                <button className="br3 pa1 bg-light-green mh5 back" style={{ display: 'block' }} onClick={this.click2}>
                  Back
                </button>
              </div>
              <iframe width="80%" height="700" src={this.state.src} title="av" frameBorder="0" allow="accelerometer; autoPlay; encrypted-media; gyroscope;
picture-in-picture" allowFullScreen></iframe>
            </div>
          </Scroll>
          <h2 style={{ color: 'red' }}>Thanks for watching!</h2>

        </div>

      )
    }
  }
}
