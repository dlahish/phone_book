import {
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  PEOPLE_IN_STATE
} from '../actions/types'

function posts(state = {
  isFetching: false,
  listInState: false,
  peopleList: []
}, action) {
  switch (action.type) {
    case PEOPLE_IN_STATE:
      return Object.assign({}, state, {
        listInState: true
      })
    case REQUEST_PEOPLE:
      return Object.assign({}, state, {
        isFetching: true,
        listInState: false
      })
    case RECEIVE_PEOPLE:
      return Object.assign({}, state, {
        isFetching: false,
        listInState: true,
        peopleList: action.peopleList
      })
    default:
      return state
  }
}

export default function peopleFromDatabase(state = { }, action) {
  switch (action.type) {
    case PEOPLE_IN_STATE:
    case RECEIVE_PEOPLE:
    case REQUEST_PEOPLE:
      return Object.assign({}, {
        [action.searchValue]: posts(state[action.searchValue], action)
      })
    default:
      return state
  }
}
