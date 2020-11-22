// NOTE: for this project only one thing to save so the id is not a param but a constant
const id: string = 'phoneNumber'

export function setPersistentData(data: SavedData) {
  window.localStorage.setItem(id, JSON.stringify(data))
}

export function getPersistentData(): SavedData {
  return JSON.parse(window.localStorage.getItem(id) || '{}')
}

export function removePersistentData() {
  window.localStorage.removeItem(id)
}

export type SavedData = {
  phoneNumber: string
}