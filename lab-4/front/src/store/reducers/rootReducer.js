import { combineReducers } from 'redux'
import { pageReducer } from './pageReducer'
import { userReducer } from './userReducer'
import {styleReducer} from "./styleReducer";

export const rootReducer = combineReducers({
    style: styleReducer,
    page: pageReducer,
    user: userReducer,
});