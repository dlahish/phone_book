import { combineReducers } from 'redux'
import peopleFromDatabase from './peopleFromDatabase'
import {
  SEARCH_CHANGE,
  REQUEST_PEOPLE
} from '../actions/types'

function searchValue(state = '', action) {
  switch (action.type) {
    case SEARCH_CHANGE:
      return action.searchValue
    default:
      return state
  }
}

export default combineReducers({
  searchValue,
  peopleFromDatabase
})
