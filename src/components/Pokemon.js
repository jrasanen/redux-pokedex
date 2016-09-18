import React, { Component, PropTypes } from 'react'

//
// Pokédex List Item
//
export class Pokemon extends Component {
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
