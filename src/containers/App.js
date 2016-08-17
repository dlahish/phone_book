import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import { searchInputChange, fetchPeopleIfNeeded } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getFilteredPeopleList = this.getFilteredPeopleList.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.props.searchValue) {
      console.log(`search value from component will receive props ${nextProps.searchValue}`)
      const { dispatch, searchValue } = nextProps
      dispatch(fetchPeopleIfNeeded(searchValue))
    }
  }

  handleSearchChange(e) {
    const { dispatch } = this.props
    dispatch(searchInputChange(e.target.value))
  }

  getFilteredPeopleList(peopleList, searchValue) {
    console.log('getFilteredPeopleList ----')
    if (peopleList.peopleList === undefined) {
        return peopleList.peopleList
    } else {
        let filteredPeopleList = []
        peopleList.peopleList.map((person, i) => {
          console.log(i)
          console.log(person)
          const personNameTemp = person.name.toUpperCase().slice(0, searchValue.length)
          console.log('personNameTemp - ' + personNameTemp)
          const searchValueTemp  = searchValue.toUpperCase()
          if (personNameTemp === searchValueTemp) {
            filteredPeopleList.push(person)
          }
        })
        return filteredPeopleList
    }
  }

  render() {
    const { searchValue, isFetching, peopleList, listInState } = this.props
    // let filteredPeopleList = peopleList
    // if (listInState === true) {
    const filteredPeopleList = this.getFilteredPeopleList(peopleList, searchValue)
    // }
    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results peopleList={filteredPeopleList} />
        {isFetching && <p>isFetching is true</p>}
        {listInState && <p>List in State</p>}
      </div>
    )
  }
}

App.propTypes = {
  searchValue: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { searchValue } = state
  let { listInState, isFetching } = state.apiController
  let peopleList = state.peopleFromDatabase[searchValue] || []

  return {
    searchValue,
    isFetching,
    peopleList,
    listInState
  }
}

export default connect(mapStateToProps)(App)
