
window.onload = function() {
    init();
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
    var head = [{name: "이름", title: "제목", date: "시간"}];
    var head_id = "board-head";

    var body = [];
    body.push({name: "곰팡이", title: "What if I got CS degree?", date: "오늘"});
    body.push({name: "Jes", title: "오늘 에기평 간사한테 드립칠뻔한 썰", date:"오늘"});
    body.push({name: "Emily", title: "브붕콘 그만해 지겨워", date:"오늘"});
    body.push({name: "Jes", title: "브붕콘 만들기 ver.2.0 끝!", date:"오늘"});
    body.push({name: "Jes", title: "(죽음)", date:"어제"});
    body.push({name: "Emily", title: "Jes 살아있니?", date:"어제"});
    var body_id = "board-body";

    put_data_into_table(head, head_id);
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