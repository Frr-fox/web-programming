<%@ page contentType="text/html;charset=UTF-8" import="org.classesFor.Point" language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList" %>
<section class="container">
    <section class="col-2">
        <svg class="grid" width="300" height="300">
            <%
                double r;
                int x;
                double y;
                String answer = "Данные оказались невалидными";
                Point currentPoint = (Point) request.getAttribute("currentPoint");
                if (currentPoint != null) {
                    r = Double.parseDouble(request.getParameter("R"));
                    x = Integer.parseInt(request.getParameter("X"));
                    y = Double.parseDouble(request.getParameter("Y"));
                    if (currentPoint.isResult()) answer = "Точка находится в данной области";
                    else answer = "Точка находится вне данной области";
                } else {
                    r = 0;
                    x = 0;
                    y = 0;
                }
            %>
            <style>
                text {font: italic 10px Arial;}
            </style>
            <polygon points="<%=150-r/2*30%>,150 <%=150-r/2*30%>,<%=150-r*30%> 150,<%=150-r*30%>, 150,150"
                     fill="#F3AE0F" fill-opacity="0.5"></polygon>

            <path d="M 150 <%=150-r*30%> A <%=r*30%> <%=r*30%>, 90, 0, 1, <%=r*30+150%> 150 L 150 150 Z"
                  fill="#F3AE0F" fill-opacity="0.5"></path>

            <polygon points="<%=150-r/2*30%>,150 150,150 150,<%=150+r*30%>"
                     fill="#F3AE0F" fill-opacity="0.5"></polygon>

            <line x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
            <line x1="150" x2="150" y1="0" y2="300" stroke="black"></line>
            <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
            <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

            <line x1="<%=150-30*r%>" x2="<%=150-30*r%>" y1="153" y2="147" stroke="black"></line>
            <line x1="<%=150+30*r%>" x2="<%=150+30*r%>" y1="153" y2="147" stroke="black"></line>
            <line x1="147" x2="153" y1="<%=150-30*r%>" y2="<%=150-30*r%>" stroke="black"></line>
            <line x1="147" x2="153" y1="<%=150+30*r%>"  y2="<%=150+30*r%>"  stroke="black"></line>

            <circle r="2" cx="<%=x*30+150%>" cy="<%=150-30*y%>" id="target-dot"></circle>

            <text x="<%=146+30*r%>" y="165"><%=r%></text>
            <text x="<%=146-30*r%>" y="165"><%=-r%></text>
            <text x="162" y="<%=153-30*r%>"><%=r%></text>
            <text x="162" y="<%=153+30*r%>"><%=-r%></text>

            <% if (r>2) { %>
            <line x1="<%=150-15*r%>" x2="<%=150-15*r%>" y1="153" y2="147" stroke="black"></line>
            <line x1="<%=150+15*r%>" x2="<%=150+15*r%>" y1="153" y2="147" stroke="black"></line>
            <line x1="147" x2="153" y1="<%=150-15*r%>" y2="<%=150-15*r%>" stroke="black"></line>
            <line x1="147" x2="153" y1="<%=150+15*r%>"  y2="<%=150+15*r%>"  stroke="black"></line>

            <text x="<%=146+15*r%>" y="165"><%=r/2%></text>
            <text x="<%=146-15*r%>" y="165"><%=-r/2%></text>
            <text x="162" y="<%=153-15*r%>"><%=r/2%></text>
            <text x="162" y="<%=153+15*r%>"><%=-r/2%></text>
            <% } %>
        </svg>
    </section>
    <section class="col-2">
        <h3 class="bottomX2"><%=answer%></h3>
        <a href="${pageContext.request.contextPath}/control" id="new_request">Нажмите сюда, чтобы сделать новый запрос</a>
    </section>
</section>
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
    <% if (currentPoint != null) {%>
    <tbody>
        <td><%=currentPoint.getX()%></td>
        <td><%=currentPoint.getY()%></td>
        <td><%=currentPoint.getR()%></td>
        <% if (currentPoint.isResult()) { %>
        <td>Да</td>
        <% } else { %>
        <td>Нет</td>
        <% } %>
        <td><%=currentPoint.getTime()%></td>
        <td><%=currentPoint.getDuration()%></td>
    </tbody>
    <% } else { %>
    <tbody>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tbody>
    <% } %>
</table>
