var form = document.forms.formForValidate;
var submitBtn = form.elements.submitBtn;
var clearBtn = form.elements.clearBtn;
var r = form.R;
var y = form.Y;
var x = form.X;
var result = document.getElementById("result");
var response = "";


function checklOnChange() {
	response = "";
	var a = validateElement(r, 1, 4);
	var b = validateElement(y, -3, 5);
	console.log(response === "");
	if (response === "") response = `Данные введены правильно`;
	console.log("Ответ: ", response);
	console.log(a && b);
	result.textContent = response;
	return (a && b);
}

submitBtn.onclick = function() {
	response = "";
	event.preventDefault();
	var a = validateElement(r, 1, 4);
	var b = validateElement(y, -3, 5);
	if (!(a && b)) {
		console.log(response);
		result.textContent = response;
	} else {
		console.log("Все значения входят в диапазон");
		form.action = `check.php`;
		form.methos = "GET"
		form.submit();
	}
}


clearBtn.onclick = function() {
	console.log("Очистить");
	r.value = "";
	y.textContent = "";
	x.value = "0";
	result.textContent = "Вывод результата";
	form.methos = "GET";
	form.submit();
}

function show() {
	form.action = `check.php`;
	form.methos = "GET";
	form.submit();
}

function validateElement(e, bottom, top) {
	element = e.value.replace(",",".");
	if (!element) {
		response += `Введите данные в поле ${e.name}. ` + "\n"
		return false;
	}
	if (isNaN(+element)) {
		response += `Неверный формат данных. Введите в поле ${e.name} дробное число. ` + "\n"
		return false;
	}
	var sizeElement = f(element);
	if (sizeElement > 15) {
		response += `Неверный формат данных. Количество знаков в дробной части ${e.name} не должно превышать 15. ` + "\n"
		return false;
	}
	if (!(+element != NaN && +element >=bottom && +element <= top)) {
		response += `Диапазон ${e.name} должен быть [${bottom}; ${top}]. ` + "\n"
		return false;
	} else {
		return true;
	}
}

function f(x) {
	return (x.toString().includes('.') ? (x.toString().split('.').pop().length) : (0))
}