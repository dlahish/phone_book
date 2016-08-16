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

function searchResults(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export default combineReducers({
  searchValue,
  searchResults
})
