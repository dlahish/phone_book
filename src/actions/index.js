import axios from 'axios'

import {
  SEARCH_CHANGE
} from './types'

export function searchInputChange(searchValue) {
  return {
    type: SEARCH_CHANGE,
    searchValue
  }
}
