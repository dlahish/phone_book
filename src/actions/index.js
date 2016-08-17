import axios from 'axios'
const ROOT_URL = 'http://localhost:8080'

import {
  SEARCH_CHANGE,
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  LIST_IN_STATE,
  CLEAR_PEOPLE_FROM_DATABASE
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

function clearPeopleFromDatabase() {
  return { type: CLEAR_PEOPLE_FROM_DATABASE }
}

export function toggleListInState(payload) {
  return {
    type: LIST_IN_STATE,
    payload
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
    dispatch(requestPeopleList(searchValue))
    axios({
      url: `${ROOT_URL}/people`,
      method: 'post',
      contentType: 'application/json',
      data: { searchValue }
    })
    .then(response => {
      dispatch(receivePeopleList(searchValue, response.data))
      dispatch(toggleListInState(true))
    })
    .catch(err => { console.log(err); })
  }
}

function shouldFetchPeople(state, searchValue) {
  // const previousSearchValue = searchValue.slice(0,1)
  // console.log('previousSearchValue ' + previousSearchValue)
  const peopleFromDatabase = state.peopleFromDatabase[searchValue]
  const listInState = state.apiController.listInState
  console.log('shouldFetchPeople -----')
  console.log('searchValue - ' + searchValue)
  console.log(peopleFromDatabase)
  if (searchValue.length === 0) {
    return false
  }

  if (!peopleFromDatabase) {
    console.log('!peopleFromDatabase -----')
    return true
  } else if (peopleFromDatabase.isFetching || listInState) {
    console.log('peopleFromDatabase.isFetching - ' + peopleFromDatabase.isFetching)
    console.log('listInState - ' + listInState)
    return false
  } else {
    return false
  }
}

export function fetchPeopleIfNeeded(searchValue) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), searchValue)) {
      return dispatch(fetchPeople(searchValue))
    }
  }
}
