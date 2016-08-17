import React, { Component, PropTypes } from 'react'
import Person from './Person'


const style = {
  results: {
    margin: '40px auto',
    width: '800px'
  }
}

export default class Results extends Component {
  render() {
    const peopleList = this.props.peopleList || []
    console.log('RESULT - peopleList ----')
    console.log(peopleList)

    return(
      <div style={style.results}>
        <div className="cui__selector--direct title">
          <h2 className="cui__selector--direct__title">
            Search results
          </h2>
          {peopleList.map(person =>
            <Person
              name={person.name}
              address={person.address}
              avatar={person.avatar_origin}
              key={person.id}
            />
          )}
        </div>
      </div>
    )
  }
}

Results.propTypes = {

}
