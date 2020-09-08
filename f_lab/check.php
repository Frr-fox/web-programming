<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
$start = microtime(true);

if ($_GET["X"] != "" && in_array($_GET["X"], range(-3, 5))) $x = $_GET["X"];
if ($_GET["Y"] != "" && $_GET["Y"]>=-3 && $_GET["Y"]<=5) $y = (float) str_replace(",", ".", $_GET['Y']);
if (($_GET["R"] != "" && $_GET["R"]>=1 && $_GET["R"]<=4) || isset($_GET["showBtn"])) $r = (float) str_replace(",", ".", $_GET['R']); 
if (isset($_GET["clearBtn"])) {
	$_SESSION = array();
		if (session_id() != "" || isset($_COOKIE[session_name()])) {
    		setcookie(session_name(), '', time()-2592000, '/');
		}
		session_destroy();
	}

function check($x, $y, $r) {
	if (($x*$x + $y*$y <= ($r*$r/2) && $x<=0 && $y>=0) || ($x<=0 && $y<=0 && $x>= -$r && $y>= -$r/2) || ($y>=2*$x-$r && $x>=0 && $y<=0)) {
		return "Да";
	}
	else {
		return "Нет";
	}
}

$short_answer = check($x, $y, $r);
if ($short_answer == "Да") {
	$answer = "Точка находится внутри области";
} else {
	$answer = "Точка находится за границей области";
}

if ($_GET["R"] == "") $answer = "Вывод результата";

$time = round((microtime(true) - $start)*1000000, 2);


$result = array($x, $y, $r, $short_answer, $currentTime, $time);

    if (!isset($_SESSION['history'])) {
        $_SESSION['history'] = array();
    }

    array_push($_SESSION['history'], $result);

?>
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>Лабораторная №1</title>
			<link rel="stylesheet" href="stylesheet/main.css">
			<link rel="stylesheet" href="stylesheet/button_style.css">
			<link rel="icon" type="image/png" href="images/log.png" />
		</head>

	<body>
		<header>
			<span>Нечкасова Олеся Алексеевна, группа P3212</span>
			<span>Вариант 2319</span>
		</header>

	<style type="text/css">
				/* Styles for main list
		*/
		html, body, div, span, applet, object, iframe,
		h1, h2, h3, h4, h5, h6, p, blockquote, pre,
		a, abbr, acronym, address, big, cite, code,
		del, dfn, em, img, ins, kbd, q, s, samp,
		small, strike, strong, sub, sup, tt, var,
		b, u, i,
		dl, dt, dd, ol, ul, li,
		fieldset, form, label, legend,
		table, caption, tbody, tfoot, thead, tr, th, td,
		article, aside, canvas, details, embed,
		figure, figcaption, footer, header, hgroup,
		menu, nav, output, section, summary,
		time, mark, audio, video {
		  	margin: 0;
		  	padding: 0;
		  	border: 0;
		  	font-size: 100%;
		  	font: inherit;
		  	vertical-align: baseline;
		}

		article, aside, details, figcaption, figure,
		footer, header, hgroup, menu, nav, section, div {
			display: block;

		}

		body {
		  	line-height: 1;
		  	color: #656665;
		  	font-family: "Lucida Grande";
		}

		/*
		========================
		Раделение на секции
		========================
		*/

		.container,
		.grid {
		  	margin: 2% 1%;
		  	width: 85%;
		}
		.container {
			padding-left: 3%;
		  	padding-right: 3%;
		}
		.grid, .col-2, .grid-2, .col-2-2 {
			width: 95%;
		}

		.col-2, .col-2-2 {
			display: inline-block;
		  	vertical-align: top;
			width: 45%;
		}

		.grid-2 {
			margin: 2% 2%;
		  	width: 50%;
		}

		.col-2-2 {
			margin: 2% 1.5% 1% 1%;
		}

		form {
			width: 60%;
			margin-left: 0;
			margin-right: 0;
		}

		/*
		=======================
		Радио-кнопки
		=======================
		*/

		.caption {
			margin-left: 3.2%;
			margin-right: 3.2%;
		}

		._caption {
			margin-left: 2%;
			margin-right: 2%;
		}

		.bottom {
			margin-top: 6%;
			margin-bottom: 4%;
		}

		.text_y {
			margin-top: 10%;
			margin-bottom: 10%;
		}

		/*
		========================
		Таблица с результатами
		========================
		*/
		table {
		font-family: "Lucida Grande", Sans-Serif;
		text-align: center;
		border-collapse: separate;
		border-spacing: 5px;
		background-color: rgba(243, 174, 15, 0.3);
		border: 5px solid #F3AE0F;
		border-radius: 20px;
		}
		th {
		padding: 10px;
		}
		td {
		background-color: rgba(243, 174, 15, 0.5);
		padding: 10px;
		border-radius: 10px;
		}

		/*
		======================
		Заголовок и конец
		======================
		*/

		header, footer {
			background-color: #072E36;
			font-family: fantasy;
			color: #648880;
			font-size: 18px;
			font-weight: inherit;
			align-self: end;
			width: 100%;
			height: 100%;
			text-align: center;
			padding-bottom: 10px;
		    padding-top: 10px;
		}

		/*
		======================
		Шапка-заголовок
		======================

		*/

		/*p {
		  background: #648880;
		  background: linear-gradient(to right, #f6f1d3, #648880 85%, #293f50);
		}*/

		header {
			height: 20px;
		}

		span {
			float: left;
			margin-left: 10%;
			margin-right: 20%;
		}


		/*
		=======================
		Гиперссылки
		=======================
		*/

		a {
			color: #dfe2e5;
			float: left;
		  	margin: 2% 15%;
		  	width: 20%;
		}

		a:hover {
			color: coral;
		}

		/*
		======================
		Окончание
		======================
		*/

		h5 {
			border-bottom: 1px solid lightslategrey;
			padding-bottom: 5px;
		}


		.log img {
			width: 3.5%;
			margin: 1.5% 0%;
			padding: 0% 0%;
		}

	</style>

	<style type="text/css">
				/*С какого-то сайта*/
		.button_style {
		  display: inline-block;
		  color: white;
		  text-decoration: none;
		  padding: 0.5em 2em;
		  outline: none;
		  border-width: 2px 0;
		  border-style: solid none;
		  border-color: #FDBE33 #000 #D77206;
		  border-radius: 6px;
		  background: linear-gradient(#F3AE0F, #E38916) #E38916;
		  transition: 0.2s;
		} 
		.button_style:hover { background: linear-gradient(#f5ae00, #f59500) #f5ae00; }
		.button_style:active { background: linear-gradient(#f59500, #f5ae00) #f59500; }
	</style>

	<section class="container">
		<p>Данный скрипт определяет попадание точки в заданную область. Значение X может принимать только целые числа от -3 до 5. Значение Y - дробное число от -3 до 5. Значение R - дробное число от 1 до 4</p>
		<section class="grid">
			<div class="col-2">
				<!--<img src="images/task.png">-->
				<svg width="300" height="300">

					<polygon points="50,200 50,150 150,150, 150,200"
	                         fill="#F3AE0F" fill-opacity="0.5" stroke="#363636"></polygon>

	                <path d="M 100 150 A 50 50, 90, 0, 1, 150 100 L 150 150 Z"
	                      fill="#F3AE0F" fill-opacity="0.5" stroke="#363636"></path>

	                <polygon points="200,150 150,150 150,250"
	                         fill="#F3AE0F" fill-opacity="0.5" stroke="#363636"></polygon>

	                <line x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
	                <line x1="150" x2="150" y1="0" y2="300" stroke="black"></line>
	                <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
	                <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

	                <line x1="200" x2="200" y1="155" y2="145" stroke="black"></line>
	                <line x1="250" x2="250" y1="155" y2="145" stroke="black"></line>

	                <line x1="50"  x2="50"  y1="155" y2="145" stroke="black"></line>
	                <line x1="100" x2="100" y1="155" y2="145" stroke="black"></line>

	                <line x1="145" x2="155" y1="100" y2="100" stroke="black"></line>
	                <line x1="145" x2="155" y1="50"  y2="50"  stroke="black"></line>

	                <line x1="145" x2="155" y1="200" y2="200" stroke="black"></line>
	                <line x1="145" x2="155" y1="250" y2="250" stroke="black"></line>

	                <circle r="0" cx="150" cy="150" id="target-dot"></circle>

	                <text x="195" y="140">R/2</text>
	                <text x="248" y="140">R</text>

	                <text x="40" y="140">-R</text>
	                <text x="90" y="140">-R/2</text>

	                <text x="160" y="105">R/2</text>
	                <text x="160" y="55">R</text>

	                <text x="160" y="205">-R/2</text>
	                <text x="160" y="255">-R</text>

	            </svg>
			</div>

			<form name="formForValidate" method="GET" oninput="checklOnChange()" class="col-2-2 grid-2">
				
					<label for="r_value">Значение R</label>
					<input type="text" name="R" id="r_value">
					<section>
						<div class="col-2-2 bottom">
							<label>Значение X</label>
							<section class="bottom">
								<div>
									<input type="radio" id="choice1" name="X" value="-3">
									<input type="radio" id="choice2" name="X" value="-2">
									<input type="radio" id="choice3" name="X" value="-1">
								</div>
								<div>
									<label for="choice1" class="_caption">-3</label>	
									<label for="choice2" class="_caption">-2</label>
									<label for="choice3" class="_caption">-1</label>
								</div>
							</section>
							<section class="bottom">
								<div>
									<input type="radio" id="choice4" name="X" value="0" checked="">
									<input type="radio" id="choice5" name="X" value="1">
									<input type="radio" id="choice6" name="X" value="2">
								</div>
								<div>
									<label for="choice4" class="caption">0</label>	
									<label for="choice5" class="caption">1</label>
									<label for="choice6" class="caption">2</label>
								</div>
							</section>
							<section class="bottom">
								<div>
									<input type="radio" id="choice7" name="X" value="3">
									<input type="radio" id="choice8" name="X" value="4">
									<input type="radio" id="choice9" name="X" value="5">
								</div>
								<div>
									<label for="choice1" class="caption">3</label>	
									<label for="choice2" class="caption">4</label>
									<label for="choice3"class="caption">5</label>
								</div>
							</section>
						</div>
						<div class="col-2-2 text_y">
							<label for="y_value">Значение Y</label>
							<input type="text" name="Y" id="y_value">	
						</div>
					</section>
					<button name="submitBtn" type="submit" class="col-2-2 button_style">Отправить</button>
					<button name="clearBtn" type="clear" class="col-2-2 button_style">Очистить</button>	
					<div id="result" class="bottom"><? echo $answer; ?></div>
			</form>
				<!-- Таблица-->
				<table class="table table-hover" width="100%" align="center">
	    <thead>
	        <tr>
	            <th>X</th>
	            <th>Y</th>
	            <th>R</th>
	            <th>Попадание</th>
	            <th>Время</th>
	            <th>Время выполнения, мкс</th>
	        </tr>
	    </thead>
	    <tbody>
	    	<?php 
	    	foreach ($_SESSION['history'] as $value) { 
	    		if ($value[0] != "" && $value[1] != "" && $value[2] != "") {?>
	       		<tr>
		            <td><?php echo $value[0] ?></td>
		            <td><?php echo $value[1] ?></td>
		            <td><?php echo $value[2] ?></td>
		            <td><?php echo $value[3] ?></td>
		            <td><?php echo $value[4] ?></td>
		            <td><?php echo $value[5] ?></td>
		        </tr>
		       <?php }
		   }?>
	    </tbody>
	</table>
		</section>
	</section>

	<footer>
		<section>
			<a href="https://github.com/Frr-fox/web-programming/tree/master/f_lab" target="_blank">Ссылка на github</a>
			<a href="task.html" target="_blank">Текст задания</a>
		</section>
		<h5>Сентябрь, 2020</h5>
		<div class="log">
			<img src="images/log.png">
		</div>
	</footer>

	<script type="text/javascript" src="scripts/validateForm.js"></script>

	</body>
	</html>