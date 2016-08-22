import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchInput from '../components/SearchInput'
import Results from '../components/Results'
import ScrollTopArrow from '../components/scrollTopArrow'
import { searchInputChange, fetchPeopleIfNeeded, toggleScroll } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getFilteredPeopleList = this.getFilteredPeopleList.bind(this)
    this.fetchMorePeople = this.fetchMorePeople.bind(this)
    this.handleScrollTopArrow = this.handleScrollTopArrow.bind(this)

    this.state = {
      scrollTopArrow: false
    }
  }

  componentDidMount() {
      window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(event) {
    const height = document.getElementById('root').clientHeight
    const yHeight = window.scrollY
    const windowHeight = window.innerHeight
    console.log('root heihgt - '+height)
    console.log('yHeight' + yHeight)
    console.log('windowHeight - ' + windowHeight)
    if (yHeight >= windowHeight) {
      console.log('should show upbutton')
        this.setState({ scrollTopArrow: true })
    } else if (yHeight === 0) {
        this.setState({ scrollTopArrow: false })
    }
  }

  handleScrollTopArrow() {
    console.log('--- handle scroll top arrow ---')
    var body = document.body
    body.scrollTop = 0
    this.setState({ scrollTopArrow: false })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.props.searchValue) {
      console.log('--- component will receive props ---')
      const { dispatch, searchValue, listLength, scroll } = nextProps
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
          const personNameTemp = person.name.toUpperCase().slice(0, searchValue.length)
          const searchValueTemp  = searchValue.toUpperCase()
          if (personNameTemp === searchValueTemp) {
            filteredPeopleList.push(person)
          }
        })
        return filteredPeopleList
    }
  }

  fetchMorePeople() {
    const { dispatch, searchValue, listLength } = this.props
    if (listLength > 0) {
      dispatch(toggleScroll())
      dispatch(fetchPeopleIfNeeded(searchValue, listLength, true))
    }
  }

  render() {
    console.log('--- RENDER ---')
    const { searchValue, isFetching, peopleList } = this.props

    return (
      <div>
        <SearchInput
          value={searchValue}
          onSearchChange={this.handleSearchChange}
        />
        <Results
          peopleList={peopleList}
          isFetching={isFetching}
          fetchMorePeople={this.fetchMorePeople}
          searchValue={searchValue}
        />
        <ScrollTopArrow
          display={this.state.scrollTopArrow}
          handleScrollTopArrow={this.handleScrollTopArrow}
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
