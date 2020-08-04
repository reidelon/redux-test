import React from "react";
import PropTypes from "prop-types";
import CourseTableRow from "./CourseTableRow";

class CoursesList extends React.Component {
  renderTableData() {
    return this.props.courses.map((course, index) => {
      return (
        <CourseTableRow
          key={index}
          course={course}
          onDeleteClick={this.props.onDeleteClick}
        />
      );
    });
  }

  render() {
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Author</th>
              <th scope="col">category</th>
              <th scope="col" colSpan="2">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td colSpan="3">
              <form onSubmit={this.props.onApplayFilter} className="form-inline">
                <input
                  type="search"
                  className="form-control form-control-sm mr-sm-2"
                  id="exampleFormControlInput1"
                  style={{ "width": "80%"}}
                  name="course"
                  onChange={this.props.onFilterTextChange}
                  value={this.props.filteredText}
                />

                <button
                  className="btn btn-primary btn-sm"
                  disabled={this.props.disabledSearch}
                  type="submit"
                >
                  Search
                </button>
              </form>
              </td>
              <td></td>
              <td></td>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </>
    );
  }
}

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CoursesList;
