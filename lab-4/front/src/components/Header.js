import React, {Component} from 'react';
import '../styles/main.scss';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <span className="col-2">Нечкасова Олеся Алексеевна, группа P3212</span>
                <span className="col-2">Вариант 93014</span>
            </div>
        )
    }
}

export default Header;