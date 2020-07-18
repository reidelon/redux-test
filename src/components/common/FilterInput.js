import React from "react";

const FilterInput = (props) => {
  return (
    <td>
      <div className="form-group">
        <input
          type="text"
          class="form-control form-control-sm"
          id="exampleFormControlInput1"
          disabled={props.disabled ? true: false}
          name={props.name}
          value={props.value}
          onChange={props.onFilterTextChange}
        />
      </div>
    </td>
  );
};

export default FilterInput;
