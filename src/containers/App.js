import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import { searchInputChange, fetchPeopleIfNeeded } from '../actions'

const styles = {
  userAvatar: {
    float: 'left',
    marginRight: '12px',
    width: '40px',
    borderRadius: '40px'
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.props.searchValue) {
      console.log(`search value from component will receive props ${nextProps.searchValue}`)
      const { dispatch, searchValue, listInState } = nextProps
      console.log(listInState)
      if (!listInState) {
        dispatch(fetchPeopleIfNeeded(searchValue))
      }
    }
  }

  handleSearchChange(e) {
    const { dispatch } = this.props
    dispatch(searchInputChange(e.target.value))
  }

  render() {
    const { searchValue, isFetching, peopleList } = this.props
    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results />
        {isFetching && <p>isFetching is true</p>}
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
  const searchResults = state.peopleFromDatabase[searchValue] || {}
  let peopleList = [], isFetching, listInState
  if (searchResults.peopleList === undefined) {
    isFetching = true
    listInState = false
    peopleList = []
  } else {
    isFetching = searchResults.isFetching
    peopleList = searchResults.peopleList
    listInState = true
  }

  return {
    searchValue,
    isFetching,
    peopleList,
    listInState
  }
}

export default connect(mapStateToProps)(App)
