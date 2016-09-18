import {expect} from 'chai';

import * as actions from '../src/actions';
import * as types from '../src/constants'

describe('actions', () => {
  it('should create an action to add new pokemon', () => {
    const pokemon = {
      name: "Bulbasaur",
      type: "Grass",
      attack: 101
    };
    const expectedAction = {
      type: 'ADD_POKEMON',
      pokemon
    };
    expect(actions.addPokemonAction(pokemon)).to.deep.equal(expectedAction)
  })

  it('should create an action to filter pokemons', () => {
    const pokemonType = {pokemonType: "Grass"};
    const expectedAction = {
      type: 'UPDATE_FILTER',
      pokemonType
    };
    expect(actions.updateFilterAction(pokemonType)).to.deep.equal(expectedAction)
  })

  it('should create an action to add an error', () => {
    const error = "Lorem ipsum dolor sit amet"
    const expectedAction = {
      type: 'ADD_ERROR',
      errors: error
    };
    expect(actions.addErrorAction(error)).to.deep.equal(expectedAction)
  })
})
