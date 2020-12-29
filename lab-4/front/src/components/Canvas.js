import React, {Component} from 'react';
import {sendPoint, setMessageX} from "../store/actions/pageAction";
import {connect} from "react-redux";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.clickCanvas = this.clickCanvas.bind(this);
        this.onMoving = this.onMoving.bind(this);
    }

    sendPoint(x, y, r) {
        console.log("X: " + x + "\nY: " + y + "\nR: " + r);
        let point = {
            x: x,
            y: y,
            r: r
        };
        this.props.sendPoint(point);
    }

    drawCanvas() {
        const canvas = this.refs.canvas;
        let context;
        if (canvas.getContext("2d"))
            context = canvas.getContext("2d");
        this.drawAreas(context);
    }

    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    clickCanvas(event) {
        const canvas = this.refs.canvas;
        let x_normal = this.getNormalX(this.getCursorPositionX(canvas, event));
        let y_normal = this.getNormalY(this.getCursorPositionY(canvas, event));
        let r_normal = +this.props.page.r < 0? 0 : +this.props.page.r;
        if (this.props.page.r < 0) {
            this.props.setMessageX("Выберите неотрицательное значение R. ")
        } else {
            this.sendPoint(x_normal, y_normal, r_normal);
        }
    }

    render() {
        return (
            <div className="col-2-2">
                <canvas id="canvas" ref='canvas' onClick={this.clickCanvas} width={this.props.page.canvasWidth}
                        height={this.props.page.canvasWidth} onMouseMove={this.onMoving}/>
            </div>
        )
    }

    drawCoordinateGrid(context) {
        const MAX = this.refs.canvas.width;
        const CENTER = MAX / 2;
        context.clearRect(0, 0, MAX, MAX);
        context.fillStyle = 'rgba(255,255,255,0.5)';
        context.fillRect(0, 0, MAX, MAX);
        context.fillStyle = "#000000";
        context.beginPath();
        context.moveTo(CENTER, MAX);
        context.lineTo(CENTER, 10);
        context.stroke();
        context.moveTo(MAX - 10, CENTER);
        context.lineTo(0, CENTER);
        context.closePath();
        context.stroke();
        context.moveTo(MAX - 15, CENTER + 6);
        context.lineTo(MAX - 15, CENTER - 6);
        context.lineTo(MAX, CENTER);
        context.fill();
        context.moveTo(CENTER - 6, 15);
        context.lineTo(CENTER + 6, 15);
        context.lineTo(CENTER, 0);
        context.fill();
    }

    drawAreas(context) {
        const MAX = this.refs.canvas.width;
        const SPACE = MAX / 18;
        const CENTER = MAX / 2;
        const SQUARE = (MAX - 2 * SPACE) / 6;
        context.clearRect(0, 0, MAX, MAX);
        context.fillStyle = 'rgba(255,255,255,0.5)';
        context.fillRect(0, 0, MAX, MAX);
        this.drawCoordinateGrid(context);
        let R = +this.props.page.r;
        context.font = "italic " + 8 + "pt Arial ";
        let k, add_value;
        if (R < 0) R = 0;
        if (!isNaN(R)) {
            if (R < 1) {
                k = 3;
                add_value = SQUARE;
            } else {
                k = 5;
                add_value = SQUARE / 2;
            }
            for (let i = CENTER - SQUARE * R, j = 0; j < k; i += add_value * R, j++) {
                context.beginPath();
                context.moveTo(i, CENTER - 2);
                context.lineTo(i, CENTER + 3);
                context.stroke();
                context.moveTo(CENTER - 3, i);
                context.lineTo(CENTER + 3, i);
                context.stroke();
                context.closePath();
                let zero_point = (i - CENTER) / SQUARE;
                if (zero_point !== 0) {
                    context.fillText(this.defineDecimalPlaces((i - CENTER) / SQUARE), i - 4, CENTER + 15);
                    context.fillText(this.defineDecimalPlaces((CENTER - i) / SQUARE), CENTER + 12, i + 3);
                }
            }
            context.fillStyle = 'rgba(243,174,15,0.50)';
            context.fillRect(CENTER - R * SQUARE, CENTER, R * SQUARE, R * SQUARE);
            context.beginPath();
            context.moveTo(CENTER, CENTER);
            context.lineTo(CENTER, CENTER - R * SQUARE);
            context.lineTo(CENTER + R / 2 * SQUARE, CENTER);
            context.closePath();
            context.arc(CENTER, CENTER, R * SQUARE, -Math.PI / 2, -Math.PI, true);
            context.fill();
        }
        this.drawPoints(context);
    }

    defineDecimalPlaces(number) {
        let newNumber = (number).toFixed(2);
        return String(newNumber).replace(/0+$/g, "").replace(/\.$/g, "");
    }

    onMoving(event) {
        const MAX = this.refs.canvas.width;
        const SPACE = MAX / 18;
        const CENTER = MAX / 2;
        const SQUARE = (MAX - 2 * SPACE) / 6;
        const canvas = this.refs.canvas;
        let context;
        if (canvas.getContext("2d"))
            context = canvas.getContext("2d");
        let point = {
            x: 255,
            y: 255,
            x_normal: 0,
            y_normal: 0,
            radius: 2,
            color: 'black',
            draw: function () {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fillStyle = this.color;
                context.fill();
            }
        };
        point.x_normal = +((this.getCursorPositionX(canvas, event) - CENTER) / SQUARE).toFixed(2);
        point.y_normal = +Math.round(((CENTER - this.getCursorPositionY(canvas, event)) / SQUARE).toFixed(1) * 2) / 2;
        if (point.x_normal > 3) {
            point.x_normal = 3;
            point.x = CENTER + 3 * SQUARE;
        } else if (point.x_normal < -5) {
            point.x_normal = -5;
            point.x = CENTER - 5 * SQUARE;
        } else point.x = point.x_normal * SQUARE + CENTER;
        if (point.y_normal > 2) {
            point.y_normal = 2;
            point.y = CENTER - 2 * SQUARE;
        } else if (point.y_normal < -2) {
            point.y_normal = -2;
            point.y = CENTER + 2 * SQUARE;
        } else point.y = CENTER - point.y_normal * SQUARE;
        // label_coordinate.textContent = "(" + point.x_normal + "; " + point.y_normal + ")";
        this.drawAreas(context);
        point.draw();
    }

    getNormalX(cursorPositionX) {
        const MAX = this.refs.canvas.width;
        const SPACE = MAX / 18;
        const CENTER = MAX / 2;
        const SQUARE = (MAX - 2 * SPACE) / 6;
        let x_normal = +((cursorPositionX - CENTER) / SQUARE).toFixed(2);
        x_normal = x_normal > 3? 3: x_normal;
        x_normal = x_normal < -5? -5: x_normal;
        return x_normal;
    }

    getNormalY(cursorPositionY) {
        const MAX = this.refs.canvas.width;
        const SPACE = MAX / 18;
        const CENTER = MAX / 2;
        const SQUARE = (MAX - 2 * SPACE) / 6;
        let y_normal = +Math.round(((CENTER - cursorPositionY) / SQUARE).toFixed(1) * 2) / 2;
        y_normal = y_normal > 2? 2: y_normal;
        y_normal = y_normal < -2? -2: y_normal;
        return y_normal;
    }

    getCursorPositionX(canvas, event) {
        let totalOffsetX = 0;
        let currentElement = canvas;
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        }
        while(currentElement === currentElement.offsetParent);
        return  event.pageX - totalOffsetX;
    }

    getCursorPositionY(canvas, event) {
        let totalOffsetY = 0;
        let currentElement = canvas;
        do {
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        }
        while(currentElement === currentElement.offsetParent);
        return  event.pageY - totalOffsetY;
    }

    drawPoints(context) {
        let points = this.props.page.table;
        if (points === null) {
            points = [];
        }
        points.map(p => {
            return this.drawEntry(p, context);
        });
    }

    drawEntry(entry, context) {
        const MAX = this.refs.canvas.width;
        const SPACE = MAX / 18;
        const CENTER = MAX / 2;
        const SQUARE = (MAX - 2 * SPACE) / 6;
        let previousPoint = {
            x: 255,
            y: 255,
            radius: 2,
            color: 'black',
            result: false,
            draw: function () {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fillStyle = this.color;
                context.fill();
            }
        };
        if (entry.inArea === true) {
            previousPoint.color = 'rgb(31,158,37)';
        } else if (entry.inArea === false) {
            previousPoint.color = 'rgb(255,32,56)';
        } else {
            previousPoint.color = 'rgb(0,0,0)';
        }
        previousPoint.x = CENTER + (entry.x * SQUARE);
        previousPoint.y = CENTER - (entry.y * SQUARE);
        previousPoint.draw();
    }
}

const  mapStateToProps = store =>{
    return {
        page: store.page,
        style: store.style
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        sendPoint: point => dispatch(sendPoint(point)),
        setMessageX: message => dispatch(setMessageX(message))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Canvas)