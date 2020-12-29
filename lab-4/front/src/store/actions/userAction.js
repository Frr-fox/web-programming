import axios from 'axios';
import {SET_TABLE} from "./pageAction";

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_SIGN_IN = "SET_SIGN_IN";
export const SET_USER_ANSWER = 'SET_USER_ANSWER';


export function login(user) {
    return dispatch => {
        let header = 'Basic ' + btoa(user.username + ':' + user.password);
        axios({
            url: 'http://localhost:8080/Web-lab-4-1/user/login',
            method: 'post',
            headers: {
                Authorization: header
            },
        })
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    localStorage.setItem("loginIn", header);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: "Авторизация прошла успешно",
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true,
                    });
                    window.location = '/main';
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: "Неправильный логин или пароль",
                    })
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: LOGIN_FAIL,
                    payload: "Неправильный логин или пароль",
                })
            });
    }
}

export function registration(user) {
    return dispatch => {
        let header = 'Basic ' + btoa(user.username + ':' + user.password);
        axios({
            url: 'http://localhost:8080/Web-lab-4-1/user/register',
            method: "post",
            headers: {
                Authorization: header
            },
        })
            .then(result => {
                console.log(result);
                if (Number(result.status) === 201) {
                    dispatch({
                        type: REGISTER,
                        payload: "Регистрация прошла успешно"
                    });
                    window.location = '/main';
                } else {
                    dispatch({
                        type: REGISTER,
                        payload: "Такой пользователь уже зарегистрирован, выберете другой логин",
                    });
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: REGISTER,
                    payload: "Такой пользователь уже зарегистрирован, выберете другой логин",
                });
            });
    }
}

export function logout() {
    return dispatch => {
        axios.get("http://localhost:8080/Web-lab-4-1/user/logout", {
            withCredentials: true,
        })
            .then(result => {
                console.log(result)
            })
            .catch(result => console.log(result));
        dispatch({
            type: LOGOUT,
            payload: false,
        });
        dispatch({
            type: SET_TABLE,
            payload: [],
        });
        localStorage.removeItem("loginIn");
        window.location = '/';
    }
}

export function setAnswer(userAnswer) {
    return {
        type: SET_USER_ANSWER,
        payload: userAnswer
    }
}

export function setLogin(login) {
    return {
        type: SET_SIGN_IN,
        payload: login
    }
}