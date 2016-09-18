import React, { Component, PropTypes } from 'react'
import {NewPokemonComponent} from './NewPokemon';
import {PokemonList} from './PokemonList';
import {TypeFilter} from './TypeFilter';

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

export default Pokedex;
