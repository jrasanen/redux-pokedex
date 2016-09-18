import {mockData} from '../constants';

// Pokemon reducer
export default (state={ pokemon: mockData, errors: [], visibilityFilter: "All" }, action) => {
  switch (action.type) {
    case 'ADD_POKEMON':
      return Object.assign({}, state, {
        pokemon: [
          ...state.pokemon,
          action.pokemon
        ],
        errors: [],
        visibilityFilter: "All"
      })
    case 'ADD_ERROR':
      return Object.assign({}, state, {
        pokemon: state.pokemon,
        errors: action.errors,
        visibilityFilter: "All"
      })
    case 'UPDATE_FILTER':
      return Object.assign({}, state, {
        pokemon: state.pokemon,
        errors: [],
        visibilityFilter: action.pokemonType
      })
    default:
      return state;
  }
}
