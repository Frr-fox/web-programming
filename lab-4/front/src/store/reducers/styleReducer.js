import {SET_STYLE} from "../actions/styleAction";

const initialState = {
    device: null
};

export function styleReducer(state = initialState, action) {
    if (action.type === SET_STYLE) {
        return {...state, device: action.value};
    } else {
        return state;
    }
}