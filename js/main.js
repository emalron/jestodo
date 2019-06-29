
var db = [];

window.onload = function() {
    init();
    render(db);
}

function loadTemplate(id) {
    return document.getElementById(id).innerHTML;
}

function replaceTemplate(template, data) {
    var result = template;
    
    for(var key in data) {
        result = result.replace('{' + key + '}', data[key]);
    }
    
    return result;
}

function init() {
    var button = document.getElementById("input-button");
    button.addEventListener("click", popup);
    localStorage.clear();
}

function popup(e) {
    var text = document.getElementById("input").textContent;
    makeToDo(text);

    render(db);
}

function makeToDo(text) {
    let output = {check: false, text: "", date: ""};

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0

    let date = mm + "-" + dd;
    output.check = false;;
    output.date = date;
    output.text = text;

    // db.push(output);
    saveItem(output);
}

function render() {
    let body_id = "board-body";

    resetDOM("board-body");

    let body = [];
    for(let i=0; i< localStorage.length; i++) {
        let item = JSON.parse(localStorage.getItem(i));

        if(item.check == false) {
            body.push(item);
        }
    }

    if(body.length > 0)
        put_data_into_table(body, body_id);
}

function resetDOM(id) {
    var table = document.getElementById(id);

    while(table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

function put_data_into_table(data, id) {
    var table = document.getElementById(id);

    data.forEach(element => {
        var template = loadTemplate('table');

        result = replaceTemplate(template, element);

        var row = document.createElement("tr");
        row.innerHTML = result;
        table.appendChild(row);
    });
}

function saveItem(item) {
    // item properties: checked, text, date
    // in future item properies are going to be restricted.

    var num = localStorage.length;
    item.num = num;
    var value = JSON.stringify(item);

    localStorage.setItem(num, value);
}

function itemChecked(e) {
    var node = e;
    var id = node.value;
    var item = JSON.parse(localStorage.getItem(id));

    item.check = e.check;

    var output = JSON.stringify(item);
    localStorage.setItem(id, output);
}