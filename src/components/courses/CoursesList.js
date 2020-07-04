import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CoursesList extends React.Component {

  renderTableData() {
    return this.props.courses.map((course, index) => {
       const { id, title, slug, category, authorName} = course //destructuring
       console.log(course);
       return (
         <tr key={id}>
           <td>
             <Link to={"/course/" + slug}>{title}</Link>
           </td>
           <td>{authorName}</td>
           <td>{category}</td>
           <td>
             <Link
               role="button"
               className="btn btn-primary btn-sm"
               to={"/course/" + slug}
             >
               Edit
             </Link>
           </td>
           <td>
             <button
               className="btn btn-danger btn-sm"
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
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">category</th>
              <th scope="col" colSpan="2">actions</th>
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