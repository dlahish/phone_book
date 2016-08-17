import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import { searchInputChange, fetchPeopleIfNeeded } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
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

  render() {
    const { searchValue, isFetching, peopleList, listInState } = this.props

    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results peopleList={peopleList} />
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
  // const searchResults = state.peopleFromDatabase[searchValue] || {}
  let peopleList = state.peopleFromDatabase[searchValue] || []
  // console.log('mapStateToProps - searchResults.peopleList - ' + searchResults.peopleList)
  // if (searchResults.peopleList === undefined) {
  //   isFetching = true
  //   // listInState = false
  //   peopleList = []
  // } else {
  //   // isFetching = searchResults.isFetching
  //   peopleList = searchResults.peopleList
  //   // listInState = true
  // }

  return {
    searchValue,
    isFetching,
    peopleList,
    listInState
  }
}

export default connect(mapStateToProps)(App)
