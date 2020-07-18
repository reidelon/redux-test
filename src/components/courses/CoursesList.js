import React from "react";
import PropTypes from "prop-types";
import FilterInput from "../common/FilterInput";
import CourseTableRow from "./CourseTableRow";

class CoursesList extends React.Component {

  renderTableData() {

       return this.props.courses.map((course, index) => {
        const { id, title, slug, category, authorName } = course; //destructuring
        return(
          <CourseTableRow
            course={course}
            onDeleteClick={this.props.onDeleteClick}
          />
        );
      });
 }

  render() {
    const authorFiltered = this.props.authorFiltered;
    const courseFiltered = this.props.courseFiltered;
    const categoryFiltered = this.props.categoryFiltered;
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
              <FilterInput
                name="course"
                value={courseFiltered}
                onFilterTextChange={this.props.onFilterTextChange}
              />
              <FilterInput
                name="author"
                value={authorFiltered}
                onFilterTextChange={this.props.onFilterTextChange}
                disabled={true}
              />
              <FilterInput
                name="category"
                value={categoryFiltered}
                onFilterTextChange={this.props.onFilterTextChange}
              />
              <td></td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={this.props.onApplayFilter}
                >
                  Applay
                </button>
              </td>
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
  onDeleteClick: PropTypes.func.isRequired
};

export default CoursesList;