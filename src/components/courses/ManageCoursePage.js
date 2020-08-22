import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseForm from "./CourseForm";
import {newCourse} from "../../utils";
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';

function ManageCoursePage({ courses, authors, actions, history, ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [error, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }else{
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
    //to run an effect on props changes
  }, [props.course, courses.length, authors.length, actions]);

  function handleChange(event){
    const { name, value } = event.target;
    setCourse( prevCourse =>({
      ...prevCourse,
      //JavaScript computed property syntax-> [name]:
      [name]: name==="authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    actions
      .saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses/all");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    authors.length === 0 || courses.length === 0 ? <Spinner/> :
    <CourseForm
      course={course}
      errors={error}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving = {saving}
    />
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug){
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

//"bindActionCreators" map to props aproach
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      saveCourse: bindActionCreators(courseActions.saveCourse, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
