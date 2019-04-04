import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
//import { robots } from './robots';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  //---- ES6 ------
  /*constructor() {
    super()
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }*/

  state = {
    robots: [],
    //searchfield: ''   --- remove after redux
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then (response => response.json())
      .then (users => {this.setState({robots: users})});
  }

  /*onSearchChange = (event) => {                         --- remove after redux
    this.setState({ searchfield: event.target.value })
  }*/

  render() {
    //const { robots, searchfield } = this.state;     --- change to below 2 lines after redux
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase()) //--- Change to searchField after redux
    })
    return !robots.length ? <h1>Loading...</h1> :
      (
        //Remove this from this.onSearchChange after redux
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);