import React, {Component} from 'react';
import '../styles/main.scss';
import logo from "../images/log.png";

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <div>
                    <a href="https://github.com/Frr-fox/web-programming" target="_blank" rel="noreferrer">Ссылка на github</a>
                    <a href="https://se.ifmo.ru/courses/web" target="_blank" rel="noreferrer">Текст задания</a>
                </div>
                <h5>Декабрь, 2020</h5>
                <div className="log" >
                    <img src={logo} alt="log"/>
                </div>
            </div>
        )
    }
}

export default Footer;