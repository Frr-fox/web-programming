import React, {Component} from 'react';
import '../styles/main.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Canvas from "../components/Canvas";
import {connect} from "react-redux";
import {logout} from "../store/actions/userAction";
import {getTable, setMessageX, setR, setX, setY} from "../store/actions/pageAction";
import Table from "../components/Table";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.props.setMessageX("");
        this.props.setX(null);
        this.props.setY(0);
        this.props.setR(0);
        this.goToLogin = this.goToLogin.bind(this);
    }

    getTable() {
        this.props.getTable();
    }

    componentDidMount() {
        this.getTable()
    }

    render() {
        return (
            <div>
                {localStorage.getItem("loginIn") ? this.authRender() : this.notAuthRender()}
            </div>
        );
    }

    authRender() {
        return (
            <div className="login_2">
                <Header/>
                <div className="grid">
                    <Canvas/>
                    <Form/>
                </div>
                <Table table={this.props.page.table}/>
                <Footer/>
            </div>
        );
    }

    notAuthRender() {
        return (
            <div className="login_1">
                <Header/>
                <h2>Для выполнения этого действия необходимо пройти авторизацию</h2>
                <button id="toLogin" type="button" className="button_in_form" onClick={this.goToLogin}>Вернуться к авторизации</button>
                <Footer/>
            </div>
        )
    }

    goToLogin() {
        this.props.logout();
    }
}

const mapStateToProps = store => {
    return {
        page: store.page,
        style: store.style,
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(logout()),
        setR: r => dispatch(setR(r)),
        setX: x => dispatch(setX(x)),
        setY: y => dispatch(setY(y)),
        setMessageX: messageX => dispatch(setMessageX(messageX)),
        getTable: () => dispatch(getTable()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)