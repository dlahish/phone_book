import { combineReducers } from 'redux'
import {
  SEARCH_CHANGE
} from '../actions/types'

function searchValue(state = '', action) {
  switch (action.type) {
    case SEARCH_CHANGE:
      return action.value
    default:
      return state
  }
}

function peopleResults(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export default combineReducers({
  searchValue,
  peopleResults
})
