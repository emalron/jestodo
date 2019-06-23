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

window.onload = function() {
    
    data = {who: "정민"};
    var template = loadTemplate('hello');
    var result = replaceTemplate(template, data);
    
    document.getElementById("display").innerHTML = result;
}