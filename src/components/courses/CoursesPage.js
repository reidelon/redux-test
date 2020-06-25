import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import CoursesList from "./CoursesList"



class CoursesPage extends React.Component {
  componentDidMount() {
    const {courses, authors, actions} = this.props

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }

  render() {
    return <CoursesList courses={this.props.courses} />;
  }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course =>{
          return{
            ...course,
            authorName: state.authors.find(a=>a.id === course.authorId).name
          }
        }),
        authors: state.authors
    };
}

//"bindActionCreators" map to props aproach

function mapDispatchToProps(dispatch){
    return {
      actions: {
        loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
        loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
      }
      };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);