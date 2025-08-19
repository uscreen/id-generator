import { monotonicFactory } from 'ulid'

/**
 * ensure that the id is unique but also sortable
 */
const ulid = monotonicFactory()

export const id = (prefix = '') => {
  return [prefix, ulid(new Date().valueOf()).toLowerCase()]
    .filter(e => e)
    .join('_')
}

/**
 * alias exports
 */
export const generateId = id
export const newId = id
