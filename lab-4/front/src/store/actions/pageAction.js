import axios from 'axios';

export const CANVAS_WIDTH = 'CANVAS_WIDTH';
export const DEVICE_TYPE = 'DEVICE_TYPE';
export const SET_TABLE = 'SET_TABLE';
export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const SET_MESSAGE_X = 'SET_MESSAGE_X';
export const ADD_POINTS = "ADD_POINTS";
export const DELETE_POINTS = "DELETE_POINTS";

export function sendPoint(point){
    return dispatch => {
        let header = localStorage.getItem("loginIn");
        console.log("Header: " + header);
        axios({
            url: 'http://localhost:8080/Web-lab-4-1/point/check',
            data: point,
            method: 'post',
            headers: {Authorization: header},
        })
            .then(data => {
                console.log(data.data);
                dispatch({
                    type: ADD_POINTS,
                    payload: data.data,
                })
            })
            .catch(data => console.log(data));
        dispatch({
            type: SET_X,
            payload: null,
        });
        dispatch({
            type: SET_Y,
            payload: null,
        });
    }
}

export function getTable() {
    return dispatch => {
        let header = localStorage.getItem('loginIn');
        console.log("Header: " + header);
        axios({
            url: 'http://localhost:8080/Web-lab-4-1/point/table',
            method: 'get',
            headers: {Authorization: header}
        }).then(data =>{
            dispatch({
                type: SET_TABLE,
                payload: data.data
            });
            console.log(data.data);
        }).catch(data => console.log(data));
    }
}

export function deletePoints() {
    let header = localStorage.getItem('loginIn');
    console.log("Header: " + header);
    return dispatch => {
        axios({
            url: 'http://localhost:8080/Web-lab-4-1/point/delete',
            method: 'post',
            headers: {
                Authorization: header
            },
        })
            .then(result => {
                console.log(result);
            })
            .catch(result => {
                console.log(result);
            });
        dispatch({
            type: DELETE_POINTS,
            payload: true,
        });
        dispatch({
            type: SET_TABLE,
            payload: [],
        });
    }
}

export function setWidth(width) {
    return {
        type: CANVAS_WIDTH,
        payload: width
    }
}

export function setDevice(device) {
    return {
        type: DEVICE_TYPE,
        payload: device
    }
}

export function setR(R) {
    return {
        type: SET_R,
        payload: R
    }
}

export function setX(X) {
    return {
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return {
        type: SET_Y,
        payload: Y
    }
}

export function setMessageX(message) {
    return{
        type: SET_MESSAGE_X,
        payload: message
    }
}