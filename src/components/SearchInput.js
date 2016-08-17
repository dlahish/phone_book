import React, { Component, PropTypes } from 'react'

const style = {
  search: {
    margin: '0 auto',
    width: '800px'
  }
}

export default class SearchInput extends Component {
  render() {
    const { value, onSearchChange } = this.props

    return(
      <div style={style.search}>
        <div className="cui__input giant">
          <input
            className="cui__input__input"
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
