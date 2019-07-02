
var filter = {};
var database;

window.onload = function() {
    init();
    filter = filter_unchecked;
    render_filter('끝낸 일 보여줘');
    render_body(filter);
}

async function init() {
    var button = document.getElementById("input-button");
    button.addEventListener("click", write_event);

    // database setting
    database = firebase.database();
}
