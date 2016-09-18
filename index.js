import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

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

const ALL_TYPES = [
  "Fire", "Electric", "Water", "Rock", "Grass"
]

//
// Pokédex List Item
//
class Pokemon extends Component {
  constructor(props) {
    super(props)
  }
  getClasses() {
    let classes = "pokemon__item list-group-item "
    if (this.props.type == "Grass") {
      classes += "list-group-item-success"
    }
    else if (this.props.type == "Fire") {
      classes += "list-group-item-danger"
    }
    else if (this.props.type == "Water") {
      classes += "list-group-item-info"
    }
    else if (this.props.type == "Electric") {
      classes += "list-group-item-warning"
    }
    return classes;
  }
  render() {
    const { name, attack, type } = this.props;
    const cssClass = this.getClasses();
    return (
      <li className={cssClass}>
        <h4>{name}</h4>
        <ul className="list-inline">
          <li><span className="label label-primary">ATK: {attack}</span></li>
          <li><span className="label label-primary">TYP: {type}</span></li>
        </ul>
      </li>
    )
  }
}

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  attack: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

//
// Pokemon form
//
class NewPokemonComponent extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  }
  submit(e) {
    e.preventDefault();
    const { onNewPokemon, newError } = this.props;
    let poke = {};
    for (var i = 0; i < e.target.length; i++) {
      if (e.target[i].name && e.target[i].value) {
        poke[e.target[i].name] = e.target[i].value;
      }
    }
    let errors = []
    if (!poke.hasOwnProperty("attack")) {
      errors.push({
        message: "Missing attack"
      });
    }
    if (!poke.hasOwnProperty("name")) {
      errors.push({
        message: "Missing name"
      });
    }
    if (!poke.hasOwnProperty("type")) {
      errors.push({
        message: "Missing type"
      });
    }
    if (errors.length < 1) {
      poke.attack = parseInt(poke.attack);
      onNewPokemon(poke);
      e.target.reset();
    }
    else {
      newError(errors)
    }

  }
  render() {
    return (
      <li className="list-group-item clearfix">
        <form className="newEntryForm" onSubmit={this.submit.bind(this)}>
          <div className="form-group col-md-4">
            <input type="text" name="name" placeholder="Pokemon name (e.g. Pikachu)" className="form-control" ref="nameInput" autoFocus />
          </div>
          <div className="form-group col-md-4">
            <TypeSelector />
          </div>
          <div className="form-group col-md-3">
            <input type="numeric" name="attack" placeholder="128" className="form-control" />
          </div>
          <div className="form-group col-md-1">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </li>
    )
  }
}
class TypeSelector extends Component {
  render() {
    return (
      <select name="type" className="form-control">
        {ALL_TYPES.map((t, i) => {
          return <option value={t} key={i}>{t}</option>
        })}
      </select>
    )
  }
}

class TypeFilter extends Component {
  select(e) {
    const { onSelectFilter } = this.props;
    e.preventDefault();
    onSelectFilter(e.target.innerText);
  }
  render() {
    return (
      <li className="list-group-item">
        <ul className="nav nav-pills nav-justified">
          <li>
            <a href="#" onClick={this.select.bind(this)}>All</a>
          </li>

          {ALL_TYPES.map((t, i) => {
            return (
              <li key={i}>
                <a href="#" onClick={this.select.bind(this)}>{t}</a>
              </li>
            )
          })}
        </ul>
      </li>
    )
  }
}

class PokemonList extends Component {
  render() {
    const { pokemon } = this.props
    if (pokemon.length < 1) {
      return (
        <li className="list-group-item text-center">No pokemon of this type found.</li>
      )
    }
    return (
      <span>
      {pokemon.map((p, i) => {
        return <Pokemon key={i} {...p} />
      })}
      </span>
    )
  }
}

//
// Pokédex
//
class Pokedex extends Component {
  render() {
    const { pokemon, errors, onNewPokemon, onNewError, onSelectFilter } = this.props

    return (
      <div>
        {errors.map((e, i) => {
          return <div key={i} className="alert alert-danger" role="alert">{e.message}</div>
        })}
        <ul className="list-group">
          <NewPokemonComponent onNewPokemon={onNewPokemon} newError={onNewError} />
          <PokemonList pokemon={pokemon} />
          <TypeFilter onSelectFilter={onSelectFilter} />
        </ul>
      </div>
    )
  }
}
Pokedex.propTypes = {
  pokemon: PropTypes.array.isRequired
}

// Add new error
const addErrorAction = (errors) => {
  return { type: 'ADD_ERROR', errors }
}
// Add pokemon
const addPokemonAction = (pokemon) => {
  return { type: 'ADD_POKEMON', pokemon }
}
// Update filter
const updateFilterAction = (pokemonType) => {
  return { type: 'UPDATE_FILTER', pokemonType }
}

// Pokemon reducer
function pokemon(state={ pokemon: mockData, errors: [], visibilityFilter: "All" }, action) {
  console.log(state, action);
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

// Store
const store = createStore(pokemon)

const getVisible = (pokemon, visibilityFilter) => {
  if (visibilityFilter === 'All') {
    return pokemon;
  }
  console.log(pokemon);
  return pokemon.filter((poke) => {
    return poke.type === visibilityFilter
  });
}

// Map state -> props
function mapStateToProps(state) {
  return {
    pokemon: getVisible(state.pokemon, state.visibilityFilter),
    errors: state.errors
  }
}


// Map redux dispatch to react props
function mapDispatchToProps(dispatch) {
  return {
    onNewPokemon: (pokemon) => {
      dispatch(addPokemonAction(pokemon))
    },
    onNewError: (errors) => {
      dispatch(addErrorAction(errors))
    },
    onSelectFilter: (pokemonType) => {
      dispatch(updateFilterAction(pokemonType))
    }
  }
}


// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
