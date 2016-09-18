import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import pokemon from '../reducers';
import Pokedex from './Pokedex';
import { addPokemonAction, addErrorAction, updateFilterAction } from '../actions';

const getVisible = (pokemon, visibilityFilter) => {
  if (visibilityFilter === 'All') {
    return pokemon;
  }
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
export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokedex)
