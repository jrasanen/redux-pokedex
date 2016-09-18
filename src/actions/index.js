
// Add new error
export const addErrorAction = (errors) => {
  return { type: 'ADD_ERROR', errors }
}
// Add pokemon
export const addPokemonAction = (pokemon) => {
  return { type: 'ADD_POKEMON', pokemon }
}
// Update filter
export const updateFilterAction = (pokemonType) => {
  return { type: 'UPDATE_FILTER', pokemonType }
}
