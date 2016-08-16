import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import { searchInputChange } from '../actions'

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
  const searchResults = state.searchResults[searchValue] || {}
  let peopleList = []
  let isFetching = true
  if (searchResults.peopleList === undefined) {
    isFetching = true
    peopleList = []
  } else {
    isFetching = searchResults.isFetching
    peopleList = searchResults.peopleList
  }

  return {
    searchValue,
    isFetching,
    peopleList
  }
}

export default connect(mapStateToProps)(App)
