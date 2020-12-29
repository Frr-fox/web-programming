import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import {setLogin} from "../store/actions/userAction";
import EnterPage from "./EnterPage";
import MainPage from "./MainPage";
import {setStyle} from "../store/actions/styleAction";
import {setWidth} from "../store/actions/pageAction";

class App extends Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem("loginIn")!=null || localStorage.getItem("loginIn")!==undefined){
            this.props.setLogin(true)
        } else {
            this.props.setLogin(false)
        }
        this.autoScale = this.autoScale.bind(this);
        window.addEventListener("resize", this.autoScale);
    }


  render() {
    return (
        <div>
            <BrowserRouter>
                <Route exact={true} strict={true} path="/" component={EnterPage}/>
                <Route exact={true} strict={true} path="/main" component={MainPage}/>
            </BrowserRouter>
        </div>
    );
  }

  autoScale() {
        let width = window.innerWidth;
        if (width >= 1144) {
            this.props.setStyle('desktop');
            this.props.setWidth(450);
        } else if (width < 1144 && width >= 669) {
            this.props.setWidth(450);
            this.props.setStyle('tablet');
        } else if (width < 669) {
            this.props.setWidth(350);
            this.props.setStyle('mobile');
        }
    }
}

const mapStateToProps = store =>{
    return {
        page: store.page,
        style: store.style
    }
};

const mapDispatchToProps = dispatch => {
    return{
        setLogin: flag => dispatch(setLogin(flag)),
        setStyle: device => dispatch(setStyle(device)),
        setWidth: width => dispatch(setWidth(width))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
