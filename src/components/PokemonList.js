import React, { Component, PropTypes } from 'react'
import {Pokemon} from './Pokemon'

export class PokemonList extends Component {
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
