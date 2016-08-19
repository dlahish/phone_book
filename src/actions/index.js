import axios from 'axios'
const ROOT_URL = 'http://localhost:8080'

import {
  SEARCH_CHANGE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE_NEW,
  RECEIVE_PEOPLE_SCROLL,
  LIST_IN_STATE,
  CLEAR_PEOPLE_FROM_DATABASE,
  TOGGLE_SCROLL
} from './types'

export function searchInputChange(searchValue) {
  return function(dispatch) {
    dispatch({
      type: SEARCH_CHANGE,
      searchValue
    })
    if (searchValue.length === 0) {
      console.log(searchValue.length)
      dispatch({
        type: LIST_IN_STATE,
        payload: false
      })
      dispatch(clearPeopleFromDatabase())
    }
  }
}

export function toggleScroll() {
  return { type: TOGGLE_SCROLL }
}

function clearPeopleFromDatabase() {
  return { type: CLEAR_PEOPLE_FROM_DATABASE }
}

export function toggleListInState(payload) {
  return {
    type: LIST_IN_STATE,
    payload
  }
}

function requestPeopleList(scroll) {
  console.log('request people list, scroll -- ' + scroll)
  return {
    type: REQUEST_PEOPLE
  }
}

function receivePeopleList(searchValue, peopleList, scroll) {
  console.log('receive people list, scroll - ' + scroll)
  if (scroll === true) {
      return {
        type: RECEIVE_PEOPLE_SCROLL,
        searchValue,
        peopleList
      }
  } else {
      return {
        type: RECEIVE_PEOPLE_NEW,
        searchValue,
        peopleList
      }
  }

}

function fetchPeople(searchValue, listLength, scroll) {
  console.log('fetch people, scroll -- ' + scroll)
  return dispatch => {
    dispatch(requestPeopleList(scroll))
    console.log('fetch People, listLength - ' + listLength)
    axios({
      url: `${ROOT_URL}/people`,
      method: 'post',
      contentType: 'application/json',
      data: { searchValue, listLength }
    })
    .then(response => {
      dispatch(receivePeopleList(searchValue, response.data, scroll))
      // dispatch(toggleListInState(true))
    })
    .catch(err => { console.log(err); })
  }
}

function shouldFetchPeople(state, searchValue) {
  const apiController = state.apiController
  console.log('should getch people, isFetching - ' + apiController.isFetching)
  if (searchValue.length === 0 || apiController.isFetching) {
      return false
  } else {
      return true
  }
}

export function fetchPeopleIfNeeded(searchValue, listLength, scroll) {
  console.log('fetch people if needed, scroll -- ' + scroll)
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), searchValue)) {
      return dispatch(fetchPeople(searchValue, listLength, scroll))
    }
  }
}
