import React from "react";
import { Link } from "react-router-dom";

const CourseTableRow = (props) => {
  const { id, title, slug, category, authorName } = props.course; //destructuring
  return (
    <tr key={id}>
      <td>
        <Link to={"/course/" + slug}>{title}</Link>
      </td>
      <td>
        <Link to={"/author/" + authorName}>{authorName}</Link>
      </td>
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
          onClick={() => props.onDeleteClick(props.course)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CourseTableRow;
