import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChangeInput }) => {
  return (
    <label htmlFor="filter">
      <h2>Filter contact by name</h2>
      <input name="filter" onChange={onChangeInput} value={value} />
    </label>
  );
};
Filter.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired,
};
export default Filter;
