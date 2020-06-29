import {combineReducers} from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";
import apiStatusReducers from "./apiStatusReducers";

const rootReducer = combineReducers({
    courses, 
    authors,
    apiStatusReducers
});

export default rootReducer;