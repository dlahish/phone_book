import {
  SEARCH_CHANGE
} from './types'

export function searchInputChange(value) {
  return {
    type: SEARCH_CHANGE,
    value
  }
}
