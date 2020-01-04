import * as type from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourse(course) {
  return { type: type.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
  return { type: type.LOAD_COURSES_SUCCESS, courses };
}

function updateCourseSuccess(course) {
  return { type: type.UPDATE_COURSES_SUCCESS, course };
}

function createCourseSaved(course) {
  return { type: type.CREATE_COURSES_SUCCESS, course };
}

function deleteCourseOptimistic (course){
  return { type: type.DELETE_COURSE_OPTIMISTIC, course };

}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSaved(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
