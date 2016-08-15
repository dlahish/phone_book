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

    this.state = {
    }
  }

  handleSearchChange(e) {
    const { dispatch } = this.props
    dispatch(searchInputChange(e.target.value))
  }

  render() {
    const { searchValue } = this.props
    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results />
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

  return {
    searchValue
  }
}

export default connect(mapStateToProps)(App)
