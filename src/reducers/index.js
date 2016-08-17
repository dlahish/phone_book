import { combineReducers } from 'redux'
import peopleFromDatabase from './peopleFromDatabase'
import apiController from './apiController'
import {
  SEARCH_CHANGE
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
  peopleFromDatabase,
  apiController
})
