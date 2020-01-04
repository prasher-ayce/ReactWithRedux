import * as type from "../actions/actionTypes";
import initialState from "./initalState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case type.LOAD_AUTHOR_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
