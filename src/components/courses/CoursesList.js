import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CoursesList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTableData() {
    return this.props.courses.map((course, index) => {
       const { id, title, slug, category, authorName} = course //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{title}</td>
             <td><Link to={"/course/" + slug} class="badge badge-info">{authorName}</Link></td>
             <td>{category}</td>
          </tr>
       )
    })
 }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">Author</th>
              <th scope="col">category</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </>
    );
  }
}

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CoursesList;