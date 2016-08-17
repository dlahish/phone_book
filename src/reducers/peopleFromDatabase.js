import {
  RECEIVE_PEOPLE,
  CLEAR_PEOPLE_FROM_DATABASE
} from '../actions/types'

function peopleList(state = {
  peopleList: []
}, action) {
  switch (action.type) {
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

export default function peopleFromDatabase(state = {}, action) {
  switch (action.type) {
    case CLEAR_PEOPLE_FROM_DATABASE:
      return {}
    case RECEIVE_PEOPLE:
      return Object.assign({}, {
        [action.searchValue]: peopleList(state[action.searchValue], action)
      })
    default:
      return state
  }
}
