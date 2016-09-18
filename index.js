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
    name: "Pikachu",
    attack: 100,
    type: 'Electric',
  },

]

//
// Pokédex List Item
//
class Pokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cssClasses: "pokemon__item list-group-item "
    }
  }
  componentWillMount() {
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
    this.setState({
      cssClasses: classes
    })
  }
  render() {
    const { name, attack, type } = this.props
    return (
      <li className={this.state.cssClasses}>
        <h4>{name}</h4>
        <ul className="list-inline">
          <li><span className="label label-default">ATK: {attack}</span></li>
          <li><span className="label label-default">TYP: {type}</span></li>
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
  render() {
    const { onNewPokemon, newError } = this.props
    return (
      <li className="clearfix">
        <form onSubmit={(e) => {
          e.preventDefault()
          let poke = {}
          for (var i = 0; i < e.target.length; i++) {
            if (e.target[i].name && e.target[i].value) {
              poke[e.target[i].name] = e.target[i].value;
            }
          }
          let errors = []
          if (!poke.hasOwnProperty("attack")) {
            errors.push({
              message: "Missing attack"
            })
          }
          if (!poke.hasOwnProperty("name")) {
            errors.push({
              message: "Missing name"
            })
          }
          if (!poke.hasOwnProperty("type")) {
            errors.push({
              message: "Missing type"
            })
          }
          if (errors.length < 1) {
            poke.attack = parseInt(poke.attack);
            onNewPokemon(poke)
            console.log(e.target.reset());
          }
          else {
            newError(errors)
          }
        }}>
          <label className="form-group col-md-4">
            <input type="text" name="name" placeholder="Pikachu" className="form-control" />
          </label>
          <label className="form-group col-md-4">
            <input type="text" name="type" placeholder="Electric" className="form-control" />
          </label>
          <label className="form-group col-md-3">
            <input type="numeric" name="attack" placeholder="128" className="form-control" />
          </label>
          <div className="form-group col-md-1">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </li>
    )
  }
}

//
// Pokédex
//
class Pokedex extends Component {
  render() {
    const { pokemon, errors, onNewPokemon, onNewError } = this.props
    return (
      <div>
        {errors.map((e, i) => {
          return <span key={i}>{e.message}</span>
        })}
        <ul className="list-group">
          <NewPokemonComponent onNewPokemon={onNewPokemon} newError={onNewError} />
          {pokemon.map((p, i) => {
            return <Pokemon key={i} {...p} />
          })}
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

// Pokemon reducer
function pokemon(state={ pokemon: mockData, errors: [] }, action) {
  switch (action.type) {
    case 'ADD_POKEMON':
      return Object.assign({}, state, {
        pokemon: [
          ...state.pokemon,
          action.pokemon
        ],
        errors: [
        ]
      })
    case 'ADD_ERROR':
      return Object.assign({}, state, {
        pokemon: state.pokemon,
        errors: action.errors
      })
    default:
      return state;
  }
}

// Store
const store = createStore(pokemon)

// Map state -> props
function mapStateToProps(state) {
  return {
    pokemon: state.pokemon,
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
