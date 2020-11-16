const MAX = 450;
const SPACE = 25;
const CENTER = MAX/2;
const SQUARE = (MAX-2*SPACE)/10;

let canvas = document.getElementById("area");
let context;
if (canvas.getContext("2d"))
    context = canvas.getContext("2d");
drawAreas(context);
let label_coordinate = document.getElementById("coordinates");
label_coordinate.textContent = "(" + 0.0 + "; " + 0.0 + ")";
let yValue = document.getElementById("form:Y");
yValue.value = "";

function drawCoordinateGrid(context) {
    context.clearRect(0, 0, MAX, MAX);
    context.fillStyle = 'rgba(255,255,255,0.5)';
    context.fillRect(0, 0, 450, 450);
    context.fillStyle = "#000000";
    context.beginPath();
    context.moveTo(CENTER, MAX);
    context.lineTo(CENTER, 10);
    context.stroke();
    context.moveTo(MAX-10, CENTER);
    context.lineTo(0, CENTER);
    context.closePath();
    context.stroke();
    context.moveTo(MAX-15, CENTER + 6);
    context.lineTo(MAX-15, CENTER - 6);
    context.lineTo(MAX, CENTER);
    context.fill();
    context.moveTo(CENTER - 6, 15);
    context.lineTo(CENTER + 6, 15);
    context.lineTo(CENTER, 0);
    context.fill();
}

function drawAreas(context) {
    let r = document.getElementById("form:R");
    context.clearRect(0, 0, MAX, MAX);
    context.fillStyle = 'rgba(255,255,255,0.5)';
    context.fillRect(0, 0, MAX, MAX);
    drawCoordinateGrid(context);
    let R = Number(r.value);
    context.font = "italic "+ 8 +"pt Arial ";
    let k, add_value;
    if (!isNaN(R) && R > 0) {
        if (R < 2.5) {
            k = 3;
            add_value = SQUARE;
        } else {
            k = 5;
            add_value = SQUARE/2;
        }
        for (let i = CENTER-SQUARE*R, j = 0; j < k; i += add_value*R, j++) {
            context.beginPath();
            context.moveTo(i, CENTER-2);
            context.lineTo(i, CENTER+3);
            context.stroke();
            context.moveTo(CENTER-3, i);
            context.lineTo(CENTER+3, i);
            context.stroke();
            context.closePath();
            let zero_point = (i-CENTER)/SQUARE;
            if (zero_point !== 0) {
                context.fillText(String((i-CENTER)/SQUARE), i-4, CENTER+15);
                context.fillText(String((CENTER-i)/SQUARE), CENTER+12, i+3);
            }
        }
        context.fillStyle = 'rgba(243,174,15,0.50)';
        context.fillRect(CENTER, CENTER-R/2*SQUARE, R*SQUARE, R/2*SQUARE);
        context.beginPath();
        context.moveTo(CENTER, CENTER);
        context.lineTo(CENTER-R/2*SQUARE, CENTER);
        context.lineTo(CENTER, CENTER+R*SQUARE);
        context.closePath();
        context.arc(CENTER, CENTER, R/2*SQUARE, -Math.PI/2, -Math.PI, true);
        context.fill();
    }
    drawPoints();
}

let point = {
    x: 255,
    y: 255,
    x_normal: 0,
    y_normal: 0,
    radius: 2,
    color: 'black',
    draw: function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }
};

canvas.onclick = function (e) {
    let x_value = document.getElementById("hidden-form:X-hidden");
    let y_value = document.getElementById("hidden-form:Y-hidden");
    let r_value = document.getElementById("hidden-form:R-hidden");
    let r_normal_value = document.getElementById("form:R");
    x_value.value = point.x_normal;
    y_value.value = point.y_normal;
    r_value.value = r_normal_value.value;
    window.submitCanvasClick();
};

canvas.onmousemove = function (e) {
    point.x_normal = +((e.offsetX-CENTER)/SQUARE).toFixed(1);
    point.y_normal = ((CENTER-e.offsetY)/SQUARE).toFixed(2);
    if (point.x_normal > 5) {
        point.x_normal = 5;
        point.x = CENTER+5*SQUARE;
    } else if (point.x_normal < -5) {
        point.x_normal = -5;
        point.x = CENTER-5*SQUARE;
    } else point.x = point.x_normal*SQUARE+CENTER;
    if (point.y_normal > 3) {
        point.y_normal = 3;
        point.y = CENTER-3*SQUARE;
    } else if (point.y_normal < -3) {
        point.y_normal = -3;
        point.y = CENTER+3*SQUARE;
    } else point.y = e.offsetY;
    label_coordinate.textContent = "(" + point.x_normal + "; " + point.y_normal + ")";
    drawAreas(context);
    point.draw();
};

function changeR() {
    drawAreas(context);
}

function drawPoints() {
    let points = getPoints();
    if (points === null) {
        points = [];
    }
    for (let i = 0; i < points.length; i++) {
        drawEntry(points[i]);
    }
}

function drawEntry(entry) {
    let previousPoint = {
        x: 255,
        y: 255,
        radius: 2,
        color: 'black',
        result: false,
        draw: function() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        }
    };

    if (entry.result === "true") {
        previousPoint.color = 'rgb(31,158,37)';
    } else if (entry.result === "false") {
        previousPoint.color = 'rgb(255,32,56)';
    } else {
        previousPoint.color = 'rgb(0,0,0)';
    }
    previousPoint.x = CENTER + (entry.x * SQUARE);
    previousPoint.y = CENTER - (entry.y * SQUARE);
    previousPoint.draw();
}

function getPoints() {
    let res = [];
    let entriesNodes = document.getElementById("pointsTable_data").childNodes;
    for (let i = 0; i < entriesNodes.length; i++) {
        let values = entriesNodes[i].childNodes;
        if (values.length === 1) {
            continue;
        }
        res.push({
            x: values[0].innerText,
            y: values[1].innerText,
            result: values[3].innerText
        });
    }
    return res;
}