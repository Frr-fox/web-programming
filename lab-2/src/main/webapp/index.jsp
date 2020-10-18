<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8" import="org.classesFor.Point" %>
<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>Лабораторная №2</title>
    <link rel="stylesheet" href="./stylesheet/main.css">
    <link rel="stylesheet" href="./stylesheet/button_style.css">
    <link rel="icon" type="image/png" href="images/log.png" />
</head>
<body>
<header>
    <span>Нечкасова Олеся Алексеевна, группа P3212</span>
    <span>Вариант 3147</span>
</header>

<section class="container">
    <p>Данный скрипт определяет попадание точки в заданную область. Значение X может принимать только целые числа от -5 до 3. Значение Y - дробное число от -5 до 3. Значение R - от 1 до 3 с шагом 0.5</p>
    <section class="grid">
        <div class="col-2">
            <canvas id="area" width="300" height="300"></canvas>
            <label id="coordinates"></label>
            <script type="text/javascript">
                let canvas = document.getElementById("area");
                let context;
                if (canvas.getContext("2d"))
                    context = canvas.getContext("2d");
                drawCoordinateGrid(context);
                let label_coordinate = document.getElementById("coordinates");

                function drawCoordinateGrid(context) {
                    context.clearRect(0, 0, 300, 300);
                    context.fillStyle = 'rgba(255,255,255,0.5)';
                    context.fillRect(0, 0, 300, 300);
                    context.fillStyle = "#000000";
                    context.beginPath();
                    context.moveTo(150, 300);
                    context.lineTo(150, 10);
                    context.stroke();
                    context.moveTo(290, 150);
                    context.lineTo(0, 150);
                    context.closePath();
                    context.stroke();
                    context.moveTo(285, 156);
                    context.lineTo(285, 144);
                    context.lineTo(300, 150);
                    context.fill();
                    context.moveTo(144, 15);
                    context.lineTo(156, 15);
                    context.lineTo(150, 0);
                    context.fill();
                }

                function drawAreas(context) {
                    context.clearRect(0, 0, 300, 300);
                    context.fillStyle = 'rgba(255,255,255,0.5)';
                    context.fillRect(0, 0, 300, 300);
                    drawCoordinateGrid(context);
                    let R = Number(r.value);
                    context.font = "italic "+ 8 +"pt Arial ";
                    let k, add_value;
                    if (!isNaN(R) && R > 0) {
                        if (R < 2) {
                            k = 3;
                            add_value = 30;
                        } else {
                            k = 5;
                            add_value = 15;
                        }
                        for (let i = 150-30*R, j = 0; j < k; i += add_value*R, j++) {
                            context.beginPath();
                            context.moveTo(i, 147);
                            context.lineTo(i, 153);
                            context.stroke();
                            context.moveTo(147, i);
                            context.lineTo(153, i);
                            context.stroke();
                            context.closePath();
                            let zero_point = (i-150)/30;
                            if (zero_point !== 0) {
                                context.fillText(String((i-150)/30), i-4, 165);
                                context.fillText(String((150-i)/30), 162, i+3);
                            }
                        }
                        context.fillStyle = 'rgba(243,174,15,0.50)';
                        context.fillRect(150-R/2*30, 150-R*30, R/2*30, R*30);
                        context.beginPath();
                        context.moveTo(150, 150);
                        context.lineTo(150-R/2*30, 150);
                        context.lineTo(150, 150+R*30);
                        context.closePath();
                        context.arc(150, 150, R*30, 0, -Math.PI/2, true);
                        context.fill();
                    }
                }

                let point = {
                    x: 150,
                    y: 150,
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

                canvas.onmousemove = function (e) {
                    point.x_normal = Math.round((e.offsetX-150)/30);
                    point.y_normal = ((150-e.offsetY)/30).toFixed(2);
                    if (point.x_normal > 3) point.x_normal = 3;
                    point.x = point.x_normal*30+150;
                    if (point.y_normal > 3) {
                        point.y_normal = 3;
                        point.y = 150-3*30;
                    } else point.y = e.offsetY;
                    label_coordinate.textContent = "(" + point.x_normal + "; " + point.y_normal + ")";
                    drawAreas(context);
                    point.draw();
                };
            </script>
        </div>
        <form name="formForValidate" method="GET" oninput="checkOnChange()" class="col-2-2 grid-2">
            <label id="label_R_value">Значение R: не выбрано</label>
            <div onclick="drawAreas(context)">
                <button type="button" id="r_value_1" onclick="setRValue(1)" class="button_style">1</button>
                <button type="button" id="r_value_2" onclick="setRValue(1.5)" class="button_style">1.5</button>
                <button type="button" id="r_value_3" onclick="setRValue(2)" class="button_style">2</button>
                <button type="button" id="r_value_4" onclick="setRValue(2.5)" class="button_style">2.5</button>
                <button type="button" id="r_value_5" onclick="setRValue(3)" class="button_style">3</button>
                <input type="hidden" name="R" value="не выбрано">
            </div>
            <section>
                <div class="col-2-2">
                    <label>Значение X</label>
                    <section class="check-material bottom">
                        <div class="col-2-3">
                            <input type="checkbox" id="choice1" name="X" value="-5">
                            <label for="choice1">-5</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice2" name="X" value="-4">
                            <label for="choice2">-4</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice3" name="X" value="-3">
                            <label for="choice3">-3</label>
                        </div>
                    </section>
                    <section class="check-material">
                        <div class="col-2-3">
                            <input type="checkbox" id="choice4" name="X" value="-2">
                            <label for="choice4">-2</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice5" name="X" value="-1">
                            <label for="choice5">-1</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice6" name="X" value="0" checked="">
                            <label for="choice6">0</label>
                        </div>
                    </section>
                    <section class="check-material">
                        <div class="col-2-3">
                            <input type="checkbox" id="choice7" name="X" value="1">
                            <label for="choice7">1</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice8" name="X" value="2">
                            <label for="choice8">2</label>
                        </div>
                        <div class="col-2-3">
                            <input type="checkbox" id="choice9" name="X" value="3">
                            <label for="choice9">3</label>
                        </div>
                    </section>
                </div>
                <div class="col-2-2">
                    <label for="y_value">Значение Y</label>
                    <input type="text" name="Y" id="y_value" class="bottom">
                </div>
            </section>
            <button name="submitBtn" type="submit" class="col-2-2 button_style">Отправить</button>
            <button name="clearBtn" type="reset" class="col-2-2 button_style">Очистить</button>
            <div id="result" class="bottom"></div>
        </form>
    </section>
</section>
<% ArrayList<Point> pointList = (ArrayList<Point>) config.getServletContext().getAttribute("pointList");
if (pointList == null) pointList = new ArrayList<>();
%>
<table class="table table-hover" width="100%" align="center">
    <thead>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Попадание</th>
        <th>Время</th>
        <th>Время выполнения, мс</th>
    </tr>
    </thead>
    <% for (Point point : pointList) {%>
    <tbody>
            <td><%=point.getX()%></td>
            <td><%=point.getY()%></td>
            <td><%=point.getR()%></td>
            <% if (point.isResult()) { %>
                <td>Да</td>
            <% } else { %>
                <td>Нет</td>
            <% } %>
            <td><%=point.getTime()%></td>
            <td><%=point.getDuration()%></td>
    </tbody>
    <% }
    if (pointList.isEmpty()) { %>
        <tbody>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tbody>
    <% }%>
</table>

<footer>
    <section>
        <a href="https://github.com/Frr-fox/web-programming/tree/master" target="_blank">Ссылка на github</a>
        <a href="https://se.ifmo.ru/courses/web" target="_blank">Текст задания</a>
    </section>
    <h5>Октябрь, 2020</h5>
    <div class="log">
        <img src="images/log.png">
    </div>
</footer>

<script>
    canvas.onclick = function (e) {
        if (validateButtons()) {
            document.forms.formForValidate.Y.value = point.y_normal;
            setCheckboxValue(document.forms.formForValidate.X, String(point.x_normal));
            if (checkOnChange()) document.forms.formForValidate.submit();
        } else {
            document.getElementById("result").textContent = "Сначала выберете значение R. ";
        }
    }
</script>
<script type="text/javascript" src="./scripts/validateForm.js"></script>
</body>
</html>