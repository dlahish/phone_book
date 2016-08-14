import React, { Component, PropTypes } from 'react'

export default class SearchInput extends Component {
  render() {
    const { value, onSearchChange } = this.props

    return(
      <div className="cui__input giant">
        <input
          className="cui__input__input"
          placeholder="Type your search query"
          value={value}
          onChange={onSearchChange}
        />
      </div>
    )
  }
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
}
