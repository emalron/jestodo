
var filter = {};
var database;

window.onload = function() {
    init();
    filter = filter_unchecked;
    render_filter('unchecked');
    render(filter);
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

    // database setting
    var db = {data: []};
    localStorage.setItem('todo', JSON.stringify(db));
}

function popup(e) {
    var text = document.getElementById("input").textContent;

    makeToDo(text);
    render(filter);
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

    saveItem(output);
}

function render(callback) {
    let body_id = "board-body";

    resetDOM("board-body");

    let body = callback();
    if(body.length > 0)
        put_data_into_table(body, body_id);
}

function filter_unchecked() {
    let body = [];
    var db = JSON.parse(localStorage.getItem('todo'));

    for(let i=0; i< db.data.length; i++) {
        let item = db.data[i];

        if(item != null && item.check == '') {
            body.push(item);
        }
    }

    return body;
}

function filter_checked() {
    let body = [];
    var db = JSON.parse(localStorage.getItem('todo'));

    for(let i=0; i< db.data.length; i++) {
        let item = db.data[i];

        if(item != null && item.check == 'checked') {
            body.push(item);
        }
    }
    return body;
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
        var result = replaceTemplate(template, element);
        var row = document.createElement("tr");

        row.innerHTML = result;
        table.appendChild(row);
    });
}

function render_filter(modeName) {
    var element = {filter: modeName};
    var template = loadTemplate('mode');
    var result = replaceTemplate(template, element);
    var target = document.getElementById("mode-display");

    target.innerHTML = result;
}

function saveItem(item) {
    // item properties: checked, text, date
    // in future item properies are going to be restricted.
    var key = 'todo';

    var db = JSON.parse(localStorage.getItem(key));
    if(db == null) {
        db = {data: []};
    }

    var num = db.data.length;
    item.num = num;
    db.data.push(item);

    var value = JSON.stringify(db);
    localStorage.setItem(key, value);
}

function itemChecked(e) {
    var node = e;
    var id = node.value;

    var db = JSON.parse(localStorage.getItem('todo'));

    for(let i=0; i<db.data.length; i++) {
        var item = db.data[i];

        if(item.num == id) {
            if(e.checked) {
                item.check = 'checked';
            }
            else {
                item.check = '';
            }
        }
    }

    var output = JSON.stringify(db);
    localStorage.setItem('todo', output);

    render(filter);
}

function filterChange() {
    if(filter == filter_unchecked) {
        // to be deternmined
        filter = filter_checked;
        render_filter('checked');
        render(filter);
    }

    else if (filter == filter_checked) {
        // to be determined
        filter = filter_unchecked;
        render_filter('unchecked');
        render(filter);
    }
}