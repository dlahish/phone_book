import React, { Component, PropTypes } from 'react'

const styles = {
  search: {
    margin: '0 auto',
    width: '800px',
    marginTop: '40px'
  },
  inputWrapper: {
    borderBottom: '1px solid #cbcbcd',
    boxSizing: 'border-box',
    clear: 'both',
    display: 'block',
    height: '51px',
    position: 'relative'
  },
  inputText: {
    fontSize: '22px',
    fontWeight: '400',
    backgroundColor: 'transparent',
    border: 0,
    color: '#3c3c3e',
    height: '50px',
    outline: 'none',
    padding: 0,
    position: 'absolute',
    width: '100%'
  }
}

export default class SearchInput extends Component {
  render() {
    const { value, onSearchChange } = this.props

    return(
      <div style={styles.search}>
        <div style={styles.inputWrapper}>
          <input
            style={styles.inputText}
            placeholder="Type your search query"
            value={value}
            onChange={onSearchChange}
            autoFocus={true}
          />
        </div>
      </div>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
}
