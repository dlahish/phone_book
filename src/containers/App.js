import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import { searchInputChange } from '../actions'

const styles = {
  search: {
    margin: '0 auto',
    width: '800px'
  },

  userAvatar: {
    float: 'left',
    marginRight: '12px',
    width: '40px',
    borderRadius: '40px'
  },

  results: {
    marginTop: '40px'
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
    console.log('search change')
    console.log(e.target.value)
    const { dispatch } = this.props
    dispatch(searchInputChange(e.target.value))
  }

  render() {
    return (
      <div style={styles.search}>
        <SearchInput value={this.props.searchValue} onSearchChange={this.handleSearchChange}/>
      </div>
    )
  }
}

App.propTypes = {
  searchValue: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    searchValue: state.searchValue
  }
}

export default connect(mapStateToProps)(App)
