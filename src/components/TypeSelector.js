import React, { Component, PropTypes } from 'react'
import {ALL_TYPES} from '../constants';

export class TypeSelector extends Component {
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
