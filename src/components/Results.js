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

    return(
      <div style={style.results}>
        <div className="cui__selector--direct title">
          <h2 className="cui__selector--direct__title">
            Search results
          </h2>
          <Person />
        </div>
      </div>
    )
  }
}

Results.propTypes = {

}
