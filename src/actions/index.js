import axios from 'axios'
const ROOT_URL = 'http://localhost:8080'

import {
  SEARCH_CHANGE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE_NEW,
  RECEIVE_PEOPLE_SCROLL,
  CLEAR_PEOPLE_FROM_STATE,
  TOGGLE_SCROLL
} from './types'

export function searchInputChange(searchValue) {
  return function(dispatch) {
    dispatch({
      type: SEARCH_CHANGE,
      searchValue
    })
    if (searchValue.length === 0) {
      setTimeout(() => {
        dispatch(clearPeopleFromState())
      }, 300)
    }
  }
}

export function toggleScroll() {
  return { type: TOGGLE_SCROLL }
}

function clearPeopleFromState() {
  return { type: CLEAR_PEOPLE_FROM_STATE }
}

function requestPeopleList(scroll) {
  return {
    type: REQUEST_PEOPLE
  }
}

function receivePeopleList(searchValue, peopleList, scroll) {
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
  return dispatch => {
    dispatch(requestPeopleList())
    axios({
      url: `${ROOT_URL}/people`,
      method: 'post',
      contentType: 'application/json',
      data: { searchValue, listLength }
    })
    .then(response => {
      dispatch(receivePeopleList(searchValue, response.data, scroll))
    })
    .catch(err => { console.log(err); })
  }
}

function shouldFetchPeople(state, searchValue) {
  const apiController = state.apiController
  if (searchValue.length === 0 || apiController.isFetching) {
      return false
  } else {
      return true
  }
}

export function fetchPeopleIfNeeded(searchValue, listLength, scroll) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), searchValue)) {
      setTimeout(() => {
        return dispatch(fetchPeople(searchValue, listLength, scroll))
      }, 200)
    }
  }
}
