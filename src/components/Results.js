import React, { Component, PropTypes } from 'react'
import Person from './Person'
import Waypoint from 'react-waypoint'

const styles = {
  results: {
    margin: '40px auto',
    width: '800px',
    zIndex: 0
  }
}

export default class Results extends Component {
  renderPeopleList(peopleList) {
    return(
      peopleList.map(person =>
        <Person
          name={person.name}
          address={person.address}
          avatar={person.avatar_origin}
          key={person.id}
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
        <div className="cui__selector--direct title">
          <h2 className="cui__selector--direct__title">
            Search results
          </h2>
          <div>
            {this.renderPeopleList(peopleList)}
            {this.renderWaypoint()}
          </div>
          {peopleList.length === 0 && searchValue.length > 0 && isFetching === false ?
          <p className="cui__selector--direct__label">
            No results, please review your search or try a different one
          </p>: ''}
        </div>
      </div>
    )
  }
}

Results.propTypes = {
  peopleList: PropTypes.array,
  fetchMorePeople: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}
