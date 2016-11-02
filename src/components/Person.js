import React, { Component, PropTypes } from 'react'

const styles = {
  person: {
    zIndex: 0
  },
  userAvatar: {
    float: 'left',
    marginRight: '12px',
    width: '40px',
    borderRadius: '40px'
  },
  item: {
    zIndex: 0,
    borderBottom: '1px solid #e5e5e6',
    borderTop: '1px solid #e5e5e6',
    boxSizing: 'border-box',
    cursor: 'pointer',
    margin: '-1px 0 0 0',
    padding: '16px 0 0 0',
    position: 'relative'
  }
}

export default class Person extends Component {
  render() {
    const address = this.props.address
    const addressLine = `${address.street}. ${address.city}, ${address.country}`
    return(
      <div style={styles.item}>
        <img style={styles.userAvatar} src={this.props.avatar} alt="kripke"/>
          {this.props.name}
        <p>
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
