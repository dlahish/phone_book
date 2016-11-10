import React, { Component, PropTypes } from 'react'
import Person from './Person'
import Waypoint from 'react-waypoint'

const styles = {
  results: {
    margin: '40px auto',
    width: '800px',
    zIndex: 0
  },
  title: {
    fontFamily: ["Open Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
    fontSize: '14px',
    fontWeight: '600',
    color: '#3c3c3e',
    height: '20px',
    lineHeight: '20px',
    margin: 0,
    padding: '16px 0 9px',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  noResults: {
    fontFamily: ["Open Sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
    fontSize: '14px',
    fontWeight: '600',
  }
}

export default class Results extends Component {
  renderPeopleList(peopleList) {
    return(
      peopleList.map(person =>
        <Person
          name={person.name}
          address={person.address}
          avatar={person.avatar}
          key={person._id}
        />
      )
    )
  }

  renderWaypoint() {
    return (
      <Waypoint
        onEnter={this.props.fetchMorePeople}
        threshold={0}
      />
    )
  }

  render() {
    const peopleList = this.props.peopleList || [],
          { searchValue, isFetching } = this.props
    return(
      <div style={styles.results}>
          <h2 style={styles.title}>
            Search results
          </h2>
          <div>
            {this.renderPeopleList(peopleList)}
            {this.renderWaypoint()}
          </div>
          {peopleList.length === 0 && searchValue.length > 0 && isFetching === false ?
          <p style={styles.noResults}>
            No results, please review your search or try a different one
          </p>: ''}
      </div>
    )
  }
}

Results.propTypes = {
  peopleList: PropTypes.array,
  fetchMorePeople: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
