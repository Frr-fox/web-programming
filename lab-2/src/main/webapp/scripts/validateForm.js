let form = document.forms.formForValidate;
let submitBtn = form.elements.submitBtn;
let clearBtn = form.elements.clearBtn;
let label_R_value = document.getElementById("label_R_value");
let r = form.R;
let y = form.Y;
let x = form.X;
let result = document.getElementById("result");
let response = "";


function checkOnChange() {
    response = "";
    label_R_value.textContent = `Значение R: ${r.value}`;
    let a = validateCheckbox(x);
    let b = validateInputElement(y, -5, 3);
    let c = validateButtons();
    console.log(response);
    if (response === "") response = `Данные введены правильно`;
    result.textContent = response;
    return (a && b && c);
}

submitBtn.onclick = function() {
    response = "";
    event.preventDefault();
    let a = validateCheckbox(x);
    let b = validateInputElement(y, -5, 3);
    let c = validateButtons();
    if (!(a && b && c)) {
        result.textContent = response;
    } else form.submit();
};


clearBtn.onclick = function() {
    console.log("Очистить");
    r.value = "не выбрано";
    label_R_value.textContent = `Значение R: ${r.value}`;
    result.textContent = "";
    let canvas = document.getElementById("area");
    let context;
    if (canvas.getContext("2d"))
        context = canvas.getContext("2d");
    drawCoordinateGrid(context);
};

function validateInputElement(e, bottom, top) {
    let element = e.value.replace(",", ".");
    if (!element) {
        response += `Введите данные в поле ${e.name}. ` + "\n";
        return false;
    }
    if (isNaN(+element)) {
        response += `Неверный формат данных. Введите в поле ${e.name} дробное число. ` + "\n";
        return false;
    }
    let sizeElement = defineNumberOfDigits(element);
    if (sizeElement > 15) {
        response += `Неверный формат данных. Количество знаков в дробной части ${e.name} не должно превышать 15. ` + "\n";
        return false;
    }
    if (!(!isNaN(+element) && +element >=bottom && +element <= top)) {
        response += `Диапазон ${e.name} должен быть [${bottom}; ${top}]. ` + "\n";
        return false;
    } else {
        return true;
    }
}

function validateCheckbox(x) {
    let k = 0;
    for (let i=0; i<x.length; i++) {
        if (x[i].checked) k++;
    }
    if (k !== 1) {
        response += `Должно быть выбрано одно значение ${x[0].name}. `;
        return false;
    } else return true;
}

function setCheckboxValue(x, number) {
    for (let i=0; i<x.length; i++) {
        x[i].checked = (x[i].value === number);
    }
}

function validateButtons() {
    if (!isNaN(Number(r.value))) return true;
    else {
        response += "Выберете значение R. ";
        return false;
    }
}

function setRValue(number) {
    r.value = number;
    checkOnChange();
}

function defineNumberOfDigits(x) {
    return (x.toString().includes('.') ? (x.toString().split('.').pop().length) : (0))
}