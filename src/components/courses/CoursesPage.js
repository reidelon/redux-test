import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import {bindActionCreators} from 'redux';
import CoursesList from "./CoursesList";
import {Redirect} from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';
import Category from "../common/Category";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirectToAddCoursePage: false };
  }

  componentDidMount() {
    const { courses, authors, actions } = this.props;

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

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}

        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              <div className="col-sm-2">
                
              </div>
              <div className="col-sm-10">
                <h2>Courses</h2>
                <button
                  style={{ marginBottom: 20 }}
                  className="btn btn-primary add-course"
                  onClick={() =>
                    this.setState({ redirectToAddCoursePage: true })
                  }
                >
                  Add Course
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
              <h6 style={{ marginLeft: 17 }}>Categories</h6>
                <Category />
              </div>
              <div className="col-sm-10">
                
                <CoursesList
                  onDeleteClick={this.handleDeleteCourse}
                  courses={this.props.courses}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps){
  const category = ownProps.match.params.category;
  let courses = [];
  if(state.authors.length != 0)
    state.courses.forEach((course) =>{
          if(category === undefined)
          {debugger
            courses.push({
              ...course,
              authorName: state.authors.find(a=>a.id === course.authorId).name
            })
          }
          else if(course.category === category){
            courses.push({
              ...course,
              authorName: state.authors.find(a=>a.id === course.authorId).name
            })
          }
        });
        
        return {
        courses: courses,
        authors: state.authors,
        loading: state.apiStatusReducers > 0
    }
}

//"bindActionCreators" map to props aproach

function mapDispatchToProps(dispatch){
    return {
      actions: {
        loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
        loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
        deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      }
      };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);