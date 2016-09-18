
// Initial data
const mockData = [
  {
    name: "Bulbasaur",
    attack: 100,
    type: 'Grass',
  },
  {
    name: "Geodude",
    attack: 200,
    type: 'Rock',
  },
  {
    name: "Charmander",
    attack: 100,
    type: 'Fire',
  },
  {
    name: "Charmeleon",
    attack: 200,
    type: 'Fire',
  },
  {
    name: "Charizard",
    attack: 300,
    type: 'Fire',
  },
  {
    name: "Pikachu",
    attack: 100,
    type: 'Electric',
  },
  {
    name: "Pichu",
    attack: 100,
    type: 'Electric',
  },
]

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
