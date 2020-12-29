import {
    CANVAS_WIDTH,
    SET_TABLE,
    SET_R, SET_X,
    SET_Y, SET_MESSAGE_X,
    ADD_POINTS, DELETE_POINTS
} from "../actions/pageAction";

const  initialState = {
    x: null,
    y: null,
    r: 0,
    table: [],
    messageX: "",
    canvasWidth: 450
};

export function pageReducer(state  = initialState, action) {
    switch (action.type) {
        case ADD_POINTS:
            return {...state, table: [...state.table, action.payload]};
        case DELETE_POINTS:
            return {...state, table: action.payload};
        case SET_TABLE:
            return {...state, table: action.payload};
        case SET_MESSAGE_X:
            return{...state, messageX: action.payload};
        case CANVAS_WIDTH:
            return {...state, canvasWidth: action.payload};
        case SET_X:
            return {...state, x: action.payload};
        case SET_Y:
            return {...state, y: action.payload};
        case SET_R:
            return {...state, r: action.payload};
        default:
            return state;
    }
}