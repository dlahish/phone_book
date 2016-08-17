import React, { Component, PropTypes } from 'react'

const style = {
  userAvatar: {
    float: 'left',
    marginRight: '12px',
    width: '40px',
    borderRadius: '40px'
  }
}

export default class Person extends Component {
  render() {
    const address = this.props.address
    const addressLine = `${address.street}. ${address.city}, ${address.country}`
    return(
      <div className="cui__selector--direct__item">
        <img style={style.userAvatar} src={this.props.avatar} alt="kripke"/>
        <div className="cui__selector--direct__label">
          {this.props.name}
        </div>
        <p className="cui__selector--direct__description">
          {addressLine}
        </p>
      </div>
    )
  }
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired
}
