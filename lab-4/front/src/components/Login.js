import React, {Component} from 'react';
import '../styles/register.css';
import '../styles/loginAndForm.css';
import {connect} from "react-redux";
import {login, registration, setAnswer, setLogin} from "../store/actions/userAction";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
        this.changeOperation = this.changeOperation.bind(this);
        this.props.setAnswer("");
        this.enter = this.enter.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput(event) {
        this.props.setAnswer("");
    }

    changeOperation() {
        this.props.setAnswer("");
        document.getElementById("login").value = "";
        document.getElementById("password").value = "";
        this.setState(state => ({
            isLogin: !state.isLogin,
        })
        )
    }

    enter(event) {
        console.log("Вход");
        if (this.state.isLogin) this.justLogin(event);
        else this.justRegister(event);
    }

    justLogin(event) {
        this.props.setAnswer("");
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === null || login === "" || password === null || password === "") {
            this.props.setAnswer("Введите логин и пароль")
        } else if (/[а-я, А-Я]/.test(login) || (/[а-я, А-Я]/.test(password))) {
            this.props.setAnswer("Можно использовать только латинские символы")
        } else {
            let info = {
                username: login,
                password: password
            };
            this.props.login(info);
        }
    }

    justRegister(event) {
        this.props.setAnswer("");
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === null || login === "") {
            this.props.setAnswer("Введите логин")
        } else if (password === null || password === "") {
            this.props.setAnswer("Введите пароль")
        } else {
            let info = {
                username: login,
                password: password
            };
            this.props.registration(info);
        }
    }

    render() {
        return (
            <div id="login_form">
                <h1>{this.state.isLogin?"Авторизация":"Регистрация"}</h1>
                <fieldset className="clearfix">
                    <p>
                        <span className="fontawesome-user"/>
                        <input id="login" type="text" placeholder={"Логин"} onChange={this.onChangeInput}/>
                    </p>
                    <p>
                        <span className="fontawesome-lock"/>
                        <input id="password" type="password" placeholder={"Пароль"} onChange={this.onChangeInput}/>
                    </p>
                    <p><input type="submit" value={this.state.isLogin?"Войти":"Зарегистрироваться"} onClick={this.enter}/></p>
                </fieldset>
                <div className="userAnswer">
                    {this.props.user.userAnswer === "" ? <br/> : this.props.user.userAnswer}
                </div>
                <p>{this.state.isLogin?"Еще не зарегистрированы?":"Уже зарегистрированы?"}
                    <button type="button" className="register_button" onClick={this.changeOperation}>{this.state.isLogin?"Зарегистрируйтесь":"Пройдите авторизацию"}</button>
                    <span className="fontawesome-arrow-right"/>
                </p>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
        style: store.style
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        setLogin: info => dispatch(setLogin(info)),
        setAnswer: userAnswer => dispatch(setAnswer(userAnswer)),
        registration: user => dispatch(registration(user)),
        login: user => dispatch(login(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);