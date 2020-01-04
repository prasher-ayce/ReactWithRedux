import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
  state = {
    redirectToCoursePage: false
  };

  // handleChange = event => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };
  // handleSubmit = () => {
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  // };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        console.log(error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        console.log(error);
      });
    }
  }
  // handleDeleteCourse = course => {
  //   toast.success("Course Deleted");

  //   this.props.actions.deleteCourse(course).catch(error => {
  //     toast.error("Delete Failed" + error.message, { autoClose: false });
  //   });
  // };
  handleDeleteCourse = async course => {
    toast.success("Course Deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed" + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToCoursePage && <Redirect to={"/course"} />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ margin: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            ></CourseList>
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  // dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

function mapStateToProps({ courses, authors, apiCallsInProgress }) {
  return {
    courses:
      authors.length == 0
        ? []
        : courses.map(course => {
            return {
              ...course,
              authorName: authors.find(author => author.id == course.authorId)
                .name
            };
          }),
    authors,
    loading: apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
