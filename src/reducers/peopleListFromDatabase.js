import {
  RECEIVE_PEOPLE_NEW,
  RECEIVE_PEOPLE_SCROLL,
  CLEAR_PEOPLE_FROM_DATABASE
} from '../actions/types'

export default function peopleListFromDatabase(state = [], action) {
  let nextState = state
  switch (action.type) {
    case CLEAR_PEOPLE_FROM_DATABASE:
      return []
    case RECEIVE_PEOPLE_NEW:
      nextState = []
      action.peopleList.map(person => nextState.push(person))
      return nextState
    case RECEIVE_PEOPLE_SCROLL:
      action.peopleList.map(person => nextState.push(person))
      return nextState
    default:
      return state
  }
}
