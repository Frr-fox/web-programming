import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER,
    SET_SIGN_IN,
    SET_USER_ANSWER
} from "../actions/userAction";

const initialState = {
    login: "",
    isLogin: false,
    userAnswer: ""
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ANSWER:
            return {...state, userAnswer: action.payload};
        case REGISTER:
            return {...state, userAnswer: action.payload};
        case LOGIN_FAIL:
            return {...state, userAnswer: action.payload};
        case LOGIN_SUCCESS:
            return {...state, userAnswer: action.payload};
        case LOGOUT:
            return {...state, isLogin: action.payload};
        case SET_SIGN_IN:
            return {...state, isLogin: action.payload};
        default:
            return state;
    }
}