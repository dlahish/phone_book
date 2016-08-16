import React, { Component, PropTypes } from 'react'
import kripke from '../kripke.jpg'

export default class Person extends Component {
  render() {
    return(
      <div className="cui__selector--direct__item">
        <img className="user-avatar" src={kripke} alt="kripke"/>
        <div className="cui__selector--direct__label">
          Saul Aaron Kripke
        </div>

        <p className="cui__selector--direct__description">
          Mackenzie Av, 34. Toronto, Canada
        </p>
      </div>
    )
  }
}

Person.propTypes = {
  name: PropTypes.string
}
