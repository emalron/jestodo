
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

function loadDB() {
    return database.ref().child('todos').once('value').then(sp => {
        var body = [];
        var e = sp.val();
        if(e != null) {
            Object.keys(e).map( key =>{
                var item = e[key];
                item.key = key;
                body.push(item);
            })
        }
        
        return body;
    })
}

