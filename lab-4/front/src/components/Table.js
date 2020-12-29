import React, {Component} from 'react';
import '../styles/main.scss';

class Table extends Component {
    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
    }

    renderBody() {
        if (this.props.table.length > 0) {
            return (
                <tbody>
                {this.props.table.map((item) => (
                    <tr key={item.id}>
                        <td>{item.x}</td>
                        <td>{item.y}</td>
                        <td>{item.r}</td>
                        <td>{item.inArea? "Да": "Нет"}</td>
                        <td>{String(item.time)}</td>
                    </tr>
                ))}
                </tbody>
            )
        } else {
            return (
                <tbody>
                <tr>
                    <td colSpan="5">&nbsp;</td>
                </tr>
                </tbody>
            )
        }
    }

    render() {
        return (
            <table className="pointsTable">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Попадание</th>
                    <th>Время</th>
                </tr>
                </thead>
                {this.renderBody()}
            </table>
        )
    }
}



export default Table;