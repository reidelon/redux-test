import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CoursesList extends React.Component {

  renderTableData() {
    return this.props.courses.map((course, index) => {
       const { id, title, slug, category, authorName} = course //destructuring
       return (
         <tr key={id}>
           <td>
             <Link
               role="button"
               className="btn btn-outline-primary btn-sm"
               to={"/course/" + slug}
             >
               Watch
             </Link>
           </td>
           <td>
             <Link to={"/course/" + slug}>{title}</Link>
           </td>
           <td>{authorName}</td>
           <td>{category}</td>
           <td>
             <button
               className="btn btn-outline-danger"
               onClick={() => this.props.onDeleteClick(course)}
             >
               Delete
             </button>
           </td>
         </tr>
       );
    })
 }

  render() {
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">Author</th>
              <th scope="col">category</th>
              <th/>
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
  onDeleteClick: PropTypes.func.isRequired
};

export default CoursesList;