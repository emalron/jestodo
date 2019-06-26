
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
    
    console.log(result);
    
    return result;
}

function init() {
    var button = document.getElementById("input-button");
    button.addEventListener("click", popup);
}

function popup(e) {
    var text = document.getElementById("input").textContent;
    console.log;
    makeToDo(text);

    render(db);
}

function makeToDo(text) {
    let output = {num: 0, text: "", date: ""};

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0

    let date = mm + "-" + dd;
    output.num = db.length;
    output.date = date;
    output.text = text;

    db.push(output);
}

function render(body) {
    let body_id = "board-body";

    if(body.length > 0)
        put_data_into_table(body, body_id);
}

function put_data_into_table(data, id) {
    var table = document.getElementById(id);

    console.log(table);

    data.forEach(element => {
        var template = loadTemplate('table');
        result = replaceTemplate(template, element);

        var row = document.createElement("tr");
        console.log(row);
        row.innerHTML = result;
        table.appendChild(row);
    });
}