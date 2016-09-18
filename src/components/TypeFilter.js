import React, { Component, PropTypes } from 'react'
import {ALL_TYPES} from '../constants';

export class TypeFilter extends Component {
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
