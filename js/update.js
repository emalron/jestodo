async function render(callback) {
    let body_id = "board-body";

    resetDOM("board-body");

    let body = await callback();
    
    if(body.length > 0)
        put_data_into_table(body, body_id);
}

function render_filter(modeName) {
    var element = {filter: modeName};
    var template = loadTemplate('mode');
    var result = replaceTemplate(template, element);
    var target = document.getElementById("mode-display");

    target.innerHTML = result;
}

function loadTemplate(id) {
    return document.getElementById(id).innerHTML;
}

function replaceTemplate(template, data) {
    var result = template;
    
    for(var key in data) {
        var regex = new RegExp("{" + key + "}", "g");
        result = result.replace(regex, data[key]);
    }
    
    return result;
}

function resetDOM(id) {
    var table = document.getElementById(id);

    while(table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
}

function put_data_into_table(data, id) {
    var table = document.getElementById(id);

    let num = 0;
    
    data.forEach(element => {
        element.num = num;
        
        var template = loadTemplate('table');
        var result = replaceTemplate(template, element);
        var row = document.createElement("tr");

        row.innerHTML = result;
        table.appendChild(row);
        num ++;
    });
}
