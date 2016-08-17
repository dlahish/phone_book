import {
  LIST_IN_STATE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  CLEAR_PEOPLE_FROM_DATABASE
} from '../actions/types'

const initialState = {
  listInState: false,
  isFetching: true,
  listLength: 0
}

export default function apiController(state = initialState, action) {
  switch(action.type) {
    case LIST_IN_STATE:
      return {...state, listInState: action.payload }
    case REQUEST_PEOPLE:
      return { ...state, isFetching: true }
    case RECEIVE_PEOPLE:
      return { ...state, isFetching: false, listLength: state.listLength + action.peopleList.length }
    case CLEAR_PEOPLE_FROM_DATABASE:
      return { ...state, isFetching: true, listLength: 0 }
    default:
      return state
  }
}
