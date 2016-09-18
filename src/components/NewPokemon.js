import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {TypeSelector} from './TypeSelector'

//
// Pokemon form
//
export class NewPokemonComponent extends Component {
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
