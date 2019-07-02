
var filter = {};
var database;

window.onload = function() {
    init();
    filter = filter_unchecked;
    render_filter('unchecked');
    render(filter);
}

async function init() {
    var button = document.getElementById("input-button");
    button.addEventListener("click", write_event);

    // database setting
    var db = {data: []};
    localStorage.setItem('todo', JSON.stringify(db));
    
    database = firebase.database();
}
