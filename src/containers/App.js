import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import { searchInputChange, fetchPeopleIfNeeded, toggleScroll } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getFilteredPeopleList = this.getFilteredPeopleList.bind(this)
    this.fetchMorePeople = this.fetchMorePeople.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.props.searchValue) {
      console.log(`search value from component will receive props ${nextProps.searchValue}`)
      const { dispatch, searchValue, listLength, scroll } = nextProps
      console.log(scroll)
      dispatch(fetchPeopleIfNeeded(searchValue, listLength, scroll))
    }
  }

  handleSearchChange(e) {
    const { dispatch } = this.props
    dispatch(searchInputChange(e.target.value))
  }

  getFilteredPeopleList(peopleList, searchValue) {
    console.log('getFilteredPeopleList ----')
    if (peopleList === undefined) {
        return peopleList
    } else {
        let filteredPeopleList = []
        peopleList.map((person, i) => {
          // console.log(i)
          // console.log(person)
          const personNameTemp = person.name.toUpperCase().slice(0, searchValue.length)
          // console.log('personNameTemp - ' + personNameTemp)
          const searchValueTemp  = searchValue.toUpperCase()
          if (personNameTemp === searchValueTemp) {
            filteredPeopleList.push(person)
          }
        })
        return filteredPeopleList
    }
  }

  fetchMorePeople() {
    const { dispatch, searchValue, listLength, scroll } = this.props
    console.log('fetch more people, listLength - ' + listLength)
    if (listLength > 0) {
      dispatch(toggleScroll())
      dispatch(fetchPeopleIfNeeded(searchValue, listLength, true))
    }
  }

  render() {
    const { searchValue, isFetching, peopleList, listLength } = this.props
    const filteredPeopleList = this.getFilteredPeopleList(peopleList, searchValue)
    console.log('listLength state - ' + listLength)
    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results
          peopleList={filteredPeopleList}
          isFetching={isFetching}
          fetchMorePeople={this.fetchMorePeople}
          searchValue={searchValue}
        />
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
  let { listLength, isFetching, scroll } = state.apiController
  let peopleList = state.peopleListFromDatabase || []

  return {
    searchValue,
    isFetching,
    peopleList,
    listLength,
    scroll
  }
}

export default connect(mapStateToProps)(App)
