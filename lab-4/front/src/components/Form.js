import React, {Component} from 'react';
import '../styles/radioButton.css';
import '../styles/loginAndForm.css';
import {connect} from 'react-redux';
import {sendPoint, deletePoints, setMessageX, setR, setX, setY} from "../store/actions/pageAction";
import {logout} from "../store/actions/userAction";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          RValue: "0",
          XValue: "",
          YValue: "0"
        };
        this.onChangeRValue = this.onChangeRValue.bind(this);
        this.onChangeXValue = this.onChangeXValue.bind(this);
        this.onChangeYValue = this.onChangeYValue.bind(this);
        this.clear = this.clear.bind(this);
        this.goBack = this.goBack.bind(this);
        this.submitPoint = this.submitPoint.bind(this);
        this.clearTable = this.clearTable.bind(this);
    }

    onChangeRValue(event) {
        this.props.setMessageX("");
        this.setState( {
            RValue: event.target.value
            });
        this.props.setR(event.target.value);
    }

    onChangeXValue(event) {
        this.props.setMessageX("");
        this.setState( {
            XValue: event.target.value
        });
        this.props.setX(event.target.value);
    }

    onChangeYValue(event) {
        this.props.setMessageX("");
        this.setState( {
            YValue: event.target.value
        });
        this.props.setY(event.target.value);
    }

    clearTable(event) {
        this.props.deletePoints();
    }

    submitPoint(event){
        if (this.checkValues()) {
            let point = {
                x: this.props.page.x,
                y: this.props.page.y,
                r: this.props.page.r,
            };
            console.log("X: "+ point.x + "\nY: " + point.y + "\nR: " + point.r);
            this.props.sendPoint(point);
            this.clear(event);
        }
    }

    checkValues() {
        this.props.setMessageX("");
        let flag = true;
        let message = "";
        let x = this.props.page.x;
        let r = this.props.page.r;
        if (r < 0) {
            message = "Выберите неотрицательное значение R. ";
            flag = false;
        }
        if (x === "" || x == null) {
            message += "Введите значение X. ";
            flag = false;
        } else {
            if(!/^(-?\d+)([.,]\d+)?$/.test(x)) {
                message += "Неверный формат данных в поле ввода X. ";
                flag = false;
            } else {
                x = x.replace(',','.');
                x = +x;
                if (!(x >= -5 && x <= 3)) {
                    message += "Значение X должно быть от -5 до 3. ";
                    flag = false;
                }
            }
        }
        this.props.setMessageX(message);
        return flag;
    }

    clear(event) {
        document.getElementById("xValue").value = "";
        this.onChangeXValue(event);
        this.onChangeRValue(event);
        this.setState({
            RValue: "0",
            YValue: "0"
        });
    }

    goBack(event){
        this.props.logout()
    }

    render() {
        return (
            <form className="col-2-2">
                <div className="parameters">
                    <p>Значение R:</p>
                    <table>
                        <tbody>
                        <tr>
                            <td><input id={"R-2"} className="R" type="radio" value={-2} checked={this.state.RValue === "-2"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R-1.5"} className="R" type="radio" value={-1.5} checked={this.state.RValue === "-1.5"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R-1"} className="R" type="radio" value={-1} checked={this.state.RValue === "-1"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R-0.5"} className="R" type="radio" value={-0.5} checked={this.state.RValue === "-0.5"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R0"} className="R" type="radio" value={0} checked={this.state.RValue === "0"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R0.5"} className="R" type="radio" value={0.5} checked={this.state.RValue === "0.5"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R1"} className="R" type="radio" value={1} checked={this.state.RValue === "1"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R1.5"} className="R" type="radio" value={1.5} checked={this.state.RValue === "1.5"} onChange={this.onChangeRValue}/></td>
                            <td><input id={"R2"} className="R" type="radio" value={2} checked={this.state.RValue === "2"} onChange={this.onChangeRValue}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="R-2">-2</label></td>
                            <td><label htmlFor="R-1.5">-1.5</label></td>
                            <td><label htmlFor="R-1">-1</label></td>
                            <td><label htmlFor="R-0.5">-0.5</label></td>
                            <td><label htmlFor="R0">0</label></td>
                            <td><label htmlFor="R0.5">0.5</label></td>
                            <td><label htmlFor="R1">1</label></td>
                            <td><label htmlFor="R1.5">1.5</label></td>
                            <td><label htmlFor="R2">2</label></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <div className="col-2 parameters">
                        <p>Значение X:</p>
                        <input id="xValue" type="text" placeholder="(-5; 3)" onChange={this.onChangeXValue}/>
                        <div className={"messageX"}>
                            {this.props.page.messageX === "" ? <br/> : this.props.page.messageX}
                        </div>
                    </div>
                    <div className="col-2 parameters">
                        <p>Значение Y:</p>
                        <table>
                            <tbody>
                            <tr>
                                <td><input id="Y-2" type="radio" value={-2} checked={this.state.YValue === "-2"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y-1.5" type="radio" value={-1.5} checked={this.state.YValue === "-1.5"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y-1" type="radio" value={-1} checked={this.state.YValue === "-1"} onChange={this.onChangeYValue}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="Y-2">-2</label></td>
                                <td><label htmlFor="Y-1.5">-1.5</label></td>
                                <td><label htmlFor="Y-1">-1</label></td>
                            </tr>
                            <tr>
                                <td><input id="Y-0.5" type="radio" value={-0.5} checked={this.state.YValue === "-0.5"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y0" type="radio" value={0} checked={this.state.YValue === "0"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y0.5" type="radio" value={0.5} checked={this.state.YValue === "0.5"} onChange={this.onChangeYValue}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="Y-0.5">-0.5</label></td>
                                <td><label htmlFor="Y0">0</label></td>
                                <td><label htmlFor="Y0.5">0.5</label></td>
                            </tr>
                            <tr>
                                <td><input id="Y1" type="radio" value={1} checked={this.state.YValue === "1"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y1.5" type="radio" value={1.5} checked={this.state.YValue === "1.5"} onChange={this.onChangeYValue}/></td>
                                <td><input id="Y2" type="radio" value={2} checked={this.state.YValue === "2"} onChange={this.onChangeYValue}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="Y1">1</label></td>
                                <td><label htmlFor="Y1.5">1.5</label></td>
                                <td><label htmlFor="Y2">2</label></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button id="submit" type="button" className="button_in_form" onClick={this.submitPoint}>Отправить</button>
                    <button id="clear" type="button" className="button_in_form" onClick={this.clear}>Очистить</button>
                    <button id="delete" type="button" className="button_in_form" onClick={this.clearTable}>Удалить данные</button>
                </div>
                <button id="closeSession" type="button" className="button_in_form button_close_session" onClick={this.goBack}>Закрыть сессию</button>
            </form>
        )
    }
}

const mapStateToProps = store => {
    return {
        page: store.page,
        style: store.style
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setR: r => dispatch(setR(r)),
        setX: x => dispatch(setX(x)),
        setY: y => dispatch(setY(y)),
        setMessageX: message => dispatch(setMessageX(message)),
        deletePoints: () => dispatch(deletePoints()),
        logout: () => dispatch(logout()),
        sendPoint: point => dispatch(sendPoint(point))
    }
};

export default connect (mapStateToProps,mapDispatchToProps)(Form)