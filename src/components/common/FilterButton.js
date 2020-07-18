import React from "react";

const FilterButton = (props) => {
    return (
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-success add-course"
        disabled={props.disabled}
        onClick={props.onFilterReset}
      >
        Reset Filters
      </button>
    );
}

export default FilterButton;