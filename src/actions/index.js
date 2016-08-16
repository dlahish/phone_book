import axios from 'axios'
const ROOT_URL = 'http://localhost:8080'

import {
  SEARCH_CHANGE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE
} from './types'

export function searchInputChange(searchValue) {
  return {
    type: SEARCH_CHANGE,
    searchValue
  }
}

function requestPeopleList(searchValue) {
  return {
    type: REQUEST_PEOPLE,
    searchValue
  }
}

function receivePeopleList(searchValue, peopleList) {
  return {
    type: RECEIVE_PEOPLE,
    searchValue,
    peopleList
  }
}

function fetchPeople(searchValue) {
  return dispatch => {
    if (searchValue.length < 2) {
      return;
    }

    dispatch(requestPeopleList(searchValue))
    axios({
      url: `${ROOT_URL}/people`,
      method: 'post',
      contentType: 'application/json',
      data: { searchValue }
    })
    .then(response => { dispatch(receivePeopleList(searchValue, response.data)) })
    .catch(err => { console.log(err); })
  }
}

function shouldFetchPeople(state, searchValue) {
  const peopleList = state.peopleFromDatabase[searchValue]
  // console.log('shouldFetchPeople -----')
  // console.log(peopleList.isFetching)
  if (!peopleList) {
    return true
  } else if (peopleList.isFetching) {
    return false
  } else {
    return peopleList.inState
  }
}

export function fetchPeopleIfNeeded(searchValue) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), searchValue)) {
      return dispatch(fetchPeople(searchValue))
    }
  }
}
