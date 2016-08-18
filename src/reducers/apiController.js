import {
  LIST_IN_STATE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE_NEW,
  RECEIVE_PEOPLE_SCROLL,
  CLEAR_PEOPLE_FROM_DATABASE,
  SEARCH_CHANGE,
  TOGGLE_SCROLL
} from '../actions/types'

const initialState = {
  listInState: false,
  isFetching: false,
  listLength: 0,
  scroll: false
}

export default function apiController(state = initialState, action) {
  switch(action.type) {
    case LIST_IN_STATE:
      return {...state, listInState: action.payload }
    case REQUEST_PEOPLE:
      return { ...state, isFetching: true }
    case RECEIVE_PEOPLE_NEW:
    case RECEIVE_PEOPLE_SCROLL:
      return { ...state,
                isFetching: false,
                listLength: state.listLength + action.peopleList.length,
                scroll: false
             }
    case CLEAR_PEOPLE_FROM_DATABASE:
      return { ...state, isFetching: false, listLength: 0 }
    case SEARCH_CHANGE:
      return { ...state, listLength: 0}
    case TOGGLE_SCROLL:
      return { ...state, scroll: true }
    default:
      return state
  }
}
