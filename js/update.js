function render_filter(modeName) {
    var element = {filter: modeName};
    var template = loadTemplate('mode');
    var result = replaceTemplate(template, element);
    var target = document.getElementById("mode-display");

    target.innerHTML = result;
    
    switch(modeName) {
        case "할 일 보여줘":
            render_title("끝낸-일");
            break;
        case "끝낸 일 보여줘":
            render_title("할-일");
            break;
    }
}

function render_title(titleName) {
    var element = {title: titleName}
    var template = loadTemplate('title');
    var result = replaceTemplate(template, element);
    var target = document.getElementById("title-display");

    target.innerHTML = result;
}

async function render_body(callback) {
    let body_id = "board-body";
    let body = await callback(mode);

    if(body.length > 0) {
        put_data_into_table(body, body_id);
    }
    else {
        render_clear('board-body');
    }
        
}

function render_clear(id) {
    var table = document.getElementById(id);
    table.innerHTML = "";
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

function put_data_into_table(data, id) {
    var table = document.getElementById(id);
    let num = 0;
    var buf = "";
    data.forEach(element => {
        element.num = num;
        
        var template = loadTemplate('table');
        var result = replaceTemplate(template, element);
        var row = document.createElement("tr");

        num ++;

        buf += result;
    });

    table.innerHTML = buf;
}
