import * as type from "../actions/actionTypes";
import initialState from "./initalState";
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case type.CREATE_COURSES_SUCCESS:
      return [...state, { ...action.course }];

    case type.UPDATE_COURSES_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );

    case type.LOAD_COURSES_SUCCESS:
      return action.courses;

      case type.DELETE_COURSE_OPTIMISTIC:
        return state.filter(course=>course.id!==action.course.id );

    default:
      return state;
  }
}
