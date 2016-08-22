import React from 'react'
const style = {
  top: window.innerHeight-60,
  position: 'fixed',
  cursor: 'pointer',
  marginLeft: '50%',
  zIndex: 1
}

export default (props) =>
  props.display ?
  <i
    className="scrolltop-arrow fa fa-chevron-up fa-2x" aria-hidden="true"
    style={style}
    onClick={props.handleScrollTopArrow}
  /> : <div></div>
