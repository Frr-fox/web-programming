import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from "../components/Login";

class EnterPage extends Component {

    render() {
        return (
            <div className="login_1">
                <Header/>
                <Login/>
                <Footer/>
            </div>
        );
    }

}

const mapStateToProps = store => {
    return {
        user: store.user,
        style: store.style,
        page: store.page
    }
};

export default connect(mapStateToProps)(EnterPage)