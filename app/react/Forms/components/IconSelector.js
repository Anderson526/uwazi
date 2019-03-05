import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { iconNames } from 'UI/Icon/library';
import { Icon } from 'UI';
import countries from 'world-countries';
import Flag from 'react-flags';

import DropdownList from './DropdownList';

const style = { display: 'inline-block', width: '25px' };

export class ListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.item._id !== nextProps.item._id;
  }

  render() {
    const { item } = this.props;
    let icon = <span>No icon / flag</span>;
    if (item.type === 'Icons') {
      icon = (
        <span style={style}>
          <Icon icon={`${item._id}`} />
        </span>
      );
    }

    if (item.type === 'Flags') {
      icon = (
        <span style={style}>
          <Flag
            name={item._id}
            format="png"
            pngSize={16}
            shiny
            alt={`${item.label} flag`}
            basePath="/flag-images"
          />
        </span>
      );
    }

    return (
      <span>
        {icon}
        {item.label}
      </span>
    );
  }
}

export class IconSelector extends Component {
  componentWillMount() {
    const listOptions = [{ _id: null, type: 'Empty' }]
    .concat(iconNames.map(icon => ({
      _id: icon,
      type: 'Icons',
      label: icon
    }))).concat(countries.map(country => ({
      _id: country.cca3,
      type: 'Flags',
      label: country.name.common
    })));

    this.setState({ listOptions });
  }

  render() {
    return (
      <DropdownList
        valueField="_id"
        textField="label"
        data={this.state.listOptions}
        valueComponent={ListItem}
        itemComponent={ListItem}
        defaultValue={this.state.listOptions[0]}
        filter="contains"
        groupBy="type"
        {... this.props}
      />
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object
};

export default IconSelector;
